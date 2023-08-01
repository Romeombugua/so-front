import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Intro = () => {
  return (
      <div className="container-fluid" style={{ width:'100%', marginLeft:'0px', marginRight:'0px'}}>
        <div className="row">
            <div className="col-lg-6" style={{marginTop: 'auto', marginBottom: 'auto'}}>
              <h2 style={{padding: '20px 0', marginRight: 'auto', marginLeft: 'auto', textAlign: 'center', fontFamily: 'Arial', fontWeight:"bold" }}>The evolution begins here</h2>
              <div style={{paddingBottom:'20px'}}>
                <i className="fa-solid fa-gear fa-spin" style={{fontSize:'50px'}}></i>
              </div>
            
            </div>
            <div className="col-lg-6">
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Accuracy <i className="fa-solid fa-circle-check" style={{fontSize:'20px'}}></i></h5>
                  <p className="card-text">We didn't replace humans. Instead, we leverage state-of-the-art AI to make their work easier, ensuring over 99% accuracy for your transcripts.
                  <i className="bi bi-bullseye"></i> 
                  </p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Speed  <i className="fas fa-tachometer" style={{fontSize:'20px'}}></i> </h5>
                  <p className="card-text">Do you love instant transcripts? We deliver in less than half the length of your audio file! Reviewed transcripts are sent to your mail in less than 24 hours</p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Confidentiality   <i className="fa-solid fa-eye-slash" style={{fontSize:'20px'}}></i> </h5>
                  <p className="card-text">You are in control of information held in our servers. Save and delete transcripts at your own pleasure.</p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Cost <i className="fa-solid fa-magnifying-glass-dollar" style={{fontSize:'20px'}}></i></h5>
                  <p className="card-text">We offer our transcription services at a very competitive and affordable price. Almost for nothing!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Intro;
