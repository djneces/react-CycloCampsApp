const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

//must be logged in for all the routes
router.use(authController.isLoggedIn);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.setUserIds, reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    // be owner
    reviewController.updateReview
  )
  .delete(
    //be owner
    reviewController.deleteReview
  );

module.exports = router;
