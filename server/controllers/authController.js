const User = require('../models/UserModel');
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// REGISTER
// /api/auth/register
exports.register = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({ username, email, password });
    await newUser.save();

    //req.login from passport, logs automatically in after registration
    req.login(newUser, (err) => {
      if (err) return next(err);
      // res.redirect('/campgrounds')
    });

    return res.status(201).json({
      status: 'success',
      msg: 'user successfully created',
      data: newUser,
    });
  }
  return next(new AppError('User with these credentials already exists!', 422));
});

// LOGIN
// /api/auth/login
exports.auth = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // return res.redirect('/login');
      return next(new AppError('Incorrect credentials', 400));
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      next();
      // return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
};

exports.login = (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', msg: 'User successfully logged in' });
};

// CHECK IF USER IS LOGGED IN
exports.isLoggedIn = (req, res, next) => {
  //method from Passport
  if (!req.isAuthenticated()) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  next();
};

// LOGOUT
exports.logout = (req, res, next) => {
  //method from Passport
  req.logout();
  console.log('logout', req.isAuthenticated());
  res.status(200).json({ status: 'success', msg: 'logged out' });
};
