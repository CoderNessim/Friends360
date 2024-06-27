const factory = require('./handlerFactory');
const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');

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
