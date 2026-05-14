import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ArrowRight, Sparkles } from 'lucide-react';

export const PromoPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('hasSeenPromo_v1');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPromo_v1', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-primary/20"
          >
            <button 
              onClick={closePopup}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-48 overflow-hidden bg-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl shadow-primary/40"
                >
                  <Gift className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <Sparkles className="absolute top-8 left-8 w-6 h-6 text-white/20 animate-pulse" />
              <Sparkles className="absolute bottom-8 right-12 w-4 h-4 text-white/30 animate-pulse delay-700" />
            </div>

            <div className="p-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4 border border-primary/20">
                Special Limited Offer
              </div>
              <h3 className="text-3xl font-display font-black text-white mb-4">Dapatkan Diskon 20% Untuk Pembelian Pertama!</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Gunakan kode promo <span className="text-white font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-lg">STARTAI</span> saat checkout melalui Admin WhatsApp kami.
              </p>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closePopup}
                  className="w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 group"
                >
                  Klaim Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <button 
                  onClick={closePopup}
                  className="w-full py-3 text-gray-500 hover:text-gray-400 text-sm font-bold transition-colors"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
