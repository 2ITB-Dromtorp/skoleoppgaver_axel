import React, { useState, useEffect } from "react";
import "./App.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/quiz")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error fetching quiz questions:", error));
  }, []);

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

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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

            <div className="quiz-progress">
              Spørsmål {currentQuestion + 1} av {questions.length}
            </div>

            <div className="navigation-buttons">
  {currentQuestion > 0 && (
    <button onClick={handlePreviousQuestion}>Tilbake</button>
  )}
  <button onClick={handleNextQuestion}>
    {currentQuestion === questions.length - 1 ? "Fullfør" : "Neste"}
  </button>
</div>

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