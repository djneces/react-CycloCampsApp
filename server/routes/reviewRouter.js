const express = require('express');
const Review = require('../models/ReviewModel');
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
  .patch(authController.isAuthor(Review), reviewController.updateReview)
  .delete(authController.isAuthor(Review), reviewController.deleteReview);

module.exports = router;
