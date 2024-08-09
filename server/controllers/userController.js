const multer = require('multer');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

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

exports.updateCoords = factory.updateOne(User);
exports.updateAddress = factory.updateOne(User);
exports.updateMe = factory.updateOne(User);

exports.uploadUserPhoto = upload.single('photo');

exports.deleteMe = factory.deleteOne(User, 'user');
