import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const SaveButton = ({ handleSave, saved }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSaveClick = async () => {
    await handleSave();
    setShowAlert(true);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height:'10%' }}>
      <button className="btn btn-outline-success" onClick={handleSaveClick} style={{ marginRight: '5px' }}>
        Save
      </button>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          style={{ flex: '1', margin: '0' }}
        >
          Changes saved.
        </Alert>
      )}
    </div>
  );
};

export default SaveButton;
