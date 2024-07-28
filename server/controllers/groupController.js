const factory = require('./handlerFactory');
const Group = require('../models/groupModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { patch } = require('../routes/userRoutes');

exports.createGroup = factory.createOne(Group, 'Group');

exports.getGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find({ members: { $in: [req.user.id] } })
    .populate('admin', 'username photo coordinates') // Simplified population for 'admin'
    .populate('members', 'username photo coordinates'); // Population for 'members'

  res.status(200).json({
    status: 'success',
    data: {
      data: groups,
    },
  });
});

exports.inviteToGroup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  const group = await Group.findById(req.body.groupId);

  if (!group) {
    return next(new AppError('Group doesnt or no longer exists', 404));
  }

  if (!user) {
    return next(new AppError('This user does not exist', 404));
  }

  if (group.members.includes(user.id)) {
    return next(new AppError('User is already a member of this group', 400));
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

exports.deleteGroupProtect = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (group.admin.toString() !== req.user.id) {
    return next(new AppError('You are not the creator of this group', 403));
  }
  next();
});

exports.deleteGroup = factory.deleteOne(Group);

exports.leaveGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);
  //may have to account for messages and plan delettion later
  if (!group) {
    return next(new AppError('Group doesnt or no longer exists', 404));
  }

  if (group.admin.toString() === req.user.id) {
    return next(new AppError('Group creator cannot leave group', 403));
  }

  group.members = group.members.filter(
    (member) => member.toString() !== req.user.id,
  );
  await group.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.acceptInvite = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    return next(new AppError('Group doesnt or no longer exists', 404));
  }
  if (group.members.includes(req.user.id)) {
    return next(new AppError('You are already a member of this group', 400));
  }
  group.members.push(req.user.id);
  const user = await User.findById(req.user.id);

  // Remove the group ID from the user's invites
  user.invites = user.invites.filter(
    (invite) => invite.toString() !== req.params.id,
  );

  // Save the updated user document
  await user.save();
  // Update req.user to reflect the current state of the user
  req.user.invites = user.invites;

  await group.save();
  res.status(200).json({
    status: 'success',
    data: {
      group,
    },
  });
});

exports.declineInvite = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (!group) {
    return next(new AppError('Group doesnt or no longer exists', 404));
  }

  group.invites = group.invites.filter(
    (invite) => invite.toString() !== req.user.id,
  );

  await group.save();
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
