"use client";

interface FollowerCountsProps {
  posts?: number;
  following?: number;
  followers?: number;
}

export default function FollowerCounts({
  posts = 0,
  following = 0, 
  followers = 0
}: FollowerCountsProps) {
  return (
    <div className="flex items-center gap-4 text-xs text-gray-600">
      <div className="flex items-center gap-1">
        <span className="text-sm">{posts}</span>
        <span className="text-sm font-bold">posts</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm">{following}</span>
        <span className="text-sm font-bold">following</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm">{followers}</span>
        <span className="text-sm font-bold">followers</span>
      </div>
    </div>
  );
}
