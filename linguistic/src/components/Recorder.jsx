import React, {Fragment} from 'react';
import { useState } from 'react';

const Recorder = () => {
    const [recording, setRecording] = useState(false); // Track if recording is in progress
    const [audioURL, setAudioURL] = useState(''); // Track the pasted audio URL
    let mediaRecorder;
    let audioChunks = [];
  
    const startRecording = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
        // Create a new MediaRecorder instance and configure it to record the audio stream
        mediaRecorder = new MediaRecorder(stream);
  
        // Event listener to handle recording data chunks
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };
  
        // Start recording
        mediaRecorder.start();
  
        // Update the recording state to true
        setRecording(true);
      } catch (error) {
        // Handle errors, such as permission denied or no microphone available
        console.error('Error starting recording:', error);
      }
    };

    const rec = (
        <Fragment>

        </Fragment>
    );

  return (
    <div>            
        <button className="btn btn-primary btn-sm" onClick={startRecording}>
            Start Recording
        </button>
        {audioChunks && (
            <div>
                {audioChunks}
            </div>
        )}
    </div>
  )
}

export default Recorder