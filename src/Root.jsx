import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeContext } from './context/ThemeContext';

const Root = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;