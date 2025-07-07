// layouts/DashboardLayout.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import RightNav from '../components/RightNav';
import { Outlet } from 'react-router-dom';
import '../styles/scrollbar-hide.css';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1s, replace with real loading logic if needed
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sidebar for mobile: slide in/out
  return (
    <div className="layout flex h-screen bg-[#fbfbfb] dark:bg-gray-900 text-gray-900 dark:text-gray-100 scrollbar-hide">
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
      {/* Main Content + RightNav */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={() => setSidebarOpen(v => !v)} />
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            {loading ? (
              <div className="space-y-6 animate-pulse">
                <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
                <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
                <div className="h-40 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
          <RightNav />
        </div>
      </div>
    </div>
  );
}