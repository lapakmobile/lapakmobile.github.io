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
        className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors group"
      >
        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Beranda
      </button>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Step 1: Choose Quantity/Package */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">1</div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">PILIH JUMLAH</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`relative p-6 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 group ${
                      selectedPackage === pkg.name 
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(255,184,0,0.1)]' 
                        : 'bg-dark border-white/5 hover:border-white/20'
                    }`}
                  >
                    <p className={`font-bold transition-colors ${selectedPackage === pkg.name ? 'text-primary' : 'text-gray-300'}`}>
                      {pkg.name}
                    </p>
                    <div className="flex justify-end items-center gap-2 mt-4 w-full">
                      <Banknote className={`w-4 h-4 ${selectedPackage === pkg.name ? 'text-primary' : 'text-gray-600'}`} />
                      <p className={`font-black text-lg text-right ${selectedPackage === pkg.name ? 'text-primary' : 'text-white'}`}>
                        {pkg.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Konfirmasi Pembelian */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">2</div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">Konfirmasi Pembelian</h2>
            </div>
            <div className="p-8">
              <div className="max-w-xl mx-auto space-y-8">
                {/* Summary */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400 font-bold">Item</span>
                      <span className="text-white font-black">{selectedPackage || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400 font-bold">Konfirmasi</span>
                      <span className="text-white font-black">Otomatis</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-white text-sm font-bold">Punya Kode Kupon? <button className="text-primary hover:underline">Klik di sini</button></p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 flex justify-between items-center border border-white/10">
                    <div className="h-10 bg-white rounded-lg px-4 flex items-center justify-center">
                       <span className="text-dark font-black text-xs uppercase">WhatsApp</span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-2xl font-black text-white">
                          {product.packages.find(p => p.name === selectedPackage)?.price || 'Rp-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-6">
                    <button 
                      disabled={!selectedPackage}
                      onClick={() => selectedPackage && handleOrder(selectedPackage)}
                      className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl text-lg ${
                        selectedPackage
                          ? 'bg-primary text-dark shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
                          : 'bg-white/10 text-gray-500 grayscale cursor-not-allowed'
                      }`}
                    >
                       <ChevronRight className="w-6 h-6 rotate-180" />
                       ORDER VIA WHATSAPP
                    </button>
                    {!selectedPackage && <p className="text-center text-xs text-red-400/60 font-bold tracking-widest uppercase italic">* Silakan pilih paket terlebih dahulu</p>}
                    
                    <div className="flex items-center justify-center gap-8 pt-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-white" />
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">TRANSAKSI<br />AMAN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-6 h-6 text-white" />
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">SATISFACTION<br />GUARANTEED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moved: Informasi Game/Aplikasi */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8">
            <h2 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Informasi Game/Aplikasi</h2>
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-xl">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-sm text-primary font-black uppercase tracking-widest mt-2">{product.category}</p>
              </div>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
              <p>
                {product.description || `${product.name} adalah platform hiburan digital yang populer di kalangan pengguna di Asia dan khususnya di Indonesia. Nikmati berbagai konten eksklusif dan fitur interaktif terbaik.`}
              </p>
            </div>
            <button className="text-primary font-bold text-sm mt-4 flex items-center gap-1 hover:translate-x-1 transition-transform">
              Lihat Selengkapnya &gt;&gt;
            </button>
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
