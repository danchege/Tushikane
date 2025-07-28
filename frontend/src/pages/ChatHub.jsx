import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socket } from '../services/WebSocketService';
import { getMessages } from '../services/api';

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
    <div style={{ 
      marginTop: '70px',
      display: 'flex',
      height: 'calc(100vh - 70px)',
      background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
      padding: '1.5rem',
      position: 'relative',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
    }}>
      {showUsernameModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            padding: '2.5rem 2rem 2rem 2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            textAlign: 'center',
            minWidth: '320px'
          }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700', letterSpacing: '1px' }}>Enter your chat username</h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={tempUsername}
                onChange={e => setTempUsername(e.target.value)}
                placeholder="Your name..."
                autoFocus
                style={{
                  width: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  marginBottom: '1.25rem',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              <button type="submit" style={{
                background: '#fff',
                color: '#2575fc',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>Join Chat</button>
            </form>
          </div>
        </div>
      )}
      
      {!showUsernameModal && (
        <>
          {/* Chat Sidebar */}
          <div style={{
            width: '320px',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            borderRadius: '1.25rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '2rem 1.5rem',
            marginRight: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
          }}>
            <div style={{
              padding: '1rem 0 1.5rem 0',
              borderBottom: '2px solid rgba(255,255,255,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Chat Hub</h2>
              <p style={{ color: '#e0f7fa', fontSize: '1rem' }}>Real-time Community Chat</p>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0 0 0' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Active Users</h3>
              {users.map((user) => (
                <div key={user} style={{
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255,255,255,0.10)',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}>
                  <span style={{ color: '#fff', fontSize: '1rem', fontWeight: '600' }}>{user}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Main Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
            borderRadius: '1.25rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '2rem 2rem 1.5rem 2rem',
            minWidth: 0
          }}>
            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {messages.map((message, index) => {
                const isUser = message.user === username;
                return (
                <div
                  key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                      marginLeft: isUser ? 'auto' : 0,
                      marginRight: isUser ? 0 : 'auto',
                      width: '100%',
                      marginBottom: '0.7rem',
                    }}
                  >
                    <span style={{
                      fontWeight: 600,
                      color: isUser ? '#128C7E' : '#6b7280',
                      marginBottom: '0.2rem',
                      fontSize: '0.93rem',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                    }}>{message.user}</span>
                    <div style={{
                      maxWidth: '70%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: isUser ? '1.1rem 0.5rem 1.1rem 1.1rem' : '0.5rem 1.1rem 1.1rem 1.1rem',
                      background: isUser ? '#dcf8c6' : '#fff',
                      color: '#222',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                      fontSize: '1rem',
                      marginLeft: isUser ? 'auto' : 0,
                      marginRight: isUser ? 0 : 'auto',
                      border: isUser ? '1px solid #b2dfdb' : '1px solid #eee',
                    }}>
                      <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', wordBreak: 'break-word' }}>
                        {message.content}
                      </p>
                      <div style={{
                        marginTop: '0.4rem',
                        fontSize: '0.8rem',
                        color: '#888',
                        display: 'flex',
                        justifyContent: isUser ? 'flex-end' : 'flex-start',
                      }}>
                      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div style={{ position: 'relative', marginTop: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Type a message..."
                  ref={messageInputRef}
                  style={{
                    flex: 1,
                    padding: '1.1rem 1.5rem',
                    border: '2px solid #f6d365',
                    borderRadius: '2.5rem',
                    fontSize: '1.1rem',
                    outline: 'none',
                    background: '#fffbe7',
                    color: '#333',
                    boxShadow: '0 2px 12px rgba(246, 211, 101, 0.10)'
                  }}
                />
                <button 
                  type="submit" 
                  disabled={!username || !newMessage.trim()}
                  style={{
                    background: 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.95rem 2.2rem',
                    borderRadius: '2.5rem',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 12px rgba(37,117,252,0.10)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.background = 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)';
                      e.target.style.transform = 'translateY(-2px) scale(1.05)';
                      e.target.style.boxShadow = '0 4px 18px rgba(37,117,252,0.18)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.background = 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 2px 12px rgba(37,117,252,0.10)';
                    }
                  }}
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
