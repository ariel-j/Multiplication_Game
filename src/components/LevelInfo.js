import React from 'react';

function LevelInfo({ level, score, streak }) {
  return (
    <div className="mb-6">
      <div className="text-2xl font-bold text-center mb-2">Level {level}</div>
      <div className="flex justify-between">
        <div className="text-lg">Score: <span className="font-bold">{score}</span></div>
        <div className="text-lg">
          Streak: <span className="font-bold text-orange-500">{streak}</span>
        </div>
      </div>
    </div>
  );
}

export default LevelInfo;
