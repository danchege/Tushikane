import React from 'react';
import DonationForm from '../components/DonationForm';
import '../components/DonationForm.css';

const Donors = () => {
  // Sample donation projects (to be replaced with API data)
  const donationProjects = [
    {
      name: 'Clean Water Initiative',
      description: 'Provide clean water to rural communities',
      target: '500,000 KES',
      raised: '250,000 KES',
      progress: 50
    },
    {
      name: 'Education Support',
      description: 'Fund education for underprivileged children',
      target: '300,000 KES',
      raised: '150,000 KES',
      progress: 50
    },
    {
      name: 'Healthcare Outreach',
      description: 'Expand mobile healthcare services',
      target: '200,000 KES',
      raised: '100,000 KES',
      progress: 50
    }
  ];

  return (
    <div className="donors-container">
      <div className="container">
        <h1>Donate</h1>
        <p className="page-description">Support our community initiatives with your generous donation</p>

        <div className="donation-projects">
          <h2>Current Projects</h2>
          <div className="project-progress-grid">
            {donationProjects.map((project, index) => (
              <div key={index} className="project-progress">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${project.progress}%` }}></div>
                </div>
                <p className="progress-text">
                  {project.raised} raised of {project.target} goal
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="donation-form-section">
          <h2>Make a Donation</h2>
          <DonationForm />
        </div>

        <div className="donation-stats">
          <div className="stat-card">
            <h3>Total Donations</h3>
            <p className="stat-number">5,000,000 KES</p>
          </div>
          <div className="stat-card">
            <h3>Donors</h3>
            <p className="stat-number">200</p>
          </div>
          <div className="stat-card">
            <h3>Projects Funded</h3>
            <p className="stat-number">15</p>
          </div>
        </div>

        <div className="donation-impact">
          <h2>Your Donation Makes a Difference</h2>
          <div className="impact-cards">
            <div className="impact-card">
              <h3>100 KES</h3>
              <p>Provides clean water for 10 families</p>
            </div>
            <div className="impact-card">
              <h3>500 KES</h3>
              <p>Supports education for 5 children</p>
            </div>
            <div className="impact-card">
              <h3>1,000 KES</h3>
              <p>Funds healthcare services for 20 people</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donors;
