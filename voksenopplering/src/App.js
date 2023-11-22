// App.js

import React, { useState } from 'react';
import './App.css';
import DownloadIcon from './viken.svg';
import norwegianFlag from './norwegian-flag.png';
import englishFlag from './english-flag.png';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('norwegian');

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'norwegian' ? 'english' : 'norwegian');
  };

  return (
    <div className="App">
      <header className="sticky-header">
        <div className="logo-container">
          <img src={DownloadIcon} alt="Downloads" className="logo" />
        </div>
        <div className="flag-container">
          <img
            src={currentLanguage === 'norwegian' ? norwegianFlag : englishFlag}
            alt={currentLanguage === 'norwegian' ? 'Norwegian Flag' : 'English Flag'}
            className="flag"
            onClick={toggleLanguage}
          />
        </div>
        <button className="header-button">Logg inn</button>
      </header>

      <main className="main-content">
        <h1>Opplæring for voksne</h1>
        <div className="main-container">
          
          <div className="left-box">
            <div className="sub-box">Box 1</div>
            <div className="sub-box">Box 2</div>
            <div className="sub-box">Box 3</div>
            <div className="sub-box">Box 4</div>
          </div>
          <div className="right-box">
            <div className="scrollable-content">
              <div className="sub-box">Box 5</div>
              <div className="sub-box">Box 6</div>
              {/* Add more sub-boxes here if needed */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
