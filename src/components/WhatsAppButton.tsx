import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export default function WhatsAppButton() {
  const handleClick = () => {
    const text = encodeURIComponent("Halo Lapak Mobile, saya mau tanya-tanya produk premiumnya dong!");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Tooltip-like label */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hidden md:block shadow-2xl"
      >
        Ada Pertanyaan? Chat Kami!
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)]"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.button>
    </div>
  );
}
