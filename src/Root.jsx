import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const Root = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;