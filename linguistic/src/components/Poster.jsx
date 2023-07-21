import React from 'react';
import { Link } from 'react-router-dom';
import './css/poster.css'; // Import the styles.css file

const Poster = () => {
  return (
    <div className="poster-container">
      <h1 className="poster-title">Create an Account Today!</h1>
      <p className="poster-message">
        Claim your <span style={{ color: '#ff6b6b' }}>FREE MINUTES</span> by creating an account now.
      </p>
      <button className="poster-btn"><Link to="/signup" style={{fontWeight:"bold"}}>Sign Up</Link></button>
    </div>
  );
};

export default Poster;
