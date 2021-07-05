const express = require('express');
const campgroundController = require('../controllers/campgroundController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRouter');
const Campground = require('../models/CampgroundModel');

//multer upload images to cloudinary
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();

//nested review under each campground
router.use('/:campgroundId/reviews', reviewRouter);

router
  .route('/top-5-campgrounds')
  .get(
    campgroundController.aliasTopCampgrounds,
    campgroundController.getAllCampgrounds
  );

router
  .route('/upload-images')
  .post(upload.array('uploadedImages'), campgroundController.uploadImages);

router.route('/campground-stats').get(campgroundController.getCampgroundStats);

router
  .route('/')
  .get(campgroundController.getAllCampgrounds)
  .post(
    authController.isLoggedIn,
    campgroundController.setUserIds,
    campgroundController.setGeoData,
    campgroundController.createCampground
  );

router
  .route('/:id')
  .get(campgroundController.getCampground)
  .patch(
    authController.isLoggedIn,
    authController.isAuthor(Campground),
    campgroundController.updateCampground
  )
  .delete(
    authController.isLoggedIn,
    authController.isAuthor(Campground),
    campgroundController.deleteCampground,
    //remove all reviews linked to this campground
    campgroundController.deleteCampgroundsReviews
  );

module.exports = router;
