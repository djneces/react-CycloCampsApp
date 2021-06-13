const express = require('express');
const passport = require('passport');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);
router.route('/current_user').get(userController.getCurrentUser);
router.route('/:id').get(userController.getUser);

module.exports = router;
