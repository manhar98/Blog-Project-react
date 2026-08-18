import React from 'react';

export default function PrimaryButton({ children, onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/15 hover:shadow-purple-700/25 active:scale-98 transition-all duration-200 border border-purple-500/20 ${className}`}
    >
      {children}
    </button>
  );
}
