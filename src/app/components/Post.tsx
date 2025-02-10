"use client";

import { useState } from 'react';
import PostIcons from './PostIcons';
import { toast } from 'react-hot-toast';

interface PostProps {
  userAvatar?: string;
  userName?: string;
  content?: string;
  afterPost?: () => void;
}

export default function Post({ 
  userAvatar = "https://randomuser.me/api/portraits/men/42.jpg",
  userName = "Anonymous User",
  content = "",
  afterPost = () => {}
}: PostProps) {
  const [postContent, setPostContent] = useState(content);
  const [isEditing, setIsEditing] = useState(!content);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePost = async () => {

    //show loading
    setIsLoading(true);


    //add a 5 second delay to avoid spam
    await new Promise(resolve => setTimeout(resolve, 5000));

    //remove content
    setPostContent('');

    //save to api
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      method: 'POST',
      body: JSON.stringify({ content: postContent }),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    //hide loading
    setIsLoading(false);

    //call afterPost
    afterPost();

    //show toast
    toast.success('Post created successfully');
  };

  return (
    <div className="mb-6 max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-rose-100">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 p-0.5 mr-4 transform hover:rotate-6 transition-transform duration-300">
          <img 
            src={userAvatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <div>
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 text-lg">{userName}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z"/>
            </svg>
            {currentDate} at {currentTime}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4 space-y-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your amazing thoughts..."
            className="w-full p-4 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
            rows={4}
          />
          <button
            onClick={handlePost}
            disabled={isLoading}
            className={`w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-medium transform transition-all duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-rose-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                Creating magic...
              </div>
            ) : (
              'Share with the world ✨'
            )}
          </button>
        </div>
      ) : (
        <div className="mb-4 text-gray-800 whitespace-pre-wrap leading-relaxed">{postContent}</div>
      )}

      {!isEditing && (
        <div className="pt-4 border-t border-rose-100">
          <PostIcons
            initialLikes={likes}
            initialComments={comments}
            initialShares={shares}
          />
        </div>
      )}
    </div>
  );
}
