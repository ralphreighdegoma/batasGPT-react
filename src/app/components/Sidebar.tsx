"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeMenu?: string;
}

export default function Sidebar({ activeMenu = 'for-you' }: SidebarProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  const menuItems = [
    {
      name: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: `/profile/${user?.hashId}`
    },
    {
      name: 'News Feed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      href: '/news-feed'
    },
    {
      name: 'Notifications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      href: '/notifications'
    },
    {
      name: 'Logout',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      href: '/login',
      onClick: handleLogout
    },
  ];
  return (
    <>
      {!user && (
        <div className="hidden md:block w-16 h-screen bg-gray-100 fixed left-0 top-0">
          <div className="flex flex-col h-full justify-center">
            <div className="px-1 py-6 space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:block w-16 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 shadow-sm">
        <div className="flex flex-col h-full justify-center">
          <nav className="px-1 py-6 space-y-4">
            {menuItems
              .filter(item => {
                const privateRoutes = ['/profile', '/news-feed', '/notifications', '/connections'];
                const isPrivateRoute = privateRoutes.includes(item.href);
                const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('authToken');
                return !isPrivateRoute || isLoggedIn;
              })
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group ${
                    activeMenu === item.href.slice(1)
                      ? 'bg-blue-100'
                      : ''
                  }`}
                >
                  <div className={`transform transition-transform duration-200 group-hover:scale-110 ${
                    activeMenu === item.href.slice(1) ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </div>
                </Link>
              ))}
          </nav>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <nav className="flex justify-around items-center h-16">
          {menuItems
            .filter(item => {
              const privateRoutes = ['/profile', '/news-feed', '/notifications', '/connections'];
              const isPrivateRoute = privateRoutes.includes(item.href);
              const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('authToken');
              return !isPrivateRoute || isLoggedIn;
            })
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center w-16 h-16 transition-colors duration-200 ${
                  activeMenu === item.href.slice(1)
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                <div className="transform transition-transform duration-200 hover:scale-110">
                  {item.icon}
                </div>
              </Link>
            ))}
        </nav>
      </div>
    </>
  );
}
