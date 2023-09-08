import './App.css';
import React, { useState } from 'react';

function A() {
  return (
      <div className='oppgaveBox'>
          <h2> Deloppgave 4 a) </h2>
          <p> Tekst her </p>
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