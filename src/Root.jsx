import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Footer ইম포트 করুন
import { ThemeContext } from './context/ThemeContext';

const Root = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      <Navbar />
      <main className="flex-grow"> {/* main এলিমেন্ট যোগ করুন */}
        <Outlet />
      </main>
      <Footer /> {/* Footer যোগ করুন */}
    </div>
  );
};

export default Root;