import React from 'react';

export default function IconButton({ icon: Icon, onClick, variant = 'default', title = '', className = '' }) {
  const baseStyle = "p-2 rounded-lg border transition-all duration-200 active:scale-95";
  
  const variants = {
    default: "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/5",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border-red-500/10 hover:border-red-500/20",
    success: "bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border-green-500/10 hover:border-green-500/20",
    info: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/10 hover:border-blue-500/20"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      title={title}
    >
      <Icon size={14} />
    </button>
  );
}
