import React from 'react'
import './css/About.css'

const About = () => {
  return (
        <div className="about-container">
            <h1 className="about-heading">About Us</h1>
            <div className="about-content">
                <h2 className="about-subheading">Our Mission</h2>
                <p className="about-description">
                    At LinguifyHub, we believe in breaking language barriers and making communication easier for everyone.
                    Our mission is to provide a seamless transcription and translation experience that helps people connect and
                    understand each other better.
                </p>
                <h2 className="about-subheading">How It Works</h2>
                <p className="about-description">
                    Linguify utilizes state-of-the-art speech recognition and machine translation technologies to transcribe
                    spoken content and translate it into multiple languages. With our user-friendly interface, you can easily upload
                    audio files or record your voice directly on our platform. Our robust backend processes the audio, generating
                    accurate transcriptions and translations that can be downloaded or shared effortlessly. 
                    With our intuitive user interface, you can effortlessly upload audio files, no matter the format, and let our advanced transcription engine convert them into accurate text. 
                    Say goodbye to manual transcriptions and embrace the speed and accuracy our app offers.
                    But that's not all  once your audio is transcribed, our robust translation engine comes into play. 
                    You can easily select the target language and watch as your transcribed text is transformed into the language of your choice. 
                    Break down language barriers and reach a wider audience with just a few clicks
                </p>
            </div>
        </div>
    )
}

export default About