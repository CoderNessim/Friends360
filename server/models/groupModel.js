const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A group must have a name'],
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
    conversations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation',
      },
    ],
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
