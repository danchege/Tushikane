const express = require('express');
const router = express.Router();
const {
  createHelpRequest,
  getHelpRequests,
  getHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
  volunteerForRequest,
  respondToVolunteer,
  getMyRequests,
  getMyVolunteering,
  getHelpRequestStats
} = require('../controllers/helpRequestController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getHelpRequests);
router.get('/:id', getHelpRequest);
router.get('/stats/overview', getHelpRequestStats);

// Protected routes
router.post('/', protect, authorize('requester'), createHelpRequest);
router.put('/:id', protect, updateHelpRequest);
router.delete('/:id', protect, deleteHelpRequest);

// Volunteer routes
router.post('/:id/volunteer', protect, authorize('volunteer'), volunteerForRequest);
router.put('/:id/volunteers/:volunteerId', protect, respondToVolunteer);

// User-specific routes
router.get('/my-requests', protect, getMyRequests);
router.get('/my-volunteering', protect, getMyVolunteering);

module.exports = router; 