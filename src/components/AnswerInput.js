import React from 'react';

function AnswerInput({ value, onChange, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      onSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center mb-6">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="px-4 py-2 text-2xl border-2 border-blue-300 rounded-lg w-24 text-center"
        placeholder="?"
        autoFocus
      />
      <button
        onClick={onSubmit}
        disabled={disabled || value.trim() === ''}
        className="ml-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg 
                  disabled:bg-blue-200 hover:bg-blue-600 transition"
      >
        Check
      </button>
    </div>
  );
}

export default AnswerInput;
