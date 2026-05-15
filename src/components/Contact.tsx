import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Contact Hub</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">Hubungi <br /><span className="text-primary italic">Kami</span></h1>
          <p className="text-gray-400 text-base md:text-xl mb-14 font-medium leading-relaxed max-w-lg">
            Punya pertanyaan atau butuh bantuan lebih lanjut? Tim support kami yang handal siap melayani Anda kapanpun.
          </p>

          <div className="space-y-6 md:space-y-8">
            {[
              { icon: Mail, label: 'Support Email', value: 'helpdesk@lapakmobile.com', color: 'bg-primary/10 text-primary border-primary/20' },
              { icon: Phone, label: 'Official WhatsApp', value: '+62 896 5000 6000', color: 'bg-secondary/10 text-secondary border-secondary/20' },
              { icon: MapPin, label: 'Headquarter', value: 'Sokaraja, Banyumas, Jawa Tengah', color: 'bg-accent/10 text-accent border-accent/20' }
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-5 md:gap-8 group p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center border ${contact.color} group-hover:scale-110 transition-transform`}>
                  <contact.icon className="w-6 h-6 md:w-10 md:h-10" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{contact.label}</div>
                  <div className="text-base md:text-2xl text-white font-black tracking-tight">{contact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="relative group p-8 sm:p-12 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-20" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Depan</label>
                <input type="text" required className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold placeholder:text-gray-800" placeholder="John" />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Belakang</label>
                <input type="text" required className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold placeholder:text-gray-800" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Aktif</label>
              <input type="email" required className="w-full bg-slate-950 border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold placeholder:text-gray-800" placeholder="hello@example.com" />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pesan / Keluhan</label>
              <textarea rows={4} required className="w-full bg-slate-950 border border-white/5 rounded-3xl px-6 py-5 text-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none resize-none transition-all font-bold placeholder:text-gray-800" placeholder="Tuliskan pesan anda..." />
            </div>
            <button type="submit" className="group w-full py-6 md:py-8 bg-white text-slate-950 font-black rounded-3xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] text-xl">
              Kirim Pesan
              <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
