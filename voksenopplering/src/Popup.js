// Popup.js

import React from 'react';
import closeIcon from './x.png'; // Update the import path based on the actual location of x.png

const Popup = ({ onClose, title, content, buttonText, onButtonClick }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="close-icon" />
        </button>
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="header-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Popup;
