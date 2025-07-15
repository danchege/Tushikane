const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB');
    
    // Test if we can create a collection
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection working' });
    console.log('✅ Successfully created test document');
    
    // Clean up
    await testCollection.deleteOne({ test: 'connection working' });
    console.log('✅ Cleaned up test document');
    
    mongoose.connection.close();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

testConnection();
