const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A username field is required'],
      unique: [true, 'This username is already taken'],
    },
    email: {
      type: String,
      required: [true, 'An email must be connected to a user'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
      },
    ],
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'group-leader'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'A username must have at least 8 characters'],
      maxlength: [20, 'A username must have less than 20 characters'],
      select: false,
    },
    phone: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    signupToken: String,
    signupExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.createToken = function (tokenType) {
  const token = crypto.randomBytes(32).toString('hex');
  this[`${tokenType}Token`] = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  this[`${tokenType}Expires`] = Date.now() + 10 * 60 * 1000;
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
