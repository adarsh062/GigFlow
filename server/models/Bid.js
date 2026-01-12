const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true,
  },
  freelancerId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending", // Options: 'pending', 'hired', 'rejected'
    enum: ["pending", "hired", 'rejected']
  }
}, { timestamps: true });

// Prevent duplicate bids from same user on same gig
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model('Bid', bidSchema);