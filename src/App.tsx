import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Star, ChevronDown, ChevronUp, CheckCircle2, Zap, Shield, FileText, BookOpen, X, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import OrderHistory from './components/OrderHistory';
import PriceList from './components/PriceList';
import PriceAlertManager from './components/PriceAlertManager';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import PriceListSkeleton from './components/PriceListSkeleton';
import { ALL_PRODUCTS, TESTIMONIALS, FAQS } from './constants';
import { Category, PriceAlert } from './types';
import { priceService } from './services/priceService';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<(Category | 'Favorites')[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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

  const categories: (Category | 'Favorites')[] = ['Favorites', 'Game', 'Digital', 'Streaming', 'Apps', 'Jasa', 'Sosmed'];

  const toggleCategory = (cat: Category | 'Favorites') => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategories.length === 0) return matchesSearch;

      const matchesCategory = activeCategories.some(cat => {
        if (cat === 'Favorites') return favorites.includes(product.id);
        return product.category === cat;
      });

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategories, favorites]);

  return (
    <div className="min-h-screen">
      <Navbar onSearch={setSearchQuery} />
      
      <main>
        <Hero />

        {/* Products Section */}
        <section id="products" className="py-24 bg-dark relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-black mb-4 relative inline-block">
                Top Up Game
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-primary rounded-full neon-glow" />
              </h2>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">Pilih game atau layanan digital favoritmu dengan harga termurah dan proses instan.</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-grow sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Cari game..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  <button
                    onClick={() => setActiveCategories([])}
                    className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategories.length === 0 
                        ? 'bg-primary text-dark neon-glow' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                        activeCategories.includes(cat) 
                          ? 'bg-primary text-dark neon-glow' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {cat === 'Favorites' && <Heart className={`w-4 h-4 ${activeCategories.includes('Favorites') ? 'fill-current' : ''}`} />}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 glass rounded-3xl">
                <p className="text-gray-400 mb-4">Produk tidak ditemukan.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategories([]);}}
                  className="text-primary font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </section>
        
        <OrderHistory />
        
        {isLoading ? (
          <section className="py-24 bg-dark-lighter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PriceListSkeleton />
            </div>
          </section>
        ) : (
          <PriceList />
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
                        <img 
                          src={method.url} 
                          alt={method.name} 
                          className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
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
        <section className="py-20 bg-dark-lighter">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Apa Kata Mereka?</h2>
            <p className="text-gray-400 mb-12">Kepuasan pelanggan adalah prioritas utama kami.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="glass p-8 rounded-2xl text-left relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-primary fill-primary' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-primary uppercase tracking-widest font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Buyer
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://share.google/fGTNoyzKTauiqXnTG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
            >
              <Star className="w-4 h-4 text-primary fill-current" />
              Lihat Semua Review di Google Business
            </a>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-dark-lighter relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Tentang LapakMobile</h2>
                <h3 className="text-4xl md:text-5xl font-display font-extrabold mb-8 leading-tight">
                  Solusi Terpercaya untuk Kebutuhan Digital Anda
                </h3>
                <div className="space-y-6 text-gray-400 leading-relaxed">
                  <p>
                    LapakMobile hadir sebagai platform terintegrasi yang memudahkan para gamer dan pengguna layanan digital di Indonesia untuk mendapatkan produk favorit mereka dengan harga yang kompetitif dan proses yang instan.
                  </p>
                  <p>
                    Berawal dari komunitas gaming, kami memahami pentingnya keamanan dan kecepatan dalam setiap transaksi. Itulah mengapa kami membangun sistem yang bekerja 24/7 untuk memastikan pesanan Anda diproses secepat kilat.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">100% Aman</h4>
                        <p className="text-xs">Transaksi legal dan terjamin keamanannya.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <Zap className="text-secondary w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">Proses Instan</h4>
                        <p className="text-xs">Pesanan masuk otomatis dalam hitungan menit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden glass p-4">
                  <img 
                    src="https://picsum.photos/seed/office/800/800" 
                    alt="LapakMobile Office" 
                    className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass p-8 rounded-2xl neon-glow hidden md:block">
                  <div className="text-4xl font-display font-extrabold text-primary mb-1">24/7</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Support System</div>
                </div>
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
                    <img src={`https://picsum.photos/seed/article${i}/600/400`} alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
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
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
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
                href={`https://wa.me/${ALL_PRODUCTS[0].id}`} // Dummy link for demo
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-dark font-bold rounded-2xl hover:scale-105 transition-all neon-glow"
              >
                Hubungi Admin Sekarang
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <PriceAlertManager />
      <Toaster position="top-center" expand={false} richColors theme="dark" />
    </div>
  );
}
