"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CommentBoxProps {
  onCommentSubmit: (comment: string) => void;
}

export default function CommentBox({ onCommentSubmit }: CommentBoxProps) {
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();

  const handleSubmit = async () => {
    if (commentText.trim()) {
      setIsLoading(true);
      // Random delay between 4-6 seconds
      const delay = Math.floor(Math.random() * (6000 - 4000 + 1) + 4000);
      await new Promise(resolve => setTimeout(resolve, delay));
      await onCommentSubmit(commentText);
      setCommentText('');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder={isLoading ? "Submitting..." : "Write a comment..."}
        disabled={isLoading}
        className="w-full p-2 border border-gray-200 text-sm rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {isLoading && (
        <div className="ml-2 flex items-center">
          <div className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-gray-400"></div>
          <div className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-gray-400 delay-100"></div>
          <div className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-gray-400 delay-200"></div>
        </div>
      )}
    </div>
  );
}
