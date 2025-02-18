"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchAll({ handleSearch, query }: { handleSearch: (term: string) => void, query?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(query || '');
  }, [query]);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    router.push('/news-feed');
  };

  return (
    <div className="w-full inline-block relative rounded-lg mt-2">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-1 ">
        {searchTerm ? (
          <button onClick={clearSearch} className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors">
            <svg
              className="w-3 h-3 ml-0.2" 
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
      <input
        type="text"
        className="px-4 py-2 pl-12 pr-4 text-gray-700 text-sm w-full bg-white rounded-lg border-0 outline-none"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
