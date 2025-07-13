import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span className="footer-logo">Tushikane</span>
      <span className="footer-copy">&copy; {new Date().getFullYear()} Tushikane. All rights reserved.</span>
      <div className="footer-social">
        {/* Social icons placeholder */}
        <span>Socials</span>
      </div>
    </div>
  </footer>
);

export default Footer; 