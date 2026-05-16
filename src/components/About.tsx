import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Rocket, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="container-safe py-24">
      <div className="text-center mb-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter">Tentang <span className="text-gradient">Kami</span></h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Kami adalah jembatan bagi para kreator dan pebisnis untuk mendapatkan akses ke teknologi terbaik dunia tanpa harus membayar mahal.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
         <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-white/5"
         >
            <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20">
               <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-6">Misi Kami</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Mendigitalisasi Indonesia dengan menyediakan produk premium dan tools AI yang terjangkau bagi semua kalangan, dari mahasiswa hingga korporasi besar.
            </p>
         </motion.div>
         
         <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-white/5"
         >
            <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-purple-500/20">
               <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-6">Visi Kami</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Menjadi platform marketplace digital dan AI terlengkap dan paling terpercaya di Asia Tenggara, membantu jutaan orang meningkatkan efisiensi kerja mereka.
            </p>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
            { icon: Rocket, label: "Fokus Inovasi", desc: "Kami selalu menghadirkan tools AI terbaru yang sedang tren." },
            { icon: Award, label: "Kualitas Premium", desc: "Hanya produk original dan legal yang masuk di marketplace kami." },
            { icon: Award, label: "Customer First", desc: "Support 24 jam untuk memastikan kepuasan Anda belanja disini." }
         ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 glass-card bg-white/5 border-white/5 text-center card-hover-effect"
            >
               <item.icon className="w-10 h-10 text-blue-500 mx-auto mb-6" />
               <h4 className="text-xl font-display font-black text-white mb-3 tracking-tight">{item.label}</h4>
               <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
            </motion.div>
         ))}
      </div>
    </div>
  );
};
