import './App.css';
import React, { useState, useEffect } from 'react';

const choices = ['stein', 'saks', 'papir'];
const images = {
  stein: 'https://www.davelabowitz.com/wp-content/uploads/Sisyphus-e1557869810488.jpg',
  saks: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzh7A4Wgf7AiRMQpwuQ8-DmXJjiKsmfKyFkQ&usqp=CAU',
  papir: 'https://www.collinsdictionary.com/images/full/paper_111691001.jpg',
  start: 'https://api.ndla.no/image-api/raw/sporsmal.jpg'
};

function A() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    const generateComputerChoice = () => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      return choices[randomIndex];
    };

    const determineWinner = (player, computer) => {
      if (player === computer) return 'Uavgjort';
      if (
        (player === 'stein' && computer === 'saks') ||
        (player === 'saks' && computer === 'papir') ||
        (player === 'papir' && computer === 'stein')
      ) {
        setPlayerScore(playerScore + 1);
        return 'Spilleren vinner!';
      } else {
        setComputerScore(computerScore + 1);
        return 'Datamaskinen vinner!';
      }
    };

    if (playerChoice !== null) {
      const computer = generateComputerChoice();
      const winner = determineWinner(playerChoice, computer);
      setComputerChoice(computer);
      setResult(winner);
      setPlayerChoice(null); // Resetter spillerens valg etter hver runde
    }
  }, [playerChoice, playerScore, computerScore]);

  const handleChoice = (choice) => {
    if (playerChoice === null) {
      setPlayerChoice(choice);
    }
  };

  return (
    <div className="oppgaveBox1">
      <div className="left-section">
        <h2>Poeng</h2>
        <h2>{playerScore}</h2>
        <div className="image-container">
          <button onClick={() => handleChoice('stein')}>
            <img src={images.stein} alt="Bilde" />
          </button>
        </div>
        <div className="image-container">
          <button onClick={() => handleChoice('saks')}>
            <img src={images.saks} alt="Bilde" />
          </button>
        </div>
        <div className="image-container">
          <button onClick={() => handleChoice('papir')}>
            <img src={images.papir} alt="Bilde" />
          </button>
        </div>
      </div>
      <div className="right-section">
        <h2>Poeng</h2>
        <h2>{computerScore}</h2>
        <div className="right-image">
          {computerChoice ? (
            <img src={images[computerChoice]} alt="Datamaskinens valg" />
          ) : (
            <img src={images.start} alt="Start" />
          )}
        </div>
      </div>
      {result && (
        <div className="result">
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
}

export default function Steinsakspapir() {
  return (
    <div className="App">
      <h1>Stein Saks Papir</h1>
      <header className="App-header">
        <A />
      </header>
    </div>
  );
}