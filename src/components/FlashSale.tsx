import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Zap, Flame } from 'lucide-react';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-safe">
        <div className="glass-card bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] -z-10" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-500 font-black text-xs uppercase tracking-[0.2em] mb-6">
                <Flame className="w-4 h-4 animate-bounce" />
                Limited Time Offer
              </div>
              
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                Flash Sale <br />
                <span className="text-red-500">Heboh Hari Ini!</span>
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 max-w-md font-medium">
                Dapatkan produk terpilih dengan diskon hingga 90%. Stok sangat terbatas, siapa cepat dia dapat!
              </p>

              {/* Countdown */}
              <div className="flex gap-4">
                {[
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds },
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-display font-black text-white">
                      {format(t.value)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-3">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {/* Quick Items in Flash Sale */}
               {[
                 { name: 'Spotify 1 Bln', price: 'Rp 5.000', stock: '8 sisa' },
                 { name: 'Canva Pro Life', price: 'Rp 7.000', stock: '12 sisa' },
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   whileHover={{ scale: 1.05 }}
                   className="glass-card p-6 bg-white/5 border-white/10"
                 >
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                     <Zap className="w-6 h-6 text-yellow-400" />
                   </div>
                   <h3 className="text-lg font-display font-black text-white mb-1">{item.name}</h3>
                   <div className="text-2xl font-display font-black text-red-500 mb-4">{item.price}</div>
                   
                   {/* Stock indicator */}
                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                     <div className="w-1/3 h-full bg-red-500 animate-pulse" />
                   </div>
                   <div className="text-[10px] font-black text-slate-500 uppercase">{item.stock}</div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
