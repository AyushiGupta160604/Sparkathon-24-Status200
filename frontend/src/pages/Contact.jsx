import React, { useState } from 'react';
import './css/ContactPage.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has reached us! You will hear back from us soon!");
  };

  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Please reach out to us using the form here or via our contact details.</p>
        <div className="contact-details">
          <p><strong>Address:</strong> RGIPT, Uttar Pradesh, India</p>
          <p><strong>Phone:</strong> +91 XXXXXXXXXX</p>
          <p><strong>Email:</strong> contact@us.org</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Send Us a Message</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
