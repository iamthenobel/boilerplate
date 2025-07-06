// components/Header.jsx
import React from 'react';
import {
  FaBell, FaCog, FaUserCircle, FaBars, FaSearch
} from 'react-icons/fa'; // Import FaSearch for the search bar

export default function Header({ toggleSidebar }) {
  return (
    <header
      className="
        bg-white dark:bg-gray-800 shadow-sm dark:shadow-lg
        px-4 py-3 flex items-center justify-between w-full
        sticky top-0 z-40 transition-colors duration-300
      "
    >
      {/* Menu Toggle for Small Screens (visible only on small screens) */}
      <div className="lg:hidden mr-4"> {/* Added mr-4 for spacing */}
        <button
          onClick={toggleSidebar}
          className="
            text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
            focus:outline-none p-2 rounded-md transition-colors duration-200
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
          aria-label="Toggle sidebar menu"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Logo / Brand */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">MyDashboard</span>
      </div>

      {/* Search Bar */}
      {/* Increased padding, added focus ring, and icon */}
      <div className="flex-1 mx-4 max-w-md hidden md:flex items-center relative"> {/* Changed sm to md for wider visibility, added flex and relative */}
        <input
          type="text"
          placeholder="Search anything..."
          className="
            w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600
            rounded-lg bg-gray-50 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
            transition duration-200 text-sm
          "
          aria-label="Search dashboard"
        />
        <FaSearch
          className="
            absolute left-3 text-gray-400 dark:text-gray-500
            pointer-events-none
          "
          size={16}
        />
      </div>

      {/* Right side - User Actions */}
      <div className="flex items-center space-x-3 ml-auto"> {/* Adjusted spacing */}
        <button
          className="
            text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
            focus:outline-none p-2 rounded-full transition-colors duration-200
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
          aria-label="Notifications"
        >
          <FaBell size={18} />
        </button>
        <button
          className="
            text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
            focus:outline-none p-2 rounded-full transition-colors duration-200
            hover:bg-gray-100 dark:hover:bg-gray-700
          "
          aria-label="Settings"
        >
          <FaCog size={18} />
        </button>
        <div
          className="
            relative group
            text-gray-600 dark:text-gray-300
          "
        >
          <FaUserCircle
            size={30} // Slightly larger icon
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors duration-200"
            aria-label="User profile"
          />
          {/* Optional: Add a small dropdown or tooltip on hover for user */}
           <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 hidden group-hover:block transition-all duration-200">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</a>
            <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</a>
          </div> 
        </div>
      </div>
    </header>
  );
}