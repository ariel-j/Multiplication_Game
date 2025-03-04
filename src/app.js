import React from 'react';
import Game from './components/game';

function App() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Multiplication Adventure</h1>
        <p className="text-sm">Master multiplication up to 400!</p>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <Game />
      </main>
    </div>
  );
}

export default App;
