"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileBanner from '../../components/ProfileBanner';
import Sidebar from '../../components/Sidebar';
import TabComponent from '../../components/TabComponent';
import MyPosts from '../../components/MyPosts';
import MyFistbumps from '../../components/MyFistbumps';
import { getProfile } from '@/services/api/profile';

interface UserProfile {
  name: string;
  bio?: string;
  avatar: string;
  address?: string;
  postCount: number;
  hashId: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('No auth token found');
        }

        const response = await getProfile(params.hash as string, authToken);
        const userData = response.user;

        setProfile(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    if (params.hash) {
      fetchProfile();
    }
  }, [params.hash]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
      </div>

      <div className="fixed top-0 left-0 w-72 mt-6 ml-6 z-10">
        <Sidebar activeMenu="profile" />
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-white/90 backdrop-blur-lg ">
            <div>
              <ProfileBanner
                username={profile.name}
                bio={profile.bio}
                avatarUrl={profile.avatar}
                address={profile.address}
                postCount={profile.postCount}
              />
            </div>
            <div className="border-t border-gray-100">
                <TabComponent
                tabs={[
                  { 
                    label: 'Posts', 
                    content: <div><MyPosts profile={profile} /></div>
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