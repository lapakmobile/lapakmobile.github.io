import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, CheckCircle2, ShieldCheck, Zap, ArrowLeft, MessageSquare, Send, Share2 } from 'lucide-react';
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

  const handleShare = async () => {
    const shareData = {
      title: `Lapak Mobile - ${product.name}`,
      text: product.description || `Cek produk ${product.name} di Lapak Mobile!`,
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Produk berhasil dibagikan!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link disalin ke clipboard!');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        toast.error('Gagal membagikan produk');
      }
    }
  };

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
      className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-slate-950/80 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] md:rounded-[48px] shadow-2xl flex flex-col md:flex-row relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex gap-2">
          <button 
            onClick={handleShare}
            className="p-2 sm:p-3 bg-black/40 hover:bg-black text-white rounded-full transition-all group backdrop-blur-md border border-white/5 shadow-xl"
            title="Bagikan Produk"
          >
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 sm:p-3 bg-black/40 hover:bg-black text-white rounded-full transition-all backdrop-blur-md border border-white/5 shadow-xl"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Left Side: Media & Reviews */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-14 overflow-y-auto no-scrollbar border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.01]">
          <div className="relative aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl mb-10 max-w-[400px] md:max-w-none mx-auto">
            <LazyImage 
              src={product.image} 
              alt={product.name}
              width={800}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12">
            <div className="p-4 sm:p-6 bg-white/5 rounded-3xl border border-white/5 text-center group hover:bg-white/10 transition-all">
              <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-primary mx-auto mb-3" />
              <div className="text-lg sm:text-2xl font-black text-white leading-none mb-1">Instan</div>
              <div className="text-[8px] sm:text-[10px] text-primary uppercase font-black tracking-widest">Delivery</div>
            </div>
            <div className="p-4 sm:p-6 bg-white/5 rounded-3xl border border-white/5 text-center group hover:bg-white/10 transition-all">
              <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-secondary mx-auto mb-3" />
              <div className="text-lg sm:text-2xl font-black text-white leading-none mb-1">100%</div>
              <div className="text-[8px] sm:text-[10px] text-secondary uppercase font-black tracking-widest">Legal</div>
            </div>
            <div className="p-4 sm:p-6 bg-white/5 rounded-3xl border border-white/5 text-center group hover:bg-white/10 transition-all">
              <Star className="w-5 h-5 sm:w-7 sm:h-7 text-accent mx-auto mb-3" />
              <div className="text-lg sm:text-2xl font-black text-white leading-none mb-1">{product.rating}</div>
              <div className="text-[8px] sm:text-[10px] text-accent uppercase font-black tracking-widest">Global</div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Kesan Pengguna</h3>
              <div className="px-5 py-1.5 bg-white/5 rounded-full text-[10px] font-black text-gray-400 border border-white/10">
                {reviews.length} ULASAN
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {reviews.length > 0 ? (
                reviews.map((testi) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={testi.id} 
                    className="p-6 sm:p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/20 flex items-center justify-center font-black text-primary text-lg">
                          {testi.userName[0]}
                        </div>
                        <div>
                          <div className="text-base font-black text-white leading-tight">{testi.userName}</div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{testi.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < testi.rating ? 'text-[#ffcc00] fill-[#ffcc00]' : 'text-gray-700'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium italic opacity-80">
                      "{testi.comment}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-14 text-gray-600 font-black text-xs uppercase tracking-[0.2em] bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                   Belum Ada Testimoni
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Details & Options & Post Review */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-14 flex flex-col overflow-y-auto no-scrollbar">
          <div className="mb-6">
            <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-primary/20">
              {product.category}
            </span>
          </div>
          <h2 className="text-4xl lg:text-7xl font-display font-black text-white mb-8 leading-[0.95] tracking-tighter">{product.name}</h2>
          
          <div className="space-y-8 mb-12">
            <p className="text-gray-400 text-base sm:text-xl font-medium leading-relaxed">
              {product.description || "Dapatkan akses premium ke produk digital berkualitas tinggi dengan proses cepat dan garansi penuh."}
            </p>
            
            <div className="flex flex-col gap-3">
               <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Highlight Fitur</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Garansi Penuh', 'Kualitas Premium', 'Selalu Update', 'Legal & Aman'].map((f, i) => (
                     <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-2xl">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-gray-300">{f}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Pilih Paket Layanan</h4>
                 <div className="text-[10px] font-black text-secondary animate-pulse">DISKON GILE!</div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-6 rounded-3xl border-2 flex items-center justify-between transition-all group relative overflow-hidden ${
                      selectedPackage.id === pkg.id 
                      ? 'bg-primary border-primary shadow-[0_15px_40px_rgba(59,130,246,0.3)] scale-[1.02]' 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        selectedPackage.id === pkg.id ? 'border-white bg-white rotate-90' : 'border-gray-600'
                      }`}>
                        {selectedPackage.id === pkg.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="text-left">
                        <div className={`text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5 ${selectedPackage.id === pkg.id ? 'text-white' : 'text-gray-400'}`}>Premium Tier</div>
                        <span className={`font-black text-lg transition-colors ${selectedPackage.id === pkg.id ? 'text-white' : 'text-gray-300'}`}>
                          {pkg.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className={`font-black text-2xl tracking-tighter transition-colors ${selectedPackage.id === pkg.id ? 'text-white' : 'text-primary'}`}>
                         {pkg.price}
                       </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5 mb-12">
            <div className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
               <div className="relative z-10">
                 <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Estimasi Total</div>
                 <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter">{selectedPackage.price}</div>
               </div>
               <div className="relative z-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                  <ShoppingCart className="w-8 h-8 text-white" />
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                className="col-span-1 sm:col-span-2 py-6 bg-white text-slate-950 font-black rounded-[2rem] flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,255,255,0.1)] text-xl active:scale-95 transition-all"
              >
                <Zap className="w-6 h-6 fill-current" />
                Dapatkan Sekarang
              </motion.button>
              <button className="py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/5 transition-all flex items-center justify-center gap-3 text-sm">
                <MessageSquare className="w-5 h-5 text-primary" />
                Hubungi Admin
              </button>
              <button className="py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/5 transition-all text-sm opacity-50 hover:opacity-100">
                Join Affiliate
              </button>
            </div>
          </div>

          {/* Submission Form */}
          <div className="mt-12 pt-12 border-t border-white/5">
            <div className="flex items-center justify-between mb-8">
               <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Kirim Ulasan Kamu</h4>
               <div className="text-[10px] font-black text-gray-500 italic">Review Jujur Aja!</div>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex items-center gap-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-all hover:scale-125 focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 sm:w-10 sm:h-10 transition-all ${star <= newReview.rating ? 'text-[#ffcc00] fill-[#ffcc00] drop-shadow-[0_0_10px_rgba(255,204,0,0.5)]' : 'text-gray-700'}`} 
                    />
                  </button>
                ))}
              </div>
              <div className="relative group">
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Review positifmu sangat kami hargai..."
                  className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-white text-base md:text-lg focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none min-h-[160px] no-scrollbar resize-none font-medium placeholder:text-gray-700 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute bottom-6 right-6 p-4 bg-primary rounded-2xl text-white shadow-2xl shadow-primary/30 hover:scale-105 active:scale-90 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
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
