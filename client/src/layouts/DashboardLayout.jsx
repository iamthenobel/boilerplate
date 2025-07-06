// layouts/DashboardLayout.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar for mobile: slide in/out
  return (
    <div className="layout flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-white dark:bg-[#252525] shadow-lg transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '20rem', maxWidth: '95vw' }}
      >
        <Sidebar isSidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={() => setSidebarOpen(v => !v)} />
        <div className="content flex-1 overflow-y-auto p-4">
          <Outlet /> {/* Render nested route pages here */}
        </div>
      </div>
    </div>
  );
}