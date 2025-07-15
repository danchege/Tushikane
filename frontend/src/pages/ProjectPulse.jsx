import React, { useState, useEffect } from 'react';
import { ProjectCard } from '../components';
import {
  getProjects,
  getDonationStats
} from '../services/api';

const ProjectPulse = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    activeProjects: 0,
    completedProjects: 0,
    totalRaised: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await getDonationStats();
        setStats({
          activeProjects: response.data.totalDonors,
          completedProjects: response.data.donationsByProject.length,
          totalRaised: response.data.totalDonations.totalAmount
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchProjects();
    fetchStats();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filters.status !== 'all' && project.status !== filters.status) return false;
    if (filters.category !== 'all' && project.category !== filters.category) return false;
    return true;
  });

  return (
    <div className="project-pulse-container">
      <div className="container">
        <h1>Project Pulse</h1>
        <div className="project-stats">
          <div className="stat-card">
            <h3>People Helped</h3>
            <p className="stat-number">1700</p>
          </div>
          <div className="stat-card">
            <h3>Funds Raised</h3>
            <p className="stat-number">KES 5,000,000</p>
          </div>
        </div>

        <div className="filters">
          <select
            className="status-filter"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="planned">Planned</option>
          </select>
          <select
            className="category-filter"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="water">Water</option>
            <option value="community">Community</option>
          </select>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
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
