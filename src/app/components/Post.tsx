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

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);

    //if user types @ it will show a dropdown of users or jurisprudences
    if (e.target.value.includes('@')) {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/handle/search?q=${e.target.value}`);
      console.log(data);
    }
  }

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
    <div className="mb-6 max-w-2xl bg-white/95 backdrop-blur-lg rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 p-0.5 mr-4 transition-transform duration-200 hover:scale-105">
          <img 
            src={userAvatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-base">{userName}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z"/>
            </svg>
            {currentDate} at {currentTime}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4 space-y-3">
          <textarea
            value={postContent}
            onChange={handleInputChange}
            placeholder="Share your professional insights..."
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 transition-all duration-200"
            rows={4}
          />
          <button
            onClick={handlePost}
            disabled={isLoading}
            className={`w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 hover:shadow-md active:transform active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                Publishing...
              </div>
            ) : (
              'Share Post'
            )}
          </button>
        </div>
      ) : (
        <div className="mb-4 text-gray-700 whitespace-pre-wrap leading-relaxed">{postContent}</div>
      )}

      {!isEditing && (
        <div className="pt-3 ">
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
