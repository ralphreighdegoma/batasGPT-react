"use client";

import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

export default function CreatePost() {
  return (
    <>
      <Sidebar activeMenu="create-post" />
      <div className="min-h-screen bg-gray-50 pt-20 px-4 pl-72">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Post</h1>
          <Post />
        </div>
      </div>
    </>
  );
}
