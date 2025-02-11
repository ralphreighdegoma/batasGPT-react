"use client";

import { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import ProfileInfoModal from './ProfileInfoModal';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';


interface ProfileInfoProps {
  id?: string;
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
}




import { useEffect } from 'react';

export default function ProfileInfo({
  id,
  name: initialName = "",
  title: initialTitle = "",
  bio: initialBio = "",
  avatarUrl: initialAvatarUrl = ""
}: ProfileInfoProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [bio, setBio] = useState(initialBio);
  const { user, authToken, login, logout } = useAuth();



  useEffect(() => {
    setIsOwnProfile(id == localStorage.getItem('id'));
  }, [id]);

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl);
  };

  const handleNameUpdate = (newName: string) => {
    setName(newName);
  };

  const handleTitleUpdate = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleBioUpdate = (newBio: string) => {
    setBio(newBio);
  };

  const handleSave = (name: string, title: string, bio: string) => {
    //save to api
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      method: 'PUT',
      body: JSON.stringify({ name, title, bio }),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Saving profile...');
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleEdit = () => {
    window.location.href = '/edit-page';
  };

  //hide follow button current user
  const isCurrentUser = id == user?.id

  const handleFollow = (follow: boolean) => {
    if (follow) {
      //follow user
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow`, {
        method: 'POST',
        body: JSON.stringify({ following_id: id }),
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } else {
      //unfollow user
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/unfollow`, {
        method: 'POST',
        body: JSON.stringify({ following_id: id }),
      }); 
    }
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setShowEditModal(false);
  };

  if(!user){
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Banner Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500">
          {/* Add banner image upload functionality later */}
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-8 pb-6">
        {/* Avatar - Positioned to overlap banner */}
        <div className="absolute -top-24 left-8 flex-shrink-0 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative">
            <AvatarUpload
              currentAvatarUrl={user?.avatar || undefined}
              name={user?.name || undefined} 
              onAvatarUpdate={setAvatarUrl}
              size="large" // Add size prop to make avatar larger
            />
          </div>
        </div>

        {/* Name, Title and Actions */}
        <div className="pt-20">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </h2>
                {isOwnProfile && (
                  <button 
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-600 transform transition-all duration-200 hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{title || 'Professional'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Location</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <div className="flex space-x-3">
              {!isCurrentUser && (
                <button
                  onClick={() => handleFollow(!isFollowing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  {isFollowing ? (
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Following
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Follow
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bio and Stats */}
          <div className="mt-6 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                {bio}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Posts</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
