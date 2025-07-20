import React, { useState, useEffect } from 'react';
import { 
  getProjects, 
  createProject, 
  getVolunteers, 
  createVolunteer as addVolunteer, 
  getDonations as getDonors, 
  createDonation as addDonor,
  updateProjectStats
} from '../services/api';
import { socket, emitStatsUpdate } from '../services/WebSocketService';
import '@/styles/Admin.css';

const Admin = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donors, setDonors] = useState([]);
  // Project pulse statistics
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
  
  // Project form state
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTarget, setProjectTarget] = useState(0);
  
  // Volunteer form state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerSkills, setVolunteerSkills] = useState('');
  
  // Donor form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorAmount, setDonorAmount] = useState(0);

  useEffect(() => {
    fetchData();
    
    // Listen for statistics updates
    socket.on('statsUpdated', (updatedStats) => {
      setStats(updatedStats);
    });

    return () => {
      socket.off('statsUpdated');
    };
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [projectsRes, volunteersRes, donorsRes] = await Promise.all([
        getProjects(),
        getVolunteers(),
        getDonors()
      ]);
      setProjects(projectsRes.data);
      setVolunteers(volunteersRes.data);
      setDonors(donorsRes.data);

      // Calculate initial statistics
      const stats = projectsRes.data.reduce((acc, project) => {
        if (project.status === 'planned') acc.activeProjects++;
        if (project.status === 'ongoing') acc.ongoingProjects++;
        if (project.status === 'completed') acc.completedProjects++;
        
        switch (project.category) {
          case 'education':
            acc.educationProjects++;
            break;
          case 'healthcare':
            acc.healthcareProjects++;
            break;
          case 'water':
            acc.waterProjects++;
            break;
          case 'community':
            acc.communityProjects++;
            break;
        }
        
        acc.totalPeopleHelped += project.stats?.peopleHelped || 0;
        acc.totalMoneyRaised += project.stats?.moneyRaised || 0;
        
        return acc;
      }, {
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

      setStats(stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        name: projectName,
        description: projectDescription,
        target: projectTarget,
        category: 'education', // Default category
        stats: {
          peopleHelped: 0,
          moneyRaised: 0
        }
      });
      setSuccessMessage('Project created successfully!');
      setShowSuccess(true);
      setProjectName('');
      setProjectDescription('');
      setProjectTarget(0);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleSubmitVolunteer = async (e) => {
    e.preventDefault();
    try {
      await addVolunteer({
        name: volunteerName,
        email: volunteerEmail,
        skills: volunteerSkills
      });
      fetchData();
      setVolunteerName('');
      setVolunteerEmail('');
      setVolunteerSkills('');
    } catch (error) {
      console.error('Error adding volunteer:', error);
    }
  };

  const handleSubmitDonor = async (e) => {
    e.preventDefault();
    try {
      await addDonor({
        name: donorName,
        email: donorEmail,
        amount: donorAmount
      });
      fetchData();
      setDonorName('');
      setDonorEmail('');
      setDonorAmount(0);
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  const updateStat = async (statType, value) => {
    try {
      await updateProjectStats({
        [statType]: value
      });
      // Notify other clients of the update
      emitStatsUpdate({
        [statType]: value
      });
      // Refresh the stats
      const response = await getProjectStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error updating stat:', error);
    }
  };

  return (
    <div className="admin-container">
      {showSuccess && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <h1>Admin Dashboard</h1>
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`} 
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`tab-button ${activeTab === 'volunteers' ? 'active' : ''}`} 
          onClick={() => setActiveTab('volunteers')}
        >
          Volunteers
        </button>
        <button 
          className={`tab-button ${activeTab === 'donors' ? 'active' : ''}`} 
          onClick={() => setActiveTab('donors')}
        >
          Donors
        </button>
        <button 
          className={`tab-button ${activeTab === 'pulse' ? 'active' : ''}`} 
          onClick={() => setActiveTab('pulse')}
        >
          Pulse
        </button>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        {activeTab === 'projects' && (
          <div>
            <h2>Add New Project</h2>
            <form onSubmit={handleProjectSubmit} className="admin-form">
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={projectDescription} 
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Target Amount</label>
                <input 
                  type="number" 
                  value={projectTarget} 
                  onChange={(e) => setProjectTarget(e.target.value)}
                  required
                />
              </div>
              <button type="submit" onClick={handleProjectSubmit} className="submit-button">Add Project</button>
            </form>

            <h2>Current Projects</h2>
            <div className="projects-list">
              {Array.isArray(projects) ? (
                projects.map((project) => (
                  <div key={project._id} className="project-card">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <p>Target: ${project.targetAmount}</p>
                  </div>
                ))
              ) : (
                <p>No projects available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div>
            <h2>Add New Volunteer</h2>
            <form onSubmit={handleSubmitVolunteer} className="admin-form">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={volunteerName} 
                  onChange={(e) => setVolunteerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={volunteerEmail} 
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <textarea 
                  value={volunteerSkills} 
                  onChange={(e) => setVolunteerSkills(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Volunteer</button>
            </form>

            <h2>Registered Volunteers</h2>
            <div className="volunteers-list">
              {volunteers.map((volunteer) => (
                <div key={volunteer._id} className="volunteer-card">
                  <h3>{volunteer.name}</h3>
                  <p>Email: {volunteer.email}</p>
                  <p>Skills: {volunteer.skills}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div>
            <h2>Donors</h2>
            <div className="donors-list">
              {donors.map((donor) => (
                <div key={donor._id} className="donor-card">
                  <h3>{donor.name}</h3>
                  <p>Email: {donor.email}</p>
                  <p>Amount: KES {donor.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pulse' && (
          <div className="pulse-container">
            <h2>Project Pulse</h2>
            
            <div className="pulse-stats">
              <div className="stat-card">
                <span className="stat-icon">🎯</span>
                <h3>Active Projects</h3>
                <div className="stat-number-container">
                  <input 
                    type="number" 
                    value={stats.activeProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, activeProjects: e.target.value }))}
                    className="stat-number-input"
                  />
                  <button 
                    onClick={() => updateStat('activeProjects', stats.activeProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="stat-label">Projects</p>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">⏳</span>
                <h3>Ongoing Projects</h3>
                <div className="stat-number-container">
                  <input 
                    type="number" 
                    value={stats.ongoingProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, ongoingProjects: e.target.value }))}
                    className="stat-number-input"
                  />
                  <button 
                    onClick={() => updateStat('ongoingProjects', stats.ongoingProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="stat-label">Projects</p>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">👥</span>
                <h3>People Helped</h3>
                <div className="stat-number-container">
                  <input 
                    type="number" 
                    value={stats.totalPeopleHelped}
                    onChange={(e) => setStats(prev => ({ ...prev, totalPeopleHelped: e.target.value }))}
                    className="stat-number-input"
                  />
                  <button 
                    onClick={() => updateStat('totalPeopleHelped', stats.totalPeopleHelped)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="stat-label">People</p>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">💰</span>
                <h3>Money Raised</h3>
                <div className="stat-number-container">
                  <input 
                    type="number" 
                    value={stats.totalMoneyRaised}
                    onChange={(e) => setStats(prev => ({ ...prev, totalMoneyRaised: e.target.value }))}
                    className="stat-number-input"
                  />
                  <button 
                    onClick={() => updateStat('totalMoneyRaised', stats.totalMoneyRaised)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="stat-label">KES</p>
              </div>
            </div>

            <div className="category-stats">
              <div className="category-card">
                <span className="category-icon">🎓</span>
                <h3>Education</h3>
                <div className="category-number-container">
                  <input 
                    type="number" 
                    value={stats.educationProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, educationProjects: e.target.value }))}
                    className="category-number-input"
                  />
                  <button 
                    onClick={() => updateStat('educationProjects', stats.educationProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="category-label">Projects focused on education and learning</p>
              </div>

              <div className="category-card">
                <span className="category-icon">🏥</span>
                <h3>Healthcare</h3>
                <div className="category-number-container">
                  <input 
                    type="number" 
                    value={stats.healthcareProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, healthcareProjects: e.target.value }))}
                    className="category-number-input"
                  />
                  <button 
                    onClick={() => updateStat('healthcareProjects', stats.healthcareProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="category-label">Projects focused on healthcare and medical services</p>
              </div>

              <div className="category-card">
                <span className="category-icon">💧</span>
                <h3>Water</h3>
                <div className="category-number-container">
                  <input 
                    type="number" 
                    value={stats.waterProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, waterProjects: e.target.value }))}
                    className="category-number-input"
                  />
                  <button 
                    onClick={() => updateStat('waterProjects', stats.waterProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="category-label">Projects focused on water and sanitation</p>
              </div>

              <div className="category-card">
                <span className="category-icon">👥</span>
                <h3>Community</h3>
                <div className="category-number-container">
                  <input 
                    type="number" 
                    value={stats.communityProjects}
                    onChange={(e) => setStats(prev => ({ ...prev, communityProjects: e.target.value }))}
                    className="category-number-input"
                  />
                  <button 
                    onClick={() => updateStat('communityProjects', stats.communityProjects)}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
                <p className="category-label">Projects focused on community development</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'donors' && (
          <div>
            <h2>Add New Donor</h2>
            <form onSubmit={handleSubmitDonor} className="admin-form">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={donorName} 
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={donorEmail} 
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Donation Amount</label>
                <input 
                  type="number" 
                  value={donorAmount} 
                  onChange={(e) => setDonorAmount(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Donor</button>
            </form>

            <h2>Recent Donors</h2>
            <div className="donors-list">
              {donors.map((donor) => (
                <div key={donor._id} className="donor-card">
                  <h3>{donor.name}</h3>
                  <p>Email: {donor.email}</p>
                  <p>Amount: ${donor.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
