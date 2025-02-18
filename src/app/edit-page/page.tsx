"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import RightAdvert from '../components/RightAdvert';
import toast, { Toaster } from 'react-hot-toast';
import AvatarUpload from '../components/AvatarUpload';
import { useAuth } from '@/context/AuthContext';

interface FormData {
  name: string;
  title: string;
  bio: string;
  aboutMe: string;
  address: string;
  avatar?: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { user, authToken, login, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    bio: '',
    aboutMe: '',
    address: '',
    avatar: ''
  });

  useEffect(() => {
    if(!authToken) {
      return;
    }
    loadUserData();
  }, [authToken]);

  const loadUserData = async () => {
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();

      setFormData({
        name: data.user.name || '',
        title: data.user.title || '',
        bio: data.user.bio || '',
        aboutMe: data.user.aboutMe || '',
        address: data.user.address || '',
        avatar: data.user.avatar || ''
      });


    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setFormData(prev => ({
      ...prev,
      avatar: newAvatarUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (response.ok) {
        if(data.data) {
          console.log("here")
          console.log(data.data)
          updateUser(data.data);
          router.push('/profile');
        }
      }

      
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if ((name === 'bio' || name === 'aboutMe') && value.length > 200) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMarkdownFormat = (format: string, field: 'bio' | 'aboutMe') => {
    const textarea = document.querySelector(`textarea[name="${field}"]`) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      let wrapper = '';
      
      switch(format) {
        case 'bold':
          wrapper = '**';
          break;
        case 'italic':
          wrapper = '*';
          break;
        case 'strike':
          wrapper = '~~';
          break;
      }

      const newText = text.substring(0, start) + wrapper + text.substring(start, end) + wrapper + text.substring(end);
      if (newText.length <= 200) {
        handleChange({
          target: {
            name: field,
            value: newText
          }
        } as React.ChangeEvent<HTMLTextAreaElement>);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-sky-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="fixed top-0 left-0 w-72 mt-6 ml-6 z-10">
        <Sidebar activeMenu="profile" />
      </div>

      <div className="ml-80 flex-1 max-w-4xl mx-auto">
        <div className="bg-white/90 h-screen backdrop-blur-lg shadow-xl border border-gray-100 p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-8">
              <AvatarUpload
                currentAvatarUrl={formData.avatar}
                name={formData.name}
                onAvatarUpdate={handleAvatarUpdate}
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio (200 characters max)
              </label>
              <div className="border border-gray-200 rounded-lg">
                <div className="border-b border-gray-200 p-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('bold', 'bio')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V8.625M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('italic', 'bio')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Italic"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('strike', 'bio')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Strikethrough"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  </button>
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-b-lg"
                  placeholder="Write your bio using markdown formatting..."
                  maxLength={200}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {formData.bio.length}/200 characters. Supports markdown formatting: **bold**, *italic*, ~~strikethrough~~
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me (200 characters max)
              </label>
              <div className="border border-gray-200 rounded-lg">
                <div className="border-b border-gray-200 p-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('bold', 'aboutMe')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V8.625M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('italic', 'aboutMe')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Italic"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMarkdownFormat('strike', 'aboutMe')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Strikethrough"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  </button>
                </div>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-b-lg"
                  placeholder="Write about yourself using markdown formatting..."
                  maxLength={200}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {formData.aboutMe.length}/200 characters. Supports markdown formatting: **bold**, *italic*, ~~strikethrough~~
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
