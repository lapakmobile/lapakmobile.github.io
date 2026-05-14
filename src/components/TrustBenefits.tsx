import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const BENEFITS = [
  'Harga jauh lebih murah dari harga resmi',
  'Akun capcut dan canva privat',
  'Setiap akun bisa di akses 2 devices desktop dan mobile',
  'Langganan aman, legal, dan bergaransi',
  'Proses cepat dan mudah',
  'Support 24 jam & garansi sesuai durasi',
  'Cocok untuk pelajar, mahasiswa, content creator, dan pebisnis'
];

export const TrustBenefits: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-7xl font-display font-black text-[#ffcc00] text-center mb-20 leading-[1.1] uppercase italic tracking-tighter"
        >
          Kenapa Harus Berlangganan<br />Disini !!
        </motion.h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-8 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#3b82ee] rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(59,130,238,0.4)] border border-white/10 group-hover:scale-110 transition-transform">
                <Check className="w-8 h-8 text-white stroke-[4px]" />
              </div>
              <p className="text-xl md:text-3xl font-bold text-white leading-tight tracking-tight">
                {benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
