import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo/tushikane_logo.png" alt="Tushikane Logo" className="logo-image" />
        </Link>
      </div>
      <button
        className="navbar-menu-btn"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        <li><Link to="/projectpulse" onClick={handleLinkClick}>Project Pulse</Link></li>
        <li><Link to="/volunteers" onClick={handleLinkClick}>Volunteers</Link></li>
        <li><Link to="/donors" onClick={handleLinkClick}>Donors</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        <li><Link to="/chathub" onClick={handleLinkClick}>Chat Hub</Link></li>
        <li><Link to="/admin" onClick={handleLinkClick}>Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 