import React from 'react';

const ChatHub = () => {
  return (
    <div className="chat-hub">
      <h2>Community Chat Hub</h2>
      <div className="chat-messages">
        {/* Messages will be displayed here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatHub;
