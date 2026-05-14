import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, CheckCircle2, ShieldCheck, Zap, ArrowLeft, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { toast } from 'sonner';
import LazyImage from './ui/LazyImage';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState(product.packages[0]);

  const handlePurchase = () => {
    toast.success(`Memproses pesanan untuk ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin Lapak Mobile, saya tertarik untuk membeli produk berikut:\n\nProduk: ${product.name}\nPaket: ${selectedPackage.name}\nHarga: ${selectedPackage.price}\n\nMohon informasi pembayarannya.`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1200);
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
        className="bg-slate-900 border border-white/10 w-full max-w-6xl rounded-[40px] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Media */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
            <LazyImage 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
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
        </div>

        {/* Right Side: Details & Options */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 lg:pl-0 flex flex-col">
          <div className="mb-4">
            <span className="px-4 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-primary/20">
              {product.category}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-white mb-6 leading-tight">{product.name}</h2>
          
          <div className="space-y-6 mb-10 overflow-y-auto max-h-[300px] pr-4 no-scrollbar">
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

          <div className="mt-auto space-y-4">
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
        </div>
      </motion.div>
    </motion.div>
  );
}
