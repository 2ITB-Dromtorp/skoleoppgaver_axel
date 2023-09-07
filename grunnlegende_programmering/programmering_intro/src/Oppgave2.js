import './App.css';
import React, { useState } from 'react';

function A() {
    const lengde = 8;
    const bredde = 8;
    const areal = lengde * bredde
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 2 a) </h2>
            <p> Regn ut arealet av en rektangel</p>
            <p>Lengde: {lengde}</p>
            <p>Bredde: {bredde}</p>
            <p>Arealet er: {areal}</p>
        </div>
    );
}


function B() {
  const [lengde, setLengde] = useState(8);
  const [bredde, setBredde] = useState(8);
  const [areal, setAreal] = useState(null);

  const beregnAreal = () => {
    const calculatedAreal = (lengde * bredde) / 2;
    setAreal(calculatedAreal);
  };
  return (
    <div className='oppgaveBox'>
      <h2> Deloppgave 2 b) </h2>
      <p> Regn ut arealet av en trekant</p>
      <div>
        <label htmlFor="lengde">Lengde:</label>
        <input
          type="number"
          id="lengde"
          value={lengde}
          onChange={(e) => setLengde(e.target.valueAsNumber)}
        />
      </div>
      <div>
        <label htmlFor="bredde">Bredde:</label>
        <input
          type="number"
          id="bredde"
          value={bredde}
          onChange={(e) => setBredde(e.target.valueAsNumber)}
        />
      </div>
      <button onClick={beregnAreal}>Beregn</button>
      {areal !== null && (
        <p>Arealet er: {areal}</p>
      )}
    </div>
  );
}

function C() {
    const [lengde, setLengde] = useState(8);
    const [bredde, setBredde] = useState(8);
    const [areal, setAreal] = useState(null);
  
    const beregnAreal = () => {
      const calculatedArealTrekant = (lengde * bredde) / 2;
      const calculatedArealRektangel = lengde * bredde;
      setAreal({
        trekant: calculatedArealTrekant,
        rektangel: calculatedArealRektangel,
      });
    };
  
    return (
      <div className='oppgaveBox'>
        <h2> Deloppgave 2 c) </h2>
        <p> Regn ut arealet av en trekant og rektangel</p>
        <div>
          <label htmlFor="lengde">Lengde:</label>
          <input
            type="number"
            id="lengde"
            value={lengde}
            onChange={(e) => setLengde(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label htmlFor="bredde">Bredde:</label>
          <input
            type="number"
            id="bredde"
            value={bredde}
            onChange={(e) => setBredde(e.target.valueAsNumber)}
          />
        </div>
        <button onClick={beregnAreal}>Beregn</button>
        {areal !== null && (
          <div>
            <p>Arealet av trekanten er: {areal.trekant}</p>
            <p>Arealet av rektangelet er: {areal.rektangel}</p>
          </div>
        )}
      </div>
    );
  }
  
export default function Oppgave2() {
    return (
        <div className="App">
          <h1> Oppgave 2 </h1>
          <header className="App-header">
          <A />
          <B />
          <C />
          </header>
        </div>
      );
}