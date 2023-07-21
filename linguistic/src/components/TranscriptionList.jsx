import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const TranscriptionList = () => {
  const [transcriptions, setTranscriptions] = useState([]);

  useEffect(() => {
    // Fetch the list of transcriptions from your Django API
    const access = localStorage.getItem('access');
    if (access) {
      const decodedToken = jwt_decode(access);
      const userId = decodedToken.user_id;

      fetch(`${process.env.REACT_APP_API_URL}/api/transcripts/user/${userId}`, {
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

  const deleteTranscription = (transcriptionId) => {
    // Send a DELETE request to your Django API endpoint to delete the transcription
    const access = localStorage.getItem('access');
    if (access) {
      fetch(`${process.env.REACT_APP_API_URL}/api/transcripts/${transcriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${access}`,
        },
      })
      .then(response => {
        if (response.ok) {
          // Remove the deleted transcription from the state
          setTranscriptions(prevTranscriptions => prevTranscriptions.filter(transcription => transcription.id !== transcriptionId));
        } else {
          throw new Error('Failed to delete transcription');
        }
      })
      .catch(error => {
        console.error('Error deleting transcription:', error);
      });
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const [expandedTranscriptionId, setExpandedTranscriptionId] = useState(null);

  const handleExpandClick = (transcriptionId) => {
    if (expandedTranscriptionId === transcriptionId) {
      setExpandedTranscriptionId(null);
    } else {
      setExpandedTranscriptionId(transcriptionId);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginTop: '2.5em', fontFamily: '"Lucida Console", "Courier New", monospace' }}>What our partnership yielded</h3>
      {transcriptions.length === 0 ? (
        <div className="container shadow p-3 bg-white rounded" style={{ textAlign: 'center', marginTop:'7.5em' }}>
          <p>There is nothing here. &#128546;</p>

          <div style={{ width: '100%', height: '100%' }}>
            <iframe title='gif' src="https://giphy.com/embed/CZzzbi9AZbn1K" className="giphy-embed" allowFullScreen></iframe>
          </div>

          <Link to="/transcribe">
            Get started?
          </Link>

        </div>
      ) : (
        transcriptions.map(transcription => (
          <div key={transcription.id} className="container shadow p-3 mb-5 bg-white rounded">
            <h2>{transcription.name}</h2>
            <div className="d-flex justify-content-center">
              {transcription.audio && (
                <div>
                  <h6>Audio:</h6>
                  <audio controls>
                    <source src={transcription.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
            <div className="p-3">
              <p>
                Text:{" "}
                {expandedTranscriptionId === transcription.id
                  ? transcription.transcription_text
                  : truncateText(transcription.transcription_text, 100)}
              </p>
              {transcription.transcription_text.length > 100 && (
                <button
                  onClick={() => handleExpandClick(transcription.id)}
                  className="btn btn-link"
                >
                  {expandedTranscriptionId === transcription.id ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
            {transcription.transcription_file && (
              <div>
                <h6>Text File:</h6>
                <button className="btn btn-outline-primary" onClick={() => downloadTranscriptionFile(transcription.transcription_file)}>
                  Download
                </button>
              </div>
            )}
            <div>
              <button className="btn btn-outline-danger" style={{ marginTop: '2%' }} onClick={() => deleteTranscription(transcription.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TranscriptionList;
