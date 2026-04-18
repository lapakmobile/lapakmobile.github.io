import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Package, Clock, CheckCircle2, AlertCircle, Trash2, X, ChevronRight, CreditCard, Hash, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { Order } from '../types';
import { toast } from 'sonner';

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    setOrders(savedOrders);
  }, []);

  const clearHistory = () => {
    if (window.confirm('Hapus semua riwayat pesanan?')) {
      localStorage.removeItem('order_history');
      setOrders([]);
      toast.success('Riwayat pesanan dikosongkan');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-400 bg-green-400/10';
      case 'Processing': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-yellow-400 bg-yellow-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle2 className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <section id="history" className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-display font-black mb-2 flex items-center gap-3">
              <History className="text-primary w-10 h-10" />
              Riwayat Pesanan
            </h2>
            <p className="text-gray-400">Daftar pesanan yang Anda lakukan di perangkat ini.</p>
          </div>
          
          {orders.length > 0 && (
            <button 
              onClick={clearHistory}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm border border-red-500/20"
            >
              <Trash2 className="w-4 h-4" />
              Hapus Riwayat
            </button>
          )}
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group cursor-pointer active:scale-[0.98]"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                      <Package className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{order.id}</div>
                      <h4 className="text-lg font-bold mb-1">{order.productName}</h4>
                      <p className="text-sm text-gray-400">{order.packageName}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end justify-between gap-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-white mb-1">{order.price}</div>
                      <div className="text-[10px] text-gray-500 font-medium">
                        {new Date(order.date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-[3rem] border border-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="text-gray-600 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto">Anda belum melakukan pemesanan apapun. Silakan pilih produk favorit Anda!</p>
            <a 
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-dark font-bold rounded-2xl hover:scale-105 transition-all neon-glow"
            >
              Cari Produk
            </a>
          </div>
        )}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="absolute inset-0 bg-dark/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-dark-lighter border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <History className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-black text-white">Detail Pesanan</h3>
                      <p className="text-[10px] text-primary font-bold tracking-widest uppercase">{selectedOrder.id}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Status Breakdown */}
                  <div>
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Status Pesanan</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Dibuat', icon: Calendar, active: true },
                        { label: 'Proses', icon: Clock, active: selectedOrder.status === 'Processing' || selectedOrder.status === 'Success' },
                        { label: 'Selesai', icon: CheckCircle2, active: selectedOrder.status === 'Success' }
                      ].map((step, i) => (
                        <div key={i} className={`p-4 rounded-2xl flex flex-col items-center gap-2 border transition-all ${step.active ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-white/5 border-white/5 text-gray-600'}`}>
                          <step.icon className="w-5 h-5" />
                          <span className="text-[10px] font-bold uppercase">{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">Produk</span>
                      </div>
                      <span className="text-sm font-bold text-white">{selectedOrder.productName}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">Paket</span>
                      </div>
                      <span className="text-sm font-bold text-white">{selectedOrder.packageName}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">ID Transaksi</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white">{selectedOrder.transactionId || 'MIG-OLD-DATA'}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-400">Metode</span>
                      </div>
                      <span className="text-sm font-bold text-white">{selectedOrder.paymentMethod || 'Manual'}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Bayar</p>
                      <p className="text-2xl font-black text-primary">{selectedOrder.price}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Terverifikasi</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 pt-0">
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
