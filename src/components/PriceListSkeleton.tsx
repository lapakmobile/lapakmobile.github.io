import React from 'react';
import Skeleton from './ui/Skeleton';

export default function PriceListSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar Skeleton */}
      <div className="lg:col-span-4 space-y-4">
        <Skeleton height={48} className="rounded-2xl w-full" />
        <div className="glass rounded-3xl overflow-hidden border border-white/5 p-2 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0">
              <Skeleton width={40} height={40} className="rounded-xl" />
              <Skeleton width="60%" height={16} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Table Skeleton */}
      <div className="lg:col-span-8">
        <div className="glass rounded-[2.5rem] p-8 border border-white/5 h-full">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
            <Skeleton width={80} height={80} className="rounded-3xl" />
            <div className="flex-grow">
              <Skeleton width="20%" height={10} className="mb-2" />
              <Skeleton width="40%" height={24} />
            </div>
            <Skeleton width={120} height={36} className="rounded-xl hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="space-y-2 w-1/2">
                  <Skeleton width="80%" height={14} />
                  <Skeleton width="40%" height={10} />
                </div>
                <Skeleton width="30%" height={18} />
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
