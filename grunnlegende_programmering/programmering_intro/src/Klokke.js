import React, { useState, useEffect } from 'react';


function DigitalKlokke() {
    const [tid, setTid] = useState(new Date());
  
    useEffect(() => {
      const intervall = setInterval(() => {
        setTid(new Date());
      }, 1000);
  
      return () => clearInterval(intervall);
    }, []);
  
    const formatTid = (dato) => {
      const timer = dato.getHours().toString().padStart(2, '0');
      const minutter = dato.getMinutes().toString().padStart(2, '0');
      const sekunder = dato.getSeconds().toString().padStart(2, '0');
      return `${timer}:${minutter}:${sekunder}`;
    };
  
    return (
      <div className='oppgaveBox'>
        <h3>Digital Klokke</h3>
        <p>{formatTid(tid)}</p>
      </div>
    );
  }
  


export default function Klokke() {
    return (
        <div className="App">
          <h1> Klokke </h1>
          <header className="App-header">
          <DigitalKlokke />

          </header>
        </div>
      );
}