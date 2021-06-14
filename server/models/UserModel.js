const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const AppError = require('../utils/AppError');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  // photo: {
  //   type: String,
  //   default: 'default.jpg'
  // },

  duration: {
    type: Number,
    default: 5,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  activeUser: {
    type: Boolean,
    default: true,
    select: false,
  },
  __v: { type: Number, select: false },
});

//hash password before saving into the DB
userSchema.pre('save', async function (next) {
  const user = this;

  try {
    // Only run this function if password was actually modified
    if (!user.isModified('password')) return next();

    // Hash the password with 13
    const hash = await bcrypt.hash(user.password, 13);
    user.password = hash;

    next();
  } catch (error) {
    next(new AppError(error));
  }
});

// Records the time of password change
userSchema.pre('save', function (next) {
  //if field password not modified || new document created
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Query using method starting at 'find' filters out only active users except for findByIdAndDelete method
userSchema.pre(
  /(?=.*\b(^find)\b)(?!.*\b(findByIdAndDelete)\b)(.+)/i,
  function (next) {
    // this points to the current query
    this.find({ activeUser: { $ne: false } });
    next();
  }
);

userSchema.methods.comparePassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);

    return result;
  } catch (error) {
    new AppError(error);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
