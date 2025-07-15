import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  PlusIcon as PlusIconOutline,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconOutline,
  UserIcon as UserCircleIconOutline,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PlusIcon as PlusIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  UserIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid';

// Define navigation items with their paths and corresponding icons.
const navItems = [
  { name: 'Home', path: '/dashboard/home', outline: HomeIconOutline, solid: HomeIconSolid },
  { name: 'Search', path: '/dashboard/search', outline: MagnifyingGlassIconOutline, solid: MagnifyingGlassIconSolid },
  { name: 'Create', path: '/dashboard/create', outline: PlusIconOutline, solid: PlusIconSolid },
  { name: 'Chat', path: '/dashboard/chats', outline: ChatBubbleLeftRightIconOutline, solid: ChatBubbleLeftRightIconSolid },
  { name: 'Profile', path: '/dashboard/profile', outline: UserCircleIconOutline, solid: UserCircleIconSolid },
];

/**
 * FooterNav component renders a responsive navigation bar for the bottom of the screen.
 * It dynamically highlights the active link based on the current URL.
 */
export default function FooterNav() {
  const location = useLocation();

  // Common Tailwind CSS classes for consistent styling.
  const baseClasses = 'flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-in-out';
  const itemHoverClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700'; // Adjusted for better dark mode hover
  const focusRingClasses = 'focus:outline-none focus:ring-2 focus:ring-indigo-300';

  // Determine active link styling
  const activeLinkClasses = 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 font-bold';
  const inactiveLinkClasses = 'text-gray-900 dark:text-gray-200'; // General text color for inactive

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-40
        flex justify-around items-center
        h-16
        rounded-t-2xl
        shadow-lg
        bg-white dark:bg-gray-800 // Simplified background classes
        text-gray-900 dark:text-white
        transition-all duration-300 ease-in-out
        lg:hidden // Hides the footer nav on larger screens
      `}
      style={{ boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.1)' }} // Slightly adjusted shadow for better visibility
    >
      {navItems.map((item) => {
        // Check if the current path matches the item's path or is a sub-path.
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        const Icon = isActive ? item.solid : item.outline;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`
              ${baseClasses}
              ${itemHoverClasses}
              ${focusRingClasses}
              ${isActive ? activeLinkClasses : inactiveLinkClasses}
            `}
            title={item.name}
          >
            <Icon
              className={`
                w-7 h-7
                ${isActive ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300'}
                transition-all duration-300 ease-in-out
              `}
            />
            <span className="text-xs mt-1 font-medium">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}