import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const TheOffice = () => {
  const [transcriptions, setTranscriptions] = useState([]);

  useEffect(() => {
    // Fetch the list of transcriptions from your Django API
    const access = localStorage.getItem('access');
    if (access) {
      const decodedToken = jwt_decode(access);
      const userId = decodedToken.user_id;

      fetch(`http://localhost:8000/api/theoffice`, {
        headers: {
          'Authorization': `JWT ${access}`,
        },
      })
        .then(response => response.json())
        .then(data => setTranscriptions(data));
    }
  }, []);

  const downloadTranscriptionFile = (url) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading transcription file:', error);
      });
  };


  return (
    <div>
      <h1>Transcriptions</h1>
      {transcriptions.map(transcription => (
        <div key={transcription.id}>
          <h2>Transcription {transcription.id}</h2>
          <p>Audio: {transcription.audio}</p>
          <p>Transcription Text: {transcription.transcription_text}</p>
          {transcription.transcription_file && (
            <div>
              <h3>Transcription File:</h3>
              <button onClick={() => downloadTranscriptionFile(transcription.transcription_file)}>
                Download
              </button>
            </div>
          )}
            <Link to={`/jobcorner/${transcription.id}`}>Work on This</Link>
        </div>
      ))}
    </div>
  );
};

export default TheOffice;
