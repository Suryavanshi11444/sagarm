const Question = ({ question, onAnswerSelect, selectedAnswer, isLocked, isQuizCompleted }) => {
  return (
    <div>
      <h3>{question.text}</h3>

      {!isQuizCompleted &&
        question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            disabled={isLocked}
            className={selectedAnswer === option ? "selected" : ""}
          >
            {option}
          </button>
        ))}

      {isLocked && !isQuizCompleted && (
        <div className="answer-info">
          <p>✅ Correct Answer: {question.answer}</p>
          {selectedAnswer !== question.answer && (
            <p>❌ Your Answer: {selectedAnswer}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
