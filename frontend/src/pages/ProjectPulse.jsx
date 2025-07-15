import React from 'react';
import ProjectCard from '../components/ProjectCard';
import '../components/ProjectCard.css';

const ProjectPulse = () => {
  // Sample project data (to be replaced with API data)
  const projects = [
    {
      name: 'Clean Water Initiative',
      status: 'active',
      description: 'Providing clean water solutions to rural areas',
      target: '1000',
      budget: '500,000',
      image: '/projects/water.jpg'
    },
    {
      name: 'Education Support Program',
      status: 'active',
      description: 'Supporting education for underprivileged children',
      target: '500',
      budget: '300,000',
      image: '/projects/education.jpg'
    },
    {
      name: 'Healthcare Outreach',
      status: 'completed',
      description: 'Mobile healthcare services in remote areas',
      target: '200',
      budget: '200,000',
      image: '/projects/healthcare.jpg'
    }
  ];

  return (
    <div className="project-pulse-container">
      <div className="container">
        <h1>Project Pulse</h1>
        <p className="page-description">Track and monitor ongoing community projects</p>
        
        <div className="project-filters">
          <select className="status-filter">
            <option value="all">All Projects</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <input type="text" placeholder="Search projects..." className="search-input" />
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="project-stats">
          <div className="stat-card">
            <h3>Active Projects</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="stat-card">
            <h3>People Helped</h3>
            <p className="stat-number">1700</p>
          </div>
          <div className="stat-card">
            <h3>Funds Raised</h3>
            <p className="stat-number">1,000,000 KES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPulse;
