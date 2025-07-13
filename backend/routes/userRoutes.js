const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getVolunteers,
  getUserStats
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/volunteers', getVolunteers);

// Protected routes
router.get('/:id', protect, getUser);

// Admin routes
router.get('/', protect, authorize('volunteer', 'requester'), getUsers);
router.put('/:id', protect, authorize('volunteer', 'requester'), updateUser);
router.delete('/:id', protect, authorize('volunteer', 'requester'), deleteUser);
router.get('/stats/overview', protect, authorize('volunteer', 'requester'), getUserStats);

module.exports = router; 