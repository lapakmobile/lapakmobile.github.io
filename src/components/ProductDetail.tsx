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
  const [expandedPayment, setExpandedPayment] = useState<string | null>('qris');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ whatsapp?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { whatsapp?: string; email?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d[\d\s\-]{7,}\d)$/;

    if (!whatsappNumber && !email) {
      newErrors.whatsapp = 'Silakan isi minimal satu kontak';
      newErrors.email = 'Silakan isi minimal satu kontak';
    }

    if (whatsappNumber && !phoneRegex.test(whatsappNumber)) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (min. 9 digit)';
    }

    if (email && !emailRegex.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = (packageName: string) => {
    if (!selectedMethod) {
      toast.error('Silakan pilih metode pembayaran terlebih dahulu');
      return;
    }

    if (!validate()) {
      toast.error('Mohon perbaiki kesalahan pada formulir');
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

    // Sync to Google Sheets via GAS
    gasService.saveOrder(newOrder, { whatsapp: whatsappNumber, email: email })
      .catch(err => console.error('Silent GAS sync failure:', err));

    toast.success(`Memulai pesanan ${product.name}...`);
    const contactInfo = `\nWA: ${whatsappNumber || '-'}\nEmail: ${email || '-'}`;
    const text = encodeURIComponent(`Halo Admin LapakMobile, saya ingin order:\n\nProduk: ${product.name}\nPaket: ${packageName}\nMetode Pembayaran: ${selectedMethod}\nTotal Harga: ${finalPrice}${contactInfo}\n\nMohon instruksi pembayarannya.`);
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

              {/* Payment Option: E-Wallet */}
              <div className={`border rounded-2xl overflow-hidden transition-all bg-dark ${['GOPAY', 'OVO', 'DANA', 'SHOPEEPAY'].includes(selectedMethod || '') ? 'border-primary shadow-[0_0_15px_rgba(255,184,0,0.1)]' : 'border-white/5'}`}>
                <button 
                  onClick={() => setExpandedPayment(expandedPayment === 'ewallet' ? null : 'ewallet')}
                  className="w-full p-6 flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Wallet className="w-6 h-6 text-primary" />
                    <span className="font-black text-white uppercase tracking-wider">E-WALLET</span>
                    <span className="bg-primary text-dark text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">INSTAN</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {['GOPAY', 'OVO', 'DANA', 'SHOPEEPAY'].includes(selectedMethod || '') && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    {expandedPayment === 'ewallet' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedPayment === 'ewallet' ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-white/5 space-y-3">
                     {[
                       { id: 'GOPAY', name: 'GoPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gopay_logo.svg', desc: 'Pembayaran praktis dengan saldo GoPay' },
                       { id: 'OVO', name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg', desc: 'Top up instan menggunakan aplikasi OVO' },
                       { id: 'DANA', name: 'DANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg', desc: 'Dompet digital Indonesia terpopuler' },
                       { id: 'SHOPEEPAY', name: 'ShopeePay', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/ShopeePay.svg', desc: 'Gunakan saldo ShopeePay untuk transaksi cepat' }
                     ].map(wallet => (
                       <button 
                         key={wallet.id} 
                         onClick={() => setSelectedMethod(wallet.id)}
                         className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all ${
                           selectedMethod === wallet.id ? 'bg-primary/10 border-primary' : 'bg-white/5 border-transparent hover:border-white/20'
                         }`}
                       >
                          <div className="w-14 h-8 bg-white rounded flex items-center justify-center p-1.5 shrink-0">
                             <img src={wallet.logo} alt={wallet.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="text-left flex-grow">
                            <span className="text-sm font-bold text-white uppercase">{wallet.name}</span>
                            <p className="text-[10px] text-gray-400 line-clamp-1">{wallet.desc}</p>
                          </div>
                          <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === wallet.id ? 'border-primary' : 'border-white/20'}`}>
                             {selectedMethod === wallet.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </div>
                       </button>
                     ))}
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
            </div>
          </div>

          {/* Step 3: Konfirmasi Pembelian */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">3</div>
              <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">Konfirmasi Pembelian</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Inputs */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-sm text-yellow-500 font-bold mb-6">
                    <ThumbsUp className="w-5 h-5" />
                    <p>Anda boleh isi salah satu, atau isi keduanya.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-white">Nomor WhatsApp</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className={`h-5 w-5 ${errors.whatsapp ? 'text-red-500' : 'text-gray-500'}`} />
                      </div>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => {
                          setWhatsappNumber(e.target.value);
                          if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: undefined }));
                        }}
                        placeholder="0812xxx"
                        className={`w-full bg-dark border rounded-xl py-4 pl-12 pr-4 text-white focus:ring-1 transition-all outline-none ${
                          errors.whatsapp ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'
                        }`}
                      />
                    </div>
                    {errors.whatsapp ? (
                      <p className="text-xs text-red-500 font-bold">{errors.whatsapp}</p>
                    ) : (
                      <p className="text-xs text-gray-400">Bukti pembayaran atas pembelianmu akan kami kirimkan ke WhatsApp Anda.</p>
                    )}
                  </div>

                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm font-bold uppercase tracking-widest">ATAU</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-white">Alamat Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${errors.email ? 'text-red-500' : 'text-gray-500'}`} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        placeholder="nama@email.com"
                        className={`w-full bg-dark border rounded-xl py-4 pl-12 pr-4 text-white focus:ring-1 transition-all outline-none ${
                          errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary focus:ring-primary'
                        }`}
                      />
                    </div>
                    {errors.email ? (
                      <p className="text-xs text-red-500 font-bold">{errors.email}</p>
                    ) : (
                      <p className="text-xs text-gray-400">Bukti pembayaran atas pembelianmu akan kami kirimkan ke Email Anda.</p>
                    )}
                  </div>
                </div>

                {/* Right Side: Summary */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400 font-bold">Item</span>
                      <span className="text-white font-black">{selectedPackage || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400 font-bold">Metode Pembayaran</span>
                      <span className="text-white font-black uppercase">{selectedMethod || '-'}</span>
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
                       {/* Placeholder for selected method logo */}
                       {selectedMethod === 'QRIS' ? (
                          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-6" />
                       ) : (
                          <span className="text-dark font-black text-xs uppercase">{selectedMethod || 'PAY'}</span>
                       )}
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
                      disabled={!selectedPackage || !selectedMethod}
                      onClick={() => selectedPackage && handleOrder(selectedPackage)}
                      className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-4 shadow-xl text-lg ${
                        selectedPackage && selectedMethod
                          ? 'bg-primary text-dark shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
                          : 'bg-white/10 text-gray-500 grayscale cursor-not-allowed'
                      }`}
                    >
                       <ChevronRight className="w-6 h-6 rotate-180" />
                       LANJUT PEMBAYARAN
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
