import { MagnifyingGlassIcon as MagnifyingGlassIconOutline, PlusIcon as PlusIconOutline, HeartIcon as HeartIconOutline, ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconOutline, XMarkIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon as MagnifyingGlassIconSolid, PlusIcon as PlusIconSolid, HeartIcon as HeartIconSolid, ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid } from '@heroicons/react/24/solid';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserCircleIconOutline,
  Cog6ToothIcon as Cog6ToothIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  Squares2X2Icon as Squares2X2IconOutline,
  ShoppingCartIcon as ShoppingCartIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  UsersIcon as UsersIconOutline,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserCircleIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  UsersIcon as UsersIconSolid,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconSolid,
} from '@heroicons/react/24/solid';

const menuItems = [
  {
    name: 'General',
    icon: <Squares2X2IconOutline className="w-8 h-8 text-[#bbb]" />,
    items: [
      { name: 'Home', path: '/dashboard/home', outline: HomeIconOutline, solid: HomeIconSolid },
      { name: 'Search', path: '/dashboard/search', outline: MagnifyingGlassIconOutline, solid: MagnifyingGlassIconSolid },
      { name: 'Add', path: '/dashboard/create', outline: PlusIconOutline, solid: PlusIconSolid },
      { name: 'Notifications', path: '/dashboard/notifications', outline: HeartIconOutline, solid: HeartIconSolid },
      { name: 'Chat', path: '/dashboard/chats', outline: ChatBubbleLeftRightIconOutline, solid: ChatBubbleLeftRightIconSolid },
      { name: 'Profile', path: '/dashboard/profile', outline: UserCircleIconOutline, solid: UserCircleIconSolid },
      { name: 'Settings', path: '/dashboard/settings', outline: Cog6ToothIconOutline, solid: Cog6ToothIconSolid },
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

  // Color classes
  const bgLight = 'bg-[#fbfbfb]'; 
  const bgDark = 'dark:bg-[#252525]';
  const textLight = 'text-gray-900';
  const textDark = 'dark:text-white';
  const hoverLight = 'hover:bg-[#f4f4f4]';
  const hoverDark = 'dark:hover:bg-[#333]';
  const activeItemBg = 'bg-gray-100 dark:bg-indigo-900';
  const activeItemText = 'text-indigo-700 dark:text-indigo-200';

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

  return (
    <div
      ref={sidebarRef}
      className={`
        ${isSidebarOpen ? 'flex' : 'hidden'}
        lg:flex flex-col
        h-screen
        ${bgLight} ${bgDark} ${textLight} ${textDark}
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-20'}
        fixed top-0 left-0 z-50 lg:static
        min-h-screen
        max-h-screen
        overflow-y-auto scrollbar-hide
        shadow-lg lg:shadow-none
        w-[90vw] max-w-xs lg:w-20 lg:max-w-none
      `}
      style={{ width: undefined }}
    >
      {/* Mobile header with close button */}
      <div className="lg:hidden p-4 flex items-center justify-between mb-4">
        <div className="bg-indigo-600 text-white rounded-lg p-2">
          <Squares2X2IconOutline className="w-7 h-7 text-gray-50" />
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop header with logo */}
      <div className="hidden lg:flex p-4 items-center justify-center mb-8">
        <div className="bg-indigo-600 text-white rounded-lg p-2">
          <Squares2X2IconOutline className="w-7 h-7 text-gray-50" />
        </div>
      </div>

      {/* Mobile navigation menu - list style */}
      <nav className="lg:hidden flex-1 overflow-y-auto scrollbar-hide py-2 px-4">
        <div className="flex flex-col gap-2">
          {menuItems.flatMap((category) =>
            category.items.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              const Icon = isActive ? item.solid : item.outline;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center gap-4 w-full p-3 rounded-lg
                    ${hoverLight} ${hoverDark}
                    ${isActive ? `${activeItemBg} ${activeItemText} font-bold` : ''}
                    transition-all duration-300 ease-in-out
                    group
                    focus:outline-none focus:ring-2 focus:ring-indigo-300
                  `}
                  onClick={onClose}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ease-in-out ${isActive ? 'text-[#252525] fill-[#252525]' : 'text-[#bbb] group-hover:text-[#555]'} `}
                  />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })
          )}
        </div>
      </nav>

      {/* Desktop navigation menu - only icons */}
      <nav className="hidden lg:flex flex-1 overflow-y-auto scrollbar-hide py-2">
        <div className="flex flex-col items-center gap-8">
          {menuItems.flatMap((category) =>
            category.items.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              const Icon = isActive ? item.solid : item.outline;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex flex-col items-center justify-center w-12 h-12 rounded-lg
                    text-xl px-8
                    ${hoverLight} ${hoverDark}
                    ${isActive ? `${activeItemBg} ${activeItemText} font-bold` : ''}
                    transition-all duration-300 ease-in-out
                    group
                    hover:scale-[1.08] active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-indigo-300
                  `}
                  style={{ willChange: 'transform, background, color' }}
                  title={item.name}
                >
                  <Icon
                    className={`w-8 h-8 transition-all duration-300 ease-in-out ${isActive ? 'text-[#252525] fill-[#252525]' : 'text-[#bbb] group-hover:text-[#555]'} `}
                    style={{ willChange: 'color, fill, transform' }}
                  />
                </Link>
              );
            })
          )}
        </div>
      </nav>
    </div>
  );
}