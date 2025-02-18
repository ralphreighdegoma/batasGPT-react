"use client";

import { useState } from 'react';
import Post from "./Post";
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MyPosts({ profile }: { profile: any }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, authToken } = useAuth();

  useEffect(() => {
    if(!authToken){
      setIsLoading(false);
      return;
    }
    fetchPosts();
  }, [authToken]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${profile.hashId}/posts`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if(Array.isArray(data.data)){
        setPosts(data.data);
      }else{
        console.error('Invalid data received:', data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading){
    return (
      <div className="flex justify-center items-center mb-5">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      {user?.hashId === profile?.hashId && (
        <Post
          key="new-post"
          userAvatar={profile?.avatar || ""}
          userName={profile?.name || ""}
          content=""
          afterPost={fetchPosts}
          isEditing={true}
          hashId={profile?.hashId || ""}
        />
      )}
      {posts.map((post) => (
        <Post
          postId={post.id}
          key={post.id} 
          userAvatar={post?.user?.avatar || ""}
          userName={post?.user?.name || ""} 
          content={post.content || ""}
          images={post.images || []}
          tags={post.tags || []}
          createdAt={post.created_at || ""}
          isEditing={false}
          hashId={post?.user?.hashId || ""}
        />
      ))}
    </div>
  );
}
