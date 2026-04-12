/**
 * Optimizes an image URL using images.weserv.nl proxy.
 * This provides:
 * 1. Automatic WebP conversion
 * 2. Resizing to specific widths
 * 3. Compression
 * 4. Better CDN delivery
 */
export function optimizeImageUrl(url: string, width?: number, quality: number = 80): string {
  if (!url || url.startsWith('data:') || url.includes('localhost')) return url;
  
  // Remove protocol for weserv
  const cleanUrl = url.replace(/^https?:\/\//, '');
  
  let optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&output=webp&q=${quality}`;
  
  if (width) {
    optimizedUrl += `&w=${width}`;
  }
  
  return optimizedUrl;
}
