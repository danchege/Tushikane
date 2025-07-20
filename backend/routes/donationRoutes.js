const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Project = require('../models/ProjectModel');
const auth = require('../middleware/auth');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('project');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donations for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const donations = await Donation.find({ project: req.params.projectId })
      .populate('project');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new donation
router.post('/', async (req, res) => {
  const donation = new Donation(req.body);
  try {
    // Update project raised amount
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.raised += req.body.amount;
    await project.save();

    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update donation status
router.put('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    Object.assign(donation, req.body);
    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get donation statistics
router.get('/stats', async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalDonors: { $sum: 1 }
        }
      }
    ]);

    const donationsByProject = await Donation.aggregate([
      {
        $group: {
          _id: '$project',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalDonations: totalDonations[0] || { totalAmount: 0, totalDonors: 0 },
      donationsByProject
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
