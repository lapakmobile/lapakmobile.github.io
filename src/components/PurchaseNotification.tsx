import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockPurchases = [
  { name: 'Lestari', product: 'Disney+ Hotstar Resmi', time: '10 menit yang lalu' },
  { name: 'Budi Santoso', product: 'CapCut Pro Agency', time: '2 menit yang lalu' },
  { name: 'Siti Aminah', product: 'Netflix Premium UHD', time: '5 menit yang lalu' },
  { name: 'Andi Wijaya', product: 'Spotify Premium Family', time: '12 menit yang lalu' },
  { name: 'Rina Putri', product: 'Canva Pro Lifetime', time: '8 menit yang lalu' },
  { name: 'Dewi Lestari', product: 'YouTube Premium 1 Tahun', time: '15 menit yang lalu' }
];

const PurchaseNotification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockPurchases.length);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 12000); // Show every 12 seconds

    // Initial show after 3 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }, 3000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const purchase = mockPurchases[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="bg-white rounded-full py-3 pl-3 pr-8 shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center gap-4 border border-gray-100 pointer-events-auto max-w-[90vw] sm:max-w-md"
          >
            <div className="w-12 h-12 rounded-full bg-[#00D26A] flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,210,106,0.3)]">
              <Check className="w-7 h-7 text-white stroke-[3px]" />
            </div>
            
            <div className="flex flex-col min-w-0">
              <p className="text-[#0F172A] font-black text-lg leading-tight truncate">
                {purchase.name}
              </p>
              <p className="text-[#64748B] text-sm md:text-base font-medium truncate">
                Baru saja membeli <span className="text-[#1E293B] font-bold">{purchase.product}</span>
              </p>
              <p className="text-[#8B5CF6] text-xs md:text-sm font-bold mt-0.5">
                {purchase.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseNotification;
