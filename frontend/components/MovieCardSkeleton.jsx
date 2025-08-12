const MovieCardSkeleton = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border-4 border-transparent animate-pulse">
    <div className="w-full h-[570px] bg-gray-700" />
    <div className="p-4">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

export default MovieCardSkeleton;
