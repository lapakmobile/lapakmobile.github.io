import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, X, ChevronRight, Zap } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';
import { Product } from '../types';
import LazyImage from './ui/LazyImage';

export default function RecentlyViewed() {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadRecentlyViewed = () => {
      const saved = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      setRecentlyViewedIds(saved);
    };

    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openRecentlyViewed', handleOpen);

    loadRecentlyViewed();
    window.addEventListener('recentlyViewedUpdated', loadRecentlyViewed);
    return () => {
      window.removeEventListener('recentlyViewedUpdated', loadRecentlyViewed);
      window.removeEventListener('openRecentlyViewed', handleOpen);
    };
  }, []);

  const recentlyViewedProducts = recentlyViewedIds
    .map(id => ALL_PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  if (recentlyViewedProducts.length === 0) return null;

  return (
    <>
      {/* Floating Toggle Button - Hidden (Controlled by ActionCenter) */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden fixed bottom-24 left-6 z-40 w-12 h-12 bg-dark/80 glass rounded-full items-center justify-center text-primary hover:scale-110 transition-all border border-white/10 shadow-2xl group"
        title="Terakhir Dilihat"
      >
        <History className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-dark">
          {recentlyViewedProducts.length}
        </span>
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-dark-lighter border-r border-white/10 shadow-2xl flex flex-col h-full"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <History className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">Terakhir Dilihat</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Aktivitas Anda</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {recentlyViewedProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`#product-${product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <LazyImage 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full"
                        width={100}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{product.category}</div>
                      <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{product.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        <span className="text-[10px] text-gray-400">Proses Instan</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </a>
                ))}
              </div>

              <div className="p-6 border-t border-white/5 bg-dark/30">
                <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                  Produk yang Anda lihat akan muncul di sini untuk memudahkan Anda kembali berbelanja.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
