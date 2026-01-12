const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "open", // Options: 'open', 'assigned'
    enum: ["open", "assigned"]
  }
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);