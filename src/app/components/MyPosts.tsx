"use client";

import { useState } from 'react';
import Post from "./Post";
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const { user, authToken } = useAuth();

  useEffect(() => {
    if(!authToken){
      return;
    }
    fetchPosts();
  }, [authToken]);

  const fetchPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setPosts(data);
  };

  if(!user){
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Post
        userAvatar={user?.avatar || undefined} 
        userName={user?.name || undefined}
        content=""
        afterPost={fetchPosts}
      />
      {posts.map((post) => (
        <Post
          postId={post.id}
          key={post.id} 
          userAvatar={user?.avatar || undefined}
          userName={user?.name || undefined} 
          content={post.content}
        />
      ))}
    </div>
  );
}
