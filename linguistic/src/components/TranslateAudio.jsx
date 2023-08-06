import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from './SaveButton';
import { Hearts } from 'react-loading-icons';
import PayPal from './Paypal';
import './css/textpage.css';
import FeedbackForm from './FeedbackForm';

const TranslateAudio = ({isAuthenticated}) => {
  const [audioFile, setAudioFile] = useState(null);
  const [translationText, setTranslationText] = useState('');
  const [saved, setSaved] = useState(false); // Track if changes are saved
  const [user_id, setUserId] = useState(null);
  const [id, setId] = useState(null);
  const [translationFile, setTranslationFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track if payment is completed
  const [showPayPalButtons, setShowPayPalButtons] = useState(false); // Track if PayPal buttons should be displayed
  const [responseFormat, setResponseFormat] = useState('srt'); // Track the selected response format
  const [amount, setAmount] = useState(0.50); // Default amount value
  const [remainingFreeMinutes, setRemainingFreeMinutes] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [error, setError] = useState(null);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [transcriptionStartTime, setTranscriptionStartTime] = useState(null);
  const audioPlayerRef = useRef(null);

  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  }; 

  useEffect(() => {
    // Call fetchRemainingFreeMinutes here when the component mounts
    const user_id = localStorage.getItem('user_id');
    setUserId(user_id);

    // ... Other useEffect logic ...

  }, []);

  useEffect(() => {
    // Fetch remaining free minutes when user_id is available
    if (user_id) {
      fetchRemainingFreeMinutes();
    }
    // ... Other useEffect logic ...

  }, [user_id]);

  const fetchRemainingFreeMinutes = async () => {
    try {
      setError(null);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/free/${user_id}`, config);
      setRemainingFreeMinutes(response.data.remainingfreeminutes);
    } catch (error) {
      console.error('Error fetching remaining free minutes:', error);
      setError(error.message);
    }
  };

  const handleUpdateRemainingFreeMinutes = async (newMinutes) => {
    try {
      setError(null);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/free/${user_id}`, {
        remainingfreeminutes: newMinutes,
      }, config);
      setRemainingFreeMinutes(response.data.remainingfreeminutes);
    } catch (error) {
      console.error('Error updating remaining free minutes:', error);
      setError(error.message);
    }
  };

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


  const handleTranslate = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('response_format', responseFormat); // Pass the selected response format to the server

    try {
      setError(null);
      setTranscribing(true);
      setTranscriptionStartTime(Date.now()); // Record the start time
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/translate`, formData, config);
      setTranslationText(response.data.translation_text);
      setId(response.data.id);
      setTranslationFile(response.data.translation_file);
    } catch (error) {
      if (error.code === "ERR_BAD_RESPONSE"){
        setError('Sorry an error occurred on our end. We are working on it')
      }else{
        setError(error.message);
      }
      console.log(error);
    }finally {
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

  const handleTranscribeWithFreeTrial = async () => {
    if (remainingFreeMinutes <= 0) {
      setShowPayPalButtons(true);
      window.alert('Your free trial has ended. Please complete your payment using one of our secure payment options.');
    } else {
      handleTranslate();
      const remainder = remainingFreeMinutes - audioDuration;
      handleUpdateRemainingFreeMinutes(remainder);

    }
  };


  const handleSave = async () => {
    const formData = new FormData();
    formData.append('translation_text', translationText);

    try {
      setError(null);
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/translate/${id}`, formData, config); // Use the appropriate API endpoint for updating the transcription
      setSaved(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditorChange = (event) => {
    // Insert line breaks before and after timestamps
    const value = event.target.value;
    //const formattedValue = value.replace(/(\d{2}:\d{2}:\d{2},\d{3})/g, '$1\n');

    setTranslationText(value);
  };

  const downloadTranslationFile = () => {
    if (translationFile) {
      // Construct the full URL by appending REACT_APP_API_URL to the transcription_file URL
      const fullURL = `${process.env.REACT_APP_API_URL}${translationFile}`;
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
          console.error('Error downloading translation file:', error);
        });
    }
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
        setAudioDuration(duration);
        
        

        if (duration > maxLength) {
          const newAmount = (duration * 0.30).toFixed(2);
          setAmount(newAmount);
        } else {
          setAmount(0.50);
        }
        if (duration > remainingFreeMinutes) {
          setShowPayPalButtons(true);
        }
        if (paymentCompleted) {
          handleTranslate();
        }
      });

      return () => {
        audio.removeEventListener('loadedmetadata', () => {});
      };
    }
  }, [audioFile, paymentCompleted]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
        <div className="container-sm border border-primary" style={{ marginTop:'3em', backgroundColor:'black', textAlign:'center', borderRadius:'10px' }}>
          <Hearts /> <span style={{color:'white'}}>- Listening and typing...</span>{/* Display LinearProgress component while transcribing */}
        </div>
      )}
      {translationText && (
        <div style={{ marginBottom: '2%' }}>
          <textarea
            value={translationText}
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
          </div>
        </div>
      )}
      {!translationText && (
        <div className='upload-form' style={{ marginTop: '3em' }}>
          <h2 style={{fontFamily: 'Arial', fontWeight:'bold'}}>Audio Translation</h2>
          <p>Upload an audio file and we'll squeeze text from it. &#128523;</p>
          <p>Remaining Free Minutes: {Math.max(0, Math.floor(remainingFreeMinutes))}</p>
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
          <button style={{ borderRadius: '4px', margin: '1%' }} className="btn btn-primary btn-sm" id="transcribeButton" onClick={handleTranscribeWithFreeTrial} disabled={!audioFile}>
            Translate
          </button>
          {showPayPalButtons && (
            <PayPal amount={amount} handlePaymentApprove={handlePaymentApprove} />
          )}
        </div>
      )}
      {translationFile && (
        <div style={{ marginBottom: '2%' }}>
          <h6>{responseFormat} file:</h6>
          <button className="btn btn-outline-primary" onClick={downloadTranslationFile}>Download</button>
        </div>
      )}
      {translationText && (
        <FeedbackForm/>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(TranslateAudio);
