"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CommentBoxProps {
  onCommentSubmit: (comment: string) => void;
}

export default function CommentBox({ onCommentSubmit }: CommentBoxProps) {
  const [commentText, setCommentText] = useState('');
  const { authToken } = useAuth();

  const handleSubmit = () => {
    if (commentText.trim()) {
      onCommentSubmit(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Comment
      </button>
    </div>
  );
}
