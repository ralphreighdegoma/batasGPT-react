import React from 'react';
import FollowerCounts from './Defaults/FollowerCounts';
import NameComponent from './Defaults/NameComponent';
import AvatarDisplayer from './Defaults/AvatarDisplayer';

interface ProfileBannerProps {
  username: string;
  bio?: string;
  avatarUrl?: string;
  address?: string;
  postCount?: number;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  username,
  bio,
  avatarUrl,
  address,
  postCount
}) => {
  const handleEdit = () => {
    window.location.href = '/edit-page';
  };

  const handleFistbump = () => {
    window.location.href = '/fistbump';
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <AvatarDisplayer username={username} avatarUrl={avatarUrl} />

            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">
                  <NameComponent userName={username} />
              </h1>
              <button 
                onClick={handleEdit}
                className="text-gray-400 hover:text-gray-600 transform transition-all duration-200 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>

          

            </div>
          </div>

          <FollowerCounts posts={postCount} following={10} followers={10} />
          
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
