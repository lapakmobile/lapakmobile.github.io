import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star, ChevronDown, ChevronUp, CheckCircle2, Zap, Shield, FileText, X, Heart, ShoppingCart, ReceiptText, CreditCard, Clock, ThumbsUp, Percent, MessageCircle, User } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Navbar from './components/Navbar';
import BannerSlider from './components/BannerSlider';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProductDetail from './components/ProductDetail';

// Lazy load non-critical components
const OrderHistory = lazy(() => import('./components/OrderHistory'));
const PriceList = lazy(() => import('./components/PriceList'));
const PriceAlertManager = lazy(() => import('./components/PriceAlertManager'));
const RecentlyViewed = lazy(() => import('./components/RecentlyViewed'));
const ActionCenter = lazy(() => import('./components/ActionCenter'));

import ProductCardSkeleton from './components/ProductCardSkeleton';
import PriceListSkeleton from './components/PriceListSkeleton';
import LazyImage from './components/ui/LazyImage';
import { ALL_PRODUCTS, TESTIMONIALS, FAQS } from './constants';
import { Product, Category, PriceAlert } from './types';
import { priceService } from './services/priceService';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<(Category | 'Favorites')[]>([]);

  // JSON-LD Structured Data for SEO
  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LapakMobile",
      "url": window.location.origin,
      "logo": `${window.location.origin}/favicon.svg`,
      "description": "Platform Top Up Game dan Layanan Digital Terpercaya di Indonesia.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [jsonLd]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [voucherLimit, setVoucherLimit] = useState(10);
  const [ppobLimit, setPpobLimit] = useState(5);

  useEffect(() => {
    // Faster initial load simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    return [];
  });

  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(updatedFavorites);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  // Periodic Price Check for Alerts
  useEffect(() => {
    const checkPrices = async () => {
      const alerts: PriceAlert[] = JSON.parse(localStorage.getItem('price_alerts') || '[]');
      const activeAlerts = alerts.filter(a => a.isActive);
      
      if (activeAlerts.length === 0) return;

      let hasChanges = false;
      const updatedAlerts = [...alerts];

      for (let i = 0; i < updatedAlerts.length; i++) {
        const alert = updatedAlerts[i];
        if (!alert.isActive) continue;

        const product = ALL_PRODUCTS.find(p => p.id === alert.productId);
        if (!product) continue;

        try {
          const updatedProduct = await priceService.getUpdatedPrices(product);
          const lowestPriceStr = updatedProduct.packages.reduce((min, p) => {
            const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
            const minVal = parseInt(min.replace(/[^0-9]/g, '')) || Infinity;
            return priceVal < minVal ? p.price : min;
          }, updatedProduct.packages[0].price);

          const currentPrice = parseInt(lowestPriceStr.replace(/[^0-9]/g, '')) || 0;
          
          if (currentPrice !== alert.currentPrice) {
            updatedAlerts[i].currentPrice = currentPrice;
            hasChanges = true;

            if (currentPrice <= alert.targetPrice) {
              updatedAlerts[i].isActive = false;
              toast.success(`HORE! Harga ${alert.productName} Turun!`, {
                description: `Harga sekarang Rp ${currentPrice.toLocaleString('id-ID')}, sesuai target Anda!`,
                duration: 10000,
              });
            }
          }
        } catch (error) {
          console.error('Error checking price for alert:', error);
        }
      }

      if (hasChanges) {
        localStorage.setItem('price_alerts', JSON.stringify(updatedAlerts));
        window.dispatchEvent(new Event('priceAlertsUpdated'));
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkPrices, 30000);
    checkPrices(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const voucherProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => (p.category === 'Game' || p.category === 'Streaming' || p.category === 'Sosmed') && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const ppobProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => (p.category === 'Digital' || p.category === 'Apps' || p.category === 'Jasa') && p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar 
        onSearch={setSearchQuery} 
        onHomeClick={() => {
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
      
      <main className="pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProductDetail 
                product={selectedProduct} 
                onBack={() => {
                  setSelectedProduct(null);
                  window.scrollTo(0, 0);
                }}
                otherProducts={ALL_PRODUCTS.filter(p => p.id !== selectedProduct.id)}
                onSelectProduct={(p) => {
                  setSelectedProduct(p);
                  window.scrollTo(0, 0);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <BannerSlider />
              
              {/* Voucher Section */}
              <section id="voucher" className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-10">
                    <ShoppingCart className="text-white w-8 h-8" />
                    <h2 className="text-3xl font-display font-black text-white">Voucher</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {voucherProducts.slice(0, voucherLimit).map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        index={index} 
                        onClick={(p) => {
                          setSelectedProduct(p);
                          window.scrollTo(0, 0);
                        }}
                      />
                    ))}
                  </div>

                  {voucherLimit < voucherProducts.length && (
                    <div className="flex justify-center mt-12">
                      <button 
                        onClick={() => setVoucherLimit(prev => prev + 10)}
                        className="bg-primary text-dark font-black px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                      >
                        Tampilkan Lainnya <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* PPOB Section */}
              <section id="ppob" className="py-12 bg-dark-lighter/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-10">
                    <ReceiptText className="text-white w-8 h-8" />
                    <h2 className="text-3xl font-display font-black text-white">PPOB</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {ppobProducts.slice(0, ppobLimit).map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        index={index} 
                        onClick={(p) => {
                          setSelectedProduct(p);
                          window.scrollTo(0, 0);
                        }}
                      />
                    ))}
                  </div>

                  {ppobLimit < ppobProducts.length && (
                    <div className="flex justify-center mt-12">
                      <button 
                        onClick={() => setPpobLimit(prev => prev + 10)}
                        className="bg-primary text-dark font-black px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                      >
                        Tampilkan Lainnya <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </section>

        {/* Other sections below */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-3xl" />}>
          <OrderHistory />
        </Suspense>
        
        {isLoading ? (
          <section className="py-24 bg-dark-lighter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PriceListSkeleton />
            </div>
          </section>
        ) : (
          <Suspense fallback={<PriceListSkeleton />}>
            <PriceList />
          </Suspense>
        )}

        {/* Payment Methods Section */}
        <section className="py-16 bg-dark border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-10">Metode Pembayaran Terlengkap</p>
              
              <div className="relative w-full">
                {/* Gradient Overlays for smooth fading */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10" />
                
                <motion.div 
                  className="flex items-center gap-12 whitespace-nowrap"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {[
                    { name: 'QRIS', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
                    { name: 'DANA', url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
                    { name: 'OVO', url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
                    { name: 'ShopeePay', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/ShopeePay.svg' },
                    { name: 'GoPay', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gopay_logo.svg' },
                    { name: 'LinkAja', url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg' },
                    { name: 'BCA', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
                    { name: 'Mandiri', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
                    { name: 'BNI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Logo_BNI.svg' },
                    { name: 'BRI', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg' },
                    { name: 'Alfamart', url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg' },
                    { name: 'Indomaret', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.svg' },
                    // Duplicate for seamless loop
                    { name: 'QRIS', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg' },
                    { name: 'DANA', url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
                    { name: 'OVO', url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
                    { name: 'ShopeePay', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/ShopeePay.svg' },
                    { name: 'GoPay', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Gopay_logo.svg' },
                    { name: 'LinkAja', url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg' },
                    { name: 'BCA', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
                    { name: 'Mandiri', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
                    { name: 'BNI', url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Logo_BNI.svg' },
                    { name: 'BRI', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg' },
                    { name: 'Alfamart', url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg' },
                    { name: 'Indomaret', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.svg' },
                  ].map((method, idx) => (
                    <div key={`${method.name}-${idx}`} className="flex flex-col items-center gap-2 group shrink-0">
                      <div className="h-12 w-28 flex items-center justify-center p-3 glass rounded-xl group-hover:border-primary/50 transition-all">
                        <LazyImage 
                          src={method.url} 
                          alt={method.name} 
                          className="max-h-full max-w-full filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                          width={120}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 group-hover:text-primary transition-colors uppercase tracking-widest">{method.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-dark-lighter overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Apa Kata Mereka?</h2>
            <p className="text-gray-400 mb-16">Kepuasan pelanggan adalah prioritas utama kami.</p>
            
            <div className="relative w-full mb-16">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-lighter to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-lighter to-transparent z-10" />
              
              <motion.div 
                className="flex gap-8 whitespace-nowrap"
                animate={{
                  x: [0, -1800],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                  <div 
                    key={`${t.id}-${idx}`} 
                    className="w-[350px] glass p-8 rounded-3xl text-left relative shrink-0 group hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-primary fill-primary' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-8 whitespace-normal line-clamp-3">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0">
                        {t.avatar ? (
                          <LazyImage src={t.avatar} alt={t.name} className="w-full h-full" width={100} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                            {t.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{t.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-primary uppercase tracking-widest font-black">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Buyer
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <a 
              href="https://share.google/fGTNoyzKTauiqXnTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl text-sm font-bold hover:bg-white/10 transition-all border border-white/10 group"
            >
              <LazyImage 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Business_Profile_icon.svg" 
                alt="Google Business" 
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                responsive={false}
              />
              <span>Lihat Semua Review di Google Business</span>
            </a>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-8 leading-tight">
                  LapakMobile: Website top-up game paling terpercaya di Indonesia
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Setiap harinya, ribuan gamers di Indonesia menggunakan LapakMobile untuk melakukan top up game dengan lancar, tanpa perlu daftar atau login, dan diamonds/token game akan dikirimkan secara instan ke akun game anda.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
              >
                {[
                  {
                    icon: Shield,
                    title: 'Jujur & Terpercaya',
                    desc: 'Setiap hari ada ribuan transaksi top-up game atau pembelian voucher yang dilakukan oleh pelanggan kami.'
                  },
                  {
                    icon: CreditCard,
                    title: 'Metode Pembayaran Lengkap',
                    desc: 'Kami menawarkan begitu banyak pilihan channel pembayaran, mulai dari bank transfer, GoPay, OVO, LinkAja, dan lainnya.'
                  },
                  {
                    icon: Clock,
                    title: 'Pengiriman Instan',
                    desc: 'Hanya butuh beberapa detik saja untuk menyelesaikan transaksi anda. Semua proses kami berjalan secara otomatis.'
                  },
                  {
                    icon: ThumbsUp,
                    title: 'Pasti Lebih Murah',
                    desc: 'Top-up game favoritmu dengan harga yang pastinya lebih murah dibandingkan website top-up lainnya.'
                  },
                  {
                    icon: Percent,
                    title: 'Promosi-promosi Menarik',
                    desc: 'Dapatkan promo harga terbaik yang bisa anda dapatkan setiap minggunya, ikuti terus kami di sosial media.'
                  },
                  {
                    icon: MessageCircle,
                    title: 'Layanan Pelanggan via WhatsApp',
                    desc: 'Customer Support kami siap membantu anda setiap hari, 7 hari dalam seminggu dan 30 hari dalam sebulan.'
                  }
                ].map((feature, i) => (
                  <div key={i} className="space-y-3">
                    <feature.icon className="text-white w-6 h-6" />
                    <h4 className="text-lg font-bold text-white tracking-tight">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="py-24 bg-dark border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Artikel Terbaru</h2>
              <p className="text-gray-400">Tips, trik, dan berita terbaru seputar dunia gaming dan digital.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Tips Aman Transaksi Digital',
                  desc: 'Cara menghindari penipuan saat melakukan jual beli akun atau top-up game online.',
                  date: '08 Apr 2024'
                },
                {
                  title: 'Update Honor of Kings 2024',
                  desc: 'Daftar hero terbaru dan perubahan meta yang wajib kamu ketahui di season ini.',
                  date: '05 Apr 2024'
                },
                {
                  title: 'Panduan Sewa Grup Facebook',
                  desc: 'Maksimalkan jangkauan affiliate Shopee/Tokopedia kamu dengan sewa grup yang tepat.',
                  date: '01 Apr 2024'
                }
              ].map((article, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="aspect-video bg-gray-800 relative">
                    <LazyImage 
                      src={`https://picsum.photos/seed/article${i}/600/400`} 
                      alt={article.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                      width={600}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-primary font-bold mb-2 uppercase tracking-widest">{article.date}</div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{article.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy & Terms Section */}
        <section id="privacy" className="py-24 bg-dark-lighter border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-10 rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <Shield className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-display font-bold">Kebijakan Privasi</h2>
              </div>
              <div className="prose prose-invert max-w-none text-gray-400 space-y-4 text-sm">
                <p>Di LapakMobile, kami sangat menghargai privasi Anda. Informasi yang kami kumpulkan hanya digunakan untuk memproses pesanan Anda dan memberikan layanan terbaik.</p>
                <h4 className="text-white font-bold mt-6">1. Informasi yang Kami Kumpulkan</h4>
                <p>Kami mengumpulkan data seperti nomor WhatsApp, ID Game, dan bukti pembayaran untuk keperluan validasi transaksi.</p>
                <h4 className="text-white font-bold mt-6">2. Keamanan Data</h4>
                <p>Data Anda disimpan secara aman dan tidak akan pernah dibagikan kepada pihak ketiga tanpa izin Anda, kecuali diwajibkan oleh hukum.</p>
              </div>

              <div id="terms" className="mt-20 pt-20 border-t border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <FileText className="text-secondary w-8 h-8" />
                  <h2 className="text-3xl font-display font-bold">Syarat & Ketentuan</h2>
                </div>
                <div className="prose prose-invert max-w-none text-gray-400 space-y-4 text-sm">
                  <p>Dengan menggunakan layanan LapakMobile, Anda setuju untuk mematuhi syarat dan ketentuan berikut:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Semua transaksi yang sudah berhasil diproses tidak dapat dibatalkan atau direfund.</li>
                    <li>Kesalahan input ID Game atau nomor tujuan adalah tanggung jawab pembeli.</li>
                    <li>LapakMobile berhak menolak transaksi yang mencurigakan atau melanggar hukum.</li>
                    <li>Layanan Rekber Facebook mengikuti aturan komunitas dan kesepakatan antara penjual & pembeli.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-dark">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">Pertanyaan Umum</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold">{faq.question}</span>
                    {expandedFaq === i ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-500" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-2 text-gray-400 text-sm leading-relaxed border-t border-white/5 bg-white/[0.02]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-dark-lighter to-primary p-12 md:p-20 text-center border border-white/10">
              <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm -z-10" />
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Siap Untuk Top Up?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                Jangan ragu untuk menghubungi kami jika ada pertanyaan. Tim kami siap membantu Anda 24/7.
              </p>
              <a 
                href={`http://wa.me/6281290006080?text=Halo%20Admin%20LapakMobile,%20saya%20ingin%20tanya%20seputar%20produk`} // Dummy link for demo
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-dark font-bold rounded-2xl hover:scale-105 transition-all neon-glow"
              >
                Hubungi Admin Sekarang
              </a>
            </div>
          </div>
        </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      
      <Toaster position="top-center" expand={false} richColors theme="dark" />
      
      <Suspense fallback={null}>
        <ActionCenter />
        <PriceAlertManager />
        <RecentlyViewed />
      </Suspense>
    </div>
  );
}
