import React from 'react';

function LevelComplete({ status, score, onNextLevel, onRestart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center max-w-sm mx-4">
        <h2 className="text-3xl font-bold mb-4">
          {status === 'levelComplete' ? 'Level Complete!' : 'Game Complete!'}
        </h2>
        <p className="text-xl mb-6">
          {status === 'levelComplete' 
            ? 'Great job! Ready for the next challenge?' 
            : 'Congratulations! You completed all 20 levels!'}
        </p>
        <p className="text-2xl font-bold mb-6">
          Score: {score}
        </p>
        {status === 'levelComplete' ? (
          <button 
            onClick={onNextLevel}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Next Level
          </button>
        ) : (
          <button 
            onClick={onRestart}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default LevelComplete;
