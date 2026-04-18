import { Gamepad2, Instagram, Facebook, Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Gamepad2 className="text-primary w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">
              Lapak<span className="text-primary">Mobile</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/lapakmobile" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/lapakmobile" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://t.me/lapakmobile" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group">
              <Send className="w-5 h-5" />
            </a>
            <a href="mailto:helpdesk.lapakmobile@gmail.com" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>© 2024 LAPAKMOBILE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
