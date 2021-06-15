const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review is required!'],
      trim: true,
      minlength: [10, 'A review must have at least 10 characters'],
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

// Populate details for campground and author
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'campground',
  //   select: '-author',
  // });
  this.populate({
    path: 'author',
    select: 'username -_id',
  });
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
