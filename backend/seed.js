const mongoose = require('mongoose');
const Project = require('./models/ProjectModel');
const Volunteer = require('./models/Volunteer');
const Donation = require('./models/Donation');
const ContactMessage = require('./models/ContactMessage');

const seedData = async () => {
  try {
    // Clear existing data
    await Project.deleteMany();
    await Volunteer.deleteMany();
    await Donation.deleteMany();
    await ContactMessage.deleteMany();

    // Seed Projects
    const projects = await Project.insertMany([
      {
        name: 'Clean Water Initiative',
        description: 'Building water wells and storage facilities for the community',
        status: 'active',
        target: 500000,
        budget: 350000,
        image: '/projects/water.jpg',
        category: 'water',
        location: 'Bahati'
      },
      {
        name: 'Education Support Program',
        description: 'Providing school supplies and scholarships for underprivileged children',
        status: 'planned',
        target: 300000,
        budget: 120000,
        image: '/projects/education.jpg',
        category: 'education',
        location: 'Bahati'
      },
      {
        name: 'Healthcare Outreach',
        description: 'Mobile health clinics and medical supplies distribution',
        status: 'completed',
        target: 400000,
        budget: 400000,
        image: '/projects/healthcare.jpg',
        category: 'healthcare',
        location: 'Bahati'
      }
    ]);

    // Seed Volunteers
    const volunteers = await Volunteer.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Project Manager',
        skills: ['Leadership', 'Project Management', 'Community Engagement'],
        totalHours: 500,
        avatar: '/avatars/john.jpg',
        projects: [projects[0]._id]
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Education Coordinator',
        skills: ['Teaching', 'Curriculum Development', 'Mentoring'],
        totalHours: 350,
        avatar: '/avatars/jane.jpg',
        projects: [projects[1]._id]
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'Healthcare Volunteer',
        skills: ['First Aid', 'Health Education', 'Counseling'],
        totalHours: 450,
        avatar: '/avatars/mike.jpg',
        projects: [projects[2]._id]
      }
    ]);

    // Seed Donations
    await Donation.insertMany([
      {
        amount: 10000,
        donorName: 'Anonymous',
        email: 'donor@example.com',
        project: projects[0]._id,
        paymentStatus: 'completed',
        paymentMethod: 'mpesa'
      },
      {
        amount: 15000,
        donorName: 'Anonymous',
        email: 'donor@example.com',
        project: projects[1]._id,
        paymentStatus: 'completed',
        paymentMethod: 'mpesa'
      }
    ]);

    // Seed Contact Messages
    await ContactMessage.insertMany([
      {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'General Inquiry',
        message: 'Hello, I would like to know more about your organization.',
        priority: 'medium'
      }
    ]);

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tushikane', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  seedData();
})
.catch(error => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
