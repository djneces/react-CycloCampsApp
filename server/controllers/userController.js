const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use /signup to create a new user',
  });
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.getCurrentUser = (req, res) => {
  if (!req.user)
    return res.status(403).json({ errors: ['login to get the info'] });

  return res.status(200).json({ user: req.user });
};
