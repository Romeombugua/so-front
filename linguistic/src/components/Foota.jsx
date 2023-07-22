import React from 'react';
import './css/footer.css';
import './css/hrline.css';
import { Link } from 'react-router-dom';

const Foota = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-6 mb-3 mt-2 mb-sm-0">
                <div className="footer-contact-item bg-white p-2">
                  <a href="mailto:info.linguifyhub@gmail.com"> <i className="fa fa-envelope" aria-hidden="true"> </i></a>
                </div>
              </div>
              <div className="col-sm-6 mt-2">
                <div className="footer-contact-item bg-white p-2">
                  <a href="tel:+254717102096"> <i className="fa fa-phone" aria-hidden="true"> </i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="text-center">
              <div className="footer-company-links">
                <Link to="/about" className="d-block mb-2">About</Link>
                <Link to="/careers" className="d-block mb-2">Careers</Link>
                <Link to="/privacy" className="d-block">Privacy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" /> {/* Add horizontal line */}
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} LinguifyHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foota;
