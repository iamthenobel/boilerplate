// components/Dashboard.jsx
import React from 'react';
import {
  FiUsers, FiShoppingCart, FiDollarSign, FiActivity, // Stats icons
  FiBell, FiMessageSquare, FiCheckCircle, FiPlus, FiDownload, FiUpload, // Activity & Action icons
  FiBarChart2, FiPieChart // Chart icons (placeholder)
} from 'react-icons/fi';

// Helper function to format numbers for readability
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
};

export default function Dashboard() {
  // Dummy data for dashboard components
  const stats = [
    { title: 'Total Users', value: 12345, icon: <FiUsers className="text-3xl text-indigo-500" />, change: '+1.2%', trend: 'up' },
    { title: 'Total Orders', value: 7890, icon: <FiShoppingCart className="text-3xl text-green-500" />, change: '-0.5%', trend: 'down' },
    { title: 'Revenue', value: 250000, icon: <FiDollarSign className="text-3xl text-yellow-500" />, change: '+3.1%', trend: 'up' },
    { title: 'Active Sessions', value: 456, icon: <FiActivity className="text-3xl text-blue-500" />, change: '+0.8%', trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, type: 'order', description: 'New order #1001 from Jane Doe', time: '5 mins ago', icon: <FiShoppingCart className="text-green-500" /> },
    { id: 2, type: 'user', description: 'John Smith registered a new account', time: '1 hour ago', icon: <FiUsers className="text-indigo-500" /> },
    { id: 3, type: 'notification', description: 'System update available', time: '3 hours ago', icon: <FiBell className="text-yellow-500" /> },
    { id: 4, type: 'comment', description: 'New comment on blog post "React Tips"', time: 'Yesterday', icon: <FiMessageSquare className="text-blue-500" /> },
    { id: 5, type: 'order', description: 'Order #999 shipped successfully', time: '2 days ago', icon: <FiCheckCircle className="text-purple-500" /> },
  ];

  const quickActions = [
    { name: 'Add New Product', icon: <FiPlus className="text-xl" />, action: () => alert('Add New Product clicked!') },
    { name: 'Generate Report', icon: <FiDownload className="text-xl" />, action: () => alert('Generate Report clicked!') },
    { name: 'Upload Data', icon: <FiUpload className="text-xl" />, action: () => alert('Upload Data clicked!') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome, John Doe!</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Here's an overview of your dashboard today.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6
                flex items-center space-x-4 transform hover:scale-105 transition-transform duration-200
                border border-gray-100 dark:border-gray-700
              "
            >
              <div className="flex-shrink-0 p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(stat.value)}</p>
                <div className="flex items-center text-sm mt-1">
                  <span className={`font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">vs. last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity / Notifications */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FiBell className="text-indigo-500" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FiPlus className="text-indigo-500" /> Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="
                    w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg
                    bg-indigo-600 text-white font-semibold
                    hover:bg-indigo-700 transition duration-200 shadow-md
                  "
                >
                  {action.icon}
                  <span>{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section (Placeholder) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FiBarChart2 className="text-teal-500" /> Sales Overview
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {/* Placeholder for a Bar Chart or Line Chart */}
              <p>Chart Placeholder: Sales Data</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FiPieChart className="text-orange-500" /> User Demographics
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {/* Placeholder for a Pie Chart */}
              <p>Chart Placeholder: User Demographics</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}