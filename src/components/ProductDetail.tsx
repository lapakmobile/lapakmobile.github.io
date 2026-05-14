import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, CreditCard, ChevronDown, ChevronUp, Zap, ShieldCheck, Clock, MessageCircle, ChevronRight, QrCode, Wallet, Landmark, Banknote, Mail, Phone, ThumbsUp } from 'lucide-react';
import { Product, Order } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { toast } from 'sonner';
import { gasService } from '../services/gasService';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  otherProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetail({ product, onBack, otherProducts, onSelectProduct }: ProductDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleOrder = (packageName: string) => {
    const pkg = product.packages.find(p => p.name === packageName);
    const finalPrice = pkg?.price || 'N/A';

    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productId: product.id,
      productName: product.name,
      packageName: packageName,
      price: finalPrice,
      date: new Date().toISOString(),
      status: 'Processing',
      paymentMethod: 'WhatsApp Manual',
      transactionId: `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    // Sync to Google Sheets via GAS
    gasService.saveOrder(newOrder, { whatsapp: '-', email: '-' })
      .catch(err => console.error('Silent GAS sync failure:', err));

    toast.success(`Memulai pesanan ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin LapakMobile, saya ingin order:\n\nProduk: ${product.name}\nPaket: ${packageName}\nTotal Harga: ${finalPrice}\n\nMohon instruksi pembayarannya.`);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors group px-2 py-1 -ml-2 rounded-lg hover:bg-white/5"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Beranda
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 1: Choose Quantity/Package */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">1</div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">PILIH JUMLAH</h2>
              </div>
              <Zap className="w-5 h-5 text-primary opacity-50" />
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`relative p-6 rounded-2xl border transition-all text-left flex flex-col justify-between min-h-[8rem] group overflow-hidden ${
                      selectedPackage === pkg.name 
                        ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(255,184,0,0.15)] ring-1 ring-primary/50' 
                        : 'bg-dark border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex-1">
                      <p className={`font-bold text-lg leading-tight transition-colors break-words ${selectedPackage === pkg.name ? 'text-primary' : 'text-gray-300'}`}>
                        {pkg.name}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-4 w-full">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Resmi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Banknote className={`w-4 h-4 ${selectedPackage === pkg.name ? 'text-primary' : 'text-gray-600'}`} />
                        <p className={`font-black text-xl ${selectedPackage === pkg.name ? 'text-primary' : 'text-white'}`}>
                          {pkg.price}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Konfirmasi Pembelian */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">2</div>
                <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">KONFIRMASI PEMBELIAN</h2>
              </div>
              <CreditCard className="w-5 h-5 text-primary opacity-50" />
            </div>
            <div className="p-8">
              <div className="max-w-xl mx-auto space-y-8">
                {/* Summary Table */}
                <div className="bg-dark p-6 rounded-3xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Item</span>
                    <span className={`font-black transition-colors ${selectedPackage ? 'text-white' : 'text-gray-700'}`}>
                      {selectedPackage || 'Belum dipilih'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Layanan</span>
                    <span className="text-white font-black">Proses Cepat (1-5 Menit)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-white/5 pt-4">
                    <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">Metode</span>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      <MessageCircle className="w-3 h-3 text-green-500" />
                      <span className="text-white font-black text-[10px] uppercase">WhatsApp</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                  <div className="text-center sm:text-left space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Total Pembayaran</p>
                    <p className="text-3xl font-black text-primary">
                      {product.packages.find(p => p.name === selectedPackage)?.price || 'Rp 0'}
                    </p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <button 
                      disabled={!selectedPackage}
                      onClick={() => selectedPackage && handleOrder(selectedPackage)}
                      className={`w-full sm:px-12 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                        selectedPackage
                          ? 'bg-primary text-dark shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
                          : 'bg-white/10 text-gray-500 grayscale cursor-not-allowed'
                      }`}
                    >
                       <Zap className="w-5 h-5 fill-current" />
                       <span className="whitespace-nowrap">ORDER VIA WHATSAPP</span>
                    </button>
                  </div>
                </div>

                {!selectedPackage && (
                  <p className="text-center text-xs text-red-500/80 font-bold tracking-widest uppercase italic animate-pulse">
                    * Silakan pilih paket untuk melanjutkan
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">TRANSAKSI<br />DIJAMIN AMAN</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <ThumbsUp className="w-6 h-6 text-primary" />
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">GARANSI<br />SESUAI DURASI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl skew-y-2">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow space-y-6">
                <div>
                  <h3 className="text-3xl md:text-5xl font-display font-black text-white leading-none mb-2">{product.name}</h3>
                  <div className="inline-block px-3 py-1 bg-primary/20 rounded-lg text-xs font-black text-primary uppercase tracking-[0.2em]">{product.category}</div>
                </div>
                
                <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                  {product.description ? (
                    <div className="space-y-4">
                      {product.description.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  ) : (
                    <p>
                      {product.name} adalah platform hiburan digital yang populer di kalangan pengguna di Asia dan khususnya di Indonesia. 
                      Nikmati berbagai konten eksklusif dan fitur interaktif terbaik dengan harga termurah hanya di LapakMobile.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Moved: Top-up Voucher Lainnya */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8">
            <h2 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Top-up Voucher Lainnya</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {otherProducts.slice(0, 6).map((other) => (
                <button 
                  key={other.id}
                  onClick={() => onSelectProduct(other)}
                  className="aspect-square bg-dark rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all p-1 group"
                >
                  <img src={other.image} alt={other.name} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Transaction Info (Footer of Page) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                   <ShieldCheck className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Legal & Aman</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-black">100% Tergaransi</p>
                </div>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                   <Zap className="text-yellow-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Proses Instan</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-black">Otomatis 24 Jam</p>
                </div>
             </div>
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                   <Clock className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Layanan 24/7</h4>
                  <p className="text-[10px] text-gray-500 uppercase font-black">Support Non-Stop</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
