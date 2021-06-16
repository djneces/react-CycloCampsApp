const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).send('<h1>Welcome to the CycloCamps API</h1>');
});
