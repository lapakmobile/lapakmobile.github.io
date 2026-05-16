import { motion } from 'motion/react';
import { Package, CheckCircle2, ArrowRight } from 'lucide-react';

const bundles = [
  {
    name: 'Paket Kreator',
    price: 'Rp 45.000',
    originalPrice: 'Rp 150.000',
    description: 'Cocok untuk konten kreator yang ingin naik level.',
    features: ['Canva Pro Lifetime', 'CapCut Pro 1 Thn', '1000+ AI Prompts'],
    color: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    name: 'Paket AI Tools',
    price: 'Rp 85.000',
    originalPrice: 'Rp 300.000',
    description: 'Semua kebutuhan AI dalam satu paket hemat.',
    features: ['ChatGPT Plus Shared', 'Gemini Advanced', 'Midjourney Shared'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    name: 'Paket Streaming',
    price: 'Rp 35.000',
    originalPrice: 'Rp 120.000',
    description: 'Hiburan tanpa batas 24/7 tanpa iklan.',
    features: ['Netflix UHD Sharing', 'YouTube Premium', 'Spotify Premium'],
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30'
  }
];

export default function BundleSection() {
  return (
    <section className="py-24 relative">
      <div className="container-safe">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
            Hemat Luar Biasa dengan <span className="text-gradient">Bundle Package</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dapatkan gabungan produk premium pilihan dengan harga jauh lebih hemat dibanding beli satuan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bundles.map((bundle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 border ${bundle.borderColor} bg-gradient-to-br ${bundle.color} relative overflow-hidden group`}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-display font-black text-white mb-2">{bundle.name}</h3>
                <p className="text-xs text-slate-300 font-medium mb-6 uppercase tracking-wider">{bundle.description}</p>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-slate-400 line-through">{bundle.originalPrice}</span>
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">Save 70%</span>
                  </div>
                  <div className="text-4xl font-display font-black text-white tracking-tight">
                    {bundle.price}
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {bundle.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-bold">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xl shadow-white/5">
                  AMBIL PAKET
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative background circle */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
