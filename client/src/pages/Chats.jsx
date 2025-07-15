import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon, PaperAirplaneIcon, EllipsisVerticalIcon, CheckCircleIcon, FaceSmileIcon, PaperClipIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as UserIconOutline, BellAlertIcon, TrashIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const USERS = [
  {
    id: 1,
    name: 'Jane Student',
    profile: null,
    lastMessage: 'Hey, can we connect for the project update? 😊',
    time: '2m',
    unread: 0,
    read: true,
    online: true,
  },
  {
    id: 2,
    name: 'Alex Work',
    profile: null,
    lastMessage: 'Sent the files. Let me know if you got them.',
    time: '10m',
    unread: 2,
    read: false,
    online: false,
  },
  {
    id: 3,
    name: 'Spark Creator',
    profile: null,
    lastMessage: 'Check out my new post!',
    time: '1h',
    unread: 0,
    read: true,
    online: true,
  },
];

const MESSAGES = [
  { id: 1, fromMe: false, text: 'Hey, can we connect for the project update? 😊', time: '2m', read: true },
  { id: 2, fromMe: true, text: 'Sure! I am available now.', time: '1m', read: true },
  { id: 3, fromMe: false, text: 'Great! Let me send the files.', time: '1m', read: false },
];

function ChatMenu({ onClose }) {
  // Close menu on outside click
  useEffect(() => {
    const handle = (e) => {
      if (!document.getElementById('chat-header-menu')?.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);
  return (
    <div id="chat-header-menu" className="absolute right-0 top-12 z-20 w-48 bg-white rounded-xl shadow-lg py-2 animate-fadeIn transition-all duration-300 animate-fadeInUp">
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-[#252525] transition-all duration-200 animate-fadeInLeft">
        <UserIconOutline className="w-5 h-5 text-indigo-500" />
        View Profile
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-[#252525] transition-all duration-200 animate-fadeInLeft">
        <BellAlertIcon className="w-5 h-5 text-green-500" />
        Mute
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-[#252525] transition-all duration-200 animate-fadeInLeft">
        <ArrowLeftOnRectangleIcon className="w-5 h-5 text-yellow-500" />
        Block
      </button>
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-[#252525] transition-all duration-200 animate-fadeInLeft">
        <TrashIcon className="w-5 h-5 text-red-500" />
        Delete Chat
      </button>
    </div>
  );
}


export default function Chats() {
  const [selected, setSelected] = useState(null); // null means no chat selected
  const [showMenu, setShowMenu] = useState(false);
  const [input, setInput] = useState('');
  const fileInputRef = useRef();

  // Track mobile/desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    // Add send logic here
    setInput('');
  };

  // Mobile: show chat list or chat room
  if (isMobile) {
    if (!selected) {
      // Show chat list only
      return (
        <div className="max-w-2xl mx-auto py-4 px-2 flex flex-col gap-2 h-[80vh] transition-all duration-500 animate-fadeIn">
          <h2 className="text-lg font-bold text-[#252525] px-4 py-4 border-b">Chats</h2>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {USERS.map(user => (
              <div
                key={user.id}
                className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition-all duration-200 border-b last:border-b-0 hover:bg-indigo-50 ${selected && selected.id === user.id ? 'bg-indigo-50' : ''}`}
                onClick={() => setSelected(user)}
              >
                <div className="relative">
                  {user.profile ? (
                    <img src={user.profile} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <UserCircleIcon className="w-10 h-10 text-indigo-400" />
                  )}
                  {user.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#252525] truncate">{user.name}</span>
                    <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{user.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span className="truncate max-w-[120px]">{user.lastMessage}</span>
                    {user.read && <CheckCircleIcon className="w-4 h-4 text-indigo-400" title="Read" />}
                    {user.unread > 0 && <span className="ml-2 bg-indigo-500 text-white text-xs rounded-full px-2 py-0.5">{user.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Show chat room only, with back arrow
      return (
        <div className="max-w-2xl mx-auto py-4 px-2 flex flex-col gap-2 h-[80vh] transition-all duration-500 animate-fadeIn">
          {/* Chatroom Header with Back */}
          <div className="flex items-center gap-4 px-4 py-4 border-b relative transition-all duration-300 animate-fadeInDown">
            <button
              className="mr-2 p-2 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setSelected(null)}
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="relative">
              {selected.profile ? (
                <img src={selected.profile} alt={selected.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-indigo-400" />
              )}
              {selected.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#252525] truncate">{selected.name}</div>
              <div className="text-xs text-gray-500">{selected.online ? 'Online' : 'Offline'}</div>
            </div>
            <button
              className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setShowMenu(v => !v)}
              aria-label="Menu"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-gray-400" />
            </button>
            {showMenu && <ChatMenu onClose={() => setShowMenu(false)} />}
          </div>
          {/* Chat Bubbles */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 scrollbar-hide bg-[#f7f7f7] transition-all duration-300 animate-fadeIn">
            {MESSAGES.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.fromMe ? 'bg-indigo-500 text-white rounded-br-md' : 'bg-white text-[#252525] rounded-bl-md'} flex flex-col gap-1 transition-all duration-300 animate-bounceIn`}>
                  <span>{msg.text}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{msg.time}</span>
                    {msg.fromMe && msg.read && <CheckCircleIcon className="w-4 h-4 text-white" title="Read" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Message Input */}
          <form className="flex items-center gap-2 px-4 py-4 border-t bg-white transition-all duration-300 animate-fadeInUp" onSubmit={handleSend}>
            <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Emoji">
              <FaceSmileIcon className="w-6 h-6 text-gray-400" />
            </button>
            <input
              type="text"
              className="flex-1 rounded-xl border border-gray-200 bg-[#f7f7f7] px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all text-[#252525]"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={() => {}}
              multiple
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
            <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Attach file" onClick={() => fileInputRef.current.click()}>
              <PaperClipIcon className="w-6 h-6 text-gray-400" />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Upload image" onClick={() => fileInputRef.current.click()}>
              <PhotoIcon className="w-6 h-6 text-gray-400" />
            </button>
            <button type="submit" className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-all shadow-md" title="Send">
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      );
    }
  }

  // Desktop: show both chat list and chat room
  return (
    <div className="max-w-5xl mx-auto px-2 md:px-4 flex gap-4 h-[80vh] transition-all duration-500 animate-fadeIn">
      {/* Left: Chat List */}
      <aside className="w-80 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden transition-all duration-300 animate-slideInLeft min-h-[32rem]">
        <h2 className="text-lg font-bold text-[#252525] px-6 py-4 border-b">Chats</h2>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {USERS.map(user => (
            <div
              key={user.id}
              className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-all duration-200 border-b last:border-b-0 hover:bg-indigo-50 ${selected && selected.id === user.id ? 'bg-indigo-50' : ''}`}
              onClick={() => setSelected(user)}
            >
              <div className="relative">
                {user.profile ? (
                  <img src={user.profile} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-indigo-400" />
                )}
                {user.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#252525] truncate">{user.name}</span>
                  <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{user.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span className="truncate max-w-[120px]">{user.lastMessage}</span>
                  {user.read && <CheckCircleIcon className="w-4 h-4 text-indigo-400" title="Read" />}
                  {user.unread > 0 && <span className="ml-2 bg-indigo-500 text-white text-xs rounded-full px-2 py-0.5">{user.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main: Chat Room */}
      <section className="flex-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden transition-all duration-300 animate-slideInRight min-h-[32rem]">
        {/* Chatroom Header */}
        {selected ? (
          <div className="flex items-center gap-4 px-6 py-4 border-b relative transition-all duration-300 animate-fadeInDown">
            <div className="relative">
              {selected.profile ? (
                <img src={selected.profile} alt={selected.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-10 h-10 text-indigo-400" />
              )}
              {selected.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#252525] truncate">{selected.name}</div>
              <div className="text-xs text-gray-500">{selected.online ? 'Online' : 'Offline'}</div>
            </div>
            <button
              className="ml-auto p-2 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => setShowMenu(v => !v)}
              aria-label="Menu"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-gray-400" />
            </button>
            {showMenu && <ChatMenu onClose={() => setShowMenu(false)} />}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">Select a chat to start messaging</div>
        )}

        {/* Chat Bubbles */}
        {selected && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 scrollbar-hide bg-[#f7f7f7] transition-all duration-300 animate-fadeIn">
              {MESSAGES.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.fromMe ? 'bg-indigo-500 text-white rounded-br-md' : 'bg-white text-[#252525] rounded-bl-md'} flex flex-col gap-1 transition-all duration-300 animate-bounceIn`}>
                    <span>{msg.text}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{msg.time}</span>
                      {msg.fromMe && msg.read && <CheckCircleIcon className="w-4 h-4 text-white" title="Read" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Message Input */}
            <form className="flex items-center gap-2 px-6 py-4 border-t bg-white transition-all duration-300 animate-fadeInUp" onSubmit={handleSend}>
              <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Emoji">
                <FaceSmileIcon className="w-6 h-6 text-gray-400" />
              </button>
              <input
                type="text"
                className="flex-1 rounded-xl border border-gray-200 bg-[#f7f7f7] px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all text-[#252525]"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={() => {}}
                multiple
                accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
              <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Attach file" onClick={() => fileInputRef.current.click()}>
                <PaperClipIcon className="w-6 h-6 text-gray-400" />
              </button>
              <button type="button" className="p-2 rounded-full hover:bg-gray-100 transition-all" title="Upload image" onClick={() => fileInputRef.current.click()}>
                <PhotoIcon className="w-6 h-6 text-gray-400" />
              </button>
              <button type="submit" className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-all shadow-md" title="Send">
                <PaperAirplaneIcon className="w-6 h-6" />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
