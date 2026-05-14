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
    <section className="py-24">
      <TrustBenefits />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-[10px] font-black text-[#ffcc00] uppercase tracking-[0.3em] mb-4">Pricing Plans</div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight">
              Pilih Paket <span className="italic text-[#ffcc00]">Hematmu</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk digital..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
              />
            </div>
            <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white transition-all flex items-center justify-center gap-2 font-bold whitespace-nowrap">
              <SlidersHorizontal className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all border ${
                activeCategory === category 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={onProductClick}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Produk tidak ditemukan</h3>
              <p className="text-gray-500">Coba gunakan kata kunci lain atau filter kategori yang berbeda.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
