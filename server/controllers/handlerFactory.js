const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const { cloudinary } = require('../cloudinary');

const Review = require('./../models/ReviewModel');

// GET ALL
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Allow nested GET reviews on a campground
    let filter = {};

    //filter out reviews for specific campground
    // console.log(
    //   await Review.find({ campground: '60c79cb1a17d32ecf398a452' })
    // );

    if (req.params.campgroundId)
      //filter by campgroundId
      filter = { campground: req.params.campgroundId };

    const allDocs = await Model.countDocuments();

    //query is in the object req.query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //explain() for testing
    // const doc = await features.query.explain();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      allDocs: allDocs,
      results: doc.length,
      data: doc,
    });
  });

// GET ONE
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// CREATE ONE
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

// DELETE ONE
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //permanently delete
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      msg: 'Record deleted',
      data: null,
    });
    next();
  });

// DELETE MANY
exports.deleteMany = (Model) =>
  catchAsync(async (req, res, next) => {
    //permanently delete multiple records
    const response = await Model.deleteMany({ campground: req.params.id });
    console.log('success', response.deletedCount);
  });

// UPDATE ONE
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc;

    // Images are included in the request
    if (req.body.images) {
      console.log('runs with images');
      let objWithoutImages = { ...req.body };
      delete objWithoutImages.images;
      doc = await Model.findByIdAndUpdate(req.params.id, objWithoutImages, {
        new: true,
        runValidators: true,
      });
      // adding imgs to the existing ones
      doc.images.push(...req.body.images);
      await doc.save();
    } else {
      // If images are not included
      doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      // cloudinary.uploader.destroy('CycloCamps/eq7yncitulhdpbpns08r');
    }

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
