const QuizResult = ({ score, totalQuestions }) => {
  const percentageScore = (score / totalQuestions) * 100;

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        Your score: {score}/{totalQuestions}
      </p>
      <p>Percentage Score: {percentageScore.toFixed(2)}%</p>
    </div>
  );
};

export default QuizResult;
