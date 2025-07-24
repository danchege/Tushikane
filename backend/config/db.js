const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tushikane';

    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout for Atlas
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log('✅ Database name:', conn.connection.name);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error('Attempting to connect with default settings...');
    try {
      // Try connecting with default settings
      const conn = await mongoose.connect('mongodb://localhost:27017/tushikane', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log('✅ Database name:', conn.connection.name);
    } catch (error) {
      console.error('❌ Failed to connect with default settings:', error.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;