const express = require('express');
const passport = require('passport');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.register);

router.route('/login').post(authController.authenticate);

router.get('/logout', authController.logout);

module.exports = router;
