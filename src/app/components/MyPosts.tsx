"use client";

import { useState } from 'react';
import Post from "./Post";
import { useEffect } from 'react';

export default function MyPosts() {
  //get user from local storage
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user || '{}');
  const userAvatar = userData.avatar;
  const userName = userData.name;
  const userTitle = userData.title;
  const userBio = userData.bio;
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    afterPost();
  }, []);


  const afterPost = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="space-y-6">
      <Post
        userAvatar={userAvatar}
        userName={userName}
        content=""
        afterPost={afterPost}
      />
      {posts.map((post, index) => (
        <Post
          key={index}
          userAvatar={userAvatar}
          userName={userName}
          content={post.content}
        />
      ))}
    </div>
  );
}
