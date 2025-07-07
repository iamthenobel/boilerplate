import React, { useState, useRef, useEffect } from 'react';
import { EllipsisHorizontalIcon, HeartIcon, BookmarkIcon, ShareIcon, PlusIcon, LinkIcon, FlagIcon, EyeSlashIcon, ExclamationTriangleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const postsData = [
  {
    id: 1,
    user: {
      name: 'Jane Doe',
      username: 'jane.doe',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=4f46e5&color=fff',
    },
    time: '2h ago',
    content: 'Just launched my new project! 🚀 Check it out and let me know your thoughts.',
  },
  {
    id: 2,
    user: {
      name: 'John Smith',
      username: 'john.smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=6366f1&color=fff',
    },
    time: '4h ago',
    content: 'Loving the new UI updates. Everything feels so much smoother and more modern! ✨',
  },
];

function PostOptions({ show, onClose, onCopy }) {
  const menuRef = useRef(null);
  useEffect(() => {
    if (!show) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [show, onClose]);
  return (
    <div
      ref={menuRef}
      className={`absolute right-0 top-10 min-w-[200px] bg-white dark:bg-[#252525] rounded-xl shadow-xl border border-gray-100 dark:border-[#333] z-30 transition-all duration-200 ${show ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      style={{ willChange: 'opacity, transform' }}
    >
      <button onClick={onCopy} className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#333] text-[#252525] dark:text-white transition rounded-t-xl">
        <LinkIcon className="w-5 h-5 text-[#bbb]" /> Copy link
      </button>
      <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#333] text-[#252525] dark:text-white transition">
        <FlagIcon className="w-5 h-5 text-[#bbb]" /> Report
      </button>
      <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#333] text-[#252525] dark:text-white transition">
        <EyeSlashIcon className="w-5 h-5 text-[#bbb]" /> Hide
      </button>
      <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#333] text-[#252525] dark:text-white transition">
        <ExclamationTriangleIcon className="w-5 h-5 text-[#bbb]" /> Copyright claim
      </button>
      <button className="w-full flex items-center gap-3 text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#333] text-[#252525] dark:text-white transition rounded-b-xl">
        <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#bbb]" /> Feedback
      </button>
    </div>
  );
}

export default function Home() {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [showOptions, setShowOptions] = useState({});
  const [copied, setCopied] = useState(false);

  const handleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleSave = (id) => setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleOptions = (id) => setShowOptions((prev) => ({ ...prev, [id]: !prev[id] }));
  const handleCopy = (id) => {
    navigator.clipboard.writeText(window.location.href + '?post=' + id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
    setShowOptions((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#252525] flex flex-col items-center px-2 py-8 transition-colors duration-300 rounded-2xl shadow-md">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#252525] dark:text-white tracking-tight">Threads</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#252525] text-white dark:bg-white dark:text-[#252525] rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all duration-200">
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium text-base">Add</span>
        </button>
      </div>

      {/* Posts */}
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {postsData.map((post) => (
          <div
            key={post.id}
            className="relative bg-white dark:bg-[#252525] border border-gray-100 dark:border-[#333] rounded-2xl shadow-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-md"
            style={{ willChange: 'box-shadow, border-color' }}
          >
            {/* Post Header */}
            <div className="flex items-center gap-3">
              <img src={post.user.avatar} alt={post.user.name} className="w-11 h-11 rounded-full border-2 border-indigo-500 shadow-sm" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-semibold text-[#252525] dark:text-white truncate">{post.user.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">@{post.user.username} • {post.time}</span>
              </div>
              <button
                className="ml-auto p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#333] transition-colors duration-200 relative"
                onClick={() => handleOptions(post.id)}
                aria-label="Post options"
              >
                <EllipsisHorizontalIcon className="w-6 h-6 text-[#bbb] hover:text-[#252525] transition-colors duration-200" />
                <PostOptions show={!!showOptions[post.id]} onClose={() => handleOptions(post.id)} onCopy={() => handleCopy(post.id)} />
              </button>
            </div>
            {/* Post Content */}
            <div className="text-base text-[#252525] dark:text-white leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
            {/* Post Actions */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => handleLike(post.id)}
                className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-[#333] ${liked[post.id] ? 'bg-indigo-50 dark:bg-indigo-900' : ''}`}
                aria-label="Like"
              >
                <HeartIcon className={`w-6 h-6 ${liked[post.id] ? 'text-red-500 fill-red-500' : 'text-[#bbb]'} transition-all duration-200`} />
              </button>
              <button
                onClick={() => navigator.share ? navigator.share({ url: window.location.href + '?post=' + post.id }) : null}
                className="p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-[#333]"
                aria-label="Share"
              >
                <ShareIcon className="w-6 h-6 text-[#bbb] hover:text-[#252525] transition-colors duration-200" />
              </button>
              <button
                onClick={() => handleSave(post.id)}
                className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-[#333] ${saved[post.id] ? 'bg-indigo-50 dark:bg-indigo-900' : ''}`}
                aria-label="Save"
              >
                <BookmarkIcon className={`w-6 h-6 ${saved[post.id] ? 'text-indigo-500 fill-indigo-500' : 'text-[#bbb]'} transition-all duration-200`} />
              </button>
            </div>
            {/* Copied feedback */}
            {copied && (
              <div className="absolute top-2 right-16 bg-[#252525] text-white text-xs px-3 py-1 rounded-full shadow transition-all duration-300 animate-fade-in">
                Link copied!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
