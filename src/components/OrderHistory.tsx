import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { History, Package, Clock, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { Order } from '../types';
import { toast } from 'sonner';

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);

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
                className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group"
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
      </div>
    </section>
  );
}
