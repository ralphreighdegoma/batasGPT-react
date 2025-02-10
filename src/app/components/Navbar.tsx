"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // For now just get name from localStorage, later can fetch from API
      const userName = localStorage.getItem('userName') || 'User';
      setUser({ name: userName });
      getUserProfile();
    }
  }, []);

  //get user profile
  const getUserProfile = async () => {
    //NEXT_PUBLIC_API_URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    const data = await response.json();
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-white to-rose-50 shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              BatasGPT
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all duration-300"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-white/50 hover:shadow-md transition-all duration-300"
                >
                  <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent font-medium">
                    Hi, {user.name.split(' ').map((n: string, i: number) => i === 0 ? n.charAt(0).toUpperCase() + n.slice(1).toLowerCase() : n.charAt(0).toUpperCase()).join(' ')}
                  </span>
                  <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white/80 backdrop-blur-lg ring-1 ring-black/5 transform transition-all duration-300">
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-100 hover:to-purple-100 transition-colors rounded-t-xl"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-rose-100 hover:to-purple-100 transition-colors rounded-b-xl"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
