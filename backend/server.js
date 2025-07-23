const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');

// Add early error handling and logging
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  console.error('Promise:', promise);
  process.exit(1);
});

console.log('Starting server...');
console.log('Node.js version:', process.version);
console.log('Process arguments:', process.argv);
console.log('Environment:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());
console.log('Loading environment variables...');

// Load environment variables
try {
  dotenv.config();
  console.log('✅ Environment variables loaded');
} catch (err) {
  console.error('❌ Error loading environment variables:', err);
  process.exit(1);
}

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increased timeout for Atlas
  socketTimeoutMS: 45000,
  family: 4,
  // Add Atlas-specific options
  retryWrites: true,
  w: 'majority'
};

// MongoDB connection retry configuration
const retryOptions = {
  retries: 10, // Increased retries for Atlas
  delay: 5000 // Increased delay between retries
};

// MongoDB connection state
let isConnected = false;
let connectionAttempts = 0;

// Attempt MongoDB connection
const attemptConnection = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB connection string is not configured');
    }

    console.log('🔌 Attempting to connect to MongoDB Atlas...');
    connectionAttempts++;
    
    await mongoose.connect(MONGODB_URI, connectionOptions);
    isConnected = true;
    console.log('✅ Successfully connected to MongoDB Atlas');
    console.log('🔗 Database:', mongoose.connection.name);
    
    // Add connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('MongoDB Atlas connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB Atlas connection error:', err);
      console.log('Retrying connection in 5 seconds...');
      isConnected = false;
      attemptConnection(); // Retry connection
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB Atlas connection disconnected');
      console.log('Retrying connection in 5 seconds...');
      isConnected = false;
      attemptConnection(); // Retry connection
    });

  } catch (err) {
    console.error('❌ MongoDB Atlas connection attempt failed:', err);
    console.log(`Attempt ${connectionAttempts} failed. Retrying in 5 seconds...`);
    isConnected = false;
    
    // Log specific error details
    if (err.name === 'MongoNetworkError') {
      console.error('Network error connecting to MongoDB Atlas');
    } else if (err.name === 'MongoServerError') {
      console.error('MongoDB Atlas server error:', err.message);
    }

    // Only retry if we haven't exceeded max attempts
    if (connectionAttempts < retryOptions.retries) {
      setTimeout(attemptConnection, retryOptions.delay);
    } else {
      console.error('❌ Failed to connect to MongoDB Atlas after multiple attempts');
      process.exit(1);
    }
  }
};

// Start connection attempt
console.log('🔌 Starting MongoDB connection attempt...');
attemptConnection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com'] 
      : ['http://localhost:3002', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  },
});

try {
  // Configure CORS for Express
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com'] 
      : ['http://localhost:3002', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  // Create HTTP server
  console.log('🔧 Creating HTTP server...');
  // const server = http.createServer(app); // Moved outside
  console.log('🔧 HTTP server created');
  console.log('🔧 Setting up Socket.IO server...');
  // const io = new Server(server, { // Moved outside
  //   cors: {
  //     origin: process.env.NODE_ENV === 'production' 
  //       ? ['https://your-frontend-domain.com'] 
  //       : ['http://localhost:3002', 'http://localhost:3000'],
  //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //     credentials: true
  //   },
  // });

  // Security middleware
  app.use(helmet());

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
  app.use('/api/projects', require('./routes/projectRoutes'));
  app.use('/api/stats', require('./routes/stats'));
  app.use('/api/test', require('./routes/test.js'));
  app.use('/api/volunteers', require('./routes/volunteerRoutes'));
  app.use('/api/donations', require('./routes/donationRoutes'));

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`
    });
  });

  // Error handler (must be last)
  // No error handler middleware needed for now

  const PORT = process.env.PORT || 5000;

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
      console.log('Client disconnected');
      if (socket.username) {
        socket.broadcast.emit('userLeft', socket.username);
      }
    });
  });

  // Start the server (move this here for Option 1)
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

} catch (error) {
  console.error('Server startup error:', error);
  process.exit(1);
} 
// Trigger backend workflow run 