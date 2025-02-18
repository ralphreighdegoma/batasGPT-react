"use client";

interface NameComponentProps {
  userName: string;
  className?: string;
}

export default function NameComponent({ userName, className = "" }: NameComponentProps) {
  const formatName = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <span className={`font-medium text-sm ${className}`}>
      {formatName(userName)}
    </span>
  );
}
