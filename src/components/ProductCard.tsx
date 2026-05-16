import React, { memo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, Zap, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import LazyImage from './ui/LazyImage';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  priority?: 'high' | 'low' | 'auto';
}

const ProductCard = memo(function ProductCard({ product, onClick, priority = 'auto' }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col h-full card-hover-effect group relative"
    >
      {/* Best Seller Badge */}
      {product.isBestSeller && (
        <div className="absolute -top-3 left-6 z-20">
          <div className="bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-yellow-400/20">
            Best Seller
          </div>
        </div>
      )}

      {/* Product Image/Icon */}
      <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
        <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
          <LazyImage 
            src={product.image} 
            alt={product.name}
            priority={priority}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Category Overlay */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{product.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-slate-400">{product.rating || 5.0}</span>
          <span className="text-xs text-slate-500">({product.sales || 0} Terjual)</span>
        </div>
        
        <h3 className="text-xl font-display font-black text-white mb-2 leading-tight">
          {product.name}
        </h3>
        
        <p className="text-xs text-slate-400 mb-6 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500 line-through font-medium">{product.originalPrice}</span>
            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold">SALE</span>
          </div>
          <div className="text-3xl font-display font-black text-white tracking-tight">
            {product.price}
          </div>
        </div>

        {/* Features Preview */}
        <div className="space-y-2 mb-8">
           {(product.features?.slice(0, 2) || ["Premium Access", "Garansi"]).map((feature, i) => (
             <div key={i} className="flex items-center gap-2 text-slate-400">
               <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
               <span className="text-[11px] font-medium leading-none">{feature}</span>
             </div>
           ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(product);
        }}
        className="w-full py-4 premium-gradient text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all font-display uppercase tracking-widest"
      >
        <ShoppingCart className="w-4 h-4" />
        Beli Sekarang
      </motion.button>
    </motion.div>
  );
});

export default ProductCard;
