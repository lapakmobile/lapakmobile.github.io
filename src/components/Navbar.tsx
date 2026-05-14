import React, { useState, useEffect, memo } from 'react';
import { Menu, X, Search, Gamepad2, Trash2, History, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const Navbar = memo(function Navbar({ onSearch, onHomeClick }: { onSearch?: (query: string) => void, onHomeClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearch(query);
    if (onSearch) onSearch(query);
  };

  const clearOrderHistory = () => {
    if (window.confirm('Hapus semua riwayat pesanan?')) {
      localStorage.removeItem('order_history');
      window.dispatchEvent(new Event('orderHistoryUpdated'));
      toast.success('Riwayat pesanan dikosongkan');
      setMenuOpen(false);
    }
  };

  const clearViewHistory = () => {
    if (window.confirm('Hapus semua riwayat produk yang dilihat?')) {
      localStorage.removeItem('recently_viewed');
      window.dispatchEvent(new Event('recentlyViewedUpdated'));
      toast.success('Riwayat lihat dikosongkan');
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Produk', href: '#pricing-lp' },
    { name: 'Keunggulan', href: '#benefits' },
    { name: 'Cara Order', href: '#timeline' },
    { name: 'FAQ', href: '#faq-lp' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#5E47FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(94,71,255,0.4)]">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-display font-black tracking-tight text-white">
              Lapak<span className="text-white/70"> Mobile</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 flex-grow justify-center translate-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="#pricing-lp"
              className="px-8 py-2.5 bg-primary text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_4px_20px_rgba(255,184,0,0.3)] text-sm"
            >
              Beli Sekarang
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-white/5 rounded-lg border border-white/10"
            >
              {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-dark border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-bold text-gray-200 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navbar;
