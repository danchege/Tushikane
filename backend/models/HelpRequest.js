const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for your help request'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description of your help request'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    required: true
  },
  location: {
    type: String,
    required: [true, 'Please provide the location where help is needed'],
    trim: true
  },
  category: {
    type: String,
    enum: [
      'medical',
      'food',
      'shelter',
      'transportation',
      'education',
      'financial',
      'emotional-support',
      'other'
    ],
    default: 'other'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  volunteers: [{
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  images: [{
    type: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    preferredContact: {
      type: String,
      enum: ['phone', 'email', 'both'],
      default: 'both'
    }
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for better query performance
helpRequestSchema.index({ status: 1, urgency: 1, createdAt: -1 });
helpRequestSchema.index({ location: 'text', title: 'text', description: 'text' });

// Virtual for checking if request is expired
helpRequestSchema.virtual('isExpired').get(function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

// Method to update status based on volunteers
helpRequestSchema.methods.updateStatus = function() {
  const acceptedVolunteers = this.volunteers.filter(v => v.status === 'accepted');
  if (acceptedVolunteers.length > 0 && this.status === 'open') {
    this.status = 'in-progress';
  }
  return this.save();
};

module.exports = mongoose.model('HelpRequest', helpRequestSchema); 