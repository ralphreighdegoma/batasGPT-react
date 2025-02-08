"use client";

import { useState } from 'react';

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

      <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3">
        <button 
          className="flex items-center gap-1 hover:text-red-500"
          onClick={() => setLikes(prev => prev + 1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likes}
        </button>

        <button className="flex items-center gap-1 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {comments}
        </button>

        <button className="flex items-center gap-1 hover:text-green-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {shares}
        </button>
      </div>
    </div>
  );
}
