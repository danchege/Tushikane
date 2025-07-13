const HelpRequest = require('../models/HelpRequest');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Create help request
// @route   POST /api/help-requests
// @access  Private (Requesters only)
const createHelpRequest = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    urgency,
    location,
    category,
    contactInfo,
    images,
    tags,
    expiresAt
  } = req.body;

  // Check if user is a requester
  if (req.user.role !== 'requester') {
    return res.status(403).json({
      success: false,
      message: 'Only requesters can create help requests'
    });
  }

  const helpRequest = await HelpRequest.create({
    title,
    description,
    urgency,
    location,
    category,
    requester: req.user._id,
    contactInfo,
    images,
    tags,
    expiresAt,
    isUrgent: urgency === 'critical' || urgency === 'high'
  });

  // Populate requester info
  await helpRequest.populate('requester', 'name email phone location');

  res.status(201).json({
    success: true,
    data: helpRequest
  });
});

// @desc    Get all help requests (with filtering)
// @route   GET /api/help-requests
// @access  Public
const getHelpRequests = asyncHandler(async (req, res) => {
  const {
    status,
    urgency,
    category,
    location,
    search,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = req.query;

  // Build query
  const query = {};

  if (status) {
    query.status = status;
  }

  if (urgency) {
    query.urgency = urgency;
  }

  if (category) {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (search) {
    query.$text = { $search: search };
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Sorting
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const helpRequests = await HelpRequest.find(query)
    .populate('requester', 'name email phone location')
    .populate('volunteers.volunteer', 'name email phone location')
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await HelpRequest.countDocuments(query);

  res.json({
    success: true,
    count: helpRequests.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: helpRequests
  });
});

// @desc    Get single help request
// @route   GET /api/help-requests/:id
// @access  Public
const getHelpRequest = asyncHandler(async (req, res) => {
  const helpRequest = await HelpRequest.findById(req.params.id)
    .populate('requester', 'name email phone location bio')
    .populate('volunteers.volunteer', 'name email phone location bio');

  if (!helpRequest) {
    return res.status(404).json({
      success: false,
      message: 'Help request not found'
    });
  }

  res.json({
    success: true,
    data: helpRequest
  });
});

// @desc    Update help request
// @route   PUT /api/help-requests/:id
// @access  Private (Owner only)
const updateHelpRequest = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    urgency,
    location,
    category,
    contactInfo,
    images,
    tags,
    expiresAt,
    status
  } = req.body;

  let helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    return res.status(404).json({
      success: false,
      message: 'Help request not found'
    });
  }

  // Check ownership
  if (helpRequest.requester.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this help request'
    });
  }

  // Only allow updates if status is open
  if (helpRequest.status !== 'open' && status !== 'cancelled') {
    return res.status(400).json({
      success: false,
      message: 'Cannot update help request that is not open'
    });
  }

  helpRequest.title = title || helpRequest.title;
  helpRequest.description = description || helpRequest.description;
  helpRequest.urgency = urgency || helpRequest.urgency;
  helpRequest.location = location || helpRequest.location;
  helpRequest.category = category || helpRequest.category;
  helpRequest.contactInfo = contactInfo || helpRequest.contactInfo;
  helpRequest.images = images || helpRequest.images;
  helpRequest.tags = tags || helpRequest.tags;
  helpRequest.expiresAt = expiresAt || helpRequest.expiresAt;
  helpRequest.status = status || helpRequest.status;
  helpRequest.isUrgent = urgency === 'critical' || urgency === 'high';

  const updatedHelpRequest = await helpRequest.save();

  await updatedHelpRequest.populate('requester', 'name email phone location');
  await updatedHelpRequest.populate('volunteers.volunteer', 'name email phone location');

  res.json({
    success: true,
    data: updatedHelpRequest
  });
});

// @desc    Delete help request
// @route   DELETE /api/help-requests/:id
// @access  Private (Owner only)
const deleteHelpRequest = asyncHandler(async (req, res) => {
  const helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    return res.status(404).json({
      success: false,
      message: 'Help request not found'
    });
  }

  // Check ownership
  if (helpRequest.requester.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this help request'
    });
  }

  await helpRequest.remove();

  res.json({
    success: true,
    message: 'Help request deleted successfully'
  });
});

