const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Campground = require('../models/CampgroundModel');

const options = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review is required!'],
      trim: true,
      minlength: [2, 'A review must have at least 2 characters'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    campground: {
      type: mongoose.Schema.ObjectId,
      ref: 'Campground',
      required: [true, 'Review must belong to a campground.'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have an author'],
    },
  },
  options
);

// Populate details for author
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'username',
  });
  next();
});

// Calculate average statistics
//static method
reviewSchema.statics.calcAverageRatings = async function (campgroundId) {
  const stats = await this.aggregate([
    {
      $match: { campground: campgroundId },
    },
    {
      $group: {
        _id: '$campground',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  // stats -> [ { _id: 60c862c85f3cfcf81a3ee682, numRating: 4, avgRating: 3 } ]
  if (stats.length > 0) {
    await Campground.findByIdAndUpdate(campgroundId, {
      ratingsQuantity: stats[0].numRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Campground.findByIdAndUpdate(campgroundId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.campground);
});

// findByIdAndUpdate & findByIdAndDelete methods -> reflect rating into campground doc
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.reviewToUpdate = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.reviewToUpdate.constructor.calcAverageRatings(
    this.reviewToUpdate.campground
  );
});

module.exports = mongoose.model('Review', reviewSchema);
