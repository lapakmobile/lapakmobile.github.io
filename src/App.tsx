import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star, ChevronDown, ChevronUp, CheckCircle2, Zap, Shield, FileText, X, Heart, ShoppingCart, ReceiptText, CreditCard, Clock, ThumbsUp, Percent, MessageCircle, User, ChevronRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Navbar from './components/Navbar';
import WarningSection from './components/WarningSection';
import WhyChooseUs from './components/WhyChooseUs';
import PurchaseNotification from './components/PurchaseNotification';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProductDetail from './components/ProductDetail';
import CountdownTimer from './components/CountdownTimer';

// Lazy load non-critical components
const PriceList = lazy(() => import('./components/PriceList'));
const BannerSlider = lazy(() => import('./components/BannerSlider'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const TestimonialsMarquee = lazy(() => import('./components/TestimonialsMarquee'));
const AIChatbot = lazy(() => import('./components/AIChatbot'));
const ActionCenter = lazy(() => import('./components/ActionCenter'));
const RecentlyViewed = lazy(() => import('./components/RecentlyViewed'));
const PriceAlertManager = lazy(() => import('./components/PriceAlertManager'));

import ProductCardSkeleton from './components/ProductCardSkeleton';
import PriceListSkeleton from './components/PriceListSkeleton';
import LazyImage from './components/ui/LazyImage';
import { ALL_PRODUCTS, DIGITAL_PRODUCTS, FAQS, TESTIMONIALS } from './constants';
import { Product, Category, PriceAlert } from './types';
import { priceService } from './services/priceService';

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
    </div>
    <span className="text-sm text-gray-300">{text}</span>
  </div>
);

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
              <section id="hero-lp" className="relative pt-32 pb-48 overflow-hidden bg-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-12"
                  >
                    <CountdownTimer />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-10 tracking-tight leading-[0.85]"
                  >
                    Mau konten viral tapi <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">tools masih gratisan?</span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4 mb-16"
                  >
                    <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">Jangan heran kalau kalah saing.</p>
                    <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">Pakai <span className="text-white font-bold">CapCut Pro</span> sekarang juga, aku udah siapin akunnya.</p>
                    <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight">Klik sebelum kehabisan!</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
                  >
                    <a 
                      href="#pricing-lp"
                      className="w-full sm:w-auto px-12 py-5 bg-primary text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,184,0,0.4)] flex items-center justify-center gap-3 text-lg"
                    >
                      Mulai Sekarang <Zap className="w-5 h-5 fill-black" />
                    </a>
                    <a 
                      href="#pricing-lp"
                      className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
                    >
                      Lihat Paket
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-[13px] font-bold text-gray-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span>12,500+ Member Puas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <span>Aman & Terpercaya</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <span>Proses 5 Menit</span>
                    </div>
                  </motion.div>
                </div>
              </section>

              <Suspense fallback={<div className="h-48" />}>
                <BannerSlider />
              </Suspense>

              <WarningSection />

              {/* Product Pricing Section */}
              <section id="pricing-lp" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                      <div className="text-primary font-black text-sm uppercase tracking-[0.3em] mb-4">Pricing Plans</div>
                      <h2 className="text-4xl md:text-5xl font-display font-black text-white">Pilih Paket <span className="italic text-primary">Hematmu</span></h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DIGITAL_PRODUCTS.filter(p => [
                      'canva-pro', 'capcut-pro', 'chatgpt', 'gemini-ai', 
                      'youtube-premium', 'disney-hotstar', 'spotify', 'getcontact'
                    ].includes(p.id)).map((product) => (
                      <div key={product.id} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative glass p-8 rounded-3xl border border-white/5 h-full flex flex-col">
                          {product.isBestSeller && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-dark font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg shadow-primary/20">
                              Best Seller
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 shrink-0">
                              <LazyImage src={product.image} alt={product.name} className="w-full h-full object-cover" width={60} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{product.name}</h3>
                              <span className="text-[10px] text-primary font-black uppercase tracking-widest">{product.category}</span>
                            </div>
                          </div>

                          <div className="mb-8">
                            <div className="text-gray-500 text-xs line-through mb-1">Mulai dari Rp 49.000</div>
                            <div className="text-3xl font-black text-white">{product.packages[0].price} <span className="text-sm font-medium text-gray-500">/ bln</span></div>
                          </div>

                          <div className="space-y-4 mb-10 flex-grow">
                            {product.id === 'canva-pro' && (
                              <>
                                <BenefitItem text="Tanpa Watermark" />
                                <BenefitItem text="Templates Premium" />
                                <BenefitItem text="Invite Team" />
                              </>
                            )}
                            {product.id === 'capcut-pro' && (
                              <>
                                <BenefitItem text="Semua Font Pro" />
                                <BenefitItem text="Efek Eksklusif" />
                                <BenefitItem text="Cloud Storage" />
                              </>
                            )}
                            {product.id === 'chatgpt' && (
                              <>
                                <BenefitItem text="GPT-4 Access" />
                                <BenefitItem text="DALL-E Integration" />
                                <BenefitItem text="Fast Response" />
                              </>
                            )}
                            {product.id === 'gemini-ai' && (
                              <>
                                <BenefitItem text="Advanced Models" />
                                <BenefitItem text="2TB Storage" />
                                <BenefitItem text="Priority Access" />
                              </>
                            )}
                            {product.id === 'youtube-premium' && (
                              <>
                                <BenefitItem text="Tanpa Iklan" />
                                <BenefitItem text="YouTube Music" />
                                <BenefitItem text="Background Play" />
                              </>
                            )}
                            {product.id === 'disney-hotstar' && (
                              <>
                                <BenefitItem text="Marvel & Disney" />
                                <BenefitItem text="Lokal & Global" />
                                <BenefitItem text="HD Quality" />
                              </>
                            )}
                            {product.id === 'spotify' && (
                              <>
                                <BenefitItem text="No Offline Mode" />
                                <BenefitItem text="High Audio Quality" />
                                <BenefitItem text="Unlimited Skips" />
                              </>
                            )}
                            {product.id === 'getcontact' && (
                              <>
                                <BenefitItem text="Remove Spam" />
                                <BenefitItem text="Identify Tags" />
                                <BenefitItem text="Premium Badge" />
                              </>
                            )}
                          </div>

                          <button 
                            onClick={() => {
                              setSelectedProduct(product);
                              window.scrollTo(0, 0);
                            }}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl group-hover:bg-primary group-hover:text-dark group-hover:border-primary transition-all flex items-center justify-center gap-2"
                          >
                            Order Sekarang <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm mb-6">Butuh akun premium lainnya seperti Netflix, Spotify, atau YouTube?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['netflix', 'spotify', 'youtube-premium', 'iqiyi'].map(id => {
                        const p = DIGITAL_PRODUCTS.find(p => p.id === id);
                        return p ? (
                          <button
                            key={id}
                            onClick={() => {
                              setSelectedProduct(p);
                              window.scrollTo(0, 0);
                            }}
                            className="px-6 py-3 glass rounded-xl text-xs font-bold hover:border-primary/50 transition-all flex items-center gap-2"
                          >
                            {p.name} <ChevronRight className="w-3 h-3 text-primary" />
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </section>

              <WhyChooseUs />
              
              <Suspense fallback={<div className="h-96" />}>
                <Testimonials />
              </Suspense>

              <Suspense fallback={<div className="h-96" />}>
                <TestimonialsMarquee />
              </Suspense>

              {/* How It Works Section */}
              <section id="timeline" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Cara Kerja <span className="text-primary">Timeline</span></h2>
                    <p className="text-gray-400">Hanya butuh 3 langkah mudah untuk aktifkan akunmu.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block" />
                    
                    {[
                      { step: '01', title: 'Pilih Paket', desc: 'Pilih layanan premium yang kamu butuhkan.' },
                      { step: '02', title: 'Lakukan Pembayaran', desc: 'Transfer sesuai nominal ke rekening admin.' },
                      { step: '03', title: 'Akun Langsung Aktif', desc: 'Terima detail akun dan nikmati fitur premiumnya.' }
                    ].map((item, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-dark border-4 border-primary flex items-center justify-center font-black text-primary text-xl mb-6 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                          {item.step}
                        </div>
                        <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                        <p className="text-gray-400 max-w-[250px]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Suspense fallback={<PriceListSkeleton />}>
                <PriceList />
              </Suspense>

              <Suspense fallback={<div className="h-96" />}>
                <OrderHistory />
              </Suspense>

              <section id="voucher" className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-3 mb-10">
                    <ShoppingCart className="text-white w-8 h-8" />
                    <h2 className="text-3xl font-display font-black text-white">Layanan Lainnya</h2>
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
              <section id="faq-lp" className="py-24 bg-dark border-t border-white/5">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">Pertanyaan Umum (FAQ)</h2>
                    <p className="text-gray-400">Punya pertanyaan? Kami punya jawabannya.</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { q: 'Apakah akun ini legal?', a: 'Ya, semua akun kami legal dan terdaftar secara resmi menggunakan metode pembayaran yang sah.' },
                      { q: 'Berapa lama proses aktivasinya?', a: 'Sangat cepat! Begitu pembayaran dikonfirmasi, detail akun akan langsung dikirimkan lewat WhatsApp (1-5 menit).' },
                      { q: 'Bagaimana jika ada kendala?', a: 'Kami memberikan garansi penuh selama masa berlangganan. Cukup hubungi admin, kami bantu sampai tuntas.' },
                      { q: 'Bisa refund?', a: 'Refund berlaku jika akun tidak dapat diaktifkan atau produk tidak sesuai deskripsi.' }
                    ].map((item, i) => (
                      <div key={i} className="glass rounded-2xl overflow-hidden border border-white/5">
                        <button 
                          onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          <span className="font-bold text-white tracking-tight">{item.q}</span>
                          {expandedFaq === i ? <ChevronUp className="text-primary w-5 h-5" /> : <ChevronDown className="text-gray-500 w-5 h-5" />}
                        </button>
                        <AnimatePresence initial={false}>
                          {expandedFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Final CTA Section */}
              <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[150px] -z-10" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="glass p-12 md:p-20 rounded-[40px] border border-primary/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
                      <span className="text-xs font-black text-red-500 uppercase tracking-widest animate-pulse">Promo Terbatas!</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-[1.1]">
                      Siap Upgrade ke <br className="hidden md:block" /> <span className="text-primary italic">Layanan Premium?</span>
                    </h2>
                    
                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                      Jangan biarkan kreativitasmu terhambat. Dapatkan akses ke semua tools pro sekarang juga dengan harga termurah.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <a 
                        href="#pricing-lp"
                        className="w-full sm:w-auto px-12 py-6 bg-primary text-dark font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(var(--primary-rgb),0.4)] neon-glow text-xl"
                      >
                        Beli Sekarang
                      </a>
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Garansi Uang Kembali</p>
                          <p className="text-xs text-gray-500">Jika akun tidak aktif dalam 24 jam</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      
      <Suspense fallback={null}>
        <ActionCenter />
        <RecentlyViewed />
        <PriceAlertManager />
        <AIChatbot />
      </Suspense>

      <Toaster position="top-center" expand={false} richColors theme="dark" />
      
      <PurchaseNotification />
    </div>
  );
}
