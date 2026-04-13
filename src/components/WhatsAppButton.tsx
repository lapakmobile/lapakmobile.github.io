import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { WHATSAPP_NUMBER } from '../constants';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Admin%20LapakMobile,%20saya%20ingin%20tanya%20seputar%20produk`, '_blank');
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      {/* Floating Button (Desktop Only) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl neon-glow-purple group relative"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        <span className="absolute right-20 bg-white text-dark text-xs font-bold px-3 py-2 rounded-lg opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Butuh Bantuan? Chat Kami!
        </span>
        
        {/* Notification Badge */}
        <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
          1
        </span>
      </motion.button>
    </div>
  );
}
