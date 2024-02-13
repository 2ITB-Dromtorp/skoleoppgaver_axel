import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "Hva står HTML for?",
    options: ["Hyper Text Markup Language", "High-level Text Modeling Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    id: 2,
    question: "Hva er et JavaScript-rammeverk for å bygge brukergrensesnitt?",
    options: ["Angular", "React", "Vue", "Ember"],
    correctAnswer: "React"
  },
  {
    id: 3,
    question: "Hvilken av følgende er et operativsystem?",
    options: ["Microsoft Word", "Linux", "Photoshop", "Microsoft Excel"],
    correctAnswer: "Linux"
  },
  {
    id: 4,
    question: "Hva er de viktigste egenskapene til en god CSS-stil?",
    options: ["Fleksibilitet", "Lesbarhet", "Gjenbrukbarhet", "Skalerbarhet"],
    correctAnswer: ["Lesbarhet", "Gjenbrukbarhet"]
  },
  {
    id: 5,
    question: "Hvilke av følgende er front-end programmeringsspråk?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: ["JavaScript"]
  },
  {
    id: 6,
    question: "Hva er fordelene med å bruke versjonskontrollsystemer som Git?",
    options: ["Sporing av endringer", "Samarbeid mellom utviklere", "Sikkerhetskopi", "Versjonshistorikk"],
    correctAnswer: ["Sporing av endringer", "Samarbeid mellom utviklere", "Versjonshistorikk"]
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    const answerIndex = newSelectedAnswers.indexOf(answer);

    if (answerIndex === -1) {
      newSelectedAnswers.push(answer);
    } else {
      newSelectedAnswers.splice(answerIndex, 1);
    }

    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    const correctAnswers = questions[currentQuestion].correctAnswer;
    let isCorrect = false;
    
    if (Array.isArray(correctAnswers)) {
      isCorrect = selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every(answer => correctAnswers.includes(answer));
    } else {
      isCorrect = selectedAnswers.length === 1 && selectedAnswers[0] === correctAnswers;
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswers([]);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      <div className="quiz-content">
        {currentQuestion < questions.length ? (
          <div className="quiz-form">
            <h2>{questions[currentQuestion].question}</h2>

            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index}>
                  <input
                    type={Array.isArray(questions[currentQuestion].correctAnswer) ? "checkbox" : "radio"}
                    id={option}
                    name="answer"
                    value={option}
                    checked={selectedAnswers.includes(option)}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>

            <button onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? "Fullfør" : "Neste"}
            </button>
          </div>
        ) : (
          <div className="quiz-result">
            <h2>Quiz fullført!</h2>
            <p>Din poengsum: {score} av {questions.length}</p>
            <button onClick={handleTryAgain}>Prøv igjen</button>
          </div>
        )}
      </div>
    </div>
  );
}
