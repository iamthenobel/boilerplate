import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success('Logged in!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 mt-16 mb-8">
        {/* Left: Login Form */}
        <div className="flex-1 flex flex-col justify-center items-start p-10 md:p-16">
          <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 shadow">
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-300">M</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">Login</h2>
          <form className="w-full flex flex-col gap-5 mt-4" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
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
                autoComplete="current-password"
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
            <div className="flex flex-col gap-2 mt-2">
              <button
                type="submit"
                className={`w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow transition text-base flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-indigo-400 text-indigo-600 dark:text-indigo-300 font-medium hover:bg-indigo-50 dark:hover:bg-gray-800 transition text-sm"
                onClick={() => {/* TODO: Implement forgot password logic or navigation */}}
              >
                Forgot password?
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Sign Up</Link>
            </div>
          </form>
        </div>
        {/* Right: Unsplash Image */}
        <div className="flex-1 hidden md:block relative min-h-[350px]">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
            alt="Login workspace"
            className="w-full h-full object-cover object-center rounded-r-3xl"
            style={{ minHeight: '100%', minWidth: '100%' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent dark:from-gray-900/40 pointer-events-none rounded-r-3xl" />
        </div>
      </div>
      <footer className="w-full py-4 text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
        &copy; {new Date().getFullYear()} Myou. All rights reserved.
      </footer>
    </div>
  );
}
