import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { TrustBenefits } from './TrustBenefits';

interface MarketplaceProps {
  onProductClick: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onProductClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="marketplace-section" className="py-20 md:py-32">
      <TrustBenefits />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
               <SlidersHorizontal className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Katalog Produk</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 leading-tight tracking-tight">
              Koleksi Terbaik <br />
              <span className="italic text-[#ffcc00] relative">
                 Untuk Kamu
                 <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#ffcc00]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                 </svg>
              </span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
               Temukan ribuan produk digital berkualitas mulai dari akun streaming, software, hingga kursus eksklusif dengan harga miring.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-grow md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-all" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kebutuhan digitalmu..."
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-14 pr-6 py-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="relative mb-16">
           <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
             {CATEGORIES.map(category => (
               <motion.button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`relative px-10 py-4 rounded-2xl font-black text-sm whitespace-nowrap transition-all z-0 border ${
                   activeCategory === category 
                   ? 'text-white border-primary shadow-xl shadow-primary/20' 
                   : 'text-gray-500 border-white/5 hover:border-white/20 hover:text-white bg-white/5'
                 }`}
               >
                 {activeCategory === category && (
                   <motion.div
                     layoutId="activeCategoryBg"
                     className="absolute inset-0 bg-primary rounded-2xl -z-10"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                 )}
                 {category}
               </motion.button>
             ))}
           </div>
           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={onProductClick}
                  priority={index < 4 ? 'high' : 'auto'}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-32 text-center bg-white/5 border border-white/5 rounded-[40px]"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-8 border border-white/10">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-3xl font-black text-white mb-3">Produk Tidak Ditemukan</h3>
              <p className="text-gray-400 max-w-md mx-auto px-6">Kami tidak dapat menemukan produk yang sesuai dengan pencarian Anda. Coba kata kunci yang lebih umum.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
