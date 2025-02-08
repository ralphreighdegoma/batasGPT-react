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
    
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 w-64 mt-4 ml-4">
        <Sidebar activeMenu="profile" />
      </div>

      <div className="ml-72 flex-1 bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <ProfileInfo
            id={user?.id}
            name={user?.name}
            title={user?.title}
            bio={user?.bio}
            avatarUrl={user?.avatar}
          />
          <ProfileTab
            tabs={[
            { label: 'Posts', content: <MyPosts /> },
            { label: 'About', content: <ProfileAbout /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
