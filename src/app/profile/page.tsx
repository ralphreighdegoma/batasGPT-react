"use client";

import { useState, useEffect } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import Sidebar from '../components/Sidebar';
import ProfileAbout from '../components/ProfileAbout';
import TabComponent from '../components/TabComponent';
import MyPosts from '../components/MyPosts';
import RightAdvert from '../components/RightAdvert';
import { useAuth } from '../../context/AuthContext';
import ProfileBanner from '../components/ProfileBanner';
import MyFistbumps from '../components/MyFistbumps';

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, authToken, login, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute right-1/4 top-1/4 transform rotate-45">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-lg opacity-20"></div>
        </div>
        <div className="absolute left-1/4 bottom-1/4 transform -rotate-12">
          <div className="w-32 h-32 border-4 border-indigo-200 rounded-full opacity-20"></div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-72 mt-6 ml-6 z-10">
        <Sidebar activeMenu="profile" />
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white/90 backdrop-blur-lg shadow-xl border border-gray-100">
            <div>
              <ProfileBanner
                username={user?.name}
                bio={user?.bio}
                avatarUrl={user?.avatar}
                address={user?.address}
                postCount={user?.postCount}
              />
            </div>
            <div className="border-t border-gray-100">
              <TabComponent
                tabs={[
                  { 
                    label: 'Posts', 
                    content: <div><MyPosts /></div>
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
