import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../services/api';
import '@/styles/ChatHub.css';

const ChatHub = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
    fetchChats();
    const interval = setInterval(fetchChats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchChats = async () => {
    try {
      const response = await getMessages();
      setChats(response.data.chats);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      await sendMessage({
        chatId: activeChat,
        content: newMessage,
        sender: 'user'
      });
      setNewMessage('');
      fetchChats();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="chat-hub-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <h2>Chat Hub</h2>
          <p>Community Communication Center</p>
        </div>
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="chat-avatar">
                {chat.name[0]}
              </div>
              <div className="chat-info">
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="unread-badge">{chat.unread}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>Current Chat</h2>
          <div className="chat-actions">
            <button className="action-button" onClick={() => setActiveChat(null)}>
              <span>🔍</span> New Chat
            </button>
            <button className="action-button">
              <span>💾</span> Save Chat
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'other'}`}
            >
              <div className="message-bubble">
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-meta">
                  <span className="timestamp">{message.timestamp}</span>
                  <div className="message-actions">
                    <button className="action-icon" onClick={() => handleCopy(message.content)}>
                      📋
                    </button>
                    <button className="action-icon" onClick={() => handleReply(message.content)}>
                      🔍
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>

        <div className="chat-input">
          <form onSubmit={handleSendMessage}>
            <div className="input-container">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type your message..."
                disabled={!activeChat}
              />
              <div className="input-actions">
                <button type="button" className="action-icon" onClick={handleEmoji}>
                  😊
                </button>
                <button type="button" className="action-icon" onClick={handleFile}>
                  📎
                </button>
              </div>
            </div>
            <button type="submit" disabled={!newMessage.trim() || !activeChat}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatHub;
