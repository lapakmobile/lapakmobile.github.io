import React from 'react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: '+62 812-2738-XXXX',
    messages: [
      { type: 'received', text: 'DISKON 35% untuk Pro' },
      { type: 'sent', text: 'Terima kasih kak sudah bisa 👍', time: '16.06' },
    ]
  },
  {
    name: '+62 857-1234-XXXX',
    messages: [
      { type: 'received', text: 'Mantap kak, akun premium langsung aktif.' },
      { type: 'received', text: 'Makasih banyakkk!' },
      { type: 'sent', text: 'Sama-sama kak, selamat menikmati fiturnya! 😊', time: '12.45' },
    ]
  },
  {
    name: '+62 899-8765-XXXX',
    messages: [
      { type: 'received', text: 'Gile cepet bgt prosesnya, recommended bgt belanja disini' },
      { type: 'sent', text: 'Siap kak, ditunggu orderan berikutnya! 🔥', time: '19.20' },
    ]
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1221]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-black text-primary text-center mb-20 leading-tight"
        >
          Testimoni Pelanggan !!!
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Phone Frame Mockup */}
              <div className="relative mx-auto w-[280px] h-[580px] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#333] shadow-2xl overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#333] rounded-b-2xl z-20" />
                
                {/* Header */}
                <div className="bg-[#075e54] p-6 pt-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate">{testi.name}</p>
                    <p className="text-white/70 text-[10px]">online</p>
                  </div>
                </div>

                {/* Chat Background */}
                <div className="flex-grow p-4 bg-[#e5ddd5] dark:bg-[#0b141a] overflow-hidden space-y-3 relative">
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {testi.messages.map((msg, mIdx) => (
                    <div 
                      key={mIdx}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} relative z-10`}
                    >
                      <div className={`max-w-[85%] rounded-lg p-2.5 shadow-sm text-sm relative ${
                        msg.type === 'sent' 
                          ? 'bg-[#dcf8c6] dark:bg-[#005c4b] text-gray-800 dark:text-white rounded-tr-none' 
                          : 'bg-white dark:bg-[#202c33] text-gray-800 dark:text-white rounded-tl-none'
                      }`}>
                        <p className="leading-snug">{msg.text}</p>
                        {msg.time && (
                          <p className={`text-[9px] mt-1 text-right ${
                            msg.type === 'sent' ? 'text-gray-500 dark:text-white/50' : 'text-gray-400'
                          }`}>
                            {msg.time}
                          </p>
                        )}
                        
                        {/* Tail */}
                        <div className={`absolute top-0 w-3 h-3 ${
                          msg.type === 'sent'
                            ? '-right-1 bg-[#dcf8c6] dark:bg-[#005c4b] rotate-45'
                            : '-left-1 bg-white dark:bg-[#202c33] rotate-45'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Input Mockup */}
                <div className="bg-[#f0f0f0] dark:bg-[#202c33] p-3 flex items-center gap-2">
                  <div className="flex-grow h-10 bg-white dark:bg-[#2a3942] rounded-full" />
                  <div className="w-10 h-10 bg-[#075e54] dark:bg-[#00a884] rounded-full flex-shrink-0" />
                </div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
