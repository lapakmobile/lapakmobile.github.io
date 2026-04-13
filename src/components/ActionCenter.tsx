import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, History, Bell, MessageCircle, X, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export default function ActionCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentlyViewedCount, setRecentlyViewedCount] = useState(0);
  const [activeAlertsCount, setActiveAlertsCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const rv = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      setRecentlyViewedCount(rv.length);

      const alerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
      setActiveAlertsCount(alerts.filter((a: any) => a.isActive).length);
    };

    updateCounts();
    window.addEventListener('recentlyViewedUpdated', updateCounts);
    window.addEventListener('priceAlertsUpdated', updateCounts);
    return () => {
      window.removeEventListener('recentlyViewedUpdated', updateCounts);
      window.removeEventListener('priceAlertsUpdated', updateCounts);
    };
  }, []);

  const actions = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp Admin',
      color: 'bg-[#25D366]',
      onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank'),
      badge: 1
    },
    {
      id: 'history',
      icon: History,
      label: 'Terakhir Dilihat',
      color: 'bg-secondary',
      onClick: () => window.dispatchEvent(new Event('openRecentlyViewed')),
      badge: recentlyViewedCount > 0 ? recentlyViewedCount : null
    },
    {
      id: 'alerts',
      icon: Bell,
      label: 'Alert Harga',
      color: 'bg-amber-500',
      onClick: () => window.dispatchEvent(new Event('openPriceAlerts')),
      badge: activeAlertsCount > 0 ? activeAlertsCount : null
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[-1]"
            />
            
            {/* Action Buttons */}
            <div className="flex flex-col items-end gap-4 mb-4">
              {actions.map((action, i) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    delay: (actions.length - i - 1) * 0.05 
                  }}
                  className="flex items-center gap-3 group"
                >
                  <span className="bg-dark-lighter border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-2xl opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity whitespace-nowrap">
                    {action.label}
                  </span>
                  <button
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={`w-12 h-12 md:w-14 md:h-14 ${action.color} text-dark rounded-full flex items-center justify-center shadow-2xl relative hover:scale-110 transition-transform active:scale-95`}
                  >
                    <action.icon className="w-6 h-6 md:w-7 md:h-7" />
                    {action.badge && (
                      <span className="absolute -top-1 -left-1 min-w-[20px] h-5 px-1.5 bg-white text-dark text-[10px] font-black rounded-full flex items-center justify-center border-2 border-dark shadow-lg">
                        {action.badge}
                      </span>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 md:w-20 md:h-20 ${isOpen ? 'bg-white text-dark' : 'bg-primary text-dark'} rounded-full flex flex-col items-center justify-center shadow-2xl neon-glow transition-all duration-300 z-50 relative group`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center"
        >
          {isOpen ? (
            <X className="w-8 h-8 md:w-10 md:h-10" />
          ) : (
            <>
              <Plus className="w-8 h-8 md:w-10 md:h-10" />
              <span className="hidden md:block text-[8px] font-black uppercase tracking-tighter mt-1">Menu</span>
            </>
          )}
        </motion.div>
        
        {!isOpen && (activeAlertsCount > 0 || recentlyViewedCount > 0) && (
          <span className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 bg-red-500 text-white text-[10px] md:text-xs font-black rounded-full flex items-center justify-center border-2 border-dark animate-pulse shadow-lg">
            {(activeAlertsCount || 0) + (recentlyViewedCount || 0)}
          </span>
        )}
      </motion.button>
    </div>
  );
}
