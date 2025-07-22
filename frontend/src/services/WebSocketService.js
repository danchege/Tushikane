import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  forceNew: true
});

let connectionAttempts = 0;
const maxConnectionAttempts = 5;

// Attempt to connect with retry logic
const connectWithRetry = () => {
  connectionAttempts++;
  
  if (connectionAttempts <= maxConnectionAttempts) {
    console.log(`Attempting to connect (attempt ${connectionAttempts}/${maxConnectionAttempts})`);
    socket.connect();
  } else {
    console.error('Max connection attempts reached. Please check server status.');
  }
};

// Connect when the service is imported
connectWithRetry();

// Export socket events
export const emitStatsUpdate = (stats) => {
  socket.emit('statsUpdate', stats);
};

export const listenForStatsUpdates = (callback) => {
  socket.on('statsUpdated', (updatedStats) => {
    callback(updatedStats);
  });
};

// Cleanup function
export const disconnectSocket = () => {
  socket.disconnect();
};
