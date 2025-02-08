"use client";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, isLoading }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search legal documents..."
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-300"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}
