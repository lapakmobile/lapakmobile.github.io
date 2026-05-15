import React, { useState, useEffect, memo } from 'react';
import { Menu, X, Zap, Cpu, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (view: string) => void;
  currentView: string;
}

const Navbar = memo(function Navbar({ onNavClick, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy for Home Page Sections
      if (currentView === 'home') {
        const sections = ['top', 'tools-section', 'about-section'];
        const current = sections.find(id => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (current) {
          if (current === 'top') setActiveSection('home');
          else if (current === 'tools-section') setActiveSection('tools');
          else if (current === 'about-section') setActiveSection('about');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { name: 'Home', view: 'home', icon: Zap },
    { name: 'AI Tools', view: 'tools', icon: Cpu },
    { name: 'About', view: 'about', icon: Info },
  ];

  const isActive = (view: string) => {
    if (currentView !== 'home') return currentView === view;
    return activeSection === view;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-6 lg:px-8 ${
        scrolled ? 'mt-4' : 'mt-0'
      }`}
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 ${
        scrolled 
        ? 'bg-slate-950/80 backdrop-blur-3xl border border-white/10 py-3 px-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)]' 
        : 'bg-transparent py-6 px-0'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => {
               onNavClick('home');
               setIsOpen(false);
               window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
            </div>
            <span className="text-xl sm:text-2xl font-display font-black tracking-tighter text-white">
              Lapak<span className="text-primary italic"> Mobile</span>
            </span>
          </button>
 
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavClick(link.view)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[12px] font-black tracking-widest uppercase transition-all duration-300 ${
                  isActive(link.view) 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className={`w-3.5 h-3.5 transition-colors ${isActive(link.view) ? 'text-white' : 'text-primary'}`} />
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white active:scale-90 transition-transform backdrop-blur-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="lg:hidden fixed inset-y-0 right-0 w-full max-w-[320px] bg-slate-950/95 backdrop-blur-3xl border-l border-white/10 z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="text-xl font-black text-white">Menu</span>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
               </button>
            </div>

            <div className="flex-grow space-y-3">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.view}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    onNavClick(link.view);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 w-full p-5 rounded-2xl text-base font-black transition-all ${
                    isActive(link.view) 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive(link.view) ? 'bg-white/20' : 'bg-primary/20 text-primary'}`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  {link.name}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/5">
               <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">
                  © 2024 Lapak Mobile
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

export default Navbar;
