const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Test route to verify MongoDB connection
router.get('/test', async (req, res) => {
    try {
        const db = mongoose.connection;
        if (db.readyState === 1) {
            // Create a test collection if it doesn't exist
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

            // Retrieve the document
            const testResult = await TestModel.findOne();
            
            res.status(200).json({
                status: 'success',
                message: 'MongoDB connection is working!',
                testResult
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'MongoDB connection is not ready'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error testing MongoDB connection',
            error: error.message
        });
    }
});

module.exports = router;
