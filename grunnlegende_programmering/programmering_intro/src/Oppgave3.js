import './App.css';
import React, { useState } from 'react';

function A() {
  return (
      <div className='oppgaveBox'>
          <h2> Deloppgave 3 a) </h2>
          <p> I React brukes input-funksjoner til å samle inn data eller handlinger fra brukeren. Disse funksjonene er tilknyttet ulike hendelser, som klikk, tastetrykk, musebevegelser og mer, for å samle inn og håndtere informasjonen.</p>
      </div>
  );
}

function B() {
  const [language, setLanguage] = useState(null);
  const [displayText, setDisplayText] = useState(null);
  const [inputText, setInputText] = useState('');


  const handleKeyPress = (e) => {
    if (e.key === 's') {
      setLanguage('svensk');
    } else if (e.key === 'n') {
      setLanguage('norsk');
    } else if (e.key === 'd') {
      setLanguage('dansk');
    } else {
      setLanguage(null);
    }
  };

  const checkLanguage = () => {
    if (language) {
      setDisplayText(`Du er ${language}`);
    } else if (!language && inputText.length === 0) {
      setDisplayText('Du har ikke valgt språk');
    }
  };
  

  return (
    <div className='oppgaveBox'>
      <h2>Deloppgave 3s b)</h2>
      <p>Velg språk</p>
      <p>Dans(d), Norsk(n), Svensk(s)</p>
      <input type="text" onKeyPress={handleKeyPress} />
      <button onClick={checkLanguage}>Sjekk språk</button>
      {displayText && <p>{displayText}</p>}
    </div>
  );
}


export default function Oppgave3() {
    return (
        <div className="App">
          <h1> Oppgave 3 </h1>
          <header className="App-header">
          <A />
          <B />
          </header>
        </div>
      );
}