// quiz.js
import React, { useState } from "react";
import './App.css';

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {currentQuestion < questions.length ? (
        <div className="quiz-form">
          <h2>{questions[currentQuestion].question}</h2>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelect(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>

          <button onClick={handleNextQuestion}>Next</button>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
}
