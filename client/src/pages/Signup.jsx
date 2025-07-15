import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';
import { LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// ✨ Animated text overlay component
function AnimatedSignupText() {
  const signupMessages = [
    'Join the energy!',
    'Start your journey.',
    'Create. Connect. Grow.',
    'Unleash your potential!',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % signupMessages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 dark:bg-gray-900/60 text-white text-lg md:text-2xl font-bold rounded-xl shadow-lg animate-fade-in-out select-none pointer-events-none text-center min-w-[220px]">
      <span className="transition-all duration-700 ease-in-out block">
        {signupMessages[index]}
      </span>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2.2s linear;
        }
      `}</style>
    </div>
  );
}

// ✅ Signup Page
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return toast.error(error.message);
    toast.success('Signed up!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4">
      <div className="flex w-full max-w-4xl h-[520px] md:h-[480px] bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 mt-16 mb-8">
        {/* Left: Signup Form */}
        <div className="w-1/2 flex flex-col justify-center items-start p-8 md:p-10">
          <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 shadow">
            <LockClosedIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">Sign Up</h2>
          <form className="w-full flex flex-col gap-5 mt-4" onSubmit={e => { e.preventDefault(); handleSignup(); }}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  <LockClosedIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-base mt-2"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Login</Link>
              </span>
            </div>
          </form>
        </div>

        {/* Right: Signup image & animated overlay */}
        <div className="w-1/2 hidden md:block relative h-full">
          <img
            src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"
            alt="Signup workspace"
            className="w-full h-full object-cover object-center rounded-r-3xl"
            style={{ minHeight: '100%', minWidth: '100%' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent dark:from-gray-900/40 pointer-events-none rounded-r-3xl" />
          <AnimatedSignupText />
        </div>
      </div>

      <footer className="w-full py-4 text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
        &copy; {new Date().getFullYear()} Myou. All rights reserved.
      </footer>
    </div>
  );
}
