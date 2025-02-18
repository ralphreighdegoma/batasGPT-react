interface AvatarDisplayerProps {
  username: string;
  avatarUrl?: string;
}

const AvatarDisplayer = ({ username, avatarUrl }: AvatarDisplayerProps) => {
  return (
    <>
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-[10px] border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover mb-2"
        />
      ) : (
        <div className="w-12 h-12 rounded-[10px] bg-blue-500 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center mt-2 mr-2">
          <span className="text-xl font-bold text-white">
            {username[0].toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

export default AvatarDisplayer;
