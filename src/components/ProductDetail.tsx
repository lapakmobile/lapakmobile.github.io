import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, CheckCircle2, ShieldCheck, Zap, ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { Product, Review } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { toast } from 'sonner';
import LazyImage from './ui/LazyImage';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState(product.packages[0]);
  const [reviews, setReviews] = useState<Review[]>(product.reviews || []);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePurchase = () => {
    toast.success(`Memproses pesanan untuk ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin Lapak Mobile, saya tertarik untuk membeli produk berikut:\n\nProduk: ${product.name}\nPaket: ${selectedPackage.name}\nHarga: ${selectedPackage.price}\n\nMohon informasi pembayarannya.`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error('Komentar tidak boleh kosong!');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Math.random().toString(36).substr(2, 9),
        userName: 'User ' + Math.floor(Math.random() * 1000),
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
      setIsSubmitting(false);
      toast.success('Review berhasil dikirim!');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 w-full max-w-6xl rounded-[40px] shadow-2xl flex flex-col md:flex-row relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Media & Reviews */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-[90vh] no-scrollbar">
          <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/5 shadow-2xl mb-8">
            <LazyImage 
              src={product.image} 
              alt={product.name}
              width={800}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-black text-white">Instan</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Delivery</div>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <ShieldCheck className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-xl font-black text-white">100%</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Legal</div>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
              <Star className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-xl font-black text-white">{product.rating}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Rating</div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="mt-12 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white tracking-tight">Apa Kata Mereka?</h3>
              <div className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-400">
                {reviews.length} Reviews
              </div>
            </div>

            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((testi) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={testi.id} 
                    className="p-6 bg-white/5 rounded-[32px] border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {testi.userName[0]}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{testi.userName}</div>
                          <div className="text-[10px] text-gray-500">{testi.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < testi.rating ? 'text-[#ffcc00] fill-[#ffcc00]' : 'text-gray-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed italic">
                      "{testi.comment}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 italic">
                  Belum ada review untuk produk ini.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Details & Options & Post Review */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 lg:pl-0 flex flex-col overflow-y-auto max-h-[90vh] no-scrollbar">
          <div className="mb-4">
            <span className="px-4 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">
              {product.category}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-white mb-6 leading-tight">{product.name}</h2>
          
          <div className="space-y-6 mb-10 pr-4">
            <p className="text-gray-400 text-lg leading-relaxed">
              {product.description || "Dapatkan akses premium ke produk digital berkualitas tinggi dengan proses cepat dan garansi penuh."}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-sm font-black text-gray-300 uppercase tracking-widest">Pilih Paket</h4>
              <div className="grid grid-cols-1 gap-4">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-5 rounded-2xl border flex items-center justify-between transition-all group ${
                      selectedPackage.id === pkg.id 
                      ? 'bg-primary border-primary shadow-xl shadow-primary/20' 
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedPackage.id === pkg.id ? 'border-white bg-white' : 'border-gray-500'
                      }`}>
                        {selectedPackage.id === pkg.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <span className={`font-bold transition-colors ${selectedPackage.id === pkg.id ? 'text-white' : 'text-gray-300'}`}>
                        {pkg.name}
                      </span>
                    </div>
                    <span className={`font-black text-xl transition-colors ${selectedPackage.id === pkg.id ? 'text-white' : 'text-primary'}`}>
                      {pkg.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Total Harga</div>
              <div className="text-3xl font-black text-white">{selectedPackage.price}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                className="col-span-2 py-5 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-3xl flex items-center justify-center gap-3 shadow-xl"
              >
                <ShoppingCart className="w-6 h-6" />
                Beli Sekarang
              </motion.button>
              <button className="py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat Admin
              </button>
              <button className="py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-colors">
                Affiliate
              </button>
            </div>
          </div>

          {/* Submission Form */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Tulis Review Kamu</h4>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star 
                      className={`w-6 h-6 ${star <= newReview.rating ? 'text-[#ffcc00] fill-[#ffcc00]' : 'text-gray-600'}`} 
                    />
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Ceritakan pengalamanmu menggunakan produk ini..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-primary focus:outline-none min-h-[100px] no-scrollbar resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute bottom-4 right-4 p-3 bg-primary rounded-xl text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
