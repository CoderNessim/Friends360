const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A group must have a name'],
      unique: [true, 'This group name is already taken'],
      maxlength: [20, 'A group name must have less than 20 characters'],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    plans: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Plan',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

groupSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
