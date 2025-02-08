"use client";

import { useState } from 'react';

interface SearchResultProps {
  searchResults: {
    id: number;
    title: string;
    content: string;
    case_number: string;
  };
  setIsOpen: (value: boolean) => void;
  handleSelected: (result: any) => void;
}

//handleSelected write the funciton


export default function SearchResult({ searchResults, setIsOpen, handleSelected }: SearchResultProps) {

  const handleClick = (result: any) => {
    setIsOpen(true)
    handleSelected(result)
  };
  

  return (
    <div className="mb-10 max-w-2xl mt-4">
      <div className="text-sm text-gray-600 mb-1">
        {searchResults.case_number}
      </div>
      
      <h3 
        className="text-xl text-blue-600 hover:underline cursor-pointer mb-1" 
        onClick={() => handleClick(searchResults)}
      >
        {searchResults.title}
      </h3>
    </div>
  );
}
