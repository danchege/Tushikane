import React from 'react';
import '@/styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="container">
        <div className="hero-content">
          <h1 className="home-title">About Tushikane</h1>
          <p className="home-mission">
            Empowering Communities Through Collaboration and Action
          </p>
        </div>

        <section>
          <h2>Our Mission</h2>
          <p>
            Tushikane is dedicated to improving the lives of people in Bahati, Nakuru County through community-driven
            initiatives, education, healthcare, and sustainable development programs.
          </p>
        </section>

        <section>
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Community First</h3>
              <p>
                Listening to and working with the community to identify and address their needs
              </p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>
                Implementing solutions that create lasting positive change
              </p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>
                Clear communication and accountability in all our initiatives
              </p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                Using creative approaches to solve community challenges
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Impact</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>1,500+</h3>
              <p>People Helped</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>25+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-smile"></i>
              </div>
              <h3>100%</h3>
              <p>Community Satisfaction</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <img src="/images/team/CEO.jpeg" alt="CEO" />
              </div>
              <h3>John Smith</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-card">
              <div className="team-image">
                <img src="/images/team/financial advisor.jpeg" alt="Financial Advisor" />
              </div>
              <h3>Jane Doe</h3>
              <p>Financial Advisor</p>
            </div>
            <div className="team-card">
              <div className="team-image">
                <img src="/images/team/marketting officer.jpeg" alt="Marketing Officer" />
              </div>
              <h3>Mike Johnson</h3>
              <p>Marketing Officer</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Our Partners</h2>
          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-image">
                <img src="/images/patners/community_foundation.jpeg" alt="Community Foundation" />
              </div>
              <h3>Community Foundation</h3>
            </div>
            <div className="partner-card">
              <div className="partner-image">
                <img src="/images/patners/local_government.jpeg" alt="Local Government" />
              </div>
              <h3>Local Government</h3>
            </div>
            <div className="partner-card">
              <div className="partner-image">
                <img src="/images/patners/NGO.jpeg" alt="NGO" />
              </div>
              <h3>NGOs</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
