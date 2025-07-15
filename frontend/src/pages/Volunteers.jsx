import React, { useState, useEffect } from 'react';
import VolunteerCard from '../components/VolunteerCard';
import '@/styles/Volunteers.css';
import {
  getVolunteers,
  applyToVolunteer
} from '../services/api';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [stats, setStats] = useState({
    activeVolunteers: 0,
    totalHours: 0,
    projectsSupported: 0
  });
  const [application, setApplication] = useState({
    name: '',
    email: '',
    role: '',
    skills: [],
    availability: 'flexible'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await getVolunteers();
        setVolunteers(response.data);
        // Calculate stats
        const activeVolunteers = response.data.filter(v => v.status === 'active').length;
        const totalHours = response.data.reduce((sum, v) => sum + v.totalHours, 0);
        const projectsSupported = new Set(response.data.flatMap(v => v.projects)).size;
        setStats({
          activeVolunteers,
          totalHours,
          projectsSupported
        });
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await applyToVolunteer(application);
      setSuccessMessage('Thank you for applying! We will contact you soon.');
      setApplication({
        name: '',
        email: '',
        role: '',
        skills: [],
        availability: 'flexible'
      });
    } catch (error) {
      console.error('Error applying:', error);
      setSuccessMessage('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="volunteers-container">
      <div className="container">
        <h1>Our Volunteers</h1>
        <div className="volunteer-stats">
          <div className="stat-card">
            <h3>Active Volunteers</h3>
            <p>{stats.activeVolunteers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Hours</h3>
            <p>{stats.totalHours.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Projects Supported</h3>
            <p>{stats.projectsSupported}</p>
          </div>
        </div>

        <div className="volunteer-grid">
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer._id} {...volunteer} />
          ))}
        </div>

        <div className="join-us-section">
          <h2>Join Our Team</h2>
          <p>Be part of our mission to make a difference in the community.</p>
          <div className="application-form">
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleApply}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={application.name}
                  onChange={(e) => setApplication({ ...application, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={application.email}
                  onChange={(e) => setApplication({ ...application, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={application.role}
                  onChange={(e) => setApplication({ ...application, role: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={application.skills.join(', ')}
                  onChange={(e) => setApplication({ ...application, skills: e.target.value.split(',') })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={application.availability}
                  onChange={(e) => setApplication({ ...application, availability: e.target.value })}
                  required
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Apply to Volunteer'}
              </button>
            </form>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
