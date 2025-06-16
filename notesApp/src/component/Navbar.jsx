import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md z-50">
      <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md">
          NoteForge
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-md transition duration-300 ${
                isActive
                  ? 'bg-white text-gray-900 font-semibold shadow-md scale-105'
                  : 'hover:text-blue-300 hover:underline underline-offset-4'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-md transition duration-300 ${
                isActive
                  ? 'bg-white text-gray-900 font-semibold shadow-md scale-105'
                  : 'hover:text-blue-300 hover:underline underline-offset-4'
              }`
            }
          >
            Pastes
          </NavLink>
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
