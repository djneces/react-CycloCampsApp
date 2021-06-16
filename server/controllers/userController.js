const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Func to filter out not permitted fields from the body
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((field) => {
    if (allowedFields.includes(field)) newObj[field] = obj[field];
  });
  return newObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use api/auth/register to create a new user',
  });
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.getCurrentUser = (req, res) => {
  if (!req.user)
    return res
      .status(403)
      .json({ errors: ['Login to get the current user info'] });

  return res.status(200).json({ user: req.user });
};

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // Error if user tries to change password via this route
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use api/users/update_password',
        400
      )
    );
  }

  // Filtered out all unwanted fields that ought not be updated
  //we allow changing username and email
  const filteredBody = filterObj(req.body, 'username', 'email');

  // Update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  //user is not permanently deleted -> only deactivated
  await User.findByIdAndUpdate(req.user.id, {
    activeUser: false,
    deactivatedUserAt: Date.now(),
  });
  //log out user
  req.logout();
  res.status(200).json({
    status: 'success',
    msg: 'Current user deactivated',
    data: null,
  });
});

// not for password updates, use api/users/current_user...
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
