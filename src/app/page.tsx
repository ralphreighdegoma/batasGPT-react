"use client";
import { useState } from "react";
import SearchResult from "./components/SearchResult";
import './styles/page.css';
import SearchResultModal from './components/SearchResultModal';


interface SearchResultType {
  id: number;
  title: string;
  content: string;
  reference_number: string;
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    title: '',
    case_number: '',
    content: ''
  });

  const [selectedResult, setSelectedResult] = useState<SearchResultType | null>(null);

  const handleSelected = (result: SearchResultType) => {
    setSelectedResult(result);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${searchQuery}`);
      const data = await response.json();
      if (!data.success) {
        setSearchResults([]);
        return;
      }
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">


      <div className="absolute inset-0 bg-white">
        <div
          className="absolute inset-0"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">BatasGPT</h1>
        </div>

        <div className="w-full max-w-2xl">
          <div className="relative">
            <div className="relative flex items-center w-full h-16 rounded-full border shadow-md hover:shadow-lg bg-white">
              <div className="pl-6">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full h-full pl-4 pr-12 text-lg text-gray-700 outline-none rounded-full"
                placeholder="Search anything about Philippine laws..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="absolute right-0 h-full px-6 text-white bg-rose-500 rounded-r-full hover:bg-rose-600 transition-colors disabled:bg-rose-300"
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          <div className="mt-8">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <SearchResult setIsOpen={setIsOpen} handleSelected={handleSelected} key={result.id} searchResults={result} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                No results found. Try a different search term.
              </p>
            )}
          </div>

          <SearchResultModal 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            searchResults={selectedResult}
          />
          
        </div>
      </div>
    </div>
  );
}
