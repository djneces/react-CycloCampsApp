const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_API_KEY;
const geoCoder = mbxGeocoding({ accessToken: mapBoxToken });

const Campground = require('../models/CampgroundModel');
const Review = require('../models/ReviewModel');
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
