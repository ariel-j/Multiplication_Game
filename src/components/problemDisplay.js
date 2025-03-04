import React from 'react';

function ProblemDisplay({ problem, feedback }) {
  if (!problem) return <div className="h-24 flex items-center justify-center">Loading...</div>;
  
  const feedbackColor = feedback === 'correct' ? 'text-green-500' : 
                       feedback === 'incorrect' ? 'text-red-500' : '';
  
  return (
    <div className="flex flex-col items-center my-8">
      <div className={`text-4xl font-bold mb-2 ${feedbackColor}`}>
        {problem.text}
      </div>
      {feedback === 'correct' && (
        <div className="text-green-500 font-bold">Correct!</div>
      )}
      {feedback === 'incorrect' && (
        <div className="text-red-500 font-bold">Try again!</div>
      )}
    </div>
  );
}

export default ProblemDisplay;
