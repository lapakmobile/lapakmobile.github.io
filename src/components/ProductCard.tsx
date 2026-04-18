import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Star, Share2, Copy, Facebook, Twitter, Send, X, Zap, ShieldCheck, Clock, AlertCircle, MessageSquare, User, Heart, Bell, Minus, Plus, Tag } from 'lucide-react';
import { toast } from 'sonner';
import LazyImage from './ui/LazyImage';
import { Product, Order, Review, PriceAlert } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { priceService } from '../services/priceService';

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: (product: Product) => void;
}

const ProductCard = memo(function ProductCard({ product: initialProduct, index = 0, onClick }: ProductCardProps) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  // Periodic Price Check
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(initialProduct.id));
  }, [initialProduct.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== product.id);
      toast.info(`${product.name} dihapus dari favorit`);
    } else {
      newFavorites = [...favorites, product.id];
      toast.success(`${product.name} ditambahkan ke favorit`);
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const lowestPrice = product.packages.length > 0 
    ? product.packages.reduce((min, p) => {
        const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
        const minVal = parseInt(min.replace(/[^0-9]/g, '')) || Infinity;
        return priceVal < minVal ? p.price : min;
      }, product.packages[0].price)
    : 'N/A';

  const handleOrder = (packageName: string) => {
    const pkg = product.packages.find(p => p.name === packageName);
    const finalPrice = pkg?.price || 'N/A';

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      packageName: packageName,
      price: finalPrice,
      date: new Date().toISOString(),
      status: 'Processing',
      paymentMethod: 'WhatsApp Gateway',
      transactionId: `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    toast.success(`Memulai pesanan ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin LapakMobile, saya ingin order:\n\nProduk: ${product.name}\nPaket: ${packageName}\nTotal Harga: ${finalPrice}\n\nMohon instruksi pembayarannya.`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1000);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        className="bg-dark-lighter border border-white/5 rounded-2xl p-3 cursor-pointer group transition-all"
        onClick={() => onClick?.(product)}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10 group-hover:border-primary/30 transition-colors">
            <LazyImage 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              skeletonClassName="w-full h-full"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-gray-100 group-hover:text-primary transition-colors truncate">{product.name}</h3>
            {product.isBestSeller && (
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest mt-1 inline-block">
                Hot
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
});

export default ProductCard;
