const Review = require('./../models/ReviewModel');
const factory = require('./handlerFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.campground) req.body.campground = req.params.campgroundId;
  if (!req.body.author) req.body.author = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
