const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const auth = require('../middleware/auth');

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .populate('projects');
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single volunteer
router.get('/:id', async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate('projects');
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new volunteer
router.post('/', async (req, res) => {
  const volunteer = new Volunteer(req.body);
  try {
    const newVolunteer = await volunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update volunteer
router.put('/:id', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    Object.assign(volunteer, req.body);
    const updatedVolunteer = await volunteer.save();
    res.json(updatedVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete volunteer
router.delete('/:id', auth, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });

    await volunteer.deleteOne();
    res.json({ message: 'Volunteer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply to volunteer
router.post('/apply', async (req, res) => {
  try {
    const volunteer = new Volunteer({
      ...req.body,
      status: 'active'
    });
    const newVolunteer = await volunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
