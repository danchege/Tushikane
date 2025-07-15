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
  status: {
    type: String,
    enum: ['active', 'completed', 'planned'],
    default: 'active'
  },
  target: {
    type: Number,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: '/default-project.jpg'
  },
  raised: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'healthcare', 'water', 'community']
  },
  location: {
    type: String,
    required: true
  },
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
