const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_API_KEY;
const geoCoder = mbxGeocoding({ accessToken: mapBoxToken });

const { cloudinary } = require('../cloudinary');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplate');
const Campground = require('../models/CampgroundModel');
const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUserIds = (req, res, next) => {
  // Need to include author of the campground
  if (!req.body.author) req.body.author = req.user.id;
  next();
};

// Geocoding, location => coords
exports.setGeoData = catchAsync(async (req, res, next) => {
  const geoData = await geoCoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1, //1 result
    })
    .send();
  req.body.geometry = geoData.body.features[0].geometry;
  next();
});

// Uploading pictures to Cloudinary
exports.uploadImages = (req, res, next) => {
  // multer saves the img files as req.files
  const imgUrls = req.files.map((file) => file.path);
  res.status(201).json({
    status: 'success',
    data: imgUrls,
  });
  next();
};

// Delete image from Cloudinary and the DB
exports.deleteImage = catchAsync(async (req, res, next) => {
  console.log(req.body.image);
  // Remove from Cloudinary
  // Image uploaded by user (to Cloudinary) can be only deleted
  if (req.body.image.includes('cloudinary')) {
    console.log('cloudinary');
    const splitUrl1 = req.body.image.split('/CycloCamps/');
    const splitUrl2 = splitUrl1[1].split('.');
    // converting image url => imageId, e.g. CycloCamps/fozccv2hjs33sgm7ygmg
    const imageId = `CycloCamps/${splitUrl2[0]}`;
    await cloudinary.uploader.destroy(imageId);
  } else {
    // Seed from unsplash cannot be deleted
    return next(new AppError('This image cannot be deleted', 422));
  }

  // Remove from the DB
  const doc = await Campground.findById(req.body.campgroundId);
  await doc.images.pull(req.body.image);
  await doc.save();

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

// Send welcoming email via Sendgrid
exports.sendWelcomingEmail = catchAsync(async (req, res, next) => {
  const survey = {
    subject: 'Welcome to CycloCamps',
    recipients: [{ email: req.body.email }],
  };
  // ({ subject, recipients }, content)
  // Send email
  const mailer = new Mailer(survey, emailTemplate());
  const response = await mailer.send();
  console.log('mailer', response);
  // If successfully send, update the DB
  if (response.statusCode === 202) {
    doc = await User.findOneAndUpdate(
      { email: req.body.email },
      { welcomeEmailSentAt: Date.now() }
    );
  }
  res.status(200).json({
    status: 'success',
    message: 'Email sent successfully',
  });
});

//alias top 5 campgrounds (presets query)
exports.aliasTopCampgrounds = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,ratingsAverage,description,location';
  next();
};

exports.getAllCampgrounds = factory.getAll(Campground);
//populate option enabled for 'reviews'
exports.getCampground = factory.getOne(Campground, { path: 'reviews' });
exports.createCampground = factory.createOne(Campground);
exports.updateCampground = factory.updateOne(Campground);
exports.deleteCampground = factory.deleteOne(Campground);
exports.deleteCampgroundsReviews = factory.deleteMany(Review);

exports.getCampgroundStats = catchAsync(async (req, res, next) => {
  const stats = await Campground.aggregate([
    {
      // >= 4.5
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$price' },
        numCampgrounds: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
