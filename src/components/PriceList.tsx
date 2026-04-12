import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Zap, Info } from 'lucide-react';
import LazyImage from './ui/LazyImage';
import { ALL_PRODUCTS } from '../constants';
import { Product } from '../types';

export default function PriceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    ALL_PRODUCTS.find(p => p.id === 'ml') || ALL_PRODUCTS[0]
  );

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section id="pricelist" className="py-24 bg-dark-lighter relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Daftar Harga Produk Lengkap</h2>
          <p className="text-gray-400">Cek perbandingan harga paket dengan cepat dan mudah.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Product Selection */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            
            <div className="glass rounded-3xl overflow-hidden max-h-[500px] overflow-y-auto no-scrollbar border border-white/5">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full flex items-center gap-4 p-4 transition-all border-b border-white/5 last:border-0 ${
                    selectedProduct?.id === product.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <LazyImage 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full grayscale group-hover:grayscale-0"
                      width={80}
                    />
                  </div>
                  <span className="text-sm font-bold truncate">{product.name}</span>
                  <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${selectedProduct?.id === product.id ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Main: Price Table */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedProduct ? (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-[2.5rem] p-8 border border-white/5 h-full"
                >
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                    <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                      <LazyImage src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full" width={160} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{selectedProduct.category}</div>
                      <h3 className="text-2xl font-display font-bold">{selectedProduct.name}</h3>
                    </div>
                    <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                      <Zap className="w-4 h-4 text-primary fill-current" />
                      <span className="text-xs font-bold text-primary">Proses Instan</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.packages.map((pkg, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{pkg.name}</span>
                          <span className="text-[10px] text-gray-500 font-medium mt-1">Tersedia</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-primary">{pkg.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Harga di atas adalah harga estimasi dan dapat berubah sewaktu-waktu mengikuti kebijakan provider. Klik produk di bagian atas untuk melakukan pemesanan via WhatsApp.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="glass rounded-[2.5rem] p-12 border border-white/5 flex flex-col items-center justify-center text-center h-full">
                  <Search className="w-12 h-12 text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold">Pilih Produk</h3>
                  <p className="text-gray-400 mt-2">Pilih produk di samping untuk melihat daftar harga lengkap.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
