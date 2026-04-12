import React from 'react';
import Skeleton from './ui/Skeleton';

export default function ProductCardSkeleton() {
  return (
    <div className="glass rounded-[2.5rem] overflow-hidden p-5 flex flex-col h-full border border-white/5">
      <Skeleton className="aspect-square rounded-[2.2rem] mb-6" />
      
      <div className="flex flex-col items-center mb-4">
        <Skeleton width="40%" height={12} className="mb-2" />
        <Skeleton width="70%" height={24} className="mb-2" />
        <Skeleton width="30%" height={12} />
      </div>

      <div className="bg-white/5 rounded-3xl p-5 mb-6 border border-white/5">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center w-full">
            <Skeleton width="30%" height={10} className="mx-auto mb-2" />
            <Skeleton width="60%" height={32} className="mx-auto" />
          </div>
          <div className="w-full h-px bg-white/5" />
          <div className="space-y-3 w-full">
            <Skeleton width="80%" height={16} />
            <Skeleton width="80%" height={16} />
            <Skeleton width="80%" height={16} />
          </div>
        </div>
      </div>

      <Skeleton height={56} className="rounded-2xl mb-3" />
      <Skeleton height={44} className="rounded-xl" />
    </div>
  );
}
