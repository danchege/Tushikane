const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
try {
  dotenv.config();
  console.log('✅ Environment variables loaded');
} catch (err) {
  console.error('❌ Error loading environment variables:', err);
  process.exit(1);
}

// Connect to database
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tushikane';
    console.log('🔌 Attempting to connect to MongoDB at:', MONGODB_URI);
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
    console.log('🔗 Database connection:', db.connection.name);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Connect to database
connectDB().catch(console.error);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com'] 
      : ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Tushikane API - Msaada kwa Jamii',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      helpRequests: '/api/help-requests'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/help-requests', require('./routes/helpRoutes'));
app.use('/api/projects', require('./routes/projectsRoutes'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/test', require('./routes/test.js'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler (must be last)
// No error handler middleware needed for now

const PORT = process.env.PORT || 5001;

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected');

  // Chat functionality
  socket.on('joinChat', (username) => {
    socket.username = username;
    socket.broadcast.emit('userJoined', username);
  });

  socket.on('sendMessage', async (message) => {
    try {
      // Save message to database
      const newMessage = new Message({
        user: socket.username,
        content: message
      });
      await newMessage.save();

      // Broadcast message to all clients
      io.emit('newMessage', {
        user: socket.username,
        content: message,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('userLeft', socket.username);
    }
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log('✅ Server is ready to accept requests');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('❌ Stack trace:', error.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  console.error('❌ Promise:', promise);
  process.exit(1);
});

// Handle SIGTERM signal (when process is terminated)
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM signal received');
  console.log('🛑 Closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1);
});

module.exports = app; 