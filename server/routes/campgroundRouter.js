const express = require('express');
const campgroundController = require('../controllers/campgroundController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRouter');

const router = express.Router();

//nested review under each campground
router.use('/:campgroundId/reviews', reviewRouter);

router
  .route('/top-5-campgrounds')
  .get(
    campgroundController.aliasTopCampgrounds,
    campgroundController.getAllCampgrounds
  );

router.route('/campground-stats').get(campgroundController.getCampgroundStats);

router.route('/').get(campgroundController.getAllCampgrounds).post(
  authController.isLoggedIn,
  // is owner
  campgroundController.setUserIds,
  campgroundController.createCampground
);

router
  .route('/:id')
  .get(campgroundController.getCampground)
  .patch(
    authController.isLoggedIn,
    // is owner
    campgroundController.updateCampground
  )
  .delete(
    authController.isLoggedIn,
    // is owner
    campgroundController.deleteCampground
  );

module.exports = router;
