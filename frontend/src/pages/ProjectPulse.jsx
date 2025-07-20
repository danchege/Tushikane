import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import '@/styles/ProjectPulse.css';
import '@/components/ProjectCard.css';
import {
  getProjects,
  getDonationStats,
  getProjectStats
} from '../services/api';
import { socket, listenForStatsUpdates } from '../services/WebSocketService';

const ProjectPulse = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    activeProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    educationProjects: 0,
    healthcareProjects: 0,
    waterProjects: 0,
    communityProjects: 0,
    totalPeopleHelped: 0,
    totalMoneyRaised: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });
  const [activeCard, setActiveCard] = useState('active-projects');

  const statsCards = [
    {
      id: 'active-projects',
      icon: '🎯',
      title: 'Active Projects',
      value: stats.activeProjects,
      label: 'Projects'
    },
    {
      id: 'ongoing-projects',
      icon: '⏳',
      title: 'Ongoing Projects',
      value: stats.ongoingProjects,
      label: 'Projects'
    },
    {
      id: 'people-helped',
      icon: '👥',
      title: 'People Helped',
      value: stats.peopleHelped,
      label: 'People'
    },
    {
      id: 'money-raised',
      icon: '💰',
      title: 'Money Raised',
      value: stats.totalRaised,
      label: 'KES'
    }
  ];

  const categoryCards = [
    {
      id: 'education',
      icon: '🎓',
      title: 'Education',
      description: 'Projects focused on education and learning'
    },
    {
      id: 'healthcare',
      icon: '🏥',
      title: 'Healthcare',
      description: 'Projects focused on healthcare and medical services'
    },
    {
      id: 'water',
      icon: '💧',
      title: 'Water',
      description: 'Projects focused on water and sanitation'
    },
    {
      id: 'community',
      icon: '👥',
      title: 'Community',
      description: 'Projects focused on community development'
    }
  ];

  const getCategoryCount = (category) => {
    return projects.filter(project => 
      project.category === category
    ).length;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
        fetchStats(); // Fetch stats after projects are loaded
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await getProjectStats();
        setStats({
          activeProjects: response.data.activeProjects,
          ongoingProjects: response.data.ongoingProjects,
          peopleHelped: response.data.peopleHelped,
          totalRaised: response.data.moneyRaised
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const handleStatsUpdate = (updatedStats) => {
      fetchStats(); // Fetch fresh stats when update is received
    };

    listenForStatsUpdates(handleStatsUpdate);

    fetchProjects();

    // Set up interval to refresh stats every minute
    const interval = setInterval(fetchStats, 60000);

    return () => {
      clearInterval(interval);
      socket.off('statsUpdated'); // Cleanup socket listener
    };
  }, []);

  const filteredProjects = projects;

  return (
    <div className="project-pulse">
      <div className="project-pulse-header">
        <h1 className="project-pulse-title">Project Pulse</h1>
        <div className="project-stats">
          {statsCards.map((card) => (
            <div
              key={card.id}
              className={`stat-card ${activeCard === card.id ? 'active' : ''}`}
              onClick={() => setActiveCard(card.id)}
              style={{ borderColor: activeCard === card.id ? '#4caf50' : 'transparent' }}
            >
              <div className="stat-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <div className="stat-number">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="category-cards">
          {categoryCards.map((card) => (
            <div
              key={card.id}
              className={`category-card ${filters.category === card.id ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, category: card.id })}
              style={{ borderColor: filters.category === card.id ? '#2196f3' : 'transparent' }}
            >
              <div className="category-count">
                <span>{getCategoryCount(card.id)}</span>
              </div>
              <div className="category-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>



        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPulse;
