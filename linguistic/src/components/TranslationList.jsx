import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const TranslationList = () => {
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    // Fetch the list of translations for the specific user from your Django API
    const access = localStorage.getItem('access');
    if (access) {
      const decodedToken = jwt_decode(access);
      const userId = decodedToken.user_id;

      fetch(`http://localhost:8000/api/translate/user/${userId}`, {
        headers: {
          'Authorization': `JWT ${access}`,
        },
      })
        .then(response => response.json())
        .then(data => setTranslations(data))
        .catch(error => {
          console.error('Error fetching translations:', error);
        });
    }
  }, []);

  const downloadTranslationFile = (url) => {
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
        console.error('Error downloading translation file:', error);
      });
  };

  const deleteTranslation = (id) => {
    // Send a DELETE request to your Django API to delete the translation
    const access = localStorage.getItem('access');
    if (access) {
      fetch(`http://localhost:8000/api/translate/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${access}`,
        },
      })
        .then(response => {
          if (response.ok) {
            // Remove the deleted translation from the state
            setTranslations(prevTranslations =>
              prevTranslations.filter(translation => translation.id !== id)
            );
          } else {
            console.error('Error deleting translation');
          }
        })
        .catch(error => {
          console.error('Error deleting translation:', error);
        });
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', margin: '2.5%', fontFamily: '"Lucida Console", "Courier New", monospace' }}>What our partnership yielded</h3>
      {translations.length === 0 ? (
        <div className="container shadow p-3 mb-5 bg-white rounded" style={{ textAlign: 'center', margin:'auto' }}>
        <p>There is nothing here. &#128546;</p>

        <div style={{width:'100%', height:'100%'}}>
          <iframe title='gif' src="https://giphy.com/embed/CZzzbi9AZbn1K"  class="giphy-embed" allowFullScreen>
            </iframe>
        </div>

        <Link to="/translate">
          Get started?
        </Link> 
            
      </div>
      ) : (
        translations.map(translation => (
          <div key={translation.id} className="container shadow p-3 mb-5 bg-white rounded">
            <h2>{translation.name}</h2>
            <div className="d-flex justify-content-center">
              {translation.audio && (
                <div>
                  <h6>Audio:</h6>
                  <audio controls>
                    <source src={translation.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
            </div>
            <p>Text: {translation.translation_text}</p>
            {translation.translation_file && (
              <div>
                <h6>Text File:</h6>
                <button className="btn btn-outline-primary" onClick={() => downloadTranslationFile(translation.translation_file)}>
                  Download
                </button>
              </div>
            )}
            <button className="btn btn-outline-danger" style={{ marginTop: '2%' }} onClick={() => deleteTranslation(translation.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TranslationList;
