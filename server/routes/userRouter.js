const express = require('express');
const passport = require('passport');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

//routes available for logged in users
router.use(authController.isLoggedIn);
router
  .route('/current_user')
  .get(userController.getCurrentUser)
  .patch(userController.updateCurrentUser)
  .delete(userController.deleteCurrentUser);

router.route('/update_password').patch(authController.updatePassword);

//routes restricted to admin
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
