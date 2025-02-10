"use client";

import { useState } from 'react';
import AvatarUpload from './AvatarUpload';
import ProfileInfoModal from './ProfileInfoModal';

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
  name: initialName = "John Doe",
  title: initialTitle = "Legal Professional",
  bio: initialBio = "Experienced legal professional specializing in constitutional law and civil rights. Passionate about using technology to make legal information more accessible to everyone. Working on innovative solutions to bridge the gap between complex legal systems and public understanding.",
  avatarUrl: initialAvatarUrl = "https://randomuser.me/api/portraits/men/42.jpg"
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
    //update local storage
    localStorage.setItem('name', name);
    localStorage.setItem('title', title);
    localStorage.setItem('bio', bio);
    console.log('Saving profile...');
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowEditModal(true);
  };

  //hide follow button current user
  const isCurrentUser = id == localStorage.getItem('id');

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

  return (
    <div className="p-6 transform transition-all duration-300 hover:scale-[1.01]">
      <ProfileInfoModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSave}
        initialName={name}
        initialTitle={title}
        initialBio={bio}
      />
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative">
            <AvatarUpload
              currentAvatarUrl={avatarUrl}
              name={name} 
              onAvatarUpdate={setAvatarUrl}
            />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  {name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </h2>
                {isOwnProfile && (
                  <>
                    <button 
                      onClick={handleEdit}
                      className="text-gray-500 hover:text-rose-500 transform transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>

                    
                  </>
                )}
              </div>
              <p className="text-gray-600 mt-1 font-medium">{title}</p>
            </div>
            <div className="flex space-x-3">
              {!isCurrentUser && (
                <button
                  onClick={() => handleFollow(!isFollowing)}
                className={`px-4 py-2 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 ${
                  isFollowing
                    ? 'bg-gradient-to-r from-rose-100 to-purple-100 text-gray-800 hover:from-rose-200 hover:to-purple-200'
                    : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:from-rose-600 hover:to-purple-700 shadow-lg hover:shadow-rose-200/50'
                }`}
              >
                {isFollowing ? (
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Following
                    </span>
                  ) : 'Follow'}
                </button>
                )}
            </div>
          </div>
          
          <p className="text-gray-600 mt-4 leading-relaxed backdrop-blur-sm bg-white/30 p-4 rounded-lg shadow-sm border border-rose-100/50">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
