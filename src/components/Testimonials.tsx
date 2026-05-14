import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Cerita Mereka</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ribuan kreator dan pebisnis telah membuktikan kehebatan tools dan produk kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testi, index) => (
            <motion.div
              key={testi.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-10 rounded-[40px] border border-white/5 relative group hover:border-primary/30 transition-all"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-xl text-white font-medium leading-relaxed mb-8 italic">
                "{testi.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={testi.avatar} 
                  alt={testi.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">{testi.name}</h4>
                  <p className="text-primary text-sm font-bold uppercase tracking-widest">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
