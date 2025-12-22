import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate form submission (in production, this would send to a backend)
    try {
      // Here you would typically send the data to your backend/email service
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
      
      // Reset submitted message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We're here to help! Reach out to us with any questions, feedback, or concerns.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>📧 Email</h3>
              <p>
                <strong>General Inquiries:</strong><br />
                <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
              </p>
              <p>
                <strong>Support:</strong><br />
                <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
              </p>
              <p>
                <strong>Privacy & Legal:</strong><br />
                <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
              </p>
            </div>

            <div className="info-card">
              <h3>⏰ Response Time</h3>
              <p>We aim to respond to all inquiries within 24-48 hours during business days.</p>
            </div>

            <div className="info-card">
              <h3>🌍 Office</h3>
              <p>
                BlessedBump<br />
                India<br />
                <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
              </p>
            </div>

            <div className="info-card">
              <h3>💬 Social Media</h3>
              <p>Connect with us on social media for updates, tips, and community stories.</p>
              <div className="social-contact">
                <a href="https://facebook.com/blessedbump" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://instagram.com/blessedbump" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://twitter.com/freetoolhubcomm" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://www.linkedin.com/in/freetoolhubcommunity-freetoolhubcommunity-338202393" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send Us a Message</h3>

              {submitted && (
                <div className="form-success">
                  ✅ Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}

              {error && <div className="form-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="name">Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Inquiry Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="press">Press Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief subject line"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

