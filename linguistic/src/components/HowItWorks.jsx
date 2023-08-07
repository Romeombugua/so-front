import React, { useEffect } from 'react';

const HowItWorks = () => {
  useEffect(() => {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
      step.style.animationDelay = `${0.2 * index}s`;
    });
  }, []);

  return (
    <section className="how-it-works text-center py-8 bg-white">
      <h2 className="text-3xl font-bold mb-6">It's as Easy as</h2>
      <div className="steps-container">
        <div className="step">
          <h6>Step 1</h6>
          <i className="fas fa-user-plus step-icon"></i>
          <div className="step-description">Sign up for an account</div>
        </div>
        <div className="step">
          <h6>Step 2</h6>
          <i className="fas fa-cloud-upload-alt step-icon"></i>
          <div className="step-description">Upload your audio file</div>
        </div>
        <div className="step">
          <h6>Step 3</h6>
          <i className="fas fa-cloud-download-alt step-icon"></i>
          <div className="step-description">Click "Transcribe" or "Translate" and download the text</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
