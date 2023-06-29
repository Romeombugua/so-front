import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from './SaveButton';
import { Hearts } from 'react-loading-icons';
import PayPal from './Paypal';

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
  const audioPlayerRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handlePaymentApprove = async (data, actions) => {
    await actions.order.capture();
    setPaymentCompleted(true);
    setShowPayPalButtons(false);
  };

  useEffect(() => {
    if (paymentCompleted) {
      handleTranscribe();
    }
  }, [paymentCompleted]);

  const payButtons = async () => {
    setShowPayPalButtons(true);
    window.alert('To continue, please complete your payment using one of our secure payment options.');
  };

  const handleTranscribe = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('response_format', responseFormat); // Pass the selected response format to the server

    try {
      setTranscribing(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/transcribego`, formData);
      setTranscriptionText(response.data.transcription_text);
      setId(response.data.id);
      setTranscriptionFile(response.data.transcription_file);
    } catch (error) {
      console.log(error);
    } finally {
      setTranscribing(false); // Set transcribing state back to false when transcription is completed or encounters an error
    }
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
      fetch(transcriptionFile)
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
      });

      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
      };
    }
  }, [audioFile]);

  const initialOptions = {
    'client-id': 'AYHSg9MQnZAo6vDKgYgYOvqPBykI2AoTpQfhpJ9W3eXO9ClFIqZ9Z1bHMzeWj2EjxiBskTE2n0DCW97h',
  };

  return (
    <div className="container" style={{ padding: '5%', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2%' }}>
        {audioFile && (
          <audio ref={audioPlayerRef} controls>
            <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
          </audio>
        )}
      </div>
      {transcribing && (
        <div className="container-sm border border-primary" style={{ marginBottom: '2%', backgroundColor:'black', textAlign:'center', borderRadius:'10px' }}>
          <Hearts /> <span style={{color:'white'}}>- Listening and typing...</span>{/* Display LinearProgress component while transcribing */}
        </div>
      )}

      {transcriptionText && (
        <div style={{ marginBottom: '2%' }}>
          <ReactQuill
            value={transcriptionText}
            onChange={handleEditorChange}
            style={{ border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'  }}
            theme="snow"
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
        <div className="upload-form" style={{ marginBottom: '2%' }}>
          <h2>Audio Transcription</h2>
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
    </div>
  );
};

export default UploadAudioGo;
