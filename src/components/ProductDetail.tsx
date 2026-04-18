import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, CreditCard, ChevronDown, ChevronUp, Zap, ShieldCheck, Clock, MessageCircle, ChevronRight, QrCode, Wallet, Landmark } from 'lucide-react';
import { Product, Order } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  otherProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export default function ProductDetail({ product, onBack, otherProducts, onSelectProduct }: ProductDetailProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [expandedPayment, setExpandedPayment] = useState<string | null>('qris');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleOrder = (packageName: string) => {
    if (!selectedMethod) {
      toast.error('Silakan pilih metode pembayaran terlebih dahulu');
      return;
    }

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
      paymentMethod: selectedMethod,
      transactionId: `TXN-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
    };

    const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([newOrder, ...existingOrders]));

    toast.success(`Memulai pesanan ${product.name}...`);
    const text = encodeURIComponent(`Halo Admin LapakMobile, saya ingin order:\n\nProduk: ${product.name}\nPaket: ${packageName}\nMetode Pembayaran: ${selectedMethod}\nTotal Harga: ${finalPrice}\n\nMohon instruksi pembayarannya.`);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Left */}
        <div className="lg:col-span-4 space-y-8">
          {/* Info Card */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Informasi Game/Aplikasi</h2>
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-xl">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                <p className="text-xs text-primary font-black uppercase tracking-widest mt-1">{product.category}</p>
              </div>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed">
              <p>
                {product.description || `${product.name} adalah platform hiburan digital yang populer di kalangan pengguna di Asia dan khususnya di Indonesia. Nikmati berbagai konten eksklusif dan fitur interaktif terbaik.`}
              </p>
            </div>
            <button className="text-primary font-bold text-xs mt-4 flex items-center gap-1 hover:translate-x-1 transition-transform">
              Lihat Selengkapnya &gt;&gt;
            </button>
          </div>

          {/* Other Products */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-xl font-display font-black text-white mb-6 uppercase tracking-wider">Top-up Voucher Lainnya</h2>
            <div className="grid grid-cols-3 gap-3">
              {otherProducts.slice(0, 6).map((other) => (
                <button 
                  key={other.id}
                  onClick={() => onSelectProduct(other)}
                  className="aspect-square bg-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all p-1 group"
                >
                  <img src={other.image} alt={other.name} className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Right */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Choose Quantity/Package */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">1</div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">PILIH JUMLAH</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
                    <div className="flex justify-between items-end mt-4">
                      <ShoppingCart className={`w-4 h-4 ${selectedPackage === pkg.name ? 'text-primary' : 'text-gray-600'}`} />
                      <p className={`font-black text-lg ${selectedPackage === pkg.name ? 'text-primary' : 'text-white'}`}>
                        {pkg.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Choose Payment */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">2</div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">PILIH CHANNEL PEMBAYARAN</h2>
            </div>
            <div className="p-8 space-y-4">
              {/* Payment Option: QRIS */}
              <div className={`border rounded-2xl overflow-hidden transition-all bg-dark ${selectedMethod === 'QRIS' ? 'border-primary shadow-[0_0_15px_rgba(255,184,0,0.1)]' : 'border-white/5'}`}>
                <button 
                  onClick={() => setExpandedPayment(expandedPayment === 'qris' ? null : 'qris')}
                  className="w-full p-6 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <QrCode className="w-6 h-6 text-primary" />
                    <span className="font-black text-white uppercase tracking-wider">QRIS</span>
                    <span className="bg-primary text-dark text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">PROMO</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedMethod === 'QRIS' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    {expandedPayment === 'qris' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedPayment === 'qris' ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/5 space-y-4">
                     <button 
                       onClick={() => setSelectedMethod('QRIS')}
                       className={`w-full flex gap-4 items-center p-4 rounded-xl border transition-all ${
                         selectedMethod === 'QRIS' ? 'bg-primary/10 border-primary' : 'bg-white/5 border-transparent hover:border-white/20'
                       }`}
                     >
                        <div className="p-3 bg-white rounded-lg">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white uppercase">QRIS (Otomatis)</p>
                          <p className="text-[10px] text-gray-400 mt-0.5 mt-1">Gopay, OVO, Dana, LinkAja, BCA, dll</p>
                        </div>
                        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'QRIS' ? 'border-primary' : 'border-white/20'}`}>
                           {selectedMethod === 'QRIS' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                     </button>
                  </div>
                </motion.div>
              </div>

              {/* Payment Option: Virtual Account */}
              <div className={`border rounded-2xl overflow-hidden transition-all bg-dark ${selectedMethod?.includes('VA') ? 'border-primary shadow-[0_0_15px_rgba(255,184,0,0.1)]' : 'border-white/5'}`}>
                <button 
                  onClick={() => setExpandedPayment(expandedPayment === 'va' ? null : 'va')}
                  className="w-full p-6 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Landmark className="w-6 h-6 text-primary" />
                    <span className="font-black text-white uppercase tracking-wider">VIRTUAL ACCOUNT</span>
                    <span className="bg-primary text-dark text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">PROMO</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedMethod?.includes('VA') && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    {expandedPayment === 'va' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedPayment === 'va' ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/5 space-y-3">
                     {['BCA', 'BNI', 'BRI', 'Mandiri', 'Permata'].map(bank => (
                       <button 
                         key={bank} 
                         onClick={() => setSelectedMethod(`${bank} VA`)}
                         className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all ${
                           selectedMethod === `${bank} VA` ? 'bg-primary/10 border-primary' : 'bg-white/5 border-transparent hover:border-white/20'
                         }`}
                       >
                          <span className="text-sm font-bold text-white uppercase">{bank} VA</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === `${bank} VA` ? 'border-primary' : 'border-white/20'}`}>
                             {selectedMethod === `${bank} VA` && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                       </button>
                     ))}
                  </div>
                </motion.div>
              </div>

              {/* Payment Option: Retail */}
              <div className={`border rounded-2xl overflow-hidden transition-all bg-dark ${selectedMethod?.includes('ALFAMART') || selectedMethod?.includes('INDOMARET') ? 'border-primary shadow-[0_0_15px_rgba(255,184,0,0.1)]' : 'border-white/5'}`}>
                <button 
                  onClick={() => setExpandedPayment(expandedPayment === 'retail' ? null : 'retail')}
                  className="w-full p-6 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                    <span className="font-black text-white uppercase tracking-wider">RETAIL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {(selectedMethod?.includes('ALFAMART') || selectedMethod?.includes('INDOMARET')) && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    {expandedPayment === 'retail' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedPayment === 'retail' ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/5 space-y-3">
                     {[
                       { name: 'ALFAMART', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg' },
                       { name: 'INDOMARET', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.svg' }
                     ].map(retail => (
                       <button 
                         key={retail.name} 
                         onClick={() => setSelectedMethod(retail.name)}
                         className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all ${
                           selectedMethod === retail.name ? 'bg-primary/10 border-primary' : 'bg-white/5 border-transparent hover:border-white/20'
                         }`}
                       >
                          <div className="w-16 h-8 bg-white rounded flex items-center justify-center p-1 shrink-0">
                             <img src={retail.logo} alt={retail.name} className="max-h-full max-w-full" />
                          </div>
                          <span className="text-sm font-bold text-white uppercase">{retail.name}</span>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === retail.name ? 'border-primary' : 'border-white/20'}`}>
                             {selectedMethod === retail.name && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                       </button>
                     ))}
                  </div>
                </motion.div>
              </div>

              {/* Final Order Button */}
              <div className="pt-8">
                <button 
                  disabled={!selectedPackage || !selectedMethod}
                  onClick={() => selectedPackage && handleOrder(selectedPackage)}
                  className={`w-full py-6 rounded-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl ${
                    selectedPackage && selectedMethod
                      ? 'bg-primary text-dark shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-white/5 text-gray-600 grayscale cursor-not-allowed'
                  }`}
                >
                   <MessageCircle className="w-6 h-6" />
                   KONFIRMASI PESANAN VIA WHATSAPP
                </button>
                {(!selectedPackage || !selectedMethod) && (
                  <p className="text-center text-xs text-red-400/60 mt-4 font-bold tracking-widest uppercase italic">
                    * Silakan {!selectedPackage ? 'pilih paket' : 'pilih metode pembayaran'} terlebih dahulu
                  </p>
                )}
              </div>
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
