"use client";
import { useState } from "react";
import SearchResult from "./components/SearchResult";
import './styles/page.css';
import SearchResultModal from './components/SearchResultModal';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';

interface SearchResultType {
  id: number;
  title: string;
  content: string;
  reference_number: string;
}

interface SearchResult {
  title: string;
  case_number: string;
  content: string;
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
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 w-64 mt-4 ml-4">
        <Sidebar />
      </div>

      <div className="ml-72 flex-1 bg-white">
        <div className="w-full max-w-2xl mx-auto mt-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />

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
