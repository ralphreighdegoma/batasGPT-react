"use client";

import { useState } from 'react';

interface ProfileInfoProps {
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
}

export default function ProfileInfo({
  name = "John Doe",
  title = "Legal Professional",
  bio = "Experienced legal professional specializing in constitutional law and civil rights. Passionate about using technology to make legal information more accessible to everyone. Working on innovative solutions to bridge the gap between complex legal systems and public understanding.",
  avatarUrl = "https://randomuser.me/api/portraits/men/42.jpg"
}: ProfileInfoProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt={`${name}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <p className="text-gray-600 mt-1">{title}</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              
              <button
                onClick={() => setIsConnected(!isConnected)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  isConnected
                    ? 'bg-gray-200 text-gray-800'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {isConnected ? 'Connected' : 'Connect'}
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mt-4 leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
