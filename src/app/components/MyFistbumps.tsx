"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Fistbump {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  created_at: string;
}

export default function MyFistbumps() {
  const [fistbumps, setFistbumps] = useState<Fistbump[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, authToken } = useAuth();

  useEffect(() => {
    const fetchFistbumps = async () => {
      try {
        // Simulated API call with timeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock data
        const mockFistbumps: Fistbump[] = [
          {
            id: '1',
            user: {
              id: '101',
              name: 'John Doe',
              avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
              bio: 'Full Stack Software Developer specializing in React, Node.js and Cloud Architecture',
              address: '123 Main St, Anytown, USA',
              postCount: 10,
              fistbumpCount: 10
            },
            created_at: '2023-10-01T10:00:00Z'
          },
          {
            id: '2',
            user: {
              id: '102',
              name: 'Jane Smith',
              avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
              bio: 'Full Stack Software Developer specializing in React, Node.js and Cloud Architecture',
              address: '456 Elm St, Anytown, USA',
              postCount: 5,
              fistbumpCount: 5
            },
            created_at: '2023-09-28T15:30:00Z'
          }
        ];

        setFistbumps(mockFistbumps);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fistbumps:', error);
        setLoading(false);
      }
    };

    fetchFistbumps();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (fistbumps.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No fistbumps yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {fistbumps.map((fistbump) => (
        <div 
          key={fistbump.id}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <img
            src={fistbump.user.avatar}
            alt={`${fistbump.user.name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{fistbump.user.name}</h3>
            <div className="flex items-center gap-x-6 text-sm text-gray-500 mt-1">
              {fistbump.user.address && (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {fistbump.user.address}
                </span>
              )}
              {fistbump.user.postCount && (
                <span>{fistbump.user.postCount} posts</span>
              )}
              {fistbump.user.fistbumpCount && (
                <span>{fistbump.user.fistbumpCount} fistbumpers</span>
              )}
            </div>
            {fistbump.user.bio && (
              <p className="text-sm text-gray-600 mt-1">{fistbump.user.bio}</p>
            )}
          </div>
          <button className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-sm transition-colors duration-200">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
