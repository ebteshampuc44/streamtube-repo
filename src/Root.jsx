// Root.jsx
import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext';

const Root = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  
  // যেসব পাথেই নেভবার/ফুটার দেখাবে না
  const hideLayout = location.pathname === '/shorts';

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      {!hideLayout && <Navbar />}
      <main className={`flex-grow ${hideLayout ? 'p-0' : ''}`}>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Root;