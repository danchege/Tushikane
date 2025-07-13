const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Get all users (with filtering)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { role, location, search, page = 1, limit = 10 } = req.query;

  // Build query
  const query = {};

  if (role) {
    query.role = role;
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } }
    ];
  }

  // Pagination
  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    count: users.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: users
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user (admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, phone, location, bio, isVerified } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;
  user.phone = phone || user.phone;
  user.location = location || user.location;
  user.bio = bio || user.bio;
  user.isVerified = isVerified !== undefined ? isVerified : user.isVerified;

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: updatedUser
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  await user.remove();

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Get volunteers
// @route   GET /api/users/volunteers
// @access  Public
const getVolunteers = asyncHandler(async (req, res) => {
  const { location, search, page = 1, limit = 10 } = req.query;

  const query = { role: 'volunteer' };

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { bio: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const volunteers = await User.find(query)
    .select('-password')
    .sort({ lastActive: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await User.countDocuments(query);

  res.json({
    success: true,
    count: volunteers.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    },
    data: volunteers
  });
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const volunteers = await User.countDocuments({ role: 'volunteer' });
  const requesters = await User.countDocuments({ role: 'requester' });
  const verifiedUsers = await User.countDocuments({ isVerified: true });

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email role createdAt');

  res.json({
    success: true,
    data: {
      total: totalUsers,
      volunteers,
      requesters,
      verified: verifiedUsers,
      recent: recentUsers
    }
  });
});

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getVolunteers,
  getUserStats
}; 