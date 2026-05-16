import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

const NAMES = ['Andi', 'Siti', 'Budi', 'Rizky', 'Dinda', 'Fajar', 'Sarah', 'Bagus'];
const PRODUCTS = ['Canva Pro', 'ChatGPT Plus', 'Netflix UHD', 'Spotify Premium', 'CapCut Pro', 'Youtube Premium'];

export default function NotificationPopup() {
  const [notification, setNotification] = useState<{ name: string; product: string } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setNotification({ name, product });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        showNotification();
      }
    }, 15000);

    // Initial notification after 5s
    const initial = setTimeout(showNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-24 left-6 z-[100] hidden md:block"
        >
          <div className="glass-panel rounded-2xl p-4 flex items-center gap-4 border-white/10 pr-8">
            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Live Purchase</p>
              <p className="text-sm text-white font-bold leading-tight">
                <span className="text-blue-400">{notification.name}</span> baru saja membeli <br />
                <span className="text-white">{notification.product}</span>
              </p>
              <p className="text-[10px] text-slate-500 font-bold mt-1">1 Menit yang lalu</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
