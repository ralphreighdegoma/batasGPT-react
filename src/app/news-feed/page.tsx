"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import RightAdvert from '../components/RightAdvert';
import { useAuth } from '../../context/AuthContext';

export default function NewsFeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user, authToken, login, logout } = useAuth();


  const fetchPosts = async (pageNum = 1) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news-feed?page=${pageNum}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      
      if (pageNum === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
      }
      
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchPosts();
    }
  }, [authToken]); 

  const loadMore = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPosts(nextPage);
  };

  const filteredPosts = posts.filter(post =>
    post.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAfterPost = () => {
    setPage(1);
    fetchPosts(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
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
        <Sidebar activeMenu="news-feed" />
      </div>

      <div className="ml-80 flex-1  max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg  shadow-xl border border-gray-100 h-screen">
          <div className="p-8 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* New Post Creation */}
            <Post 
              afterPost={handleAfterPost}
              userAvatar={user?.avatar || undefined}
              userName={user?.name || undefined}
            />

            {/* Posts List */}
            {filteredPosts.map((post, index) => (
              <Post
                key={post.id || index}
                userAvatar={post.user?.avatar}
                userName={post.user?.name}
                content={post.content}
              />
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 font-medium">No posts found. Be the first to share something!</p>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <RightAdvert />
    </div>
  );
}
