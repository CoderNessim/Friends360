const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 40,
    },
    messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }],
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
