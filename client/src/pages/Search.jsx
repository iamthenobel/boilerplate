import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy search handler (replace with real search logic as needed)
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async search
    setTimeout(() => {
      setResults(
        query
          ? [
              `Result for "${query}" #1`,
              `Result for "${query}" #2`,
              `Result for "${query}" #3`,
            ]
          : []
      );
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 rounded-2xl shadow-md">
      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl flex flex-col gap-6"
        autoComplete="off"
      >
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-5 py-4 text-lg text-[#252525] bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#252525] transition-all duration-300 placeholder-gray-400"
          style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)' }}
        />
      </form>

      <div className="w-full max-w-xl mt-8 space-y-4">
        {loading && (
          <div className="text-[#252525] text-center animate-pulse">Searching...</div>
        )}
        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl px-5 py-4 text-[#252525] shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#252525]"
                style={{ willChange: 'box-shadow, border-color' }}
              >
                {result}
              </div>
            ))}
          </div>
        )}
        {!loading && query && results.length === 0 && (
          <div className="text-[#252525] text-center opacity-60">No results found.</div>
        )}
      </div>
    </div>
  );
}
