import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Shield, Users } from 'lucide-react';

export default function Hero({ onExploreTools, onExploreMarketplace }: { onExploreTools: () => void, onExploreMarketplace: () => void }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1200px] h-[400px] md:h-[800px] bg-primary/20 rounded-full blur-[100px] md:blur-[160px] -z-10 opacity-30 animate-pulse" />
      <div className="absolute top-1/4 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/10 rounded-full blur-[80px] md:blur-[140px] -z-10 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 shadow-inner">
              <Sparkles className="w-4 h-4 text-secondary animate-spin-slow" />
              <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">
                Trusted by 10,000+ Active Users
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-display font-black text-white mb-8 leading-[0.95] tracking-tight">
              AI Tools & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#ffcc00] to-secondary animate-gradient-x">
                Digital Goods
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-14 font-medium leading-relaxed px-4">
              Platform all-in-one untuk kebutuhan konten AI gratis dan koleksi produk digital premium dengan harga paling kompetitif di pasar.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full px-4 sm:px-0 sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreTools}
                className="group px-10 py-5 bg-primary text-white font-black rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-primary/40 transition-all"
              >
                Coba Tools AI
                <Zap className="w-5 h-5 group-hover:fill-current transition-all" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreMarketplace}
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-[2rem] border border-white/10 backdrop-blur-lg transition-all"
              >
                Marketplace Produk
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 mt-24 md:mt-40 w-full max-w-6xl px-4 md:px-0"
          >
            {[
              { label: 'Happy Users', value: '10K+', icon: Users, color: 'text-blue-500' },
              { label: 'Free AI Tools', value: '12+', icon: Zap, color: 'text-yellow-500' },
              { label: 'Premium Items', value: '250+', icon: Sparkles, color: 'text-purple-500' },
              { label: 'Support 24/7', value: '99.9%', icon: Shield, color: 'text-green-500' },
            ].map((stat, i) => (
              <div key={i} className="group relative p-6 md:p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all hover:bg-white/[0.07]">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <stat.icon className="w-12 h-12" />
                </div>
                <div className={`text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter`}>{stat.value}</div>
                <div className="text-[10px] md:text-sm font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
