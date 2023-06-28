import React, { useState } from 'react';
import './css/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    largeProject: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch('http://localhost:8000/api/contactus', {
      method: 'POST',
      body: data,
    });
    // Handle form submission here
    console.log(formData);
    // Set submitted state to true
    setSubmitted(true);
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      message: '',
      largeProject: false,
    });
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-header">Do you have a large project? We'll assign a project manager to you in a blink.</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-input form-textarea"
          />
        </label>
        <br />
        <button type="submit" className="form-button">Submit</button>
        {submitted && <p>Form submitted successfully! We'll be contacting you shortly.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
