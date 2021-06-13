const express = require('express');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
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
  .post(authController.auth, authController.login)
  .get((req, res) => {
    res.send('<h1>Please login</h1>');
  });

router.get('/logout', authController.logout);

module.exports = router;
