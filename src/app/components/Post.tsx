"use client";

import { useState } from 'react';
import PostIcons from './PostIcons';

interface PostProps {
  userAvatar?: string;
  userName?: string;
  content?: string;
}

export default function Post({ 
  userAvatar = "https://randomuser.me/api/portraits/men/42.jpg",
  userName = "Anonymous User",
  content = ""
}: PostProps) {
  const [postContent, setPostContent] = useState(content);
  const [isEditing, setIsEditing] = useState(!content);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePost = () => {
    if (postContent.trim()) {
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-6 max-w-2xl bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
          <img 
            src={userAvatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-800">{userName}</div>
          <div className="text-sm text-gray-500">{currentDate} at {currentTime}</div>
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            rows={4}
          />
          <button
            onClick={handlePost}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Post
          </button>
        </div>
      ) : (
        <div className="mb-4 text-gray-800 whitespace-pre-wrap">{postContent}</div>
      )}

      {!isEditing && (
        <PostIcons
          initialLikes={likes}
          initialComments={comments}
          initialShares={shares}
        />
      )}
    </div>
  );
}
