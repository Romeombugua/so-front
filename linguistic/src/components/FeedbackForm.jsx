import React, { useState } from 'react';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the feedback object to send in the request body
    const feedbackData = { message };

    // Send the feedback to the backend using the fetch function
    fetch(`${process.env.REACT_APP_API_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit feedback.');
      }
      // Feedback submitted successfully
      console.log('Feedback submitted successfully!');
      // Clear the message field after successful submission
      setMessage('');
      // Set submitted to true to show the success alert
      setSubmitted(true);
    })
    .catch((error) => {
      // Handle the error if the feedback submission fails.
      console.error('Error submitting feedback:', error);
    });
  };

  // Rest of the component...

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {submitted && (
            <div className="alert alert-success" role="alert">
              Feedback submitted successfully!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="message">Thanks for using our site. Your feedback will help alot</label>
              <textarea
                id="message"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter anonymous message..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitted}>
              {submitted ? 'Submitted' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
