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
      minlength: [3, 'A username must have at least 3 characters'],
      maxlength: [20, 'A username must have less than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'An email must be connected to a user'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
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
      minlength: [8, 'Password should include at least 8 characters'],
      select: false,
    },
    phone: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide a valid phone number',
      ],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    invites: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
      },
    ],
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

userSchema.virtual('groups', {
  ref: 'Group',
  foreignField: 'members',
  localField: '_id',
});

userSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
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

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.getInvites = async function (userId) {
  return this.findById(userId)
    .select('invites') // Only select the invites field
    .populate({
      path: 'invites',
      select: '-conversations -plans',
      populate: [
        {
          path: 'admin',
          select: 'username photo',
        },
        {
          path: 'members',
          select: 'username photo',
        },
      ],
    });
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
