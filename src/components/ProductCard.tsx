import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Star, Share2, Copy, Facebook, Twitter, Send, X, Zap, ShieldCheck, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Product, Order } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { priceService } from '../services/priceService';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: initialProduct }: ProductCardProps) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true);
      try {
        const updated = await priceService.getUpdatedPrices(initialProduct);
        setProduct(updated);
      } catch (error) {
        console.error('Failed to fetch real-time price:', error);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchPrice();
  }, [initialProduct]);

  const handleOrder = (packageName: string) => {
    // Simulate saving order to history
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      packageName: packageName,
      price: product.packages.find(p => p.name === packageName)?.price || 'N/A',
      date: new Date().toISOString(),
      status: 'Processing'
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    toast.success(`Memulai pesanan ${product.name}...`, {
      description: `Mengarahkan ke WhatsApp untuk paket ${packageName}`,
    });
    const text = encodeURIComponent(`Saya ingin order ${product.name} - ${packageName}`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#product-${product.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link berhasil disalin!', {
      description: 'Anda sekarang dapat membagikannya ke teman-teman.',
    });
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: Send,
      color: 'bg-[#25D366]',
      href: `https://wa.me/?text=${encodeURIComponent(`Cek ${product.name} di LapakMobile! ${window.location.origin}/#product-${product.id}`)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/#product-${product.id}`)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Cek ${product.name} di LapakMobile!`)}&url=${encodeURIComponent(`${window.location.origin}/#product-${product.id}`)}`,
    },
  ];

  const lowestPrice = product.packages.length > 0 
    ? product.packages.reduce((min, p) => {
        const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
        const minVal = parseInt(min.replace(/[^0-9]/g, '')) || Infinity;
        return priceVal < minVal ? p.price : min;
      }, product.packages[0].price)
    : 'N/A';

  const features = [
    { icon: Zap, text: 'Proses Instan', color: 'text-yellow-400' },
    { icon: ShieldCheck, text: 'Legal & Aman', color: 'text-green-400' },
    { icon: Clock, text: '24/7 Support', color: 'text-blue-400' },
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-[2.5rem] overflow-hidden group hover:border-primary/50 transition-all flex flex-col h-full border border-white/5"
    >
      <div className="p-5 pb-0 relative">
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="absolute top-8 right-8 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:text-primary hover:scale-110 transition-all shadow-lg"
          title="Bagikan Produk"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <div className="relative aspect-square overflow-hidden rounded-[2.2rem] shadow-2xl group-hover:shadow-primary/30 transition-all duration-500 border border-white/10">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {product.isBestSeller && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-accent to-secondary text-white text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full flex items-center gap-1.5 neon-glow z-10 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Best Seller
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
            <div className="bg-primary text-dark text-[10px] font-bold px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              PILIH PAKET
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-center mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1 block">{product.category}</span>
          <h3 className="text-xl font-display font-black group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </div>
        
        <div className="bg-white/5 rounded-3xl p-5 mb-6 border border-white/5">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mulai dari</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl font-black text-primary">
                  {isLoadingPrice ? (
                    <span className="flex items-center gap-2 text-gray-500 text-lg animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Checking...
                    </span>
                  ) : (
                    lowestPrice
                  )}
                </p>
              </div>
              {product.isRealTime && !isLoadingPrice && (
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[9px] font-bold text-amber-400/80 uppercase tracking-wider bg-amber-400/5 px-3 py-1 rounded-full border border-amber-400/10">
                  <AlertCircle className="w-3 h-3" />
                  Harga dapat berubah
                </div>
              )}
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="grid grid-cols-1 gap-3 w-full">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 px-2">
                  <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => handleOrder(product.packages[0].name)}
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-dark font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4" />
          Pesan Sekarang
        </button>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Share2 className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold">Bagikan Produk</h3>
                <p className="text-gray-400 text-sm mt-2">Bantu temanmu menemukan {product.name}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-14 h-14 ${link.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="relative">
                <input 
                  readOnly
                  type="text" 
                  value={`${window.location.origin}/#product-${product.id}`}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-16 text-xs text-gray-400 outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-dark rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
