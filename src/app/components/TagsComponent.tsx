"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

interface Tag {
  id: string;
  name: string;
}

interface TagsComponentProps {
  onTagsChange?: (tags: string[]) => void;
  initialTags?: string[];
}

export default function TagsComponent({ onTagsChange, initialTags = [] }: TagsComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();

  useEffect(() => {
    const searchTags = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags/search?q=${searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch tags');
        const data = await response.json();
        setSearchResults(data.filter((tag: Tag) => 
          !selectedTags.includes(tag.name)
        ));
      } catch (error) {
        console.error('Error searching tags:', error);
        toast.error('Failed to search tags');
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchTags, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleTagSelect = (tagName: string) => {
    const newTags = [...selectedTags, tagName];
    setSelectedTags(newTags);
    setSearchQuery('');
    setSearchResults([]);
    onTagsChange?.(newTags);
  };

  const handleTagRemove = (tagName: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagName);
    setSelectedTags(newTags);
    onTagsChange?.(newTags);
  };

  return (
    <div className="w-full">
      <div className="relative z-50">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tags..."
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="absolute z-800 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {searchResults.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagSelect(tag.name)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedTags.map((tagName) => (
          <span
            key={tagName}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
          >
            {tagName}
            <button
              onClick={() => handleTagRemove(tagName)}
              className="ml-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
