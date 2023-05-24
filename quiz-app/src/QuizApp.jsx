import React, { useState, useEffect, useCallback } from "react";
import QuizResult from "./QuizResult";

const QuizApp = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Vincent van Gogh",
        "Michelangelo",
      ],
      answer: "Leonardo da Vinci",
    },
    {
      title: "Which language run in a browser",
      options: ["Java", "Python", "C", "JavaScript"],
      answer: "JavaScript",
    },

    {
      title: "What does CSS stands for",
      options: [
        "Centeral Styles Sheet",
        "Casecading smple Sheets",
        "Cascading Style Sheets",
        "Cars SUVs Sailbots",
      ],
      answer: "Cascading Style Sheets",
    },

    {
      title: "What does HTML stand for",
      options: [
        "Hypertext Markup Language",
        "Hypertext Markdoen Language",
        "Hypertext Machine Language",
        "Helicopters Terminals  motorboats Lamborginies",
      ],
      answer: "Hypertext Markup Language",
    },

    {
      title: "What year was JavaScript launched",
      options: ["1996", "1995", "1994", "None of these"],
      answer: "1994",
    },
    // Add more questions here
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Countdown timer in seconds
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);

  const handleNextQuestion = useCallback(() => {
    setSelectedOption("");
    setShowNext(false);
    setTimerRunning(true);

    const currentQuestionData = questions[currentQuestion];
    if (selectedOption === currentQuestionData.answer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      // Quiz completed
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10); // Reset timer for the next question
    }
  }, [currentQuestion, questions, score, selectedOption]);
  useEffect(() => {
    // if (start)
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    if (timerRunning) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [handleNextQuestion, timeLeft, timerRunning]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowNext(true);
    setTimerRunning(false);
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div>
      <h1>Quiz App</h1>
      {quizCompleted ? (
        <QuizResult score={score} totalQuestions={questions.length} />
      ) : (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <h3>{currentQuestionData.question}</h3>

          <div>
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={showNext}
              >
                {option}
              </button>
            ))}
          </div>

          {showNext && (
            <div>
              <p>Time's up! Moving to the next question...</p>
              <button onClick={handleNextQuestion}>Next</button>
            </div>
          )}

          <div>
            <p>Time Left: {timeLeft} seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
