const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  totalHours: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: '/default-avatar.jpg'
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time', 'flexible'],
    default: 'flexible'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
