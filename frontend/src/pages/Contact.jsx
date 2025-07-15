import React, { useState, useEffect } from 'react';
import { sendMessage, getMessageStats } from '../services/api';
import '@/styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage(formData);
      setSuccessMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="page-description">Get in touch with our team to learn more about our initiatives or get involved</p>


        <div className="contact-info">
          <div className="info-card">
            <h3>Our Office</h3>
            <p>Bahati, Nakuru County</p>
            <p>P.O. Box 12345-20100</p>
          </div>
          <div className="info-card">
            <h3>Contact Info</h3>
            <p>Email: info@tushikane.org</p>
            <p>Phone: +254 700 123 456</p>
          </div>
          <div className="info-card">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9:00 - 17:00</p>
            <p>Saturday: 9:00 - 13:00</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </div>

        <div className="contact-map">
          <h2>Find Us</h2>
          <div className="map-container">
            {/* Map will be embedded here */}
            <p>Interactive map will be embedded here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
