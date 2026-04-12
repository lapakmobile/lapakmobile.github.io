import { motion } from 'motion/react';
import { Zap, ShieldCheck, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              #1 Trusted Game Store
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight mb-6 leading-tight">
              Top Up Game Murah <br />
              <span className="text-gradient">dan Mudah ⚡</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Dapatkan diamond, UC, dan produk digital lainnya dengan harga termurah dan proses secepat kilat. 100% Aman & Terpercaya.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-dark font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 neon-glow"
              >
                Mulai Belanja
              </a>
              <a 
                href="#about"
                className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              { icon: Zap, title: 'Proses Instan', desc: 'Pesanan diproses otomatis dalam hitungan detik.' },
              { icon: ShieldCheck, title: '100% Aman', desc: 'Metode pembayaran resmi dan legal.' },
              { icon: Clock, title: 'Layanan 24/7', desc: 'Bantuan admin siap melayani kapan saja.' },
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-2xl text-left hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
