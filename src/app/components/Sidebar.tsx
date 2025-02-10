"use client";

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  activeMenu?: string;
}

export default function Sidebar({ activeMenu = 'for-you' }: SidebarProps) {
  const menuItems = [
    {
      name: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/profile'
    },
    {
      name: 'Post',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      href: '/create-post'
    },
    {
      name: 'News Feed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
      name: 'Connections',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      href: '/connections'
    }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 shadow-md">
      <div className="flex flex-col h-full justify-center">
        <nav className="px-3 py-6 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200 hover:bg-blue-50 ${
                activeMenu === item.href.slice(1)
                  ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm'
                  : 'hover:text-blue-700'
              }`}
            >
              <div className={`transform transition-transform duration-200 ${
                activeMenu === item.href.slice(1) ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.icon}
              </div>
              <span className={`ml-3 font-medium ${
                activeMenu === item.href.slice(1) 
                  ? 'text-blue-800'
                  : 'text-gray-600'
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
