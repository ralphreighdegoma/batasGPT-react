"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CommentBox from "./CommentBox";
import CommentBoxRead from "./CommentBoxRead";
import { createComment, getComments } from "@/services/api/comments";
import { likePost, getLikes } from "@/services/api/posts";

interface authToken {
  authToken: string;
}

interface PostIconsProps {
  postId?: string;
  onShowComments: () => void;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export default function PostIcons({
  postId = "",
  onShowComments,
  likesCount = 0,
  commentsCount = 0,
  isLiked = false
}: PostIconsProps) {
  const [likes, setLikes] = useState<number>(likesCount);
  const [liked, setLiked] = useState<boolean>(isLiked);
  const { authToken, user } = useAuth();

  useEffect(() => {
    setLikes(likesCount);
    setLiked(isLiked);
  }, [likesCount, isLiked]);

  const handleLikePost = async () => {
    try {
      await likePost(postId, authToken);
      setLiked(!liked);
      setLikes(prev => liked ? prev - 1 : prev + 1);
      await getLikesApi();
    } catch (error) {
      console.error("Failed to like post:", error);
      setLiked(liked);
      setLikes(likes);
    }
  };

  const getLikesApi = async () => {
    try {
      const data = await getLikes(postId, authToken);
      if (data) {
        setLikes(data.likes.length);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  };

  const heartIconComponent = () => {
    if (liked) {
      return (
        <svg
          className="w-5 h-5 text-sm"
          fill="red"
          stroke="red"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5 text-sm"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    );
  };

  return (
    <div className="flex justify-left items-center gap-8 text-gray-500 text-sm pt-2">
      <button
        className="flex items-left gap-1.5 hover:text-red-500 text-sm"
        onClick={handleLikePost}
      >
        {heartIconComponent()}
        <span className="text-sm">{likes}</span>
      </button>

      <button
        className="flex items-center gap-1.5 hover:text-blue-500 text-sm"
        onClick={onShowComments}
      >
        <svg
          className="w-5 h-5 text-sm"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="text-sm">{commentsCount}</span>
      </button>
    </div>
  );
}
