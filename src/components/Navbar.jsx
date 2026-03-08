import React, { useContext } from "react";
import { FaSearch, FaShoppingCart, FaMoon, FaUser, FaSlidersH, FaSun } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`w-full ${isDarkMode ? 'bg-[#111]' : 'bg-white border-b border-gray-200'} px-6 py-3 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>

      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-red-600 text-2xl">▶</span>
        <span>streamtube</span>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'} rounded-full px-4 py-1 w-[500px] transition-colors duration-300`}>

        <FaSlidersH className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mr-3`} />

        <input
          type="text"
          placeholder="Search here..."
          className={`bg-transparent outline-none flex-1 text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
        />

        <button className="bg-red-600 text-white px-5 py-2 rounded-full ml-2 flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
          <FaSearch />
        </button>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Cart */}
        <FaShoppingCart className={`text-lg cursor-pointer ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'} transition-colors duration-200`} />

        {/* Sign In */}
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-200">
          <FaUser />
          Sign In
        </button>

        {/* Dark/Light mode toggle */}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 hover:scale-110' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-110'
          }`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </button>

      </div>
    </div>
  );
};

export default Navbar;