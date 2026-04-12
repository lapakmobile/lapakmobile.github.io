import { Zap, Instagram, Twitter, Facebook, Mail, Phone, Star, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="text-white w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter">
                LAPAK<span className="text-primary">MOBILE</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              LapakMobile adalah platform top-up game dan produk digital terpercaya di Indonesia. Proses cepat, harga murah, dan aman 100%.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Menu Cepat</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Beranda</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Semua Produk</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#articles" className="hover:text-primary transition-colors">Artikel</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Produk Populer</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Mobile Legends</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Honor of Kings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">YouTube Premium</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Canva Pro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+62 812 9000 6080</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>helpdesk.lapakmobile@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="w-4 h-4 text-primary" />
                <a href="https://facebook.com/lapakmobile" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LapakMobile Official</a>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-4 h-4 text-primary" />
                <a href="https://t.me/lapakmobile" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@lapakmobile_admin</a>
              </li>
              <li className="pt-2">
                <a 
                  href="https://share.google/fGTNoyzKTauiqXnTG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg text-xs font-bold hover:text-primary transition-all"
                >
                  <Star className="w-3 h-3 fill-current text-primary" />
                  Google Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 LapakMobile Indonesia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
