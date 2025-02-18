"use client";

import { useState, useEffect } from 'react';
import ProfileSearchDisplay from './Defaults/ProfileSearchDisplayComponent';

interface Profile {
  avatar: string;
  name: string;
  hashId: string;
}

interface ProfileListComponentProps {
  profiles: Profile[];
}

export default function ProfileListComponent({ profiles }: ProfileListComponentProps) {
  return (
    <div className="divide-y divide-gray-200">
      {profiles.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No profiles found
        </div>
      )}
      {profiles.filter(profile => profile.hashId).map((profile) => (
        <ProfileSearchDisplay
          key={profile.hashId}
          avatar={profile.avatar}
          name={profile.name}
          hashId={profile.hashId}
        />
      ))}
    </div>
  );
}
