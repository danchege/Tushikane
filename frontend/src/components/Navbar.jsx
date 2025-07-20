import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">
        <img src="/images/logo/tushikane_logo.png" alt="Tushikane Logo" className="logo-image" />
      </Link>
    </div>
    <ul className="navbar-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/projectpulse">Project Pulse</Link></li>
      <li><Link to="/volunteers">Volunteers</Link></li>
      <li><Link to="/donors">Donors</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/chathub">Chat Hub</Link></li>
      <li><Link to="/admin">Admin</Link></li>
    </ul>
  </nav>
);

export default Navbar; 