import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageSquare, History, Bell, MessageCircle, X, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export default function MobileActionCenter() {
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
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
      onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank'),
      badge: 1
    },
    {
      id: 'ai',
      icon: Sparkles,
      label: 'Asisten AI',
      color: 'bg-primary',
      onClick: () => window.dispatchEvent(new Event('openAIChatbot')),
      badge: 'AI'
    },
    {
      id: 'history',
      icon: History,
      label: 'Riwayat',
      color: 'bg-secondary',
      onClick: () => window.dispatchEvent(new Event('openRecentlyViewed')),
      badge: recentlyViewedCount > 0 ? recentlyViewedCount : null
    },
    {
      id: 'alerts',
      icon: Bell,
      label: 'Alerts',
      color: 'bg-amber-500',
      onClick: () => window.dispatchEvent(new Event('openPriceAlerts')),
      badge: activeAlertsCount > 0 ? activeAlertsCount : null
    }
  ];

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-[100]">
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
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ delay: (actions.length - i - 1) * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="bg-dark-lighter border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xl">
                    {action.label}
                  </span>
                  <button
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={`w-12 h-12 ${action.color} text-dark rounded-full flex items-center justify-center shadow-2xl relative`}
                  >
                    <action.icon className="w-6 h-6" />
                    {action.badge && (
                      <span className="absolute -top-1 -left-1 w-5 h-5 bg-white text-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-dark">
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
        className={`w-16 h-16 ${isOpen ? 'bg-white text-dark' : 'bg-primary text-dark'} rounded-full flex items-center justify-center shadow-2xl neon-glow transition-all duration-300 z-50 relative`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
        </motion.div>
        {!isOpen && (activeAlertsCount > 0 || recentlyViewedCount > 0) && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-dark animate-pulse">
            {(activeAlertsCount || 0) + (recentlyViewedCount || 0)}
          </span>
        )}
      </motion.button>
    </div>
  );
}
