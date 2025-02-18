"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import RightAdvert from "../components/RightAdvert";
import { useAuth } from "../../context/AuthContext";
import NewsFeedSearch from "../components/NewsFeedSearch";
import PostLoading from "../components/Defaults/PostLoading";
import SearchAll from "../components/Defaults/SearchAll";
import TabComponent from "../components/TabComponent";
import ProfileListComponent from "../components/ProfileListComponent";

export default function NewsFeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user, authToken, login, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [query, setQuery] = useState('');
  const fetchPosts = async (pageNum = 1) => {
    try {
      const query = new URLSearchParams(window.location.search).get('q') || '';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news-feed?page=${pageNum}${query ? `&q=${query}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();

      setPosts(data.posts);
      setProfiles(data.profiles)

      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  //detect query params
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('q') || '';
    setQuery(query);
  }, [window.location.search]);

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


  const handleSearch = (term: string) => {
    // Update the URL with the search term
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('q', term);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    fetchPosts(1);
  };

  const handleSuburbSelect = (suburb: string) => {
    console.log(suburb);
  };
  const postsComponent = () => {
    return (
      <>
      
        <div className="h-screen overflow-y-auto relative">
          {loading ? loadingComponent() : (
            <>
              {posts.map((post: {
                id: string;
                user: {
                  avatar: string;
                  name: string;
                  hashId: string;
                };
                content: string;
                images: string[];
                audio: string;
                created_at: string;
                tags: string[];
                likesCount: number;
                commentsCount: number;
              }, index: number) => (
                <Post
                  key={post.id || index}
                  postId={post.id}
                  userAvatar={post.user?.avatar}
                  userName={post.user?.name}
                  content={post.content}
                  images={post.images}
                  audio={post.audio}
                  createdAt={post.created_at}
                  tags={post.tags}
                  hashId={post.user.hashId}
                  likesCount={post.likesCount}
                  commentsCount={post.commentsCount}
                />
              ))}
            </>
          )}
          {posts.length == 0 && (
            <div className="text-center ">
              <p className="text-center py-4 text-gray-500">
              No posts found.
              </p>
            </div>
          )}
          {/* Bottom shadow overlay to indicate more content */}
        </div>

        
      </>
    );
  }

  const loadingComponent = () => {
    return (
      <>
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </>
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

      <div className=" flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white/90 backdrop-blur-lg border border-gray-100 min-h-screen">
            <div className="">
              <SearchAll query={query} handleSearch={handleSearch} />
              <TabComponent
                tabs={[
                  { 
                    label: 'Posts', 
                    content: <div>{postsComponent()}</div>
                  },
                  {
                    label: 'Profiles',
                    content: <div><ProfileListComponent profiles={profiles}/></div>
                  },
                  {
                    label: 'Businesses',
                    content: <div></div>
                  }
                ]}
              />
              
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
