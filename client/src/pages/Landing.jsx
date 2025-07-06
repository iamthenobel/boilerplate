import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated background shapes behind */}
      <FallingShapesBackground zIndex="z-0" />
      {/* Animated shapes in front of card */}
      <FallingShapesBackground zIndex="z-30" overCard />
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mt-12 relative z-10">
        {/* Left: Text and Buttons */}
        <div className="flex-1 flex flex-col justify-center items-start p-10 md:p-14">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 shadow">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-300">M</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">Welcome to <span className="text-indigo-600 dark:text-indigo-400">Myou</span></h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg md:text-xl">Modern authentication starter for your next project.</p>
          <div className="flex gap-4 w-full md:w-auto justify-center md:justify-start">
            <Link to="/login" className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-base">Login</Link>
            <Link to="/signup" className="px-6 py-2 rounded-lg bg-white dark:bg-gray-900 border border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 font-semibold shadow hover:bg-indigo-50 dark:hover:bg-gray-800 transition text-base">Sign Up</Link>
          </div>
        </div>
        {/* Right: Unsplash Image */}
        <div className="flex-1 hidden md:block relative min-h-[350px]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Modern workspace"
            className="w-full h-full object-cover object-center rounded-r-3xl"
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent dark:from-gray-900/40 pointer-events-none rounded-r-3xl" />
        </div>
      </div>
      <footer className="w-full py-4 text-center text-xs text-gray-400 dark:text-gray-600 mt-8 relative z-10">
        &copy; {new Date().getFullYear()} Myou. All rights reserved.
      </footer>
    </div>
  );
}

// Animated falling shapes background
import React from 'react';

function FallingShapesBackground({ zIndex = 'z-0', overCard = false }) {
  // More shapes for a denser effect
  const shapes = [
    // Circles
    { type: 'circle', color: 'bg-indigo-200/40', size: 16, left: '10%', delay: '0s' },
    { type: 'circle', color: 'bg-pink-200/40', size: 24, left: '30%', delay: '1.2s' },
    { type: 'circle', color: 'bg-green-200/40', size: 20, left: '60%', delay: '0.7s' },
    { type: 'circle', color: 'bg-yellow-200/40', size: 14, left: '80%', delay: '2.1s' },
    { type: 'circle', color: 'bg-blue-200/40', size: 18, left: '50%', delay: '1.7s' },
    { type: 'circle', color: 'bg-purple-200/40', size: 22, left: '15%', delay: '2.8s' },
    { type: 'circle', color: 'bg-orange-200/40', size: 20, left: '75%', delay: '0.5s' },
    { type: 'circle', color: 'bg-teal-200/40', size: 16, left: '35%', delay: '1.9s' },
    { type: 'circle', color: 'bg-pink-100/40', size: 12, left: '55%', delay: '2.3s' },
    // Squares
    { type: 'square', color: 'bg-indigo-100/30', size: 14, left: '20%', delay: '2.5s' },
    { type: 'square', color: 'bg-pink-100/30', size: 12, left: '70%', delay: '0.9s' },
    { type: 'square', color: 'bg-green-100/30', size: 10, left: '45%', delay: '1.1s' },
    { type: 'square', color: 'bg-yellow-100/30', size: 16, left: '85%', delay: '1.6s' },
    { type: 'square', color: 'bg-blue-100/30', size: 18, left: '25%', delay: '2.2s' },
    { type: 'square', color: 'bg-purple-100/30', size: 14, left: '65%', delay: '1.3s' },
    // Fewer, lighter triangles
    { type: 'triangle', color: 'bg-green-100/20', size: 18, left: '40%', delay: '1.4s' },
    { type: 'triangle', color: 'bg-yellow-100/20', size: 16, left: '65%', delay: '2.8s' },
    { type: 'triangle', color: 'bg-blue-100/20', size: 16, left: '60%', delay: '0.8s' },
  ];
  // If overCard, randomize a subset and set a higher z-index
  const overShapes = overCard
    ? Array.from({ length: 8 }, (_, i) => {
        const base = shapes[Math.floor(Math.random() * shapes.length)];
        // Randomize left and delay for more natural effect
        return {
          ...base,
          left: `${Math.floor(Math.random() * 90) + 5}%`,
          delay: `${(Math.random() * 3).toFixed(1)}s`,
        };
      })
    : shapes;
  return (
    <div className={`pointer-events-none absolute inset-0 w-full h-full ${zIndex}`}
         style={overCard ? { pointerEvents: 'none' } : {}}>
      {overShapes.map((shape, i) => {
        const style = {
          left: shape.left,
          width: `${shape.size * 4}px`,
          height: `${shape.size * 4}px`,
          animationDelay: shape.delay,
        };
        if (shape.type === 'circle') {
          return (
            <div
              key={i}
              className={`absolute top-[-60px] rounded-full ${shape.color} blur-[2px] animate-fall-shape`}
              style={style}
            />
          );
        }
        if (shape.type === 'square') {
          return (
            <div
              key={i}
              className={`absolute top-[-60px] ${shape.color} blur-[2px] animate-fall-shape`}
              style={{ ...style, borderRadius: '0.5rem' }}
            />
          );
        }
        if (shape.type === 'triangle') {
          return (
            <svg
              key={i}
              className={`absolute top-[-60px] animate-fall-shape blur-[2px]`}
              style={style}
              viewBox="0 0 40 40"
              fill="none"
            >
              <polygon points="20,0 40,40 0,40" fill="currentColor" className={shape.color} />
            </svg>
          );
        }
        return null;
      })}
      <style>{`
        @keyframes fall-shape {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.5; }
          80% { opacity: 0.3; }
          100% { transform: translateY(110vh) scale(1.1) rotate(40deg); opacity: 0.1; }
        }
        .animate-fall-shape {
          animation: fall-shape 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
