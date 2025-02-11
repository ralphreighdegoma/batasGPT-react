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

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect, Collaborate & Learn Philippine Law
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              A professional network for legal practitioners, students, and enthusiasts to discuss Philippine jurisprudence and legal matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Join the Community
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Connect */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Network with legal professionals, students, and academics across the Philippines.</p>
            </div>

            {/* Collaborate */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-600">Engage in meaningful discussions about cases, laws, and legal interpretations.</p>
            </div>

            {/* Learn */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-gray-600">Access a wealth of legal knowledge and stay updated with the latest jurisprudence.</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Search Legal Resources</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases, laws, or legal topics..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
