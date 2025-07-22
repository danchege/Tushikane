import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <img src="/images/logo/tushikane_logo.png" alt="Tushikane Logo" className="logo-image" />
          <h1 className="home-title">Welcome to Tushikane</h1>
          <p className="home-mission">
            Empowering the Bahati, Nakuru County community through collaboration, compassion, and action.
          </p>
          <Link to="/about" className="cta-button">Learn More</Link>
        </div>
      </section>
      <section className="stats-section">
        <div className="stat">
          <h2>25+</h2>
          <p>Ongoing Projects</p>
        </div>
        <div className="stat">
          <h2>100+</h2>
          <p>Active Volunteers</p>
        </div>
        <div className="stat">
          <h2>500+</h2>
          <p>Beneficiaries</p>
        </div>
      </section>
      <section className="quick-links-section">
        <h3>Quick Links</h3>
        <div className="quick-links">
          <Link to="/volunteers">Become a Volunteer</Link>
          <Link to="/donors">Donate</Link>
          <Link to="/projectpulse">Project Pulse</Link>
          <Link to="/chathub">Join Chat Hub</Link>
        </div>
      </section>
      <section className="testimonials-section">
        <h3>What Our Community Says</h3>
        <div className="testimonials">
          <blockquote>
            "Tushikane has changed my life. The support and sense of community is amazing!"
            <span>- Mary, Beneficiary</span>
          </blockquote>
          <blockquote>
            "Volunteering here is so rewarding. I see real impact every day."
            <span>- John, Volunteer</span>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Home; 