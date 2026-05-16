import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { FAQS } from '../constants';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-safe relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">Pertanyaan <span className="text-gradient">Umum</span></h2>
          <p className="text-slate-400 font-medium">Semua yang perlu Anda ketahui tentang layanan premium Lapak Mobile.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card !rounded-2xl border-white/5 overflow-hidden group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-all"
              >
                <span className="text-sm md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all ${openIndex === i ? 'rotate-180 bg-blue-600' : ''}`}>
                  <ChevronDown className={`w-4 h-4 ${openIndex === i ? 'text-white' : 'text-slate-500'}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 text-sm md:text-base leading-relaxed border-t border-white/5 mt-4 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
