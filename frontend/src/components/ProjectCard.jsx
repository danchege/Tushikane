import React from 'react';
import '@/components/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const getCategoryColor = (category) => {
    const colors = {
      education: '#2196f3',
      healthcare: '#4caf50',
      water: '#00bcd4',
      community: '#9c27b0'
    };
    return colors[category] || '#9e9e9e';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      education: '🎓',
      healthcare: '🏥',
      water: '💧',
      community: '👥'
    };
    return icons[category] || '✨';
  };

  const getCategoryStats = (category) => {
    const stats = {
      education: [
        { label: 'Students', value: project.target || 0 },
        { label: 'Budget', value: `${project.budget || 0} KES` }
      ],
      healthcare: [
        { label: 'Patients', value: project.target || 0 },
        { label: 'Funds', value: `${project.budget || 0} KES` }
      ],
      water: [
        { label: 'Beneficiaries', value: project.target || 0 },
        { label: 'Cost', value: `${project.budget || 0} KES` }
      ],
      community: [
        { label: 'Community Members', value: project.target || 0 },
        { label: 'Investment', value: `${project.budget || 0} KES` }
      ]
    };
    return stats[category] || stats.education;
  };

  return (
    <div className={`project-card ${project.category}`}>
      <div className="project-image">
        <img src={project.image || '/default-project.jpg'} alt={project.name} />
      </div>
      <div className="project-category" style={{ backgroundColor: getCategoryColor(project.category) }}>
        {project.category}
      </div>
      <div className="project-icon">{getCategoryIcon(project.category)}</div>
      <h3>{project.name}</h3>
      <p className="project-status" style={{ color: project.status === 'active' ? '#4caf50' : '#f44336' }}>
        {project.status}
      </p>
      <p className="project-description">{project.description}</p>
      <div className="project-stats">
        {getCategoryStats(project.category).map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-number">{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="project-actions">
        <button className="view-details">View Details</button>
        <button className="donate">Donate</button>
      </div>
    </div>
  );
};

export default ProjectCard;
