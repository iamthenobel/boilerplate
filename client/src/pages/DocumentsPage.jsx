import { useState } from 'react';
import { FiFileText, FiSearch, FiPlus } from 'react-icons/fi';

const initialDocs = [
  { id: 1, name: 'Project Plan.pdf', type: 'PDF', date: '2025-07-01' },
  { id: 2, name: 'Resume.docx', type: 'Word', date: '2025-06-20' },
  { id: 3, name: 'Budget.xlsx', type: 'Excel', date: '2025-06-15' },
  { id: 4, name: 'Notes.txt', type: 'Text', date: '2025-05-30' },
];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState(initialDocs);

  const filtered = docs.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-[60vh] bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <FiFileText className="w-6 h-6" /> Documents
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition text-sm">
          <FiPlus className="w-4 h-4" /> New
        </button>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow p-2 mb-4 border border-gray-100 dark:border-gray-700">
        <FiSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 text-base px-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 px-3 font-semibold">Name</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 dark:text-gray-500 py-8">No documents found.</td>
              </tr>
            ) : (
              filtered.map(doc => (
                <tr key={doc.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition">
                  <td className="py-2 px-3 font-medium text-gray-900 dark:text-gray-100">{doc.name}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-300">{doc.type}</td>
                  <td className="py-2 px-3 text-gray-500 dark:text-gray-400">{doc.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
