import React from 'react';

/**
 * Skeleton loader shown while product cards are loading.
 */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-premium border border-gray-100 animate-pulse h-full">
    <div className="aspect-square bg-earth"></div>
    <div className="p-3 sm:p-8 space-y-3 sm:space-y-4">
      <div className="h-4 sm:h-6 bg-gray-100 rounded-lg sm:rounded-xl w-3/4"></div>
      <div className="h-3 sm:h-4 bg-gray-50 rounded-lg sm:rounded-xl w-1/2"></div>
      <div className="pt-2 sm:pt-4 flex justify-between items-center">
        <div className="h-5 sm:h-8 bg-gray-100 rounded-lg sm:rounded-xl w-1/3"></div>
        <div className="h-8 w-8 sm:h-12 sm:w-12 bg-gray-100 rounded-xl sm:rounded-2xl"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
