import React, { useState } from 'react';

function Piler1() {
  const [tall, setTall] = useState(0);

  const økTall = () => {
    setTall(tall + 1);
  };

  const reduserTall = () => {
    setTall(tall - 1);
  };

  return (
    <div className="oppgaveBox">

      <button onClick={økTall}><img src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png" alt="Bilde" /></button>
      <h1>Tall: {tall}</h1>
      <button onClick={reduserTall} className="upside-down-button">
  <img src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png" alt="Bilde" />
</button>

    </div>
  );
}


export default function Piler() {
    return (
        <div className="App">
          <h1> Piler </h1>
          <header className="App-header">
          <Piler1/>  

          </header>
        </div>
      );
}