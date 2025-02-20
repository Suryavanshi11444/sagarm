const ResultPage = ({ question, selectedAnswer }) => {
  return (
    <div>
      <h3>Results</h3>
      <p>✅ Correct Answer: {question.answer}</p>
      {selectedAnswer !== question.answer && (
        <p>❌ Your Answer: {selectedAnswer}</p>
      )}
    </div>
  );
};

export default ResultPage;
