import React, { useState, useEffect } from 'react';
import '@/styles/ChatHub.css';
import { socket, getMessages } from '../services/api';

const ChatHub = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleReply = (text) => {
    setNewMessage(`> ${text}\n\n${newMessage}`);
  };

  const handleEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleFile = () => {
    // TODO: Implement file upload
  };
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Handle connection status
    socket.on('connect', () => {
      setIsConnected(true);
      setConnectionError('');
      if (username) {
        socket.emit('joinChat', username);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      setConnectionError('Connection lost. Attempting to reconnect...');
    });

    socket.on('connect_error', (error) => {
      setConnectionError('Failed to connect. Please check if the server is running.');
      console.error('Connection error:', error);
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for user joins
    socket.on('userJoined', (user) => {
      setUsers(prev => [...prev, user]);
    });

    // Listen for user leaves
    socket.on('userLeft', (user) => {
      setUsers(prev => prev.filter(u => u !== user));
    });

    return () => {
      // Clean up socket listeners
      socket.off('newMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, [username]);

  const fetchChats = async () => {
    try {
      const response = await getMessages();
      setChats(response.data.chats);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit('sendMessage', newMessage);
    setNewMessage('');
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="chat-hub-container">
      {!isConnected && (
        <div className="connection-error">
          <h3>{connectionError}</h3>
          <button onClick={() => socket.connect()}>
            Try to Connect
          </button>
        </div>
      )}
      {isConnected && (
        <>
          <div className="chat-sidebar">
            <div className="chat-header">
              <h2>Chat Hub</h2>
              <p>Real-time Community Chat</p>
            </div>
            <div className="user-list">
              <h3>Active Users</h3>
              {users.map((user) => (
                <div key={user} className="user-item">
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-main">
            <div className="message-list">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.user === username ? 'user' : ''}`}
                >
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <div className="message-meta">
                      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="message-actions">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                  disabled={!isConnected}
                />
                <button type="submit" className="send-button" disabled={!isConnected}>
                  {isConnected ? 'Send' : 'Connecting...'}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHub;
