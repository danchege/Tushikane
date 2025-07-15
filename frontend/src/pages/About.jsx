import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <div className="container">
        <section className="about-hero">
          <h1>About Tushikane</h1>
          <p className="hero-tagline">Empowering Communities Through Collaboration and Action</p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            Tushikane is dedicated to improving the lives of people in Bahati, Nakuru County through community-driven
            initiatives, education, healthcare, and sustainable development programs.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Community First</h3>
              <p>Listening to and working with the community to identify and address their needs</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>Implementing solutions that create lasting positive change</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Clear communication and accountability in all our initiatives</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Using creative approaches to solve community challenges</p>
            </div>
          </div>
        </section>

        <section className="about-impact">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <h3>1,500+</h3>
              <p>People Helped</p>
            </div>
            <div className="stat-card">
              <h3>25+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Volunteers Engaged</p>
            </div>
            <div className="stat-card">
              <h3>5M+</h3>
              <p>KES Raised</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-image">
                <img src="/team/ceo.jpg" alt="CEO" />
              </div>
              <h3>John Smith</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/team/cfo.jpg" alt="CFO" />
              </div>
              <h3>Jane Doe</h3>
              <p>Chief Financial Officer</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/team/cmo.jpg" alt="CMO" />
              </div>
              <h3>Mike Johnson</h3>
              <p>Chief Marketing Officer</p>
            </div>
          </div>
        </section>

        <section className="about-partners">
          <h2>Our Partners</h2>
          <div className="partners-grid">
            <div className="partner-logo">
              <img src="/partners/partner1.png" alt="Partner 1" />
            </div>
            <div className="partner-logo">
              <img src="/partners/partner2.png" alt="Partner 2" />
            </div>
            <div className="partner-logo">
              <img src="/partners/partner3.png" alt="Partner 3" />
            </div>
            <div className="partner-logo">
              <img src="/partners/partner4.png" alt="Partner 4" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
