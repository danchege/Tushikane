import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socket } from '../services/WebSocketService';
import { getMessages } from '../services/api';
import '../styles/ChatHub.css';

// Full ChatHub with real-time messaging and modern UI
const ChatHub = () => {
  const [username, setUsername] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [tempUsername, setTempUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messageInputRef = React.useRef(null);

  useEffect(() => {
    if (!username) return;

    // Fetch chat history on join
    getMessages().then(res => {
      if (res && res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
      }
    }).catch(err => {
      console.error('Failed to fetch chat history:', err);
    });

    // Handle connection status
    socket.on('connect', () => {
      setIsConnected(true);
      if (username) {
        socket.emit('joinChat', username);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
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
      socket.off('newMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [username]);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setShowUsernameModal(false);
      // Connect to socket after username is set
      socket.connect();
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
  };

  return (
    <div className="chat-hub-container">
      {showUsernameModal && (
        <div className="username-modal-overlay">
          <div className="username-modal">
            <h2>Enter your chat username</h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={tempUsername}
                onChange={e => setTempUsername(e.target.value)}
                placeholder="Your name..."
                autoFocus
              />
              <button type="submit">Join Chat</button>
            </form>
          </div>
        </div>
      )}
      {!showUsernameModal && (
        <>
          {/* Chat Sidebar */}
          <div className="chat-sidebar">
            <div className="chat-header">
              <h2>Chat Hub</h2>
              <p>Real-time Community Chat</p>
            </div>
          </div>
          {/* Chat Main Area */}
          <div className="chat-main">
            {/* Messages Area */}
            <div className="message-list">
              {messages.map((message, index) => {
                const isUser = message.user === username;
                return (
                  <div
                    key={index}
                    className={`message${isUser ? ' user' : ' other'}`}
                  >
                    <div className="message-bubble">
                      <div className="message-header">
                        <span className={`message-username${isUser ? ' self' : ''}`}>{message.user}</span>
                        <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="message-content">
                        {message.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Message Input */}
            <div className="message-actions">
              <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Type a message..."
                  ref={messageInputRef}
                  className="message-input"
                />
                <button
                  type="submit"
                  disabled={!username || !newMessage.trim()}
                  className="send-button"
                >
                  Send
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
