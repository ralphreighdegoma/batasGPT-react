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
      className="relative w-64 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 w-full h-20 bg-gradient-to-r from-rose-500 to-purple-600 opacity-80" />
      
      {/* User Info Container */}
      <div className="relative px-4 pt-12 pb-4">
        {/* Avatar */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <div className={`
            absolute inset-0 rounded-full 
            ${isHovered ? 'animate-pulse' : ''} 
            bg-gradient-to-r from-rose-500 to-purple-600 p-1
          `}>
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
                alt={name}
                width={96}
                height={96}
                className="object-cover"
                unoptimized={unoptimized}
              />
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
          {title && (
            <p className="text-sm text-gray-600 mt-1 truncate">{title}</p>
          )}
        </div>

        {/* Follow Button */}
        <button
          onClick={handleFollow}
          className={`
            w-full mt-4 px-4 py-2 rounded-full font-medium transition-all duration-300
            ${following 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
              : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg'
            }
          `}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
