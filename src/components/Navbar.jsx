import React from "react";
import { FaSearch, FaShoppingCart, FaMoon, FaUser, FaSlidersH } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-[#111] px-6 py-3 flex items-center justify-between text-white">

      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-red-600 text-2xl">▶</span>
        <span>streamtube</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-[#1e1e1e] rounded-full px-4 py-1 w-[500px]">

        <FaSlidersH className="text-gray-400 mr-3" />

        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent outline-none flex-1 text-sm"
        />

        <button className="bg-red-600 px-5 py-2 rounded-full ml-2 flex items-center justify-center">
          <FaSearch />
        </button>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Cart */}
        <FaShoppingCart className="text-lg cursor-pointer" />

        {/* Sign In */}
        <button className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full">
          <FaUser />
          Sign In
        </button>

        {/* Dark mode */}
        <FaMoon className="text-lg cursor-pointer" />

      </div>
    </div>
  );
};

export default Navbar;