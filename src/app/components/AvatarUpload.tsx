"use client";

import { useState, useRef, ChangeEvent } from 'react';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  name?: string;
  onAvatarUpdate: (newAvatarUrl: string) => void;
}

export default function AvatarUpload({ 
  currentAvatarUrl = "https://randomuser.me/api/portraits/men/42.jpg",
  name = "User",
  onAvatarUpdate
}: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const { data: { avatar: newAvatarUrl } } = await response.json();
      setAvatarUrl(newAvatarUrl);
      onAvatarUpdate(newAvatarUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group">
      <img
        src={avatarUrl}
        alt={`${name}'s profile`}
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
      />
      
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={triggerFileInput}
      >
        <span className="text-white text-sm">
          {isUploading ? 'Uploading...' : 'Change Photo'}
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
