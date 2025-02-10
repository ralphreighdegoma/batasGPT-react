'use client';

import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import { useDebounce } from 'use-debounce';
//siderbar
import  Sidebar  from '../components/Sidebar';

interface User {
  id: number;
  name: string;
  title?: string;
  avatar_url?: string;
}

export default function ConnectionsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Get auth token after component mounts
    setAuthToken(localStorage.getItem('authToken'));
  }, []);

  useEffect(() => {
    if (!authToken) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/search?q=${debouncedSearch}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, authToken]);

  const handleFollow = async (userId: number) => {
    if (!authToken) return;

    try {
      await fetch('/api/connections', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <>
      <Sidebar activeMenu="connections" />
      <div className="min-h-screen bg-gray-50 pt-20 px-4 pl-72">
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              title={user.title}
              avatarUrl={user.avatar_url}
              onFollow={handleFollow}
              unoptimized={true} // Disable Next.js image optimization
            />
          ))}
        </div>

        {/* No Results */}
        {!loading && users.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No users found
          </div>
        )}
      </div>
    </>
  );
}
