import { useState, useEffect } from "react";
import Question from "./Question";
import ResultPage from "./ResultPage"; // Import the new result page
import questions from "../data/questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [locked, setLocked] = useState(Array(questions.length).fill(false));
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionTime, setQuestionTime] = useState(15); // 15 seconds per question
  const [showResultPage, setShowResultPage] = useState(false); // For result page display

  useEffect(() => {
    if (questionTime === 0 && !locked[currentQuestion]) {
      autoSaveAnswer();
      return;
    }
    const timer = setInterval(() => setQuestionTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [questionTime]);

  // Auto-save selected answer when 15 seconds expire
  const autoSaveAnswer = () => {
    setLocked((prev) => {
      const newLocked = [...prev];
      newLocked[currentQuestion] = true;
      return newLocked;
    });
    setShowResultPage(true); // Show the result page instead of options
  };

  const handleAnswerSelect = (selectedOption) => {
    if (!locked[currentQuestion]) {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = selectedOption;
        return newAnswers;
      });

      setLocked((prev) => {
        const newLocked = [...prev];
        newLocked[currentQuestion] = true;
        return newLocked;
      });

      if (selectedOption === questions[currentQuestion].answer) {
        setScore((prev) => prev + 4);
      }

      setShowResultPage(true); // Show the result page after answering
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTime(15); // Reset timer
      setShowResultPage(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResultPage(false);
    }
  };

  return (
    <div>
      {!quizCompleted ? (
        <div className="container">
          <h2>Quiz App</h2>
          <p>Time Left for Question: {questionTime}s</p>

          {!showResultPage ? (
            <Question 
              question={questions[currentQuestion]} 
              onAnswerSelect={handleAnswerSelect} 
              selectedAnswer={answers[currentQuestion]}
              isLocked={locked[currentQuestion]}
            />
          ) : (
            <ResultPage 
              question={questions[currentQuestion]} 
              selectedAnswer={answers[currentQuestion]} 
            />
          )}

          <div className="button-container">
            {currentQuestion > 0 && <button onClick={handlePrev}>Previous</button>}
            {showResultPage ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={autoSaveAnswer}>Submit</button>
            )}
          </div>
        </div>
      ) : (
        <div className="score-container">
          <h2>Quiz Completed!</h2>
          <p className="score">Score: {score} / {questions.length * 4}</p>
          <p>✅ Attempted: {answers.filter(a => a !== null).length} / {questions.length}</p>
          <p>❌ Unattempted: {answers.filter(a => a === null).length} / {questions.length}</p>
          <p className="thank-you">🎉 Thank you for participating! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
