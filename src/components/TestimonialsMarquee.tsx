import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';
import LazyImage from './ui/LazyImage';
import { TESTIMONIALS } from '../constants';

export default function TestimonialsMarquee() {
  return (
    <section className="py-24 bg-dark-lighter overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Apa Kata Mereka?</h2>
        <p className="text-gray-400 mb-16">Kepuasan pelanggan adalah prioritas utama kami.</p>
        
        <div className="relative w-full mb-16">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-lighter to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-lighter to-transparent z-10" />
          
          <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`} 
                className="w-[350px] glass p-8 rounded-3xl text-left relative shrink-0 group hover:border-primary/30 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-primary fill-primary' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-8 whitespace-normal line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0">
                    {t.avatar ? (
                      <LazyImage src={t.avatar} alt={t.name} className="w-full h-full" width={100} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                        {t.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-primary uppercase tracking-widest font-black">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <a 
          href="https://share.google/fGTNoyzKTauiqXnTG"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 glass rounded-2xl text-sm font-bold hover:bg-white/10 transition-all border border-white/10 group"
        >
          <LazyImage 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Business_Profile_icon.svg" 
            alt="Google Business" 
            className="w-5 h-5 group-hover:scale-110 transition-transform"
            responsive={false}
          />
          <span>Lihat Semua Review di Google Business</span>
        </a>
      </div>
    </section>
  );
}
