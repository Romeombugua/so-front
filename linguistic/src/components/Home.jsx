import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Waves from './Waves';
import '../home.css';
import '../sine.css';
import './HowItWorks';
import HowItWorks from './HowItWorks';
import Navbar from './Navbar';
import Foota from './Foota';
import ContactForm from './ContactForm';
import Intro from './Intro';
import Poster from './Poster';

const Home = ({ isAuthenticated }) => {
  const guestscribeLinks = () => (
    <Fragment>
      <Link to="/transcribego" className="button">
        Transcribe on the Go
      </Link>
    </Fragment>
  );

  const guesttranslateLinks = () => (
    <Fragment>
      <Link to="/translatego" className="button">
        Translate on the Go
      </Link>
    </Fragment>
  );

  const authscribeLinks = () => (
    <Fragment>
      <Link to="/transcribe" className="button">
        Transcribe Audio
      </Link>
    </Fragment>
  );

  const authtranslateLinks = () => (
    <Fragment>
      <Link to="/translate" className="button">
        Translate Audio
      </Link>
    </Fragment>
  );

  return (
    <div className="landing-page">
      <Waves />
      <main className="landing-page-content">
        <section>
          <p className="about-text">
            We find joy in playing with words. Will you let us be part of your success story? &#129402;
          </p>
        </section>
        <section>
          <Intro/>
        </section>
        
        <section className="transcribe-section fade-in" >
          <div className="transcribe-text">
            <h2>Transcribe</h2>
            <p id='transcribe'>
              Whether it's interviews, lectures, podcasts, or any other audio content, we're here to provide accurate and reliable transcriptions that unlock the power of information.
              Focus on what truly matters while we transform your audio into a beautifully transcribed masterpiece.
              Let us be your trusted partner in bringing your words to life.
            </p>
            {isAuthenticated ? authscribeLinks() : guestscribeLinks()}
          </div>
        </section>
        <section>
        <div className="microphone">
          <div className="microphone-icon"></div>
          <div className="wave"></div>
        </div>
        </section>
        <section className="translate-section fade-in">
          <div className="translate-text">
            <h2>Translate</h2>
              <p >
                Here, words take flight and soar across borders, carrying with them the power to bridge cultures, connect hearts, and unlock new worlds. 
                Embark on a journey of words, where every sentence is an adventure, and every translation a gateway to boundless possibilities. 
                Translate audio file in any language to English!
              </p>
              {isAuthenticated ? authtranslateLinks() : guesttranslateLinks()}
          </div>
        </section>
        <section>
          <Poster/>
        </section>
        <section>
          <HowItWorks/>
        </section>
        <section className="pricing-section py-5 bg-light d-flex align-items-center justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="text-3xl font-bold mb-4">Pricing</h2>
                <p className="pricing-description">We offer the cheapest transcription and translation services in the industry starting at $0.30 per audio minute. Our affordable rates ensure high-quality results without breaking the bank. Unlock the power of accurate transcriptions and translations at unbeatable prices.</p>
                <a href="#transcribe" className="btn btn-primary">Get Started</a>
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0">
                <div className="card">
                  <div className="card-body">
                    <h3 className="text-xl font-bold mb-4">Transcription</h3>
                    <div className="text-muted">
                        <p style={{}}>For audio longer than 2 minutes: $0.20 per audio minute</p>
                        <p style={{}}>For audio less than 2 minutes: Fixed rate of $0.40</p>
                        <p>Reviewing: Additional $0.50 per minute</p>
                        <p>Currently, we only review transcripts for English audio only😢</p>
                    </div>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-body">
                    <h3 className="text-xl font-bold mb-4">Translation</h3>
                    <div className="text-muted">
                        <p style={{}}>For audio longer than 2 minutes: $0.20 per audio minute</p>
                        <p style={{}}>For audio less than 2 minutes: Fixed rate of $0.40</p>
                        <p>Currently, we do not offer reviews for translated audio😭</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ContactForm/>
        </section>





      </main>
      <Foota/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
