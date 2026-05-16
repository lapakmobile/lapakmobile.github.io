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
    <section id="marketplace-section" className="py-24 relative">
      <div className="container-safe">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Katalog Produk</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                Pilih Produk <br />
                <span className="text-gradient">Digital Favoritmu</span>
              </h2>
              <p className="text-slate-400 font-medium">
                Temukan ribuan produk digital berkualitas mulai dari akun streaming, software, hingga kursus eksklusif dengan harga miring.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full md:w-96">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-all" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
           <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
             {CATEGORIES.map(category => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`px-6 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${
                   activeCategory === category 
                   ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                   : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center glass-card border-dashed"
            >
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-slate-500 text-sm">Coba kata kunci lain atau reset filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
