import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_NUMBER } from '../constants';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20LapakMobile,%20saya%20ingin%20tanya%20seputar%20produk`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 glass border-t border-white/10 z-50">
        <button 
          onClick={handleClick}
          className="w-full py-4 bg-primary text-dark font-bold rounded-xl flex items-center justify-center gap-2 neon-glow shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
          Chat Admin WhatsApp
        </button>
      </div>

      {/* Floating Button (Desktop & Mobile) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="hidden md:flex w-16 h-16 bg-[#25D366] text-white rounded-full items-center justify-center shadow-2xl neon-glow-purple group relative"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-20 bg-white text-dark text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          Butuh Bantuan? Chat Kami!
        </span>
      </motion.button>
    </div>
  );
}
