const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Message cannot be empty'],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A message must belong to a sender'],
    },
    group: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A message must belong to a group'],
      ref: 'Group',
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A message must belong to a conversation'],
      ref: 'Conversation',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
