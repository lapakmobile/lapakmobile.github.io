import React, { useState, useEffect, memo } from 'react';
import { Menu, X, Zap, Cpu, ShoppingBag, Info, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (view: string) => void;
  currentView: string;
}

const Navbar = memo(function Navbar({ onNavClick, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home', icon: Zap },
    { name: 'AI Tools', view: 'tools', icon: Cpu },
    { name: 'Marketplace', view: 'marketplace', icon: ShoppingBag },
    { name: 'About', view: 'about', icon: Info },
    { name: 'Contact', view: 'contact', icon: PhoneCall },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => onNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-display font-black tracking-tighter text-white">
              Lapak<span className="text-primary"> Mobile</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  onNavClick(link.view);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-bold tracking-wide uppercase transition-all ${
                  currentView === link.view 
                  ? 'bg-white/10 text-white border border-white/10 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4">
            <button
               onClick={() => onNavClick('marketplace')}
               className="px-8 py-3 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl text-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    onNavClick(link.view);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full p-6 h-12 rounded-2xl text-lg font-bold transition-all ${
                    currentView === link.view 
                    ? 'bg-primary text-white' 
                    : 'bg-white/5 text-gray-300'
                  }`}
                >
                  <link.icon className="w-6 h-6" />
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navbar;
