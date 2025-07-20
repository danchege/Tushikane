const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');
const auth = require('../middleware/auth');
const io = require('socket.io-client');
const socket = io('http://localhost:5000');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('volunteers')
      .populate('donations');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('volunteers')
      .populate('donations');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      status: 'planned'
    });
    
    const newProject = await project.save();
    
    // Update statistics
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          activeProjects: { $sum: { $cond: [{ $eq: ['$status', 'planned'] }, 1, 0] } },
          ongoingProjects: { $sum: { $cond: [{ $eq: ['$status', 'ongoing'] }, 1, 0] } },
          completedProjects: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          educationProjects: { $sum: { $cond: [{ $eq: ['$category', 'education'] }, 1, 0] } },
          healthcareProjects: { $sum: { $cond: [{ $eq: ['$category', 'healthcare'] }, 1, 0] } },
          waterProjects: { $sum: { $cond: [{ $eq: ['$category', 'water'] }, 1, 0] } },
          communityProjects: { $sum: { $cond: [{ $eq: ['$category', 'community'] }, 1, 0] } },
          totalPeopleHelped: { $sum: '$stats.peopleHelped' },
          totalMoneyRaised: { $sum: '$stats.moneyRaised' }
        }
      }
    ]);

    // Emit statistics update
    socket.emit('statsUpdate', stats[0]);

    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Update project
    Object.assign(project, req.body);
    const updatedProject = await project.save();

    // Update statistics
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          activeProjects: { $sum: { $cond: [{ $eq: ['$status', 'planned'] }, 1, 0] } },
          ongoingProjects: { $sum: { $cond: [{ $eq: ['$status', 'ongoing'] }, 1, 0] } },
          completedProjects: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          educationProjects: { $sum: { $cond: [{ $eq: ['$category', 'education'] }, 1, 0] } },
          healthcareProjects: { $sum: { $cond: [{ $eq: ['$category', 'healthcare'] }, 1, 0] } },
          waterProjects: { $sum: { $cond: [{ $eq: ['$category', 'water'] }, 1, 0] } },
          communityProjects: { $sum: { $cond: [{ $eq: ['$category', 'community'] }, 1, 0] } },
          totalPeopleHelped: { $sum: '$stats.peopleHelped' },
          totalMoneyRaised: { $sum: '$stats.moneyRaised' }
        }
      }
    ]);

    // Emit statistics update
    socket.emit('statsUpdate', stats[0]);

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
