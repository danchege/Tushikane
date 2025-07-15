import React from 'react';

const VolunteerCard = ({ volunteer }) => {
  return (
    <div className="volunteer-card">
      <div className="volunteer-profile">
        <img src={volunteer.avatar || '/default-avatar.jpg'} alt={volunteer.name} />
      </div>
      <h3>{volunteer.name}</h3>
      <p className="volunteer-role">{volunteer.role}</p>
      <p className="volunteer-skills">Skills: {volunteer.skills.join(', ')}</p>
      <div className="volunteer-stats">
        <span>Projects: {volunteer.projects}</span>
        <span>Hours: {volunteer.hours}</span>
      </div>
      <div className="volunteer-actions">
        <button className="message">Message</button>
        <button className="connect">Connect</button>
      </div>
    </div>
  );
};

export default VolunteerCard;
