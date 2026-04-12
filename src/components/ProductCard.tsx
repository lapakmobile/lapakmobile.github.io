import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Star, Share2, Copy, Facebook, Twitter, Send, X, Zap, ShieldCheck, Clock, AlertCircle, RefreshCw, MessageSquare, User, Heart, Bell } from 'lucide-react';
import { toast } from 'sonner';
import Skeleton from './ui/Skeleton';
import LazyImage from './ui/LazyImage';
import { Product, Order, Review } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { priceService } from '../services/priceService';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: initialProduct }: ProductCardProps) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  // Load reviews and favorite status from localStorage on mount
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${initialProduct.id}`) || '[]');
    if (savedReviews.length > 0) {
      const totalRating = savedReviews.reduce((acc: number, rev: Review) => acc + rev.rating, 0);
      setProduct(prev => ({
        ...prev,
        reviews: savedReviews,
        rating: totalRating / savedReviews.length,
        reviewCount: savedReviews.length
      }));
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(initialProduct.id));
  }, [initialProduct.id]);

  const handleSetAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(targetPrice.replace(/[^0-9]/g, ''));
    if (isNaN(price) || price <= 0) {
      toast.error('Mohon masukkan harga target yang valid.');
      return;
    }

    const currentPriceVal = parseInt(lowestPrice.replace(/[^0-9]/g, '')) || 0;

    const newAlert = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      productName: product.name,
      targetPrice: price,
      currentPrice: currentPriceVal,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const existingAlerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
    localStorage.setItem('price_alerts', JSON.stringify([newAlert, ...existingAlerts]));
    
    window.dispatchEvent(new Event('priceAlertsUpdated'));
    setIsAlertModalOpen(false);
    setTargetPrice('');
    toast.success(`Alert harga diset untuk ${product.name}`, {
      description: `Kami akan memberitahu Anda jika harga turun ke Rp ${price.toLocaleString('id-ID')}`
    });
  };

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
    
    // Dispatch custom event to notify App.tsx if needed
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true);
      try {
        const updated = await priceService.getUpdatedPrices(initialProduct);
        setProduct(updated);
      } catch (error) {
        console.error('Failed to fetch real-time price:', error);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [initialProduct]);

  const handleOrder = (packageName: string) => {
    // Simulate saving order to history
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      packageName: packageName,
      price: product.packages.find(p => p.name === packageName)?.price || 'N/A',
      date: new Date().toISOString(),
      status: 'Processing'
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    toast.success(`Memulai pesanan ${product.name}...`, {
      description: `Mengarahkan ke WhatsApp untuk paket ${packageName}`,
    });
    const text = encodeURIComponent(`Saya ingin order ${product.name} - ${packageName}`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) {
      toast.error('Mohon isi nama dan komentar Anda.');
      return;
    }

    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString()
    };

    const updatedReviews = [review, ...(product.reviews || [])];
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(updatedReviews));

    const totalRating = updatedReviews.reduce((acc, rev) => acc + rev.rating, 0);
    
    setProduct(prev => ({
      ...prev,
      reviews: updatedReviews,
      rating: totalRating / updatedReviews.length,
      reviewCount: updatedReviews.length
    }));

    setNewReview({ rating: 5, comment: '', userName: '' });
    toast.success('Terima kasih atas ulasan Anda!');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#product-${product.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link berhasil disalin!', {
      description: 'Anda sekarang dapat membagikannya ke teman-teman.',
    });
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: Send,
      color: 'bg-[#25D366]',
      href: `https://wa.me/?text=${encodeURIComponent(`Cek ${product.name} di LapakMobile! ${window.location.origin}/#product-${product.id}`)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/#product-${product.id}`)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Cek ${product.name} di LapakMobile!`)}&url=${encodeURIComponent(`${window.location.origin}/#product-${product.id}`)}`,
    },
  ];

  const lowestPrice = product.packages.length > 0 
    ? product.packages.reduce((min, p) => {
        const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
        const minVal = parseInt(min.replace(/[^0-9]/g, '')) || Infinity;
        return priceVal < minVal ? p.price : min;
      }, product.packages[0].price)
    : 'N/A';

  const features = [
    { icon: Zap, text: 'Proses Instan', color: 'text-yellow-400' },
    { icon: ShieldCheck, text: 'Legal & Aman', color: 'text-green-400' },
    { icon: Clock, text: '24/7 Support', color: 'text-blue-400' },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-[2.5rem] overflow-hidden group hover:border-primary/50 transition-all flex flex-col h-full border border-white/5"
    >
      <div className="p-5 pb-0 relative">
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="absolute top-8 right-8 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all shadow-lg"
          title="Bagikan Produk"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleFavorite}
          className={`absolute top-8 right-20 z-20 w-10 h-10 glass rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 ${isFavorite ? 'text-red-500' : 'text-white hover:text-red-400'}`}
          title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="relative aspect-square overflow-hidden rounded-[2.2rem] shadow-2xl group-hover:shadow-primary/30 transition-all duration-500 border border-white/10">
          <LazyImage 
            src={product.image} 
            alt={product.name}
            className="w-full h-full"
            skeletonClassName="rounded-[2.2rem]"
          />
          {product.isBestSeller && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-accent to-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full flex items-center gap-1.5 neon-glow z-10 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Best Seller
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
            <div className="bg-primary text-dark text-[10px] font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              PILIH PAKET
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-center mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1 block">{product.category}</span>
          <h3 className="text-xl font-display font-black group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.round(product.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-500">({product.reviewCount || 0})</span>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-3xl p-5 mb-6 border border-white/5">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mulai dari</p>
              <div className="flex items-center justify-center gap-3">
                {isLoadingPrice ? (
                  <Skeleton width={120} height={32} className="mx-auto" />
                ) : (
                  <>
                    <p className="text-2xl font-black text-primary">
                      {lowestPrice}
                    </p>
                    <button 
                      onClick={() => setIsAlertModalOpen(true)}
                      className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all border border-white/10"
                      title="Set Alert Harga"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              {product.isRealTime && !isLoadingPrice && (
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] font-bold text-amber-400/80 uppercase tracking-wider bg-amber-400/5 px-3 py-1 rounded-full border border-amber-400/10">
                  <AlertCircle className="w-3 h-3" />
                  Harga dapat berubah
                </div>
              )}
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="grid grid-cols-1 gap-3 w-full">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 px-2">
                  <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => handleOrder(product.packages[0].name)}
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-dark font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] mb-3"
        >
          <MessageCircle className="w-4 h-4" />
          Pesan Sekarang
        </button>

        <button 
          onClick={() => setIsReviewModalOpen(true)}
          className="w-full py-3 glass text-gray-400 font-bold text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Lihat Ulasan
        </button>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold mb-2">Ulasan {product.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(product.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-400">{product.rating?.toFixed(1) || '5.0'} / 5.0 ({product.reviewCount || 0} ulasan)</span>
                </div>
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-8">
                <h4 className="text-sm font-bold mb-4 uppercase tracking-widest text-primary">Tulis Ulasan</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                  <input 
                    type="text"
                    placeholder="Nama Anda"
                    value={newReview.userName}
                    onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-all"
                  />
                  <textarea 
                    placeholder="Komentar Anda..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full bg-dark/50 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-all min-h-[100px] resize-none"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3 bg-primary text-dark font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-6">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-white/5 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-bold text-sm">{review.userName}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">{new Date(review.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 italic text-sm">
                    Belum ada ulasan untuk produk ini.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isAlertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAlertModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsAlertModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold">Alert Harga</h3>
                <p className="text-gray-400 text-sm mt-2">Dapatkan notifikasi saat harga {product.name} turun.</p>
              </div>

              <form onSubmit={handleSetAlert} className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Harga Target (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
                    <input 
                      type="text"
                      placeholder="Contoh: 50000"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 italic">Harga saat ini: {lowestPrice}</p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-dark font-bold text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                >
                  Pasang Alert
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Share2 className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold">Bagikan Produk</h3>
                <p className="text-gray-400 text-sm mt-2">Bantu temanmu menemukan {product.name}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="relative">
                <input 
                  readOnly
                  type="text" 
                  value={`${window.location.origin}/#product-${product.id}`}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-16 text-xs text-gray-400 outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-dark rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
