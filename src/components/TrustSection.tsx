import { motion } from 'motion/react';
import { Users, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

const stats = [
  { value: '10,000+', label: 'Transaksi Berhasil', icon: CheckCircle2 },
  { value: '5,000+', label: 'Pelanggan Aktif', icon: Users },
  { value: '4.9/5', label: 'Rating Kepuasan', icon: Star },
  { value: '24/7', label: 'Support System', icon: MessageSquare },
];

export default function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-safe">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 text-center group card-hover-effect"
            >
              <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-display font-black text-white mb-2">{stat.value}</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Peek */}
        <div className="mt-24 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-display font-black text-white mb-12"
          >
            Apa Kata Mereka?
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
             {/* Abstracted chat bubble feels */}
             {[
               "Akses cepat, langsung login!",
               "Admin ramah & responsif banget",
               "Murah tapi ga murahan, TOP!",
               "Langganan disini gak pernah kecewa"
             ].map((text, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-slate-300 text-sm font-medium"
               >
                 {text}
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
