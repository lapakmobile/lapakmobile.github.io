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
    <div className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20 md:mb-32"
        >
          <motion.h2 
            className="text-3xl sm:text-5xl md:text-8xl font-display font-black text-[#ffcc00] leading-[0.9] uppercase italic tracking-tighter"
          >
            Kenapa Harus <br />
            <span className="relative">
               Berlangganan
               <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 text-[#ffcc00]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
               </svg>
            </span>
            <br />Disini !!
          </motion.h2>
        </motion.div>

        <div className="space-y-6 md:space-y-10 max-w-2xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="flex items-start md:items-center gap-5 md:gap-10 group"
            >
              <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 border border-white/10 group-hover:rotate-12 transition-all">
                <Check className="w-6 h-6 md:w-10 md:h-10 text-white stroke-[4px]" />
              </div>
              <p className="text-base sm:text-xl md:text-3xl font-black text-white leading-tight tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">
                {benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
