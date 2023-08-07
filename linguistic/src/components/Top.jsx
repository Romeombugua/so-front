import React from 'react';

const Top = () => {
  const sectionStyle = {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: "Arial, 'sans-serif'",
    marginTop: "-5em"
  };

  const textStyle = {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333',
    fontWeight: '500',
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div style={sectionStyle}>
          <h1
          style={{
            marginBottom:'0.5em',
            fontFamily:'"Lucida Console", "Courier New", monospace'
          }}
        >Convert Speech to Text</h1>
            <p style={textStyle}>
              At <span className="font-weight-bold">LinguifyHub</span>, we're not just providing a service –
               we're fostering a global community united by the desire to connect, 
               share, and learn. By eliminating language barriers, we enable you to engage with diverse audiences, 
               expand your reach, and enrich your personal and professional endeavors.
            </p>
            <p>
                Use our services on the go, without even creating an account!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
