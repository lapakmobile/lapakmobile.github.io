import { Zap, Instagram, Facebook, Send, Twitter, Youtube, MessageCircle, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-0 opacity-20" />
      
      <div className="container-safe relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="text-white w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">
                Lapak<span className="text-blue-500"> Mobile</span>
              </span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              Destinasi utama produk digital premium dan solusi AI inovatif. Berkomitmen menghadirkan kualitas terbaik dengan layanan secepat kilat.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: MessageCircle, href: "#" }, // Telegram / WA
                { icon: Music2, href: "#" }, // TikTok
                { icon: Facebook, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-white/5">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Eksplorasi</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-all">Canva Pro</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Netflix UHD</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">ChatGPT Plus</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Spotify Premium</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Dukungan</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-all">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Metode Pembayaran</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all">Garansi & Refund</a></li>
            </ul>
          </div>

          <div className="glass-card p-6 border-white/10 h-fit">
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-[10px]">Payment Method</h4>
            <div className="grid grid-cols-3 gap-2">
               {[
                 { name: 'QRIS', color: 'bg-white text-slate-900' },
                 { name: 'DANA', color: 'bg-blue-500 text-white' },
                 { name: 'OVO', color: 'bg-purple-700 text-white' },
                 { name: 'GoPay', color: 'bg-sky-500 text-white' },
                 { name: 'Shopee', color: 'bg-orange-600 text-white' },
                 { name: 'BCA', color: 'bg-blue-800 text-white' },
                 { name: 'MANDIRI', color: 'bg-blue-900 text-yellow-400' },
                 { name: 'BNI', color: 'bg-orange-700 text-white' },
                 { name: 'BRI', color: 'bg-blue-600 text-white' },
               ].map((pay, i) => (
                 <div key={i} className={`aspect-[2/1] ${pay.color} rounded-lg flex items-center justify-center border border-white/5 shadow-sm overflow-hidden`}>
                    <span className="text-[9px] font-black italic tracking-tighter uppercase">{pay.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center md:text-left">
            © 2024 LAPAK MOBILE ECOSYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
