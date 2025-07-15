import React, { useState, useEffect } from 'react';
import { DonationForm } from '../components/DonationForm';
import '@/styles/Donors.css';
import {
  getDonations,
  getDonationsByProject,
  getDonationStats
} from '../services/api';

const Donors = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    projectsFunded: 0
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getDonationStats();
        setStats({
          totalDonations: response.data.totalDonations.totalAmount,
          totalDonors: response.data.totalDonations.totalDonors,
          projectsFunded: response.data.donationsByProject.length
        });

        // Get all projects with their donations
        const projectsResponse = await getDonationsByProject();
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const handleDonate = async () => {
    if (!selectedProject || !donationAmount) {
      alert('Please select a project and enter an amount');
      return;
    }

    setIsSubmitting(true);
    try {
      const donation = {
        amount: parseFloat(donationAmount),
        project: selectedProject,
        donorName: 'Anonymous', // This would be from user session in real app
        email: 'anonymous@example.com' // This would be from user session in real app
      };

      await createDonation(donation);
      setSuccessMessage('Thank you for your donation!');
      setDonationAmount('');
      setSelectedProject(null);
    } catch (error) {
      console.error('Error donating:', error);
      setSuccessMessage('Error processing donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donors-container">
      <div className="container">
        <h1>Donors</h1>
        <div className="donation-stats">
          <div className="stat-card">
            <h3>Total Donations</h3>
            <p>KES {stats.totalDonations.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Donors</h3>
            <p>{stats.totalDonors}</p>
          </div>
          <div className="stat-card">
            <h3>Projects Funded</h3>
            <p>{stats.projectsFunded}</p>
          </div>
        </div>

        <div className="donation-projects">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <img src={project.image || '/default-project.jpg'} alt={project.name} className="project-image" />
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(project.raised / project.target) * 100}%` }}
                ></div>
              </div>
              <div className="progress-info">
                <span className="raised">Raised: KES {project.raised.toLocaleString()}</span>
                <span className="target">Target: KES {project.target.toLocaleString()}</span>
              </div>
              <button
                className="donate-button"
                onClick={() => handleProjectSelect(project._id)}
              >
                Donate to {project.name}
              </button>
            </div>
          ))}
        </div>

        <div className="donation-form-section">
          <h2>Make a Donation</h2>
          <div className="donation-form">
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter donation amount"
                disabled={!selectedProject}
              />
            </div>
            <div className="donate-button" onClick={handleDonate} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Donate Now'}
            </div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </div>

        <div className="impact-section">
          <h2>Your Impact</h2>
          <div className="impact-cards">
            {projects.map((project) => (
              <div key={project._id} className="impact-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="impact-stats">
                  <p>Funds Raised: KES {project.raised.toLocaleString()}</p>
                  <p>Beneficiaries: {project.beneficiaries}</p>
                </div>
              </div>
            ))}
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
