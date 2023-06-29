import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from './SaveButton';
import axios from 'axios';

const JobCorner = () => {
  const { id } = useParams();
  const [transcriptionText, setTranscriptionText] = useState('');
  const [saved, setSaved] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const config = {
    headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  }; 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/theoffice/${id}`, config)
      .then(response => response.json())
      .then(data => {
        setTranscriptionText(data.transcription_text);
        setAudioUrl(data.audio);
      })
      .catch(error => {
        console.error('Error fetching transcription:', error);
      });
  }, [id]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('transcription_text', transcriptionText);

    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/theoffice/${id}`, formData, config); // Use the appropriate API endpoint for updating the transcription
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (value) => {
    setTranscriptionText(value);
  };

  return (
    <div>
      <h1>Job Corner</h1>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <ReactQuill value={transcriptionText} onChange={handleEditorChange} />
      <SaveButton handleSave={handleSave} saved={saved} />
      {/* Add any other components or logic you need */}
    </div>
  );
};

export default JobCorner;
