'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UserCardProps {
  id: number;
  name: string;
  title?: string | null;
  avatarUrl?: string | null;
  isFollowing?: boolean;
  onFollow?: (userId: number) => void;
  unoptimized?: boolean;
}

export default function UserCard({ id, name, title, avatarUrl, isFollowing = false, onFollow, unoptimized = false }: UserCardProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [isHovered, setIsHovered] = useState(false);

  const handleFollow = () => {
    setFollowing(!following);
    if (onFollow) {
      onFollow(id);
    }
  };

  return (
    <div 
      className="relative w-64 bg-white/95 backdrop-blur-lg rounded-lg shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 w-full h-20 bg-gradient-to-r from-blue-500 to-blue-600 opacity-90" />
      
      {/* User Info Container */}
      <div className="relative px-4 pt-12 pb-4">
        {/* Avatar */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <div className={`
            absolute -inset-0.5 rounded-full 
            ${isHovered ? 'opacity-100' : 'opacity-75'} 
            bg-gradient-to-r from-blue-400 to-blue-600 blur transition duration-300
          `}>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e3f2fd&color=1e88e5`}
                alt={name}
                width={96}
                height={96}
                className="object-cover rounded-full"
                unoptimized={unoptimized}
              />
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{name}</h3>
          {title && (
            <p className="text-sm text-gray-600 mt-1 truncate font-medium">{title}</p>
          )}
        </div>

        {/* Follow Button */}
        <button
          onClick={handleFollow}
          className={`
            w-full mt-4 px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${following 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
            }
          `}
        >
          {following ? (
            <span className="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Following
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              Follow
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
