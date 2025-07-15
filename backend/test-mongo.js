const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function testMongoConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log('✅ Successfully connected to MongoDB!');
        
        // Create a test collection
        const TestSchema = new mongoose.Schema({
            name: String,
            timestamp: { type: Date, default: Date.now }
        });
        const TestModel = mongoose.model('Test', TestSchema);

        // Insert a test document
        const testDoc = new TestModel({
            name: 'Test Connection'
        });
        await testDoc.save();
        console.log('✅ Successfully created test document');

        // Retrieve the document
        const testResult = await TestModel.findOne();
        console.log('✅ Retrieved test document:', testResult);

        // Close connection
        await mongoose.disconnect();
        console.log('✅ Connection closed successfully');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

testMongoConnection();
