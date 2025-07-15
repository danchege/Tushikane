const mongoose = require('mongoose');
const Project = require('../models/Project');

const projects = [
  {
    title: 'Community Health Initiative',
    status: 'completed',
    image: '/images/projects/health-initiative.jpg',
    description: 'A comprehensive health program focusing on maternal and child health in Bahati community.',
    startDate: new Date('2021-01-15'),
    endDate: new Date('2022-12-31'),
    impact: {
      beneficiaries: 1500,
      clinics: 5,
      trained: 100
    }
  },
  {
    title: 'Education Support Program',
    status: 'ongoing',
    image: '/images/projects/education.jpg',
    description: 'Providing educational materials and support to underprivileged schools in the region.',
    startDate: new Date('2023-03-01'),
    endDate: new Date('2024-12-31'),
    progress: '60%',
    milestones: [
      'School supplies distributed',
      'Teacher training completed',
      'New classrooms under construction'
    ]
  },
  {
    title: 'Clean Water Access',
    status: 'completed',
    image: '/images/projects/water-access.jpg',
    description: 'Installation of water purification systems and community wells in rural areas.',
    startDate: new Date('2022-04-15'),
    endDate: new Date('2023-03-01'),
    impact: {
      communities: 8,
      wells: 12,
      trained: 50
    }
  },
  {
    title: 'Youth Empowerment',
    status: 'ongoing',
    image: '/images/projects/youth.jpg',
    description: 'Program to provide vocational training and job opportunities for youth.',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-12-31'),
    progress: '45%',
    milestones: [
      'Training center established',
      'First cohort enrolled',
      'Partnerships with local businesses'
    ]
  }
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();
