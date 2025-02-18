"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "../../context/AuthContext";
import PictureViewer from './Defaults/PictureViewer';

interface PostContentProps {
  content: string;
  images?: string[];
  audio?: string[];
  tags?: string[];
}

export default function PostContent({ content, images, audio, tags }: PostContentProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [linkPreview, setLinkPreview] = useState<{url: string, image: string} | null>(null);
  const { authToken } = useAuth();

  const getRandomSize = (index: number) => {
    const sizes = ['h-48', 'h-64', 'h-56'];
    return sizes[index % sizes.length];
  };

  useEffect(() => {
    const checkForLinks = async () => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matches = content.match(urlRegex);
      if (matches && matches.length > 0) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/og-image?url=${encodeURIComponent(matches[0])}`, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            }
          });
          const data = await response.json();
          if (data.ogImage) {
            setLinkPreview({
              url: matches[0],
              image: data.ogImage
            });
            return;
          }
        } catch (error) {
          console.error('Error fetching link preview:', error);
          setLinkPreview(null);
        }
      }
    };

    checkForLinks();
  }, [content, authToken]);

  const renderContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return "";
      }
      return part;
    });
  };

  return (
    <div className="mb-2 space-y-2">
      {content.length > 100 ? (
        <div className="text-gray-700 whitespace-pre-wrap leading-tight text-sm">
          {showFullContent ? (
            renderContent(content)
          ) : (
            <>
              {renderContent(content.slice(0, 230))}...
              <button 
                onClick={() => setShowFullContent(true)}
                className="text-blue-500 hover:text-blue-700 text-xs font-medium ml-1"
              >
                Read more
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="text-gray-700 whitespace-pre-wrap leading-tight text-sm">
          {renderContent(content)}
        </div>
      )}

      {linkPreview && (
        <div className="mt-2">
          <a href={linkPreview.url} target="_blank" rel="noopener noreferrer">
            <img 
              src={linkPreview.image}
              alt="Link preview"
              className="rounded-lg max-h-48 object-cover hover:opacity-90 transition-opacity"
            />
          </a>
        </div>
      )}

      {images && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative h-40 cursor-pointer overflow-hidden rounded-lg bg-gray-100"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {images && selectedImageIndex !== null && (
        <PictureViewer
          images={images}
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          initialIndex={selectedImageIndex}
        />
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
