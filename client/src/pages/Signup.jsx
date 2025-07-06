import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';

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
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 mt-16 mb-8">
        {/* Left: Signup Form */}
        <div className="flex-1 flex flex-col justify-center items-start p-10 md:p-16">
          <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 shadow">
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-300">M</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">Sign Up</h2>
          <form className="w-full flex flex-col gap-5 mt-4" onSubmit={e => { e.preventDefault(); handleSignup(); }}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                autoComplete="email"
                required
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition pr-12"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-.34 0-.677-.018-1.01-.053M9.88 9.88l4.24 4.24" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.828-2.828A9.956 9.956 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.714-4.253 1.928-5.828M4.222 4.222l15.556 15.556" /></svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-base mt-2"
            >
              Sign Up
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Login</Link>
            </div>
          </form>
        </div>

        {/* Right: Signup image & animated overlay */}
        <div className="flex-1 hidden md:block relative min-h-[350px]">
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
