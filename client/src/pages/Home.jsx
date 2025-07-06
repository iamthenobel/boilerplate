import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Home({ onFeatureClick, features }) {
	const [search, setSearch] = useState('');
	const filtered = (features || []).filter(f =>
		f.name.toLowerCase().includes(search.toLowerCase()) ||
		f.desc.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col items-center px-4 py-10">
			<div className="w-full max-w-2xl mt-20 md:mt-24">
				<div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow p-3 mb-8 border border-gray-100 dark:border-gray-700">
					<FiSearch className="w-5 h-5 text-gray-400" />
					<input
						type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search features..."
						className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 text-base px-2"
						autoFocus
					/>
				</div>
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.length === 0 && (
						<li className="col-span-full text-center text-gray-400 dark:text-gray-500 py-8">
							No features found.
						</li>
					)}
					{filtered.map(f => (
						<li key={f.path}>
							<button
								type="button"
								onClick={() =>
									onFeatureClick &&
									onFeatureClick(
										f.name.toLowerCase().replace(/\s/g, '')
									)
								}
								className="block w-full h-full p-5 rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-700 shadow hover:shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/60 transition group text-left"
							>
								<div className="flex items-center gap-3">
									<span className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 group-hover:underline">
										{f.name}
									</span>
									<span className="ml-2 text-xs px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-200 font-medium">
										Go
									</span>
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
									{f.desc}
								</div>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
