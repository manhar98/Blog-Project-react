import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';

export default function App() {
  const currentPage = useSelector((state) => state.ui.currentPage);

  return (
    <div className="min-h-screen bg-[#05070c] text-gray-100 flex flex-col font-sans select-none">
      
      {/* Sticky Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <Home />
        ) : (
          <About />
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
