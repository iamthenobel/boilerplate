// components/Header.jsx
import React from 'react';
import { HiBars2 } from 'react-icons/hi2';

export default function Header({ toggleSidebar }) {
  return (
    <header
      className="bg-[#fbfbfb] dark:bg-[#252525] px-4 py-5 flex items-center w-full sticky top-0 z-40 transition-colors duration-300 shadow-none border-none"
    >
      {/* Menu Toggle for Small Screens (visible only on small screens) */}
      
      <div className="flex items-center">
        <span className="text-2xl font-bold text-[#252525] dark:text-white tracking-tight">Myuo</span>
      </div>
      <div className="lg:hidden float-right ml-auto">
        <button
          onClick={toggleSidebar}
          className="text-[#252525] dark:text-white focus:outline-none p-2 rounded-md transition-colors duration-200 hover:bg-[#f4f4f4] dark:hover:bg-[#333]"
          aria-label="Toggle sidebar menu"
        >
          <HiBars2 size={28} />
        </button>
      </div>
    </header>
  );
}