import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Shield, Users } from 'lucide-react';

export default function Hero({ onExploreTools, onExploreMarketplace }: { onExploreTools: () => void, onExploreMarketplace: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                Powering 10,000+ Creators & Businesses
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
              Tools AI Gratis & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Produk Digital Terbaik
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Tingkatkan produktivitas kamu dengan tools AI canggih dan koleksi produk digital premium kami. Dari generator konten hingga template desain eksklusif.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreTools}
                className="group px-8 py-5 bg-primary text-white font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
              >
                Coba Tools Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreMarketplace}
                className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-3xl border border-white/10 backdrop-blur-lg transition-all"
              >
                Lihat Produk Digital
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 w-full max-w-5xl"
          >
            {[
              { label: 'Users Active', value: '50K+', icon: Users },
              { label: 'Tools AI', value: '15+', icon: Zap },
              { label: 'Digital Products', value: '500+', icon: Sparkles },
              { label: 'Success Rate', value: '99.9%', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
