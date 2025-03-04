import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = total ? (current / total) * 100 : 0;
  
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-center mt-1">
        Problem {current} of {total}
      </div>
    </div>
  );
}

export default ProgressBar;
