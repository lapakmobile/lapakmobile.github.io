import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const WhyChooseUs = () => {
  const benefits = [
    "Harga jauh lebih murah dari harga resmi",
    "Akun capcut dan canva privat",
    "Setiap akun bisa di akses 2 devices desktop dan mobile",
    "Langganan aman, legal, dan bergaransi",
    "Proses cepat dan mudah",
    "Support 24 jam & garansi sesuai durasi",
    "Cocok untuk pelajar, mahasiswa, content creator, dan pebisnis"
  ];

  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1221]">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-black text-primary text-center mb-20 leading-tight"
        >
          Kenapa Harus Berlangganan Disini !!
        </motion.h2>

        <div className="space-y-8 max-w-2xl mx-auto">
          {benefits.map((text, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Check className="w-5 h-5 text-white stroke-[4px]" />
              </div>
              <p className="text-white text-xl md:text-2xl font-medium tracking-tight">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
