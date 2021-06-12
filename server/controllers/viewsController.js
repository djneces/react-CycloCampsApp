const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).send('<h1>Hi</h1>');
});
