import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import WOW from 'wow.js';

const About = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="about-container">
      <div className="container">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-hero wow fadeInUp"
        >
          <div className="hero-content">
            <motion.h1 variants={itemVariants}>About Tushikane</motion.h1>
            <motion.p variants={itemVariants} className="hero-tagline">
              Empowering Communities Through Collaboration and Action
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-mission wow fadeInUp"
        >
          <div className="mission-content">
            <motion.h2 variants={itemVariants}>Our Mission</motion.h2>
            <motion.p variants={itemVariants}>
              Tushikane is dedicated to improving the lives of people in Bahati, Nakuru County through community-driven
              initiatives, education, healthcare, and sustainable development programs.
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-values wow fadeInUp"
        >
          <div className="values-content">
            <motion.h2 variants={itemVariants}>Our Core Values</motion.h2>
            <div className="values-grid">
              <motion.div variants={itemVariants} className="value-card">
                <motion.h3 variants={itemVariants}>Community First</motion.h3>
                <motion.p variants={itemVariants}>
                  Listening to and working with the community to identify and address their needs
                </motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="value-card">
                <motion.h3 variants={itemVariants}>Sustainability</motion.h3>
                <motion.p variants={itemVariants}>
                  Implementing solutions that create lasting positive change
                </motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="value-card">
                <motion.h3 variants={itemVariants}>Transparency</motion.h3>
                <motion.p variants={itemVariants}>
                  Clear communication and accountability in all our initiatives
                </motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="value-card">
                <motion.h3 variants={itemVariants}>Innovation</motion.h3>
                <motion.p variants={itemVariants}>
                  Using creative approaches to solve community challenges
                </motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="value-card">
                <motion.h3 variants={itemVariants}>Mike Johnson</motion.h3>
                <motion.p variants={itemVariants}>Chief Marketing Officer</motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-impact wow fadeInUp"
        >
          <div className="impact-content">
            <motion.h2 variants={itemVariants}>Our Impact</motion.h2>
            <div className="impact-grid">
              <motion.div variants={itemVariants} className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-users"></i>
                </div>
                <motion.h3 variants={itemVariants}>1,500+</motion.h3>
                <motion.p variants={itemVariants}>People Helped</motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-building"></i>
                </div>
                <motion.h3 variants={itemVariants}>25+</motion.h3>
                <motion.p variants={itemVariants}>Projects Completed</motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="impact-card">
                <div className="impact-icon">
                  <i className="fas fa-smile"></i>
                </div>
                <motion.h3 variants={itemVariants}>100%</motion.h3>
                <motion.p variants={itemVariants}>Community Satisfaction</motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-team wow fadeInUp"
        >
          <div className="team-content">
            <motion.h2 variants={itemVariants}>Our Team</motion.h2>
            <div className="team-grid">
              <motion.div variants={itemVariants} className="team-card">
                <div className="team-image">
                  <motion.img variants={itemVariants} src="/team/ceo.jpg" alt="CEO" />
                </div>
                <motion.h3 variants={itemVariants}>John Smith</motion.h3>
                <motion.p variants={itemVariants}>Founder & CEO</motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="team-card">
                <div className="team-image">
                  <motion.img variants={itemVariants} src="/team/cfo.jpg" alt="CFO" />
                </div>
                <motion.h3 variants={itemVariants}>Jane Doe</motion.h3>
                <motion.p variants={itemVariants}>Chief Financial Officer</motion.p>
              </motion.div>
              <motion.div variants={itemVariants} className="team-card">
                <div className="team-image">
                  <motion.img variants={itemVariants} src="/team/cmo.jpg" alt="CMO" />
                </div>
                <motion.h3 variants={itemVariants}>Mike Johnson</motion.h3>
                <motion.p variants={itemVariants}>Chief Marketing Officer</motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="about-partners wow fadeInUp"
        >
          <div className="partners-content">
            <motion.h2 variants={itemVariants}>Our Partners</motion.h2>
            <div className="partners-grid">
              <motion.div variants={itemVariants} className="partner-card">
                <div className="partner-image">
                  <motion.img variants={itemVariants} src="/partners/partner1.png" alt="Partner 1" />
                </div>
                <motion.h3 variants={itemVariants}>Community Foundation</motion.h3>
              </motion.div>
              <motion.div variants={itemVariants} className="partner-card">
                <div className="partner-image">
                  <motion.img variants={itemVariants} src="/partners/partner2.png" alt="Partner 2" />
                </div>
                <motion.h3 variants={itemVariants}>Local Government</motion.h3>
              </motion.div>
              <motion.div variants={itemVariants} className="partner-card">
                <div className="partner-image">
                  <motion.img variants={itemVariants} src="/partners/partner3.png" alt="Partner 3" />
                </div>
                <motion.h3 variants={itemVariants}>NGOs</motion.h3>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
