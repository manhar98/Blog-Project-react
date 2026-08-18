import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../api/uiSlice';
import CreateIconButton from '../primary-button/CreateIconButton';
import { BookOpen, Compass, Info, Menu, X } from 'lucide-react';

export default function Header() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.ui.currentPage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    dispatch(setPage(page));
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="text-white h-5 w-5" />
              <div className="absolute inset-0 rounded-xl border border-white/20 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-wider text-white font-sans group-hover:text-purple-300 transition-colors">
              Blog
            </span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigateTo('home')}
              className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors ${
                currentPage === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Compass size={16} />
                Home
              </span>
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors ${
                currentPage === 'about' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Info size={16} />
                About
              </span>
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <CreateIconButton />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <CreateIconButton className="scale-90" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 px-4 py-4 space-y-3 animate-fade-in">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentPage === 'home' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/10' : 'text-gray-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Compass size={16} />
            Home Dashboard
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentPage === 'about' ? 'bg-purple-600/10 text-purple-400 border border-purple-500/10' : 'text-gray-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Info size={16} />
            About Panel
          </button>
        </div>
      )}
    </nav>
  );
}
