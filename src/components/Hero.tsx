import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Zap, Shield, CheckCircle2, Star } from 'lucide-react';

export default function Hero({ onExploreTools, onExploreMarketplace }: { onExploreTools: () => void, onExploreMarketplace: () => void }) {
  const badges = [
    { icon: Zap, text: "Fast Delivery" },
    { icon: Shield, text: "Garansi Replace" },
    { icon: Star, text: "Trusted Seller" },
    { icon: CheckCircle2, text: "Support 24 Jam" }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      
      <div className="container-safe relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                Trusted by 10,000+ Customers
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight">
              Akses Produk Digital <br />
              <span className="text-gradient">Premium</span> Harga Termurah
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
              Instant delivery, bergaransi, aman, dan support 24 jam. Dapatkan akses ke Canva Pro, Netflix, ChatGPT Plus, dan ribuan produk digital lainnya dengan harga terbaik.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreMarketplace}
                className="px-8 py-5 premium-gradient text-white font-black rounded-2xl flex items-center gap-3 shadow-2xl shadow-blue-500/20"
              >
                <ShoppingBag className="w-5 h-5" />
                BELI SEKARANG
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreTools}
                className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 backdrop-blur-md transition-all flex items-center gap-3"
              >
                LIHAT PRODUK
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400">
                  <badge.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Mockup/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 animate-float">
              {/* Main Illustration Card */}
              <div className="glass-card p-4 relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
                  alt="Premium Products"
                  className="rounded-3xl w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                
                {/* Floating Elements on Card */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black mb-2 uppercase">Netflix UHD</h3>
                    <p className="text-blue-400 font-black text-xl">Mulai Rp 25.000</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Best Value</span>
                  </div>
                </div>
              </div>

              {/* Smaller Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-card p-6 w-48 shadow-2xl border-white/20 z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-xs font-black uppercase">Active</span>
                </div>
                <div className="text-xl font-black">Spotify Pro</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -left-10 glass-card p-6 w-48 shadow-2xl border-white/20 z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-black uppercase">Instant</span>
                </div>
                <div className="text-xl font-black">Canva Pro</div>
              </motion.div>
            </div>

            {/* Background Glows for Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/30 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
