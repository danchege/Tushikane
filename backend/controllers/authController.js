const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, location, bio } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'requester',
    phone,
    location,
    bio
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        avatar: user.avatar,
        isVerified: user.isVerified,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid user data'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Update last active
  user.lastActive = new Date();
  await user.save();

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      avatar: user.avatar,
      isVerified: user.isVerified,
      token: generateToken(user._id)
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, location, bio, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        location: updatedUser.location,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        isVerified: updatedUser.isVerified,
        token: generateToken(updatedUser._id)
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password updated successfully'
  });
});

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
}; 