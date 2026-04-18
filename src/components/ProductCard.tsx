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
}

const ProductCard = memo(function ProductCard({ product: initialProduct, index = 0 }: ProductCardProps) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  // Bulk discount tiers
  const bulkTiers = [
    { min: 3, discount: 5, label: 'Grosir 3+' },
    { min: 5, discount: 10, label: 'Grosir 5+' },
    { min: 10, discount: 15, label: 'Grosir 10+' },
  ];

  const currentDiscount = bulkTiers
    .filter(tier => quantity >= tier.min)
    .reduce((max, tier) => Math.max(max, tier.discount), 0);

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

  const getDiscountedPrice = (priceStr: string) => {
    const priceVal = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    if (currentDiscount === 0) return priceStr;
    const discounted = Math.floor(priceVal * (1 - currentDiscount / 100));
    return `Rp ${discounted.toLocaleString('id-ID')}`;
  };

  const handleOrder = (packageName: string) => {
    const pkg = product.packages.find(p => p.name === packageName);
    const basePrice = pkg?.price || 'N/A';
    const finalPrice = getDiscountedPrice(basePrice);

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      packageName: `${quantity}x ${packageName}`,
      price: finalPrice,
      date: new Date().toISOString(),
      status: 'Processing'
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    toast.success(`Memulai pesanan ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin LapakMobile, saya ingin order:\n\nProduk: ${product.name}\nPaket: ${packageName}\nJumlah: ${quantity}\nTotal Harga: ${finalPrice}\n\nMohon instruksi pembayarannya.`);
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
        onClick={() => setIsDetailModalOpen(true)}
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

      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-dark/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-dark-lighter border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 pb-4 flex justify-between items-start">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-black text-white">{product.name}</h2>
                    <p className="text-gray-400 text-sm mt-1">{product.category}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                       <Star className="w-4 h-4 text-primary fill-current" />
                       <span className="text-sm font-bold text-gray-300">{product.rating}</span>
                       <span className="text-sm text-gray-500">({product.reviewCount} ulasan)</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 pt-0 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {/* Left Column: Packages */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60">Pilih Paket</h3>
                    <div className="space-y-3">
                      {product.packages.map((pkg) => (
                        <button
                          key={pkg.name}
                          onClick={() => handleOrder(pkg.name)}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex justify-between items-center group/pkg"
                        >
                          <div>
                            <p className="font-bold text-gray-200 group-hover/pkg:text-primary transition-colors">{pkg.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{pkg.price}</p>
                          </div>
                          <Zap className="w-5 h-5 text-gray-600 group-hover/pkg:text-primary transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Features & Quantity */}
                  <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">Informasi Transaksi</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="text-green-400 w-5 h-5" />
                          <span className="text-sm text-gray-300 font-medium">Layanan Legal & Aman</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Zap className="text-yellow-400 w-5 h-5" />
                          <span className="text-sm text-gray-300 font-medium">Proses Instan (1-5 Menit)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="text-blue-400 w-5 h-5" />
                          <span className="text-sm text-gray-300 font-medium">Buka 24 Jam Non-Stop</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60">Jumlah Pembelian</h3>
                       <div className="flex items-center gap-6 bg-white/5 p-4 rounded-3xl border border-white/10 justify-between">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xl font-black text-primary min-w-[20px] text-center">{quantity}</span>
                            <button 
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-col items-end">
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Diskon</p>
                             <div className="flex items-center gap-2 text-primary">
                                <Tag className="w-4 h-4" />
                                <span className="font-black">-{currentDiscount}%</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-white/10 bg-dark/50">
                <div className="flex items-center justify-between gap-8">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Pembayaran</p>
                    <p className="text-3xl font-black text-primary tracking-tight">{getDiscountedPrice(lowestPrice)}</p>
                  </div>
                  <button 
                    onClick={() => handleOrder(product.packages[0].name)}
                    className="flex-grow max-w-xs py-5 bg-primary text-dark font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    PESAN VIA WHATSAPP
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ProductCard;
