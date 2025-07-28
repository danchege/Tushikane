const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const mongoose = require('mongoose'); // Added for MongoDB connection check

// Get chat messages (no auth required for real-time chat)
router.get('/chat', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // MongoDB not connected, return empty response for testing
      return res.json({
        success: true,
        messages: [],
        chats: []
      });
    }
    
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      messages: messages,
      chats: [] // For compatibility with existing frontend
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// Get all contact messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single contact message
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new contact message
router.post('/', async (req, res) => {
  const message = new ContactMessage(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact message status
router.put('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    Object.assign(message, req.body);
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.deleteOne();
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact message statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await ContactMessage.aggregate([
      {
        $group: {
          _id: null,
          totalMessages: { $sum: 1 },
          newMessages: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          highPriority: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
        }
      }
    ]);

    res.json(stats[0] || { totalMessages: 0, newMessages: 0, highPriority: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
