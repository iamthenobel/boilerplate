import { useState, useEffect } from 'react';
import {
  FiSettings, FiMoon, FiSun, FiBell, FiLock, FiUser, // Additional icons
  FiGlobe, FiShare2, FiShield, FiMail, FiPhone, FiCreditCard, FiTrash2
} from 'react-icons/fi';
import { MdOutlineSecurity } from 'react-icons/md'; // Example for a dedicated security icon

export default function Settings() {
  // Initialize dark mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('public');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [accountDeletionWarning, setAccountDeletionWarning] = useState(false); // State for modal

  // Effect to apply dark mode class to HTML and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleNotifications = () => setNotifications(prev => !prev);

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, send deletion request to backend
      alert('Account deletion initiated. You will be logged out.');
      // Redirect to logout or home page
    }
  };

  return (
    <div className="min-h-screen pb-12 text-sm sm:text-base">
      <div className="container mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8 p-4 sm:p-6">

        {/* Header Section */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <FiSettings className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Settings</h2>
        </div>

        <div className="space-y-10">
          {/* General Settings */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FiUser className="text-indigo-500" /> General Preferences
            </h3>
            <div className="space-y-5">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {darkMode ? <FiMoon className="w-6 h-6 text-yellow-500" /> : <FiSun className="w-6 h-6 text-orange-400" />}
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Dark Mode</span>
                </div>
                <button
                  className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-indigo-600' : 'bg-gray-400'}`}
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  role="switch"
                  aria-checked={darkMode}
                >
                  <span
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>

              {/* Language (Placeholder) */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiGlobe className="w-6 h-6 text-blue-500" />
                  <label htmlFor="language-select" className="font-semibold text-gray-700 dark:text-gray-200 text-lg">Language</label>
                </div>
                <select
                  id="language-select"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FiBell className="text-purple-500" /> Notification Preferences
            </h3>
            <div className="space-y-5">
              {/* Push Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiBell className="w-6 h-6 text-purple-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">In-App Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={toggleNotifications}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiMail className="w-6 h-6 text-pink-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Email Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(prev => !prev)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* SMS Notifications (Placeholder) */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiPhone className="w-6 h-6 text-green-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">SMS Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(prev => !prev)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-700 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <MdOutlineSecurity className="text-red-500" /> Privacy & Security
            </h3>
            <div className="space-y-5">
              {/* Profile Privacy */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiLock className="w-6 h-6 text-red-400" />
                  <label htmlFor="privacy-select" className="font-semibold text-gray-700 dark:text-gray-200">Profile Privacy</label>
                </div>
                <select
                  id="privacy-select"
                  value={privacy}
                  onChange={e => setPrivacy(e.target.value)}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                >
                  <option value="public">Public (Everyone can see)</option>
                  <option value="private">Private (Only followers you approve)</option>
                  <option value="friends">Friends Only (Visible to your friends)</option>
                </select>
              </div>

              {/* Two-Factor Authentication (Placeholder) */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiShield className="w-6 h-6 text-orange-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Two-Factor Authentication</span>
                </div>
                <button className="px-5 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition duration-200 text-base">
                  Set Up
                </button>
              </div>

              {/* Change Password (Placeholder) */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiLock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Change Password</span>
                </div>
                <button className="px-5 py-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200 text-base">
                  Update
                </button>
              </div>
            </div>
          </section>

          {/* Account Management */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FiCreditCard className="text-teal-500" /> Account Management
            </h3>
            <div className="space-y-5">
              {/* Payment Methods (Placeholder) */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <FiCreditCard className="w-6 h-6 text-teal-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Payment Methods</span>
                </div>
                <button className="px-5 py-2 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition duration-200 text-base">
                  Manage
                </button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900 shadow-sm border border-red-200 dark:border-red-700">
                <div className="flex items-center gap-3">
                  <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-300" />
                  <span className="font-semibold text-red-700 dark:text-red-200">Delete Account</span>
                </div>
                <button
                  onClick={() => setAccountDeletionWarning(true)} // Show warning modal/confirm
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      {accountDeletionWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-sm transform scale-95 opacity-0 animate-scale-in p-6 text-center">
            <FiTrash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirm Account Deletion</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Are you absolutely sure you want to delete your account? This action is irreversible.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setAccountDeletionWarning(false)}
                className="px-6 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
              >
                Delete Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}