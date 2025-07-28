import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return Promise.reject({ message: 'No response received from server' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject({ message: 'Error setting up request' });
    }
  }
);

// Projects API
export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (project) => api.post('/projects', project);
export const updateProject = (id, project) => api.put(`/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Volunteers API
export const getVolunteers = () => api.get('/volunteers');
export const getVolunteer = (id) => api.get(`/volunteers/${id}`);
export const createVolunteer = (volunteer) => api.post('/volunteers', volunteer);
export const updateVolunteer = (id, volunteer) => api.put(`/volunteers/${id}`, volunteer);
export const deleteVolunteer = (id) => api.delete(`/volunteers/${id}`);
export const applyToVolunteer = (volunteer) => api.post('/volunteers/apply', volunteer);

// Donations API
export const getDonations = () => api.get('/donations');
export const getDonationsByProject = (projectId) => api.get(`/donations/project/${projectId}`);
export const createDonation = (donation) => api.post('/donations', donation);
export const updateDonation = (id, donation) => api.put(`/donations/${id}`, donation);
export const getDonationStats = () => api.get('/donations/stats');

// Contact API
export const sendMessage = (message) => api.post('/contact', message);
export const getMessages = () => api.get('/contact/chat');
export const updateMessage = (id, message) => api.put(`/contact/${id}`, message);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const getMessageStats = () => api.get('/contact/stats');

// Project Pulse API
export const getProjectStats = () => api.get('/stats/project');
export const updateProjectStats = (stats) => api.put('/stats/project', stats);

export default api;
