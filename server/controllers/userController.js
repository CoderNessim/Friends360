const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getInvites = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const userWithInvites = await User.getInvites(userId);

  if (!userWithInvites) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      invites: userWithInvites.invites,
    },
  });
});

exports.getStreamToken = catchAsync(async (req, res, next) => {
  const streamToken = req.cookies.streamToken;

  if (!streamToken) {
    return next(new AppError('No Stream token found', 401));
  }

  res.status(200).json({
    status: 'success',
    streamToken,
  });
});
