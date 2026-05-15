import { Zap, Instagram, Facebook, Send, Mail, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-0 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="text-white w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">
                Lapak<span className="text-primary"> Mobile</span>
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed font-medium">
              Destinasi utama produk digital premium dan solusi AI inovatif. Berkomitmen menghadirkan kualitas terbaik dengan layanan secepat kilat.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:-translate-y-1 active:scale-95 border border-white/5">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:pl-8 lg:pl-12">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Eksplorasi</h4>
            <ul className="space-y-5 text-sm md:text-base font-bold text-gray-400">
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">AI Article Gen</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Premium Accounts</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Tools Affiliate</a></li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Dukungan</h4>
            <ul className="space-y-5 text-sm md:text-base font-bold text-gray-400">
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Kontak Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Metode Bayar</a></li>
              <li><a href="#" className="hover:text-primary transition-all hover:pl-2">Ketentuan Layanan</a></li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 h-fit relative group">
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">Update Terbaru</h4>
            <p className="text-gray-400 text-sm mb-8 font-medium leading-relaxed">Berlangganan info promo dan fitur baru.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email anda..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-primary transition-all shadow-inner font-bold"
              />
              <button className="absolute right-2.5 top-2.5 p-2.5 bg-primary rounded-xl text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] text-center md:text-left">
            © 2024 LAPAK MOBILE ECOSYSTEM. <br className="md:hidden" /> ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
