const User = require('../models/UserModel');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// REGISTER
exports.register = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;

  const user = new User({ email, username });
  const newUser = await User.register(user, password);

  //req.login from passport, logs automatically in after registration
  req.login(newUser, (err) => {
    if (err) return next(err);
    // res.redirect('/campgrounds')
  });

  res.status(201).json({
    status: 'success',
    // token,
    data: {
      newUser,
    },
  });
});

// LOGIN
exports.authenticate = (req, res, next) => {
  passport.authenticate('local', {
    // failureFlash: true,
    // failureFlash: 'Invalid username or password.',
    // successFlash: 'Welcome!',
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
};

// CHECK IF USER IS LOGGED IN
exports.isLoggedIn = (req, res, next) => {
  //method from Passport
  if (!req.isAuthenticated()) {
    console.log('not logged in');
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
  res.status(200).json({ msg: 'logged out' });
};
