// components/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdChevronRight,
  MdExpandMore,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdCategory,
  MdShoppingCart,
  MdReceipt,
  MdPeople,
  MdClose,
  MdLogout,
  MdAccountCircle,
  MdBook,
} from 'react-icons/md';

const menuItems = [
  {
    name: 'General',
    icon: <MdCategory className="text-xl" />,
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard className="text-xl" /> },
      { name: 'Profile', path: '/dashboard/profile', icon: <MdPerson className="text-xl" /> },
      { name: 'Settings', path: '/dashboard/settings', icon: <MdSettings className="text-xl" /> },
      { name: 'IQ Test', path: '/dashboard/iqt', icon: <MdBook className="text-xl" /> },
    ],
  },
  {
    name: 'E-commerce',
    icon: <MdShoppingCart className="text-xl" />,
    items: [
      { name: 'Products', path: '/dashboard/products', icon: <MdReceipt className="text-xl" /> },
      { name: 'Orders', path: '/dashboard/orders', icon: <MdShoppingCart className="text-xl" /> },
      { name: 'Customers', path: '/dashboard/customers', icon: <MdPeople className="text-xl" /> },
    ],
  },
];

export default function Sidebar({ isSidebarOpen, onClose }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  // Dummy user info
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff',
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize open submenus based on current path
  useEffect(() => {
    const initialOpenStates = {};
    menuItems.forEach(category => {
      const hasActiveItem = category.items.some(item => 
        location.pathname === item.path || 
        location.pathname.startsWith(item.path + '/')
      );
      if (hasActiveItem) {
        initialOpenStates[category.name] = true;
      }
    });
    setOpenSubmenus(initialOpenStates);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Close profile dropdown when collapsing
    if (!collapsed) {
      setProfileOpen(false);
    }
  };

  const toggleSubmenu = (categoryName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleMouseEnter = (categoryName) => {
    if (collapsed) {
      setOpenSubmenus(prev => ({ ...prev, [categoryName]: true }));
    }
  };

  const handleMouseLeave = (categoryName) => {
    if (collapsed) {
      // Add slight delay to prevent immediate disappearance
      setTimeout(() => {
        setOpenSubmenus(prev => ({ ...prev, [categoryName]: false }));
      }, 200);
    }
  };

  // Color classes
  const bgLight = 'bg-[#f7f7f7]';
  const bgDark = 'dark:bg-[#252525]';
  const textLight = 'text-gray-900';
  const textDark = 'dark:text-white';
  const hoverLight = 'hover:bg-indigo-100';
  const hoverDark = 'dark:hover:bg-[#333]';
  const borderLight = 'border-gray-200';
  const borderDark = 'dark:border-[#333]';
  const activeItemBg = 'bg-indigo-100 dark:bg-indigo-900';
  const activeItemText = 'text-indigo-700 dark:text-indigo-200';

  return (
    <div
      ref={sidebarRef}
      className={`
        ${isSidebarOpen ? 'flex' : 'hidden'}
        lg:flex flex-col
        h-screen
        ${bgLight} ${bgDark} ${textLight} ${textDark}
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
        border-r ${borderLight} ${borderDark}
        fixed top-0 left-0 z-50 lg:static
        min-h-screen
        max-h-screen
        overflow-y-auto
        shadow-lg lg:shadow-none
      `}
    >
      {/* Header with logo and collapse button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-[#333]">
        {!collapsed && (
          <h2 className="text-xl font-semibold flex items-center">
            <span className="bg-indigo-600 text-white rounded-lg p-1 mr-2">
              <MdDashboard className="text-xl" />
            </span>
            Dashboard
          </h2>
        )}
        {collapsed && (
          <div className="bg-indigo-600 text-white rounded-lg p-2 mx-auto">
            <MdDashboard className="text-xl" />
          </div>
        )}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className={`p-1.5 rounded-md ${hoverLight} ${hoverDark} transition-colors duration-200 hidden lg:inline-flex`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <MdArrowForwardIos className="text-lg" />
            ) : (
              <MdArrowBackIosNew className="text-lg" />
            )}
          </button>
          {isSidebarOpen && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-gray-600 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors duration-200 lg:hidden ml-1"
              aria-label="Close sidebar"
            >
              <MdClose className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Profile dropdown */}
      <div 
        ref={profileRef}
        className={`relative flex flex-col items-center ${collapsed ? 'py-4' : 'px-4 py-4'} border-b border-gray-200 dark:border-[#333]`}
      >
        <button
          className={`flex items-center w-full ${collapsed ? 'justify-center' : ''} gap-3 group focus:outline-none`}
          onClick={() => setProfileOpen(v => !v)}
          aria-expanded={profileOpen}
          aria-haspopup="true"
        >
          <img 
            src={user.avatar} 
            alt="avatar" 
            className="w-9 h-9 rounded-full border-2 border-indigo-500 shadow hover:border-indigo-600 transition-all" 
          />
          {!collapsed && (
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                {user.email}
              </span>
            </div>
          )}
        </button>
        {profileOpen && !collapsed && (
          <div className="absolute left-4 right-4 top-16 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-xl border border-gray-200 dark:border-[#444] z-20 overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-[#444]">
              <img 
                src={user.avatar} 
                alt="avatar" 
                className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow" 
              />
              <div className="overflow-hidden">
                <div className="font-semibold text-sm truncate">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </div>
              </div>
            </div>
            <Link
              to="/dashboard/profile"
              className="flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#333] transition"
              onClick={() => setProfileOpen(false)}
            >
              <MdAccountCircle className="text-lg mr-2 text-indigo-500" />
              My Profile
            </Link>
            <button className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#333] transition">
              <MdLogout className="text-lg mr-2 text-indigo-500" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((category) => {
          const isSubmenuOpen = openSubmenus[category.name];
          
          return (
            <div
              key={category.name}
              className="mb-1"
              onMouseEnter={() => handleMouseEnter(category.name)}
              onMouseLeave={() => handleMouseLeave(category.name)}
            >
              <button
                onClick={() => toggleSubmenu(category.name)}
                className={`
                  flex items-center w-full px-4 py-2.5
                  ${hoverLight} ${hoverDark} rounded-md mx-2
                  transition-colors duration-200
                  ${collapsed ? 'justify-center' : 'justify-between'}
                  ${isSubmenuOpen && !collapsed ? 'text-indigo-600 dark:text-indigo-400' : ''}
                `}
                aria-expanded={isSubmenuOpen}
                aria-controls={`submenu-${category.name}`}
              >
                <div className="flex items-center">
                  <span className={`${isSubmenuOpen && !collapsed ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                    {category.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3 font-medium text-sm">
                      {category.name}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <span className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-90' : ''}`}>
                    <MdChevronRight />
                  </span>
                )}
              </button>
              
              <div
                id={`submenu-${category.name}`}
                className={`
                  transition-all duration-300 ease-in-out
                  ${collapsed ? 'absolute left-20 bg-white dark:bg-[#2a2a2a] rounded-lg shadow-xl py-1 z-10 w-56 border border-gray-200 dark:border-[#444]' : 'pl-12'}
                  ${isSubmenuOpen || (collapsed && openSubmenus[category.name]) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                `}
              >
                {category.items.map((item) => {
                  const isActive = location.pathname === item.path || 
                                 location.pathname.startsWith(item.path + '/');
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center px-4 py-2.5 text-sm rounded-md mx-2 
                        transition-colors duration-200
                        ${hoverLight} ${hoverDark}
                        ${isActive ? `${activeItemBg} ${activeItemText} font-medium` : ''}
                      `}
                    >
                      <span className={isActive ? 'text-indigo-600 dark:text-indigo-300' : ''}>
                        {item.icon}
                      </span>
                      <span className="ml-3">{item.name}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Collapsed sidebar tooltip helper */}
      {collapsed && (
        <div className="p-3 text-center border-t border-gray-200 dark:border-[#333]">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Hover menu items to expand
          </p>
        </div>
      )}
    </div>
  );
}