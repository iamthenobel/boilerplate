import React from 'react';
import { UserCircleIcon, ChatBubbleLeftRightIcon, HeartIcon, UserPlusIcon, ArrowPathIcon, InboxIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'impression',
    profile: null,
    heading: 'Your post reached 1,200 impressions!',
    time: '2m ago',
    action: null,
  },
  {
    id: 2,
    type: 'feedback',
    profile: null,
    heading: 'You received new feedback on your document.',
    time: '10m ago',
    action: 'View',
  },
  {
    id: 3,
    type: 'message',
    profile: null,
    heading: 'New message from Jane Student: "Hey, can we connect?"',
    time: '20m ago',
    action: 'Reply',
  },
  {
    id: 4,
    type: 'connect',
    profile: null,
    heading: 'Alex Work sent you a connection request.',
    time: '1h ago',
    action: 'Connect',
  },
  {
    id: 5,
    type: 'all',
    profile: null,
    heading: 'System update: Your data is syncing.',
    time: '2h ago',
    action: null,
  },
];

const TYPE_ICONS = {
  impression: <HeartIcon className="w-8 h-8 text-pink-500" />,
  feedback: <InboxIcon className="w-8 h-8 text-indigo-500" />,
  message: <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-500" />,
  connect: <UserPlusIcon className="w-8 h-8 text-yellow-500" />,
  all: <ArrowPathIcon className="w-8 h-8 text-gray-400" />,
};

export default function Notifications() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#252525] mb-6">Notifications</h1>
      <div className="flex flex-col gap-4">
        {NOTIFICATIONS.map(n => (
          <div
            key={n.id}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-md border border-transparent hover:border-indigo-200 transition-all duration-200 group"
          >
            <div className="flex-shrink-0">
              {n.profile ? (
                <img src={n.profile} alt="profile" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                TYPE_ICONS[n.type] || <UserCircleIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[#252525] text-base truncate">{n.heading}</span>
                <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{n.time}</span>
              </div>
              {/* Optionally, more details here */}
            </div>
            {n.action && (
              <button
                className="ml-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all duration-200 flex items-center gap-2"
              >
                {n.action === 'Reply' && <PaperAirplaneIcon className="w-4 h-4" />}
                {n.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
