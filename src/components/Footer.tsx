import { Zap, Instagram, Facebook, Send, Mail, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Zap className="text-white w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-white">
                Lapak<span className="text-primary"> Mobile</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform terbaik untuk menemukan produk digital premium dan tools AI gratis untuk meningkatkan produktivitas Anda.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Produk</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">AI Content Generator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Premium Accounts</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Design Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketing Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Perusahaan</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog & Berita</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6">Dapatkan info produk terbaru dan promo menarik.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email anda..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-primary rounded-lg text-white">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            © 2024 LAPAK MOBILE DIGITAL. SEMUA HAK DILINDUNGI.
          </p>
          <div className="flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
