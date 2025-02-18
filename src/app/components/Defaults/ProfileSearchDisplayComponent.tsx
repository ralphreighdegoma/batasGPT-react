"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AvatarDisplayer from './AvatarDisplayer';
import NameComponent from './NameComponent';
import FollowButtonComponent from './FollowButtonComponent';
import FollowerCounts from './FollowerCounts';

interface ProfileSearchDisplayProps {
  avatar: string;
  name: string;
  hashId: string;
}

export default function ProfileSearchDisplay({ avatar, name, hashId }: ProfileSearchDisplayProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
      <Link href={`/profile/${hashId}`} className="flex items-center space-x-3">
        <div className="relative w-12 h-12">
          <AvatarDisplayer
            username={name}
            avatarUrl={avatar}
          />
        </div>
        <div className="flex flex-col">
          <NameComponent userName={name}/>
          <FollowerCounts posts={10} following={10} followers={10} />
        </div>

      </Link>


      
      <FollowButtonComponent isFollowing={isFollowing} onClick={handleFollow} />
    </div>
  );
}
