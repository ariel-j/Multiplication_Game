import React, { useState, useEffect } from 'react';
import LevelInfo from './LevelInfo';
import ProgressBar from './ProgressBar';
import ProblemDisplay from './ProblemDisplay';
import AnswerInput from './AnswerInput';
import LevelComplete from './LevelComplete';
import levelConfig from '../utils/levelConfig';
import { generateProblemsForLevel } from '../utils/problemGenerator';

function Game() {
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    problems: [],
    currentProblemIndex: 0,
    score: 0,
    streak: 0,
    gameStatus: 'playing', // 'playing', 'levelComplete', 'gameComplete'
    answer: '',
    feedback: null, // null, 'correct', 'incorrect'
  });

  // Initialize level problems
  useEffect(() => {
    loadLevelProblems(gameState.currentLevel);
  }, [gameState.currentLevel]);

  const loadLevelProblems = (level) => {
    const levelData = levelConfig[level - 1];
    const newProblems = generateProblemsForLevel(levelData);
    
    setGameState(prev => ({
      ...prev,
      problems: newProblems,
      currentProblemIndex: 0,
      gameStatus: 'playing',
      feedback: null,
      answer: '',
    }));
  };

  const handleAnswerChange = (value) => {
    setGameState(prev => ({
      ...prev,
      answer: value
    }));
  };

  const handleAnswerSubmit = () => {
    const { problems, currentProblemIndex, answer, score, streak } = gameState;
    const currentProblem = problems[currentProblemIndex];
    
    if (!currentProblem) return;

    const userAnswer = parseInt(answer, 10);
    const isCorrect = userAnswer === currentProblem.product;

    // Update state based on answer correctness
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? score + 10 + streak * 2 : score,
      streak: isCorrect ? streak + 1 : 0,
      feedback: isCorrect ? 'correct' : 'incorrect',
    }));

    // Process answer after feedback display
    setTimeout(() => {
      if (isCorrect) {
        processCorrectAnswer();
      } else {
        resetFeedback();
      }
    }, 1000);
  };

  const processCorrectAnswer = () => {
    const { currentProblemIndex, problems, currentLevel } = gameState;
    
    if (currentProblemIndex < problems.length - 1) {
      // Move to next problem
      setGameState(prev => ({
        ...prev,
        currentProblemIndex: currentProblemIndex + 1,
        feedback: null,
        answer: '',
      }));
    } else {
      // Level completed
      setGameState(prev => ({
        ...prev,
        gameStatus: currentLevel < 20 ? 'levelComplete' : 'gameComplete',
        feedback: null,
        answer: '',
      }));
    }
  };

  const resetFeedback = () => {
    setGameState(prev => ({
      ...prev,
      feedback: null,
      answer: '',
    }));
  };

  const handleNextLevel = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
    }));
  };

  const restartGame = () => {
    setGameState(prev => ({
      ...prev,
      currentLevel: 1,
      score: 0,
      streak: 0,
    }));
  };

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
      <LevelInfo 
        level={gameState.currentLevel} 
        score={gameState.score} 
        streak={gameState.streak} 
      />
      
      <ProgressBar 
        current={gameState.currentProblemIndex + 1} 
        total={gameState.problems.length} 
      />
      
      <ProblemDisplay 
        problem={gameState.problems[gameState.currentProblemIndex]} 
        feedback={gameState.feedback} 
      />
      
      <AnswerInput 
        value={gameState.answer} 
        onChange={handleAnswerChange} 
        onSubmit={handleAnswerSubmit} 
        disabled={gameState.feedback !== null} 
      />
      
      {gameState.gameStatus !== 'playing' && (
        <LevelComplete 
          status={gameState.gameStatus}
          score={gameState.score}
          onNextLevel={handleNextLevel}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default Game;
