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
    conversations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
