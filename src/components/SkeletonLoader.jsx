import React from 'react';

const SkeletonLoader = ({ className = '', width = 'w-full', height = 'h-4' }) => (
  <div 
    className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`}
  />
);

// Skeleton for gig cards
export const GigCardSkeleton = () => (
  <div className="bg-surface rounded-lg shadow-card p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <SkeletonLoader height="h-6" width="w-3/4" className="mb-2" />
        <SkeletonLoader height="h-4" width="w-1/2" />
      </div>
      <SkeletonLoader height="h-8" width="w-16" className="rounded-full" />
    </div>
    
    <SkeletonLoader height="h-4" className="mb-2" />
    <SkeletonLoader height="h-4" width="w-5/6" className="mb-4" />
    
    <div className="flex flex-wrap gap-2 mb-4">
      <SkeletonLoader height="h-6" width="w-16" className="rounded-full" />
      <SkeletonLoader height="h-6" width="w-20" className="rounded-full" />
      <SkeletonLoader height="h-6" width="w-14" className="rounded-full" />
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SkeletonLoader height="h-4" width="w-20" />
        <SkeletonLoader height="h-4" width="w-16" />
      </div>
      <div className="flex space-x-2">
        <SkeletonLoader height="h-8" width="w-20" className="rounded" />
        <SkeletonLoader height="h-8" width="w-16" className="rounded" />
      </div>
    </div>
  </div>
);

// Skeleton for dashboard stats
export const StatCardSkeleton = () => (
  <div className="bg-surface rounded-lg shadow-card p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <SkeletonLoader height="h-4" width="w-24" className="mb-2" />
        <SkeletonLoader height="h-8" width="w-16" className="mb-2" />
        <SkeletonLoader height="h-4" width="w-12" />
      </div>
      <SkeletonLoader height="h-12" width="w-12" className="rounded-lg" />
    </div>
  </div>
);

// Skeleton for application tracker
export const ApplicationSkeleton = () => (
  <div className="bg-surface rounded-lg shadow-card p-4 animate-pulse">
    <div className="flex items-center justify-between mb-3">
      <div className="flex-1">
        <SkeletonLoader height="h-5" width="w-2/3" className="mb-2" />
        <SkeletonLoader height="h-4" width="w-1/3" />
      </div>
      <SkeletonLoader height="h-6" width="w-20" className="rounded-full" />
    </div>
    
    <SkeletonLoader height="h-4" width="w-full" className="mb-2" />
    <SkeletonLoader height="h-4" width="w-4/5" className="mb-3" />
    
    <div className="flex items-center justify-between">
      <SkeletonLoader height="h-4" width="w-24" />
      <SkeletonLoader height="h-8" width="w-24" className="rounded" />
    </div>
  </div>
);

// Skeleton for profile form
export const ProfileFormSkeleton = () => (
  <div className="bg-surface rounded-lg shadow-card p-6 animate-pulse">
    <SkeletonLoader height="h-6" width="w-32" className="mb-6" />
    
    <div className="space-y-6">
      <div>
        <SkeletonLoader height="h-4" width="w-16" className="mb-2" />
        <div className="flex flex-wrap gap-2">
          <SkeletonLoader height="h-8" width="w-16" className="rounded-full" />
          <SkeletonLoader height="h-8" width="w-20" className="rounded-full" />
          <SkeletonLoader height="h-8" width="w-14" className="rounded-full" />
          <SkeletonLoader height="h-8" width="w-18" className="rounded-full" />
        </div>
      </div>
      
      <div>
        <SkeletonLoader height="h-4" width="w-24" className="mb-2" />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonLoader height="h-10" className="rounded" />
          <SkeletonLoader height="h-10" className="rounded" />
        </div>
      </div>
      
      <div>
        <SkeletonLoader height="h-4" width="w-32" className="mb-2" />
        <div className="space-y-2">
          <SkeletonLoader height="h-6" width="w-full" />
          <SkeletonLoader height="h-6" width="w-full" />
          <SkeletonLoader height="h-6" width="w-full" />
        </div>
      </div>
      
      <SkeletonLoader height="h-10" width="w-24" className="rounded" />
    </div>
  </div>
);

// Generic list skeleton
export const ListSkeleton = ({ items = 3, itemHeight = 'h-16' }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonLoader key={index} height={itemHeight} className="rounded-lg" />
    ))}
  </div>
);

// Text skeleton with multiple lines
export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader 
        key={index} 
        width={index === lines - 1 ? 'w-3/4' : 'w-full'} 
      />
    ))}
  </div>
);

export default SkeletonLoader;
