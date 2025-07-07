import React from 'react';
import { Link } from 'react-router-dom';
import { BoltIcon, ArrowPathIcon, BellAlertIcon } from '@heroicons/react/24/outline';

export default function RightNav() {
  return (
    <aside className="hidden lg:flex flex-col gap-8 w-100 p-6 bg-white rounded-2xl shadow-md min-h-[80vh] max-h-[90vh] mt-4 mr-6 ml-auto transition-all duration-300 overflow-y-auto scrollbar-hide">
      {/* Quick Actions */}
      <section className="min-w-0">
        <h2 className="text-lg font-semibold text-[#252525] mb-4 truncate">Quick Actions</h2>
        <div className="flex flex-col gap-3 min-w-0">
          <button className="flex items-center gap-3 px-4 py-3 bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-xl text-[#252525] font-medium shadow-sm transition-all duration-200 min-w-0">
            <BoltIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <span className="truncate">New Task</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-xl text-[#252525] font-medium shadow-sm transition-all duration-200 min-w-0">
            <ArrowPathIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="truncate">Sync Data</span>
          </button>

          {/* Insight Button */}
          <Link
            to="/insight"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold shadow-sm transition-all duration-200 mt-2 min-w-0"
            style={{ textDecoration: 'none' }}
          >
            <BoltIcon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Insight</span>
          </Link>
        </div>
      </section>

      {/* Live Updates */}
      <section className="min-w-0">
        <h2 className="text-lg font-semibold text-[#252525] mb-4 truncate">Live Updates</h2>
        <div className="flex flex-col gap-3 min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#f7f7f7] rounded-xl text-[#252525] shadow-sm min-w-0 overflow-hidden">
            <BellAlertIcon className="w-5 h-5 text-red-500 animate-pulse flex-shrink-0" />
            <span className="truncate">2 new notifications</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-[#f7f7f7] rounded-xl text-[#252525] shadow-sm min-w-0 overflow-hidden">
            <ArrowPathIcon className="w-5 h-5 text-green-500 animate-spin flex-shrink-0" />
            <span className="truncate">Syncing in progress...</span>
          </div>
        </div>
      </section>

      {/* More */}
      <section className="min-w-0">
        <h2 className="text-lg font-semibold text-[#252525] mb-4 truncate">More</h2>
        <div className="flex flex-col gap-3 min-w-0">
          <Link
            to="/dashboard/insight"
            className="flex items-center gap-3 px-4 py-3 bg-[#f7f7f7] hover:bg-[#e0e7ff] rounded-xl text-[#252525] font-medium shadow-sm transition-all duration-200 border border-transparent hover:border-indigo-200 min-w-0"
            style={{ textDecoration: 'none' }}
          >
            <BoltIcon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            <span className="truncate">Insight</span>
          </Link>
          <button className="px-4 py-3 bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-xl text-[#252525] font-medium shadow-sm transition-all duration-200 min-w-0 overflow-hidden truncate">Settings</button>
          <button className="px-4 py-3 bg-[#f7f7f7] hover:bg-[#f0f0f0] rounded-xl text-[#252525] font-medium shadow-sm transition-all duration-200 min-w-0 overflow-hidden truncate">Help Center</button>
        </div>
      </section>
    </aside>
  );
}
