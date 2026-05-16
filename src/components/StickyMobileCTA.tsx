import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export default function StickyMobileCTA({ onAction }: { onAction: () => void }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-slate-950/80 backdrop-blur-xl border-t border-white/5">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAction}
        className="w-full py-4 premium-gradient text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 font-display uppercase tracking-widest"
      >
        <ShoppingBag className="w-5 h-5" />
        Beli Produk Sekarang
      </motion.button>
    </div>
  );
}
