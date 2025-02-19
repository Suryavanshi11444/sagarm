import { useState, useEffect } from "react";
import Question from "./Question";
import questions from "../data/questions";
import Timer from "./Timer";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [locked, setLocked] = useState(Array(questions.length).fill(false));
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [globalTime, setGlobalTime] = useState(600); // 10 minutes
  const [questionTime, setQuestionTime] = useState(15); // 15 seconds per question

  // Global timer (10 minutes)
  useEffect(() => {
    if (globalTime === 0) {
      setQuizCompleted(true);
      return;
    }
    const globalTimer = setInterval(() => setGlobalTime((prev) => prev - 1), 1000);
    return () => clearInterval(globalTimer);
  }, [globalTime]);

  // Question timer (15 seconds per question)
  useEffect(() => {
    if (questionTime === 0 && !locked[currentQuestion]) {
      autoSaveAnswer();
      return;
    }
    const questionTimer = setInterval(() => setQuestionTime((prev) => prev - 1), 1000);
    return () => clearInterval(questionTimer);
  }, [questionTime]);

  // Auto-save selected answer when 15 seconds expire
  const autoSaveAnswer = () => {
    const newLocked = [...locked];
    newLocked[currentQuestion] = true;
    setLocked(newLocked);
    handleNext();
  };

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    const newLocked = [...locked];
    newLocked[currentQuestion] = true;
    setLocked(newLocked);

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 4);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTime(15); // Reset 15-sec timer for next question
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div>
      {!quizCompleted ? (
        <div className="container">
          <h2>Quiz App</h2>
          <p>Time Left: {Math.floor(globalTime / 60)}:{(globalTime % 60).toString().padStart(2, '0')}, Question Timer: {questionTime}s</p>
          
          
          <Question 
            question={questions[currentQuestion]} 
            index={currentQuestion} 
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion]}
            isLocked={locked[currentQuestion]}
            onNext={handleNext}
            onPrev={handlePrev}
          />
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