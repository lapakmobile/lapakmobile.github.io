import React, { useState, useEffect, memo } from 'react';
import { Menu, X, Search, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = memo(function Navbar({ onSearch, onHomeClick }: { onSearch?: (query: string) => void, onHomeClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
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

  const navLinks = [
    { name: 'Cek Region', href: '#products' },
    { name: 'Cek Transaksi', href: '#history' },
    { name: 'Daftar Reseller', href: '#' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 shadow-lg border-b border-white/5 py-3' : 'bg-dark py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Gamepad2 className="text-primary w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">
              Lapak<span className="text-primary">Mobile</span>
            </span>
          </button>

          {/* Desktop Links & Tools */}
          <div className="hidden lg:flex items-center gap-8 flex-grow justify-end">
            <div className="flex items-center gap-8 mr-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-gray-200 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-72">
              <input 
                type="text"
                placeholder="Pencarian..."
                value={localSearch}
                onChange={handleSearchChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-10 text-sm placeholder:text-gray-500 text-white outline-none focus:border-primary/50 transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>

            {/* Menu Button */}
            <button className="p-2.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Menu className="w-6 h-6 text-white" />
            </button>
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
              <div className="relative mb-6">
                <input 
                  type="text"
                  placeholder="Pencarian..."
                  value={localSearch}
                  onChange={handleSearchChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm text-white outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
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
