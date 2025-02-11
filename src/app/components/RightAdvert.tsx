"use client";
import { useState, useEffect } from 'react';

interface Advertisement {
  id: number;
  businessName: string;
  description: string;
  location: string;
  imageUrl: string;
}

export default function RightAdvert() {
  const [ads, setAds] = useState<Advertisement[]>([
    {
      id: 1,
      businessName: "Tech Solutions Inc",
      description: "Custom software development and IT consulting services", 
      location: "San Francisco, CA",
      imageUrl: "https://placehold.co/400"
    },
    {
      id: 2, 
      businessName: "Green Earth Landscaping",
      description: "Professional landscaping and garden maintenance",
      location: "Portland, OR",
      imageUrl: "https://placehold.co/400"
    },
    {
      id: 3,
      businessName: "Creative Design Studio",
      description: "Branding, web design and digital marketing",
      location: "New York, NY", 
      imageUrl: "https://placehold.co/400"
    }
  ]);
  return (
    <div className="sticky right-0 w-[330px] z-10">
      <div className="w-full max-w-sm bg-white shadow-md overflow-hidden h-screen">
        <div className="flex flex-col justify-center h-[calc(100%-4rem)] space-y-4 p-4">
          {ads.map((ad) => (
            <div key={ad.id} className="flex space-x-4 p-2 hover:bg-gray-50 transition duration-200">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                  <img 
                    src={ad.imageUrl} 
                    alt={ad.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {ad.businessName}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {ad.description}
                </p>
                <div className="flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-gray-500 ml-1">{ad.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
