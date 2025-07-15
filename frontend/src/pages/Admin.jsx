import React, { useState, useEffect } from 'react';
import { getMessageStats } from '../services/api';
import '@/styles/Admin.css';

const Admin = () => {
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    highPriority: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getMessageStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching message stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Manage community initiatives and volunteers.</p>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Messages</h3>
          <p>{stats.totalMessages}</p>
        </div>
        <div className="stat-card">
          <h3>New Messages</h3>
          <p>{stats.newMessages}</p>
        </div>
        <div className="stat-card">
          <h3>High Priority</h3>
          <p>{stats.highPriority}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
