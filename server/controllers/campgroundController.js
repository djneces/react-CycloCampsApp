const Campground = require('../models/CampgroundModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUserIds = (req, res, next) => {
  // Need to include author of the campground
  if (!req.body.author) req.body.author = req.user.id;
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
