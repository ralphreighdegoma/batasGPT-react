import React from 'react';

interface ProfileBannerProps {
  username: string;
  bio?: string;
  avatarUrl?: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  username,
  bio,
  avatarUrl
}) => {
  return (
    <div className="relative">
      <div className="h-80 w-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500">
          {/* Add banner image here */}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end space-x-4">
        <div className="relative -mb-20">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={`${username}'s avatar`}
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-blue-500 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {username[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 mb-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            {username}
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-white/90 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              San Francisco, CA
            </span>
            <div className="flex space-x-4 text-white/90 text-sm">
              <span>0 posts</span>
              <span>•</span>
              <span>0 connections</span>
            </div>
          </div>
          {bio && (
            <p className="text-white/90 mt-2 text-lg drop-shadow-md">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
