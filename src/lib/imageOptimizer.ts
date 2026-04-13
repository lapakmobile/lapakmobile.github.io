/**
 * Optimizes an image URL using images.weserv.nl proxy.
 * This provides:
 * 1. Automatic WebP conversion
 * 2. Resizing to specific widths
 * 3. Compression
 * 4. Better CDN delivery
 */
export function optimizeImageUrl(url: string, width?: number, quality: number = 80): string {
  if (!url || url.startsWith('data:') || url.includes('localhost') || url.endsWith('.svg')) return url;
  
  // Remove protocol for weserv
  const cleanUrl = url.replace(/^https?:\/\//, '');
  
  let optimizedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&output=webp&q=${quality}`;
  
  if (width) {
    optimizedUrl += `&w=${width}`;
  }
  
  return optimizedUrl;
}

/**
 * Generates a srcset string for responsive images.
 */
export function generateSrcSet(url: string, widths: number[] = [320, 640, 768, 1024, 1280]): string {
  if (!url || url.startsWith('data:') || url.includes('localhost') || url.endsWith('.svg')) return '';
  
  return widths
    .map(w => `${optimizeImageUrl(url, w)} ${w}w`)
    .join(', ');
}
