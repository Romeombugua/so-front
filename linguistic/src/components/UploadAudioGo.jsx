import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from './SaveButton';
import { Hearts } from 'react-loading-icons';
import PayPal from './Paypal';
import FeedbackForm from './FeedbackForm';

import './css/textpage.css';

const UploadAudioGo = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [saved, setSaved] = useState(false); // Track if changes are saved
  const [id, setId] = useState(null);
  const [transcriptionFile, setTranscriptionFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track if payment is completed
  const [showPayPalButtons, setShowPayPalButtons] = useState(false); // Track if PayPal buttons should be displayed
  const [responseFormat, setResponseFormat] = useState('srt'); // Track the selected response format
  const [amount, setAmount] = useState(0.50); // Default amount value
  const [error, setError] = useState(null);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [transcriptionStartTime, setTranscriptionStartTime] = useState(null);
  const audioPlayerRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 24 * 1024 * 1024) {
      setIsFileTooLarge(true); // Set state to true if the file size is too large
      setAudioFile(null);
    } else {
      setIsFileTooLarge(false); // Reset state if the file size is within limits
      setAudioFile(file);
    }
  };

  const handlePaymentApprove = async (data, actions) => {
    await actions.order.capture();
    setPaymentCompleted(true);
    setShowPayPalButtons(false);
  };

  const payButtons = async () => {
    setShowPayPalButtons(true);
    window.alert('To continue, please complete your payment using one of our secure payment options.');
  };

  const handleTranscribe = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('response_format', responseFormat); // Pass the selected response format to the server

    try {
      setError(null);
      setTranscribing(true);
      setTranscriptionStartTime(Date.now()); // Record the start time
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/transcribego`, formData);
      setTranscriptionText(response.data.transcription_text);
      setId(response.data.id);
      setTranscriptionFile(response.data.transcription_file);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setTranscribing(false); // Set transcribing state back to false when transcription is completed or encounters an error
    }
  };

  const getTranscriptionTime = () => {
    if (transcriptionStartTime && !transcribing) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - transcriptionStartTime) / 1000; // Convert to seconds
      return `${elapsedTime.toFixed(2)} seconds`;
    }
    return 'Calculating...';
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('transcription_text', transcriptionText);

    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/transcribego/${id}`, formData) // Use the appropriate API endpoint for updating the transcription
      .then((response) => {
        setSaved(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditorChange = (value) => {
    setTranscriptionText(value);
  };

  const downloadTranscriptionFile = () => {
    if (transcriptionFile) {
      // Construct the full URL by appending REACT_APP_API_URL to the transcription_file URL
      const fullURL = `${process.env.REACT_APP_API_URL}${transcriptionFile}`;
      console.log(fullURL);
      fetch(fullURL)
        .then((response) => response.blob())
        .then((blob) => {
          const fileURL = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = fileURL;
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error downloading transcription file:', error);
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/transcribego/${id}`)
      .then(() => {
        setAudioFile(null);
        setTranscriptionText('');
        setSaved(false);
        setId(null);
        setTranscriptionFile(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleResponseFormatChange = (event) => {
    setResponseFormat(event.target.value);
  };

  useEffect(() => {
    if (audioFile) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(audioFile);

      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration / 60;
        const maxLength = 2; // 2 minutes in seconds

        if (duration > maxLength) {
          const newAmount = (duration * 0.30).toFixed(2);
          setAmount(newAmount);
        } else {
          setAmount(0.50);
        }
        if (paymentCompleted) {
          handleTranscribe();
        }
      });

      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
      };
    }
  }, [audioFile, paymentCompleted]);

  const initialOptions = {
    'client-id': 'AYHSg9MQnZAo6vDKgYgYOvqPBykI2AoTpQfhpJ9W3eXO9ClFIqZ9Z1bHMzeWj2EjxiBskTE2n0DCW97h',
  };

  return (
    <div className="container" style={{ padding: '5%', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3em' }}>
        {audioFile && (
          <audio ref={audioPlayerRef} controls>
            <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
          </audio>
        )}
        {isFileTooLarge && (
          <div className="alert alert-danger" role="alert">
            The selected audio file is too large. Please fill our project management form for huge discounts.
          </div>
        )}
      </div>
      {error && (
        <div style={{textAlign:'center', border: '3px dashed #1c87c9', borderRadius:'10px', color:'red', marginTop:'3em'}}>{error}</div>
      )}
      {transcribing && (
        <div className="container-sm border border-primary" style={{ marginTop: '3em', backgroundColor:'black', textAlign:'center', borderRadius:'10px' }}>
          <Hearts /> <span style={{color:'white'}}>- Listening and typing...</span>{/* Display LinearProgress component while transcribing */}
        </div>
      )}

      {transcriptionText && (
        <div style={{ marginBottom: '2%' }}>
          <textarea
            value={transcriptionText}
            onChange={handleEditorChange}
            style={{
              width: '100%',
              minHeight: '30em',
              resize: 'vertical', // Allows vertical resizing
              fontSize: '18px', // Increase font size
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.2s',
              marginTop:'3em'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2% 0' }}>
            <SaveButton handleSave={handleSave} saved={saved} />
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
      {!transcriptionText && (
        <div className='upload-form' style={{ marginTop: '3em' }}>
          <h2 style={{fontFamily: 'Arial', fontWeight:'bold'}}>Audio Transcription</h2>
          <p>No fuss! No long-term commitment!</p>
          <p>Upload an audio file and we'll squeeze text from it. &#128523;</p>
          <input
            style={{ borderRadius: '4px', margin: '1%' }}
            type="file"
            name="audio"
            id="audio"
            accept="audio/*"
            onChange={handleUpload}
          />
          <br />
                    {/* Add check buttons for response format */}
          <div>
            <label>
              <input
                type="radio"
                name="responseFormat"
                value="srt"
                checked={responseFormat === 'srt'}
                onChange={handleResponseFormatChange}
              />
              Generate SRT
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="responseFormat"
                value="text"
                checked={responseFormat === 'text'}
                onChange={handleResponseFormatChange}
              />
              Generate Text
            </label>
          </div>
          <button
            style={{ borderRadius: '4px', margin: '1%' }}
            className="btn btn-primary btn-sm"
            id="transcribeButton"
            onClick={payButtons}
            disabled={!audioFile}
          >
            Transcribe
          </button>

          {showPayPalButtons && (
            <PayPal amount={amount} handlePaymentApprove={handlePaymentApprove} />
          )}
        </div>
      )}
      {transcriptionFile && (
        <div>
          <h4>{responseFormat} file:</h4>
          <button className="btn btn-outline-primary" onClick={downloadTranscriptionFile}>
            Download
          </button>
        </div>
      )}
      {transcriptionText && (
        <FeedbackForm/>
      )}
    </div>
  );
};

export default UploadAudioGo;
