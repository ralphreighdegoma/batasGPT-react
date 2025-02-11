"use client";

import { useEffect, useState } from 'react';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

export default function CreatePost() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      setUser(data);
    };

    getUserProfile();
  }, []);

  return (
    <>
      <Sidebar activeMenu="create-post" />
      <div className="min-h-screen bg-gray-50 pt-20 px-4 pl-72">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Post</h1>
          <Post user={user} userName={user?.name} title={user?.title} avatarUrl={user?.avatar_url} />
        </div>
      </div>
    </>
  );
}
