"use client";

import { useState, useEffect } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import Sidebar from '../components/Sidebar';
import ProfileAbout from '../components/ProfileAbout';
import ProfileTab from '../components/ProfileTab';
import MyPosts from '../components/MyPosts';
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
  }, []);

  //await get user profile
  const getUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('id', data.id);
      localStorage.setItem('name', data.name);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) {
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

      <div className="ml-80 flex-1 py-8 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
            <div className="p-8">
              <ProfileInfo
                id={user?.id}
                name={user?.name}
                title={user?.title}
                bio={user?.bio}
                avatarUrl={user?.avatar}
              />
            </div>
            <div className="border-t border-gray-100">
              <ProfileTab
                tabs={[
                  { 
                    label: 'Posts', 
                    content: <div className="p-8"><MyPosts /></div>
                  },
                  { 
                    label: 'About', 
                    content: <div className="p-8"><ProfileAbout /></div>
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
