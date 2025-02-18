"use client";

import { useState } from 'react';
import Image from 'next/image';
import NameComponent from './Defaults/NameComponent';

interface CommentBoxReadProps {
  postId: string;
  commentId: number;
  comment: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
}

export default function CommentBoxRead({ postId, commentId, comment, userName, userAvatar, createdAt }: CommentBoxReadProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const handleAvatar = () => {
    if (userAvatar) {
      return (
        <img
          src={userAvatar}
          alt={`${userName}'s avatar`}
          width={32}
          height={32}
          className="rounded-full w-8 h-8 object-cover"
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white text-sm font-medium">
          {userName.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <div className="flex space-x-2 p-3 bg-gray-50  rounded-md shadow-md border-b border-gray-200 hover:border-blue-500 transition-colors" id={`comment-${commentId}`}>
      <div className="flex-shrink-0">
        {handleAvatar()}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <NameComponent userName={userName} />
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        </div>
        <p className="mt-1 text-gray-600 text-sm">{comment}</p>
      </div>
    </div>
  );
}

