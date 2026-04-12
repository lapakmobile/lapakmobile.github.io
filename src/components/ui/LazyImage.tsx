import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

export default function LazyImage({ src, alt, className = '', skeletonClassName = '', ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <Skeleton className={`absolute inset-0 z-10 ${skeletonClassName}`} />
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
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
