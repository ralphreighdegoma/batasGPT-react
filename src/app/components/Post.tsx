"use client";

import { useState, useEffect } from 'react';
import PostIcons from './PostIcons';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import PostContent from './PostContent';
import PostWriting from './PostWriting/index';
import { createPost } from '@/services/api/posts';
import Link from 'next/link';
import CommentBox from './CommentBox';
import CommentBoxRead from './CommentBoxRead';
import { createComment, getComments } from '@/services/api/comments';
import NameComponent from './Defaults/NameComponent';
import { likePost, getLikes } from "@/services/api/posts";
import AvatarDisplayer from './Defaults/AvatarDisplayer';



interface authToken {
  authToken: string;
}

interface PostProps {
  postId?: string;
  userAvatar?: string;
  userName?: string;
  content?: string;
  afterPost?: () => void;
  images?: string[];
  audio?: string;
  createdAt?: string;
  tags?: string[];
  hashId?: string;
  isEditing?: boolean;
  likesCount?: number;
  commentsCount?: number;
}

export default function Post({ 
  postId = "",
  userAvatar = "",
  userName = "Anonymous User",
  content = "",
  images = [],
  audio = "",
  afterPost = () => {},
  createdAt = "",
  tags = [],
  hashId = "",
  isEditing = false,
  likesCount = 0,
  commentsCount = 0
}: PostProps) {
  const [postContent, setPostContent] = useState<string>(content);
  const [comments, setComments] = useState<any[]>([]);
  const [shares, setShares] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const { user, authToken } = useAuth();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  const formattedDate = createdAt ? formatDate(createdAt) : '';

  const handleUsername = () => {
    return userName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const handlePost = async (content: string, images: File[] | undefined, audio: File | undefined, tags: string[]) => {
    if (content.trim() === '' && images?.length === 0 && audio) {
      toast.error('Content is required.');
      return;
    }

    if (!user.email_verified_at) {
      toast.error('Please verify your email to post');
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 5000));
    const formData = new FormData();
    formData.append('content', content);
    images?.forEach((image, index) => {
      formData.append(`images[]`, image);
    });
    if (audio) {
      formData.append('audio', audio);
    }
    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }
    try {
      await createPost(formData, authToken);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
      return;
    }

    setIsLoading(false);

    afterPost();

    toast.success('Post created successfully');
  };

  const handleAvatar = () => {
    if(!userName) { return false}
    return (
    <AvatarDisplayer username={userName} avatarUrl={userAvatar} />
    )
  }

  const handleCommentSubmit = async (comment: string) => {
    try {
      await createComment(comment, postId, authToken);
      await getCommentsApi();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const getCommentsApi = async () => {
    try {
      setLoadingComments(true);
      const data = await getComments(postId, authToken);
      if (data) {
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleShowComments = async () => {
    const newShowComments = !showComments;
    setShowComments(newShowComments);
    if (newShowComments) {
      await getCommentsApi();
    }
  };

  const loadingCommentsComponent = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl bg-white/95 backdrop-blur-lg shadow-md p-6 transition-all duration-200 border-b border-gray-200">
      {!isEditing && (
        <div className="flex items-center mb-4">
          {handleAvatar()}
          <div className="ml-2">
            <Link href={`/profile/${hashId}`} className="font-semibold text-gray-900 text-base hover:text-blue-600 transition-colors duration-200">
              <NameComponent userName={userName} />
            </Link>
            <div className="text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z"/>
              </svg>
              {formattedDate}
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        <PostWriting onSubmit={handlePost} isLoading={isLoading} />
      ) : (
        <PostContent content={postContent} images={images} audio={audio} tags={tags} />
      )}

      {!isEditing && (
        <>
          <div className="pt-3">
            <PostIcons
              postId={postId}
              onShowComments={handleShowComments}
              likesCount={likesCount}
              commentsCount={commentsCount}
            />
          </div>

          {showComments && (
            <div className="mt-4">
              <CommentBox onCommentSubmit={handleCommentSubmit} />

              {comments.length > 0 ? (
                loadingComments ? (
                  loadingCommentsComponent()
                ) : (
                  <div className="max-h-[500px] h-auto overflow-y-auto">
                    {comments.map((comment) => (
                      <CommentBoxRead
                        key={comment.id}
                        postId={postId}
                        commentId={comment.id}
                        comment={comment.comment}
                        userName={comment.user.name}
                        userAvatar={comment.user.avatar}
                        createdAt={comment.created_at}
                      />
                    ))}
                  </div>
                )
              ) : (
                <p className="text-gray-500 text-xs text-center mt-8">No comments yet</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
