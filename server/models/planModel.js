const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A plan must have a creator'],
    },
    description: {
      type: String,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        required: [true, 'Coordinates are required'],
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message:
            'Coordinates must have exactly 2 values (latitude, longitude)',
        },
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
    },
    date: {
      type: Date,
      required: [true, 'A date is required'],
      default: () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      },
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: 'Date must be in the future',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
