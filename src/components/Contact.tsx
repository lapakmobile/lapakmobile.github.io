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
    <div className="container-safe py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Contact Hub</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">Hubungi <br /><span className="text-gradient">Kami</span></h1>
          <p className="text-slate-400 text-base md:text-xl mb-14 font-medium leading-relaxed max-w-lg">
            Punya pertanyaan atau butuh bantuan lebih lanjut? Tim support kami yang handal siap melayani Anda kapanpun.
          </p>

          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Support Email', value: 'helpdesk@lapakmobile.com', color: 'from-blue-500/20 to-indigo-500/20' },
              { icon: Phone, label: 'Official WhatsApp', value: '+62 896 5000 6000', color: 'from-green-500/20 to-emerald-500/20' },
              { icon: MapPin, label: 'Headquarter', value: 'Sokaraja, Banyumas, Indonesia', color: 'from-purple-500/20 to-pink-500/20' }
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-6 group glass-card p-6 border-white/5 card-hover-effect">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${contact.color} shadow-lg transition-transform`}>
                  <contact.icon className="w-6 md:w-8" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{contact.label}</div>
                  <div className="text-lg md:text-xl text-white font-black tracking-tight">{contact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nama Depan</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-800" placeholder="John" />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nama Belakang</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-800" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Aktif</label>
              <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-bold placeholder:text-slate-800" placeholder="hello@example.com" />
            </div>
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pesan / Keluhan</label>
              <textarea rows={4} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 outline-none resize-none transition-all font-bold placeholder:text-slate-800" placeholder="Tuliskan pesan anda..." />
            </div>
            <button type="submit" className="w-full py-5 premium-gradient text-white rounded-2xl font-black flex items-center justify-center gap-4 shadow-xl shadow-blue-600/30 font-display uppercase tracking-[0.2em] text-sm">
              Kirim Pesan
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
