const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['education', 'healthcare', 'water', 'community'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'ongoing', 'completed'],
    default: 'active'
  },
  targetAmount: {
    type: Number,
    required: true
  },
  peopleHelped: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt timestamp before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
