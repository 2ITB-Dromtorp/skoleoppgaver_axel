// Popup.js

import React from 'react';

const Popup = ({ onClose, title, content }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="header-button" onClick={onClose}>
          Bestill kurs
        </button>
      </div>
    </div>
  );
};

export default Popup;
