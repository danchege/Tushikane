import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image || '/default-project.jpg'} alt={project.name} />
      </div>
      <h3>{project.name}</h3>
      <p className="project-status" style={{ color: project.status === 'active' ? '#4caf50' : '#f44336' }}>
        {project.status}
      </p>
      <p className="project-description">{project.description}</p>
      <div className="project-stats">
        <span>🎯 {project.target} people</span>
        <span>💰 {project.budget} KES</span>
      </div>
      <div className="project-actions">
        <button className="view-details">View Details</button>
        <button className="donate">Donate</button>
      </div>
    </div>
  );
};

export default ProjectCard;
