"use client";

import { useState, useRef, ChangeEvent } from 'react';
import { useAuth } from '../../context/AuthContext';


interface AvatarUploadProps {
  currentAvatarUrl?: string;
  name?: string;
  onAvatarUpdate: (newAvatarUrl: string) => void;
}

export default function AvatarUpload({ 
  currentAvatarUrl,
  name,
  onAvatarUpdate
}: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, authToken, login, logout } = useAuth();


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
          'Authorization': `Bearer ${authToken}`
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

  const handleAvatar = () => {
    if (avatarUrl) {
      return <img src={avatarUrl} alt={`${name}'s profile`} className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />;
    } else {
      return (
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-large">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="relative group">
      {handleAvatar()}
      
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
