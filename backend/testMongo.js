const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tushikane';
    console.log('Using MongoDB URI:', MONGODB_URI);
    
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Successfully connected to MongoDB');
    console.log('🔗 Database connection:', db.connection.name);
    
    // Close connection after testing
    await mongoose.connection.close();
    console.log('✅ Connection closed');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

testConnection();
