/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Email = require('../utils/email');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

const popOptions = [
  {
    path: 'groups',
    populate: [
      {
        path: 'admin',
        select: 'username photo coordinates',
      },
      {
        path: 'members',
        select: 'username photo coordinates', // Specify the fields you want to include for members
      },
    ],
  },
  {
    path: 'invites',
    select: '-plans',
    populate: [
      {
        path: 'admin',
        select: 'username photo coordinates',
      },
      {
        path: 'members',
        select: 'username photo coordinates',
      },
    ],
  },
];

function generateStreamToken(userId) {
  const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
  return serverClient.createToken(userId.toString());
}

function createSendToken(user, statusCode, req, res) {
  const streamToken = generateStreamToken(user._id);
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  res.cookie('streamToken', streamToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    streamToken,
    data: {
      user,
    },
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, phone } = req.body;

  if (password.length < 8 || password.length > 20) {
    return next(
      new AppError('Password must be between 8 and 20 characters', 400),
    );
  }

  const newUser = await User.create({
    username,
    email,
    password,
    phone,
  });
  const streamToken = generateStreamToken(newUser._id);
  const signupToken = newUser.createToken('signup');
  await newUser.save({ validateBeforeSave: false });
  const url = `http://localhost:5173/confirmEmail/${signupToken}`;
  await new Email(newUser, url).sendConfirmEmail();

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      streamToken,
    },
  });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    signupToken: hashedToken,
    signupExpires: { $gt: Date.now() },
  }).populate(popOptions);

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  if (user.signupExpires > Date.now() + 10 * 60 * 1000) {
    return next(new AppError('Signup token has expired', 400));
  }

  user.signupToken = undefined;
  user.signupExpires = undefined;
  user.emailVerified = true;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email })
    .select('+password')
    .populate(popOptions);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (!user.emailVerified) {
    return next(new AppError('Please verify your email', 401));
  }
  // const userWithInvites = await User.getInvites(user.id);
  // user.invites = userWithInvites.invites;

  await user.save({ validateBeforeSave: true });
  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.cookie('streamToken', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user found with that email', 404));
  }
  if (!user.emailVerified) {
    return next(new AppError('Please verify your email', 401));
  }
  const resetToken = user.createToken('passwordReset');
  await user.save({ validateBeforeSave: false });
  try {
    const resetURL = `http://localhost:5173/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).populate('groups invites');

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
