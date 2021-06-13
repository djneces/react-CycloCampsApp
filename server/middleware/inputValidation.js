const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('username')
      .isLength({ min: 3 })
      .withMessage('the username must have minimum length of 3')
      .trim(),
    body('email')
      .isEmail()
      .withMessage('invalid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8, max: 15 })
      .withMessage('your password should have min and max length between 8-15')
      .matches(/\d/)
      .withMessage('your password should have at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('your password should have at least one special character'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match');
      }
      return true;
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
