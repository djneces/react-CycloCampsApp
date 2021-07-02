const express = require('express');
const passport = require('passport');
const authController = require('./../controllers/authController');
const {
  userValidationRules,
  validate,
} = require('./../middleware/inputValidation');

const router = express.Router();

router
  .route('/register')
  .post(userValidationRules(), validate, authController.register);

router
  .route('/login')
  .post(
    authController.auth,
    authController.isDeactivated,
    authController.login
  );

router.get('/logout', authController.logout);

module.exports = router;
