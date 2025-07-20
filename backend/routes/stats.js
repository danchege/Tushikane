const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');
const Donation = require('../models/Donation');

// Get project pulse statistics
router.get('/project', async (req, res) => {
  try {
    // Get counts from database
    const [activeProjects, ongoingProjects, totalDonations] = await Promise.all([
      Project.countDocuments({ status: 'active' }),
      Project.countDocuments({ status: 'ongoing' }),
      Donation.aggregate([
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    // Get category counts
    const categoryCounts = await Project.aggregate([
      { $group: {
        _id: '$category',
        count: { $sum: 1 }
      } }
    ]);

    // Format category counts
    const categories = {
      educationProjects: 0,
      healthcareProjects: 0,
      waterProjects: 0,
      communityProjects: 0
    };

    categoryCounts.forEach(item => {
      if (item._id === 'education') categories.educationProjects = item.count;
      if (item._id === 'healthcare') categories.healthcareProjects = item.count;
      if (item._id === 'water') categories.waterProjects = item.count;
      if (item._id === 'community') categories.communityProjects = item.count;
    });

    // Get people helped count (assuming we store this in projects)
    const peopleHelped = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$peopleHelped' } } }
    ]);

    res.json({
      activeProjects,
      ongoingProjects,
      peopleHelped: peopleHelped[0]?.total || 0,
      moneyRaised: totalDonations[0]?.total || 0,
      ...categories
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Update project pulse statistics
router.put('/project', async (req, res) => {
  try {
    const { 
      activeProjects, 
      ongoingProjects, 
      peopleHelped, 
      moneyRaised,
      educationProjects,
      healthcareProjects,
      waterProjects,
      communityProjects
    } = req.body;

    // Update the statistics in the database
    // You might want to store these in a dedicated stats collection
    // For now, we'll just return the updated values
    res.json({
      activeProjects: activeProjects || 0,
      ongoingProjects: ongoingProjects || 0,
      peopleHelped: peopleHelped || 0,
      moneyRaised: moneyRaised || 0,
      educationProjects: educationProjects || 0,
      healthcareProjects: healthcareProjects || 0,
      waterProjects: waterProjects || 0,
      communityProjects: communityProjects || 0
    });
  } catch (error) {
    console.error('Error updating stats:', error);
    res.status(500).json({ error: 'Failed to update statistics' });
  }
});

module.exports = router;
