import React, { useState } from 'react';
import Skeleton from './Skeleton';
import { optimizeImageUrl, generateSrcSet } from '../../lib/imageOptimizer';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  width?: number;
  priority?: 'high' | 'low' | 'auto';
  responsive?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '', 
  width,
  priority = 'auto',
  responsive = true,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const optimizedSrc = optimizeImageUrl(src, width);
  const srcSet = responsive ? generateSrcSet(src) : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <Skeleton className={`absolute inset-0 z-10 ${skeletonClassName}`} />
      )}
      
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
        alt={alt}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        fetchPriority={priority}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
        {...props}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-gray-600">
          <span className="text-[10px] font-bold uppercase tracking-widest">Failed to load</span>
        </div>
      )}
    </div>
  );
}
