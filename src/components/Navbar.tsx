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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-slate-950/70 backdrop-blur-3xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
               onNavClick('home');
               setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
            </div>
            <span className="text-xl sm:text-2xl font-display font-black tracking-tighter text-white">
              Lapak<span className="text-primary"> Mobile</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  onNavClick(link.view);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-black tracking-wide uppercase transition-all duration-300 ${
                  currentView === link.view 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
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
               className="group relative px-8 py-3 bg-white text-slate-950 font-black rounded-2xl overflow-hidden transition-all shadow-xl active:scale-95"
            >
              <span className="relative z-10 text-sm">Mulai Sekarang</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
             <button
                onClick={() => onNavClick('marketplace')}
                className="px-5 py-2.5 bg-primary text-white font-black rounded-xl shadow-lg text-xs"
             >
                Marketplace
             </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white active:scale-90 transition-transform"
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden fixed top-[72px] left-4 right-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-50 p-6"
          >
            <div className="grid grid-cols-1 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    onNavClick(link.view);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full p-5 rounded-2xl text-lg font-black transition-all ${
                    currentView === link.view 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${currentView === link.view ? 'bg-white/20' : 'bg-primary/20 text-primary'}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  {link.name}
                </button>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
               <button
                  onClick={() => {
                     onNavClick('marketplace');
                     setIsOpen(false);
                  }}
                  className="w-full py-5 bg-white text-slate-950 font-black rounded-2xl text-center shadow-2xl"
               >
                  Telusuri Produk
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navbar;
