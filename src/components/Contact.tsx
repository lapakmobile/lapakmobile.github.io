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
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-display font-black text-white mb-8">Hubungi Kami</h1>
          <p className="text-gray-400 text-lg mb-12">
            Punya pertanyaan atau butuh bantuan lebih lanjut? Tim support kami siap melayani Anda 24/7.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase font-black tracking-widest">Email Support</div>
                <div className="text-xl text-white font-bold">helpdesk.lapakmobile@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase font-black tracking-widest">WhatsApp</div>
                <div className="text-xl text-white font-bold">+62 896-5000-6000</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase font-black tracking-widest">Kantor Pusat</div>
                <div className="text-xl text-white font-bold">Jl. KH Ahmad Mursid, RT.05/RW.02, Dusun I, Sokaraja Wetan, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah 53181</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="glass p-10 rounded-[40px] border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Nama Depan</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Nama Belakang</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Alamat Email</label>
              <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Subjek</label>
              <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Pesan Anda</label>
              <textarea rows={5} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none" />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              Kirim Pesan
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
