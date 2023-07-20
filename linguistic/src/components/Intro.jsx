import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faGaugeHigh, faEyeSlash, faMoney } from '@fortawesome/free-solid-svg-icons';


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
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Accuracy <i class="fa-solid fa-circle-check" style={{fontSize:'20px'}}></i></h5>
                  <p className="card-text">We leverage state-of-the-art AI technology and employ professional transcribers to provide you with highly accurate transcripts.
                  <i className="bi bi-bullseye"></i> 
                  </p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Speed  <i class="fas fa-tachometer" style={{fontSize:'20px'}}></i> </h5>
                  <FontAwesomeIcon icon="fa-solid fa-gauge-high" style={{fontSize:'20px'}} />
                  <p className="card-text">Do you love instant transcripts? We deliver in less than half the length of your audio file!</p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Confidentiality   <i class="fa-solid fa-eye-slash" style={{fontSize:'20px'}}></i> </h5>
                  <p className="card-text">You are in control of information held in our servers. Save and delete transcripts at your own pleasure.</p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body" style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'}}>
                  <h5 className="card-title" style={{fontFamily: 'Arial', fontWeight:'bold'}}>Cost <i class="fa-solid fa-magnifying-glass-dollar" style={{fontSize:'20px'}}></i></h5>
                  <p className="card-text">We offer our transcription services at a very competitive and affordable price, ensuring that you receive high-quality transcripts without breaking the bank.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Intro;
