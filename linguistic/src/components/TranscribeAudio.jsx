import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from './SaveButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PayPal from './Paypal';
import './css/textpage.css';

const TranscribeAudio = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [saved, setSaved] = useState(false); // Track if changes are saved
  const [id, setId] = useState(null);
  const [transcriptionFile, setTranscriptionFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track if payment is completed
  const [paymentCompletedReview, setPaymentCompletedReview] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false); // Track if PayPal buttons should be displayed
  const [responseFormat, setResponseFormat] = useState('srt'); // Track the selected response format
  const [amount, setAmount] = useState(0.50); // Default amount value
  const [reviewAmount, setReviewAmount] = useState(0);
  const [reviewButtonDisabled, setReviewButtonDisabled] = useState(false); // Track review button disabled status
  const audioPlayerRef = useRef(null);

  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handlePaymentApprove = async (data, actions) => {
    await actions.order.capture();
    setPaymentCompleted(true);
    setShowPayPalButtons(false); 
  };

  const handlePaymentApproveReview = async (data, actions) => {
    await actions.order.capture();
    setPaymentCompletedReview(true);
    setShowPayPalButtons(false); 
    setReviewButtonDisabled(true);
  };

  useEffect(() => {
    if (paymentCompleted) {
      handleTranscribe();
    }
  }, [paymentCompleted]);

  useEffect(() => {
    if (paymentCompletedReview) {
      handleReview();
    }
  }, [paymentCompletedReview]);

  const handleTranscribe = async () => {
    
      const formData = new FormData();
      formData.append('audio', audioFile);
      formData.append('response_format', responseFormat); // Pass the selected response format to the server
  
      try {
        setTranscribing(true);
        const response = await axios.post('http://localhost:8000/api/transcripts', formData, config);
        setTranscriptionText(response.data.transcription_text);
        setId(response.data.id);
        setTranscriptionFile(response.data.transcription_file);
      } catch (error) {
        console.log(error);
      } finally {
        setTranscribing(false); // Set transcribing state back to false when transcription is completed or encounters an error
      }
  };

  const payButtons = async () => {
    setShowPayPalButtons(true);
    window.alert('To continue, please complete your payment using one of our secure payment options.');
  }

  const payButtonsReview = async () => {
    setShowPayPalButtons(true);
    window.alert("To continue, please complete your payment for the additional review charge. Add any requirements at the top of the transcript then click save. Once the transcript is perfect, we'll mail it to you and it will be available in 'My Transcripts' section");
  }

  const handleReview = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/transcripts/${id}`, { review: true }, config); // Use the appropriate API endpoint for updating the transcription
      // Update the local state or perform any other necessary actions
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('transcription_text', transcriptionText);

    try {
      await axios.patch(`http://localhost:8000/api/transcripts/${id}`, formData, config); // Use the appropriate API endpoint for updating the transcription
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
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

  const handleEditorChange = (value) => {
    // Insert line breaks before and after timestamps
    const formattedValue = value.replace(/(\d{2}:\d{2}:\d{2},\d{3})/g, '$1<br>');

    setTranscriptionText(formattedValue);
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
          const newReviewAmount = (duration * 0.40).toFixed(2);
          setAmount(newAmount);
          setReviewAmount(newReviewAmount);
        } else {
          setAmount(0.50);
          setReviewAmount(0.40);
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
        <div className="container-sm border border-primary" style={{ marginBottom: '2%' }}>
          <FontAwesomeIcon icon="fa-solid fa-bars-progress" spin />{/* Display LinearProgress component while transcribing */}
        </div>
      )}
      {transcriptionText && (
        <div style={{ marginBottom: '2%' }}>
          <ReactQuill
            value={transcriptionText}
            onChange={handleEditorChange}
            style={{ border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}
            theme="snow"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2% 0' }}>
            <SaveButton handleSave={handleSave} saved={saved} />
            <button onClick={payButtonsReview} className="btn btn-primary btn-sm" disabled={reviewButtonDisabled}>
              Review
            </button>
          </div>
          {showPayPalButtons && (
            <PayPal amount={reviewAmount} handlePaymentApprove={handlePaymentApproveReview} />
          )}
          {reviewButtonDisabled && (
              <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> The trancript has been sent for review.
              </div>
          )}
        </div>
      )}
      {!transcriptionText && (
        <div className='upload-form' style={{ marginBottom: '2%' }}>
          <h2>Audio Transcription</h2>
          <p>Upload an audio file and we'll squeeze text from it. &#128523;</p>
          <input style={{ borderRadius: '4px', margin: '1%' }} type="file" name="audio" id="audio" accept="audio/*" onChange={handleUpload} />
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
          <button style={{ borderRadius: '4px', margin: '1%' }} className="btn btn-primary btn-sm" 
          id="transcribeButton" 
          onClick={payButtons} 
          disabled={!audioFile}>
            Transcribe
          </button>
          {showPayPalButtons && (
            <PayPal amount={amount} handlePaymentApprove={handlePaymentApprove} />
          )}
        </div>
      )}
      {transcriptionFile && (
        <div style={{ marginBottom: '2%' }}>
          <h6>{responseFormat} file:</h6>
          <button className="btn btn-outline-primary" onClick={downloadTranscriptionFile}>
            Download
          </button>
        </div>
      )}

      {/*<PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>*/}
    </div>
  );
};

export default TranscribeAudio;
