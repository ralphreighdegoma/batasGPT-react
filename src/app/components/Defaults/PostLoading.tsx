export default function PostLoading() {
  return (
    <div className="max-w-2xl bg-white/95 backdrop-blur-lg shadow-md p-6 transition-all duration-200 border-b border-gray-200">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="ml-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-gray-200 rounded mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="pt-3 flex space-x-4">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
