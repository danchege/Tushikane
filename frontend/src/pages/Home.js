import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-placeholder">Logo/Image</div>
          <h1 className="home-title">Welcome to Tushikane</h1>
          <p className="home-mission">
            Empowering the Bahati, Nakuru County community through collaboration, compassion, and action.
          </p>
          <a href="/about" className="cta-button">Learn More</a>
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
          <a href="/volunteers">Become a Volunteer</a>
          <a href="/donors">Donate</a>
          <a href="/projectpulse">Project Pulse</a>
          <a href="/chathub">Join Chat Hub</a>
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