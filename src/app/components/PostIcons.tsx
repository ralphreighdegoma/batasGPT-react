"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import CommentBox from './CommentBox';
import CommentBoxRead from './CommentBoxRead';

interface PostIconsProps {
  postId?: string;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
}

export default function PostIcons({
  postId = "",
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0
}: PostIconsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<any[]>([]);
  const [shares, setShares] = useState(initialShares);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const { authToken } = useAuth();
  const [loadingComments, setLoadingComments] = useState(false);

  const handleCommentApi = async (comment: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      await getCommentsApi();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  }

  const getCommentsApi = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
 
      if (data) {
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }

  const handleShowCommentBox = async () => {
    const newShowCommentBox = !showCommentBox;
    setShowCommentBox(newShowCommentBox);
    if (newShowCommentBox) {
      await getCommentsApi();
    }
  }

  const loadingCommentsComponent = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleCommentSubmit = (comment: string) => {
    handleCommentApi(comment);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3">
        <button 
          className="flex items-center gap-1 hover:text-red-500"
          onClick={() => setLikes(prev => prev + 1)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likes}
        </button>

        <button 
          className="flex items-center gap-1 hover:text-blue-500"
          onClick={handleShowCommentBox}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {comments.length}
        </button>

        <button className="flex items-center gap-1 hover:text-green-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {shares}
        </button>
      </div>
      {showCommentBox && (
        <>
          <CommentBox onCommentSubmit={handleCommentSubmit} />

          {comments.length > 0 ? (
            loadingComments ? (
              loadingCommentsComponent()
            ) : (
              <div className="h-[500px] overflow-y-auto">
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
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}
        </>
      )}
    </div>
  );
}
