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
    fetch(`${process.env.REACT_APP_API_URL}/api/contactus`, {
      method: 'POST',
      body: data,
    });
    // Handle form submission here
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
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{padding:'70px 0'}}>
          <h2 className="form-header">Do you have a large project? We'll assign a project manager to you in a blink.</h2>
        </div>
        <div className="col-md-6" style={{borderWidth:'5px 0 0 5px', borderStyle:'solid', borderColor:'blue', borderRadius:'10px', padding:'2em'}}>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {submitted && <p>Form submitted successfully! We'll be contacting you shortly.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
