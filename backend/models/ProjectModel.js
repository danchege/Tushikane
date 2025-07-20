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
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned'
  },
  target: {
    type: Number,
    default: 0
  },
  budget: {
    type: Number,
    default: 0
  },
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  stats: {
    peopleHelped: {
      type: Number,
      default: 0
    },
    moneyRaised: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Update statistics when project is saved
projectSchema.pre('save', function(next) {
  // Update category-specific statistics
  if (this.category === 'education') {
    this.stats.educationProjects = 1;
  } else if (this.category === 'healthcare') {
    this.stats.healthcareProjects = 1;
  } else if (this.category === 'water') {
    this.stats.waterProjects = 1;
  } else if (this.category === 'community') {
    this.stats.communityProjects = 1;
  }

  // Update status-based statistics
  if (this.status === 'planned') {
    this.stats.activeProjects = 1;
  } else if (this.status === 'ongoing') {
    this.stats.ongoingProjects = 1;
  }

  next();
});

module.exports = mongoose.model('Project', projectSchema);
