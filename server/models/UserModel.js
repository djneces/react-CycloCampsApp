const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

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
  passwordResetToken: String,
  passwordResetExpires: Date,
  activeUser: {
    type: Boolean,
    default: true,
    select: false,
  },
  __v: { type: Number, select: false },
});

// userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', async function (next) {
  const user = this;

  try {
    // Only run this function if password was actually modified
    if (!user.isModified('password')) return next();

    // Hash the password with 13
    const hash = await bcrypt.hash(user.password, 13);
    user.password = hash;

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const result = await bcrypt.compare(password, this.password);

    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);
