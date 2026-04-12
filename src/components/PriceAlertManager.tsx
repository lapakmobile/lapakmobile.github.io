import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X, TrendingDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { PriceAlert } from '../types';

export default function PriceAlertManager() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
    setAlerts(savedAlerts);

    const handleUpdate = () => {
      const updated = JSON.parse(localStorage.getItem('price_alerts') || '[]');
      setAlerts(updated);
    };

    window.addEventListener('priceAlertsUpdated', handleUpdate);
    return () => window.removeEventListener('priceAlertsUpdated', handleUpdate);
  }, []);

  const removeAlert = (id: string) => {
    const updated = alerts.filter(a => a.id !== id);
    localStorage.setItem('price_alerts', JSON.stringify(updated));
    setAlerts(updated);
    toast.info('Alert harga dihapus');
  };

  const activeAlerts = alerts.filter(a => a.isActive);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-dark-lighter glass rounded-full flex items-center justify-center text-primary shadow-2xl hover:scale-110 transition-all border border-white/10"
      >
        <div className="relative">
          <Bell className="w-6 h-6" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {activeAlerts.length}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Bell className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">Price Alerts</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 relative group">
                      <button 
                        onClick={() => removeAlert(alert.id)}
                        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-dark/50 flex items-center justify-center shrink-0">
                          <TrendingDown className="text-primary w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">{alert.productName}</h4>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-500 uppercase font-bold">Target:</span>
                              <span className="text-xs font-black text-primary">Rp {alert.targetPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-500 uppercase font-bold">Current:</span>
                              <span className="text-xs font-bold text-gray-400">Rp {alert.currentPrice.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {!alert.isActive && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase tracking-wider">
                          <AlertCircle className="w-3 h-3" />
                          Target Tercapai!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BellOff className="text-gray-600 w-8 h-8" />
                  </div>
                  <p className="text-gray-500 text-sm">Belum ada alert harga yang diset.</p>
                  <p className="text-xs text-gray-600 mt-2">Klik ikon lonceng pada produk untuk memantau harga.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
