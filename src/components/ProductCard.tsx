import React, { memo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import LazyImage from './ui/LazyImage';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -10 }}
      transition={{ 
        layout: { duration: 0.4, type: "spring", stiffness: 200, damping: 25 },
        duration: 0.3 
      }}
      className="group relative bg-[#1a1a1a] border border-white/5 rounded-[40px] p-8 flex flex-col h-full hover:border-white/20 transition-all shadow-2xl"
      onClick={() => onClick?.(product)}
    >
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-[#ffcc00] text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-yellow-500/20">
            Best Seller
          </div>
        </div>
      )}

      {/* Header: Icon + Info */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-20 h-20 bg-slate-800 rounded-3xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
          <LazyImage 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pt-2">
          <h3 className="text-2xl font-black text-white mb-1 leading-tight group-hover:text-[#ffcc00] transition-colors">
            {product.name}
          </h3>
          <span className="text-[10px] font-black text-[#ffcc00] uppercase tracking-widest">
            {product.category}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <div className="text-[11px] text-gray-500 font-bold mb-1">
          Mulai dari <span className="line-through">{product.originalPrice || 'Rp 49.000'}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white tracking-tighter">
            {product.price}
          </span>
          <span className="text-sm text-gray-500 font-bold">/ bln</span>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-10 flex-grow">
        {(product.features || ['Tanpa Watermark', 'Templates Premium', 'Invite Team']).map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button 
        className="w-full py-5 bg-white/5 border border-white/10 rounded-3xl text-sm font-black text-white flex items-center justify-center gap-3 group-hover:bg-white/10 group-hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Order Sekarang
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
});

export default ProductCard;
