// App.js

import React, { useState } from 'react';
import './App.css';
import DownloadIcon from './viken.svg';
import norwegianFlag from './norwegian-flag.png';
import englishFlag from './english-flag.png';
import Popup from './Popup';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('norwegian');
  const [popupInfo, setPopupInfo] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'norwegian' ? 'english' : 'norwegian');
  };

  const handleButtonClick = (course) => {
    setPopupInfo({
      title: course,
      content: getCourseDescription(course),
      buttonText: 'Bestill kurs',
      onButtonClick: () => enrollCourse(course),
    });
  };

  const closePopup = () => {
    setPopupInfo(null);
  };

  const enrollCourse = (course) => {
    setEnrolledCourses([...enrolledCourses, course]);
    setPopupInfo(null);
  };

  const getCourseDescription = (course) => {
    // Add course descriptions here
    const descriptions = {
      'Grunnleggende datakunnskap': 'Dette kurset er skreddersydd for å gi deg den nødvendige kompetansen innen grunnleggende dataferdigheter. Enten du er nybegynner eller ønsker å oppdatere dine ferdigheter, vil kurset dekke emner som datanavigasjon, filbehandling, og grunnleggende bruk av digitale verktøy. Utforsk den digitale verdenen og øk din selvtillit når det gjelder å håndtere datateknologi.',
      'Norsk': 'Forbedre dine norskkunnskaper med vårt norskkurs skreddersydd for voksne. Dette kurset fokuserer på både muntlige og skriftlige ferdigheter, og vil hjelpe deg med å utvikle et solid grunnlag innen grammatikk, ordforråd og kommunikasjonsevner. Uansett om du vil styrke dine språkkunnskaper for personlig eller profesjonell vekst, er dette kurset det rette valget.',
      'Heimkunnskap': 'Gjenoppdag gleden ved å lage deilige måltider og skape et trivelig hjemmemiljø gjennom vårt heimkunnskapskurs. Lær essensielle ferdigheter innen matlaging, husholdningsstyring og dekorasjon. Dette kurset gir praktisk kunnskap som vil gjøre hverdagen din enklere samtidig som du utforsker kreative måter å gjøre hjemmet ditt enda mer innbydende.',
      'Kroppsøving': 'Ta vare på din fysiske helse og velvære gjennom vårt kroppsøvingskurs. Dette kurset er utformet for å tilpasse seg ulike fitnessnivåer og interesser. Uansett om du foretrekker lavintensitetsøvelser eller ønsker å utfordre deg selv med mer krevende aktiviteter, vil kurset veilede deg mot en sunnere og mer aktiv livsstil.',
    };

    return descriptions[course];
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
          {/* Left Box */}
          <div>
            <h2>Tilgjengelige kurs</h2>
            <div className="left-box">
              <div className="sub-box">
                <p>Grunnleggende datakunnskap</p>
                <button className="header-button" onClick={() => handleButtonClick('Grunnleggende datakunnskap')}>
                  Mer informasjon
                </button>
              </div>
              <div className="sub-box">
                <p>Norsk</p>
                <button className="header-button" onClick={() => handleButtonClick('Norsk')}>
                  Mer informasjon
                </button>
              </div>
              <div className="sub-box">
                <p>Heimkunnskap</p>
                <button className="header-button" onClick={() => handleButtonClick('Heimkunnskap')}>
                  Mer informasjon
                </button>
              </div>
              <div className="sub-box">
                <p>Kroppsøving</p>
                <button className="header-button" onClick={() => handleButtonClick('Kroppsøving')}>
                  Mer informasjon
                </button>
              </div>
              {popupInfo && (
                <Popup title={popupInfo.title} content={popupInfo.content} onClose={closePopup}>
                  <button className="header-button" onClick={popupInfo.onButtonClick}>
                    {popupInfo.buttonText}
                  </button>
                </Popup>
              )}
            </div>
          </div>

          {/* Right Box */}
          <div>
            <h2>Påmeldte kurs</h2>
            <div className="right-box">
              <div className="scrollable-content">
                {enrolledCourses.map((course, index) => (
                  <div className="sub-box" key={index}>
                    <p>{course}</p>
                  </div>
                ))}
                {popupInfo && (
                  <Popup title={popupInfo.title} content={popupInfo.content} onClose={closePopup}>
                    <button className="header-button" onClick={popupInfo.onButtonClick}>
                      {popupInfo.buttonText}
                    </button>
                  </Popup>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
