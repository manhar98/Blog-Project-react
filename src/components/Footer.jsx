import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black/40 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs text-gray-500 tracking-wider font-light">
          &copy; {new Date().getFullYear()} <span className="text-purple-400 font-semibold">Blog Studio</span>. Personal CRUD Panel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
