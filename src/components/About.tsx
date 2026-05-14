import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Rocket, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter">Tentang Kami</h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Kami adalah jembatan bagi para kreator dan pebisnis untuk mendapatkan akses ke teknologi terbaik dunia tanpa harus membayar mahal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
         <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-[40px] border border-white/10"
         >
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/20">
               <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Misi Kami</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Mendigitalisasi Indonesia dengan menyediakan produk premium dan tools AI yang terjangkau bagi semua kalangan, dari mahasiswa hingga korporasi besar.
            </p>
         </motion.div>
         
         <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-[40px] border border-white/10"
         >
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-8 border border-secondary/20">
               <Eye className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Visi Kami</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Menjadi platform marketplace digital dan AI terlengkap dan paling terpercaya di Asia Tenggara, membantu jutaan orang meningkatkan efisiensi kerja mereka.
            </p>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
            { icon: Rocket, label: "Fokus Inovasi", desc: "Kami selalu menghadirkan tools AI terbaru yang sedang tren." },
            { icon: Award, label: "Kualitas Premium", desc: "Hanya produk original dan legal yang masuk di marketplace kami." },
            { icon: Award, label: "Edukasi Berkelanjutan", desc: "Kami tidak hanya menjual, tapi juga mengedukasi cara pakainya." }
         ].map((item, i) => (
            <div key={i} className="p-10 bg-white/5 rounded-[32px] border border-white/5 text-center">
               <item.icon className="w-10 h-10 text-white/20 mx-auto mb-6" />
               <h4 className="text-xl font-bold text-white mb-3">{item.label}</h4>
               <p className="text-gray-500">{item.desc}</p>
            </div>
         ))}
      </div>
    </div>
  );
};
