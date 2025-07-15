import React from 'react';
import VolunteerCard from '../components/VolunteerCard';
import '../components/VolunteerCard.css';

const Volunteers = () => {
  // Sample volunteer data (to be replaced with API data)
  const volunteers = [
    {
      name: 'John Doe',
      role: 'Project Coordinator',
      skills: ['Project Management', 'Community Outreach', 'Event Planning'],
      projects: 5,
      hours: 150,
      avatar: '/avatars/john.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Education Mentor',
      skills: ['Teaching', 'Tutoring', 'Youth Development'],
      projects: 3,
      hours: 100,
      avatar: '/avatars/jane.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Healthcare Volunteer',
      skills: ['First Aid', 'Health Education', 'Community Support'],
      projects: 4,
      hours: 120,
      avatar: '/avatars/mike.jpg'
    }
  ];

  return (
    <div className="volunteers-container">
      <div className="container">
        <h1>Become a Volunteer</h1>
        <p className="page-description">Join our community of dedicated volunteers making a difference</p>

        <div className="volunteer-stats">
          <div className="stat-card">
            <h3>Active Volunteers</h3>
            <p className="stat-number">50</p>
          </div>
          <div className="stat-card">
            <h3>Projects Completed</h3>
            <p className="stat-number">25</p>
          </div>
          <div className="stat-card">
            <h3>Hours Contributed</h3>
            <p className="stat-number">1,500</p>
          </div>
        </div>

        <div className="volunteer-grid">
          {volunteers.map((volunteer, index) => (
            <VolunteerCard key={index} volunteer={volunteer} />
          ))}
        </div>

        <div className="become-volunteer-section">
          <h2>Join Our Team</h2>
          <p>Ready to make a difference in your community? Join our volunteer program today!</p>
          <button className="become-volunteer-button">Apply to Volunteer</button>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
