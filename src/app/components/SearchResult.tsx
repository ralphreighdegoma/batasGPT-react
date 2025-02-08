"use client";

import { useState } from 'react';
import Post from './Post';
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

export default function SearchResult({ searchResults, setIsOpen, handleSelected }: SearchResultProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(Math.floor(Math.random() * 1000));
  const [comments, setComments] = useState(Math.floor(Math.random() * 100));
  const [shares, setShares] = useState(Math.floor(Math.random() * 50));

  const handleClick = (result: any) => {
    setIsOpen(true)
    handleSelected(result)
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Post
      userAvatar="/default-avatar.png"
      userName={searchResults.case_number}
      content={`${searchResults.title}`}
    />
  );
}