// @desc    Volunteer for help request
// @route   POST /api/help-requests/:id/volunteer
// @access  Private (Volunteers only)
const volunteerForRequest = asyncHandler(async (req, res) => {
  // Check if user is a volunteer
  if (req.user.role !== 'volunteer') {
    return res.status(403).json({
      success: false,
      message: 'Only volunteers can offer help'
    });
  }

  const helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    return res.status(404).json({
      success: false,
      message: 'Help request not found'
    });
  }

  // Check if help request is open
  if (helpRequest.status !== 'open') {
    return res.status(400).json({
      success: false,
      message: 'This help request is not open for volunteers'
    });
  }

  // Check if user is already a volunteer
  const alreadyVolunteered = helpRequest.volunteers.find(
    v => v.volunteer.toString() === req.user._id.toString()
  );

  if (alreadyVolunteered) {
    return res.status(400).json({
      success: false,
      message: 'You have already volunteered for this request'
    });
  }

  // Add volunteer
  helpRequest.volunteers.push({
    volunteer: req.user._id,
    status: 'pending'
  });

  await helpRequest.save();
  await helpRequest.updateStatus();

  await helpRequest.populate('requester', 'name email phone location');
  await helpRequest.populate('volunteers.volunteer', 'name email phone location');

  res.json({
    success: true,
    message: 'Successfully volunteered for this request',
    data: helpRequest
  });
});

// @desc    Respond to volunteer (accept/decline)
// @route   PUT /api/help-requests/:id/volunteers/:volunteerId
// @access  Private (Requester only)
const respondToVolunteer = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'accepted' or 'declined'

  if (!['accepted', 'declined'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either accepted or declined'
    });
  }

  const helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    return res.status(404).json({
      success: false,
      message: 'Help request not found'
    });
  }

  // Check ownership
  if (helpRequest.requester.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to respond to volunteers for this request'
    });
  }

  // Find and update volunteer status
  const volunteer = helpRequest.volunteers.find(
    v => v.volunteer.toString() === req.params.volunteerId
  );

  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: 'Volunteer not found for this request'
    });
  }

  volunteer.status = status;
  await helpRequest.save();
  await helpRequest.updateStatus();

  await helpRequest.populate('requester', 'name email phone location');
  await helpRequest.populate('volunteers.volunteer', 'name email phone location');

  res.json({
    success: true,
    message: `Volunteer ${status} successfully`,
    data: helpRequest
  });
});

// @desc    Get user's help requests
// @route   GET /api/help-requests/my-requests
// @access  Private
const getMyRequests = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = { requester: req.user._id };

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const helpRequests = await HelpRequest.find(query)
    .populate('volunteers.volunteer', 'name email phone location')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await HelpRequest.countDocuments(query);

  res.json({
    success: true,
    count: helpRequests.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: helpRequests
  });
});

// @desc    Get user's volunteered requests
// @route   GET /api/help-requests/my-volunteering
// @access  Private
const getMyVolunteering = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = { 'volunteers.volunteer': req.user._id };

  if (status) {
    query['volunteers.status'] = status;
  }

  const skip = (page - 1) * limit;

  const helpRequests = await HelpRequest.find(query)
    .populate('requester', 'name email phone location')
    .populate('volunteers.volunteer', 'name email phone location')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await HelpRequest.countDocuments(query);

  res.json({
    success: true,
    count: helpRequests.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: helpRequests
  });
});

// @desc    Get help request statistics
// @route   GET /api/help-requests/stats
// @access  Public
const getHelpRequestStats = asyncHandler(async (req, res) => {
  const totalRequests = await HelpRequest.countDocuments();
  const openRequests = await HelpRequest.countDocuments({ status: 'open' });
  const inProgressRequests = await HelpRequest.countDocuments({ status: 'in-progress' });
  const completedRequests = await HelpRequest.countDocuments({ status: 'completed' });
  const urgentRequests = await HelpRequest.countDocuments({ isUrgent: true });

  const categoryStats = await HelpRequest.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    }
  ]);

  const urgencyStats = await HelpRequest.aggregate([
    {
      $group: {
        _id: '$urgency',
        count: { $sum: 1 }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      total: totalRequests,
      open: openRequests,
      inProgress: inProgressRequests,
      completed: completedRequests,
      urgent: urgentRequests,
      categories: categoryStats,
      urgency: urgencyStats
    }
  });
});

module.exports = {
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
}; 