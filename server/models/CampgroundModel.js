const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//to JSON
// To have virtual property appear in the object in the console when stringified
const options = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const campgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A campground must have a name'],
      // unique: true,
      trim: true,
      maxlength: [
        40,
        'A campground name must have less or equal than 40 characters',
      ],
      minlength: [
        5,
        'A campground name must have more or equal than 5 characters',
      ],
    },
    slug: String,
    images: [String],
    price: {
      type: Number,
      required: [true, 'Please input the price'],
      min: 0,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Each campground must have a description'],
      maxlength: [
        350,
        'A campground description must have less than 350 characters',
      ],
    },
    location: {
      type: String,
      required: [true, 'Each campground must have a location specified'],
      minlength: [2, 'Location must have more or equal than 2 characters'],
      maxlength: [40, 'Location must have less or equal than 40 characters'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      // to get decimal -> 4.7
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Campground author is missing'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
      },
    },
  },
  // Pass the options
  options
);

// Virtual populate
campgroundSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'campground',
  localField: '_id',
});

// Generate slug
campgroundSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Populate author when query
campgroundSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: '-__v -passwordChangedAt -role -email',
  });

  next();
});

module.exports = mongoose.model('Campground', campgroundSchema);
