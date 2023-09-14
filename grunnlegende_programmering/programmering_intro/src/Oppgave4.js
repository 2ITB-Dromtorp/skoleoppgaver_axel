import './App.css';
import React, { useState } from 'react';

function A() {
  const [tall] = useState(Math.floor(Math.random() * 51));
  const [gjett, setGjett] = useState(null);
  const [melding, setMelding] = useState('');

  const hondterGjett = () => {
    if (gjett === null || isNaN(gjett)) {
      setMelding('Skriv inn et gyldig tall.');
    } else if (gjett === tall) {
      setMelding('Gratulerer, du gjettet riktig!');
    } else if (gjett < tall) {
      setMelding('Tallet du skrev inn er for lavt.');
    } else {
      setMelding('Tallet du gjettet på er for høyt.');
    }
  };

  return (
    <div className='oppgaveBox'>
      <h2> Deloppgave 4 a) </h2>
      <p> Gjett på et tall mellom 0 og 50: </p>
      <input
        type="number"
        value={gjett || ''}
        onChange={(e) => setGjett(parseInt(e.target.value))}
      />
      <button onClick={hondterGjett}>Gjett</button>
      <p>{melding}</p>
    </div>
  );
}


export default function Oppgave4() {
    return (
        <div className="App">
          <h1> Oppgave 4 </h1>
          <header className="App-header">
          <A />
          </header>
        </div>
      );
}