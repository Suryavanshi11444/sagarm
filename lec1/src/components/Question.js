import { useEffect, useState } from "react";
import Timer from "./Timer";

const Question = ({ question, index, onAnswer, selectedAnswer, isLocked, onNext, onPrev }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || null);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
  }, [selectedAnswer]);

  const handleSelect = (option) => {
    if (!isLocked) setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!isLocked) onAnswer(selectedOption);
  };

  return (
    <div className="container">
      <h2>Question {index + 1}</h2>
      <p className="question-text">{question.question}</p>

      {/* Rendering Options with Styled Buttons */}
      {question.options.map((option, idx) => (
        <div key={idx} className="option">
          <button
            className={selectedOption === option ? "selected" : ""}
            onClick={() => handleSelect(option)}
            disabled={isLocked}
          >
            {option}
          </button>
        </div>
      ))}

      {/* Submit and Navigation Buttons */}
      <button className="submit" onClick={handleSubmit} disabled={isLocked}>Submit</button>

      {isLocked && (
        <>
          <p>{selectedAnswer === question.answer ? "✅ Correct" : `❌ Wrong! Correct: ${question.answer}`}</p>
          <button className="next" onClick={onNext}>Next</button>
        </>
      )}

      {index > 0 && <button className="prev" onClick={onPrev}>Previous</button>}
    </div>
  );
};

export default Question;