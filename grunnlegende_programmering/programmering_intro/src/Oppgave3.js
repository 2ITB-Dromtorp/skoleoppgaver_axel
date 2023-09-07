import './App.css';
import React, { useState } from 'react';

function A() {
  const [melding, setMelding] = useState('');
  const [sprak, setSprak] = useState('');
  const [visMelding, setVisMelding] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 's') {
      setSprak('svensk');
    } else if (e.key === 'n') {
      setSprak('norsk');
    }
  };

  const handleInputChange = (e) => {
    setMelding(e.target.value);
  };

  const handleVisMelding = () => {
    setVisMelding(true);
  };

  return (
    <div className="App">
      <h1>Språkendring ved tastetrykk</h1>
      <p>Tast 's' for svensk og 'n' for norsk, og trykk deretter Enter.</p>
      
      <textarea
        rows="1"
        cols="5"
        value={melding}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Skriv din tekst..."
      />

      <button onClick={handleVisMelding}>Vis språk</button>

      {visMelding && <p>Du er nå på språket: {sprak}</p>}
    </div>
  );
}



export default function Oppgave3() {
    return (
        <div className="App">
          <h1> Oppgave 3 </h1>
          <header className="App-header">
          <A />
          </header>
        </div>
      );
}