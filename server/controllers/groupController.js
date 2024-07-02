const factory = require('./handlerFactory');
const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.createGroup = factory.createOne(Group, 'Group');

exports.getGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find({ members: req.user.id }).populate({
    path: 'admin',
    select: 'username photo',
  });
  res.status(200).json({
    status: 'success',
    data: {
      data: groups,
    },
  });
});

exports.inviteToGroup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return next(new AppError('This user does not exist', 404));
  }

  if (user.username === req.user.username) {
    return next(new AppError('You cannot invite yourself', 400));
  }

  if (user.invites.includes(req.body.groupId)) {
    return next(new AppError('User has already been invited', 400));
  }

  user.invites.push(req.body.groupId);
  await user.save();
  res.status(200).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
