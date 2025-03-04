import React, { useState, useEffect } from 'react';
import './styles.css';

// Main App Component
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Multiplication Adventure</h1>
        <p className="app-subtitle">Master multiplication up to 400!</p>
      </header>
      <main className="main-content">
        <Game />
      </main>
      <footer className="app-footer">
        <p>© 2025 Multiplication Adventure</p>
      </footer>
    </div>
  );
}

// Level configuration data
const levelConfig = [
  { level: 1, minMultiplier: 1, maxMultiplier: 5, maxProduct: 25, problemCount: 5 },
  { level: 2, minMultiplier: 1, maxMultiplier: 5, maxProduct: 25, problemCount: 7 },
  { level: 3, minMultiplier: 2, maxMultiplier: 5, maxProduct: 25, problemCount: 7 },
  { level: 4, minMultiplier: 2, maxMultiplier: 6, maxProduct: 36, problemCount: 8 },
  { level: 5, minMultiplier: 2, maxMultiplier: 7, maxProduct: 49, problemCount: 8 },
  { level: 6, minMultiplier: 3, maxMultiplier: 7, maxProduct: 49, problemCount: 8 },
  { level: 7, minMultiplier: 3, maxMultiplier: 8, maxProduct: 64, problemCount: 9 },
  { level: 8, minMultiplier: 4, maxMultiplier: 8, maxProduct: 64, problemCount: 9 },
  { level: 9, minMultiplier: 4, maxMultiplier: 9, maxProduct: 81, problemCount: 9 },
  { level: 10, minMultiplier: 5, maxMultiplier: 9, maxProduct: 81, problemCount: 10 },
  { level: 11, minMultiplier: 5, maxMultiplier: 10, maxProduct: 100, problemCount: 10 },
  { level: 12, minMultiplier: 6, maxMultiplier: 10, maxProduct: 100, problemCount: 10 },
  { level: 13, minMultiplier: 6, maxMultiplier: 12, maxProduct: 144, problemCount: 10 },
  { level: 14, minMultiplier: 7, maxMultiplier: 12, maxProduct: 144, problemCount: 11 },
  { level: 15, minMultiplier: 8, maxMultiplier: 13, maxProduct: 169, problemCount: 11 },
  { level: 16, minMultiplier: 9, maxMultiplier: 15, maxProduct: 225, problemCount: 11 },
  { level: 17, minMultiplier: 10, maxMultiplier: 15, maxProduct: 225, problemCount: 12 },
  { level: 18, minMultiplier: 10, maxMultiplier: 17, maxProduct: 289, problemCount: 12 },
  { level: 19, minMultiplier: 11, maxMultiplier: 18, maxProduct: 324, problemCount: 12 },
  { level: 20, minMultiplier: 12, maxMultiplier: 20, maxProduct: 400, problemCount: 15 },
];

// Utility functions for problem generation
function generateRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMultiplicationProblem(minMultiplier, maxMultiplier, maxProduct) {
  let a, b, product;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    a = generateRandomInRange(minMultiplier, maxMultiplier);
    b = generateRandomInRange(minMultiplier, maxMultiplier);
    product = a * b;
    attempts++;
  } while (product > maxProduct && attempts < maxAttempts);

  // If we couldn't find a valid problem within constraints, adjust
  if (product > maxProduct) {
    a = Math.min(a, Math.floor(Math.sqrt(maxProduct)));
    b = Math.min(b, Math.floor(maxProduct / a));
    product = a * b;
  }

  return {
    factorA: a,
    factorB: b,
    product: product,
    text: `${a} × ${b} = ?`
  };
}

function generateProblemsForLevel(levelData) {
  const { minMultiplier, maxMultiplier, maxProduct, problemCount } = levelData;
  const problems = [];

  for (let i = 0; i < problemCount; i++) {
    problems.push(generateMultiplicationProblem(minMultiplier, maxMultiplier, maxProduct));
  }

  return problems;
}

// Main Game Component
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
    <div className="game-container">
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

// Level Information Component
function LevelInfo({ level, score, streak }) {
  return (
    <div className="level-info">
      <div className="level-title">Level {level}</div>
      <div className="level-stats">
        <div className="score-display">Score: <span className="score-value">{score}</span></div>
        <div className="streak-display">
          Streak: <span className="streak-value">{streak}</span>
        </div>
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ current, total }) {
  const percentage = total ? (current / total) * 100 : 0;
  
  return (
    <div className="progress-container">
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-text">
        Problem {current} of {total}
      </div>
    </div>
  );
}

// Problem Display Component
function ProblemDisplay({ problem, feedback }) {
  if (!problem) return <div className="problem-display">Loading...</div>;
  
  const problemClass = feedback === 'correct' 
    ? 'problem-text problem-text-correct' 
    : feedback === 'incorrect' 
      ? 'problem-text problem-text-incorrect' 
      : 'problem-text';
  
  return (
    <div className="problem-display">
      <div className={problemClass}>
        {problem.text}
      </div>
      {feedback === 'correct' && (
        <div className="feedback-text feedback-correct">Correct!</div>
      )}
      {feedback === 'incorrect' && (
        <div className="feedback-text feedback-incorrect">Try again!</div>
      )}
    </div>
  );
}

// Answer Input Component
function AnswerInput({ value, onChange, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      onSubmit();
    }
  };

  return (
    <div className="answer-container">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="answer-input"
        placeholder="?"
        autoFocus
      />
      <button
        onClick={onSubmit}
        disabled={disabled || value.trim() === ''}
        className="check-button"
      >
        Check
      </button>
    </div>
  );
}

// Level Complete Overlay Component
function LevelComplete({ status, score, onNextLevel, onRestart }) {
  return (
    <div className="level-complete-overlay">
      <div className="level-complete-modal">
        <h2 className="level-complete-title">
          {status === 'levelComplete' ? 'Level Complete!' : 'Game Complete!'}
        </h2>
        <p className="level-complete-message">
          {status === 'levelComplete' 
            ? 'Great job! Ready for the next challenge?' 
            : 'Congratulations! You completed all 20 levels!'}
        </p>
        <p className="level-complete-score">
          Score: {score}
        </p>
        {status === 'levelComplete' ? (
          <button 
            onClick={onNextLevel}
            className="next-level-button"
          >
            Next Level
          </button>
        ) : (
          <button 
            onClick={onRestart}
            className="restart-button"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default App;