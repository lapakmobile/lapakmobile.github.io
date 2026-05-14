import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { Marketplace } from './components/Marketplace';
import { AIToolsIndex } from './components/AIToolsIndex';
import ProductDetail from './components/ProductDetail';
import { PromoPopup } from './components/PromoPopup';

import { FAQ } from './components/FAQ';

import { ALL_PRODUCTS, FAQS, TESTIMONIALS } from './constants';
import { Product } from './types';

// Lazy load sections and tools
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const ArticleGenerator = lazy(() => import('./components/tools/ArticleGenerator').then(m => ({ default: m.ArticleGenerator })));
const WALinkGenerator = lazy(() => import('./components/tools/WALinkGenerator').then(m => ({ default: m.WALinkGenerator })));
const ContentGenerator = lazy(() => import('./components/tools/ContentGenerator').then(m => ({ default: m.ContentGenerator })));
const CaptionGenerator = lazy(() => import('./components/tools/CaptionGenerator').then(m => ({ default: m.CaptionGenerator })));

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // SEO Schema
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Lapak Mobile",
      "url": window.location.origin,
      "description": "Premium Digital Products Marketplace & AI Tools",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero 
              onExploreTools={() => setCurrentView('tools')}
              onExploreMarketplace={() => setCurrentView('marketplace')}
            />
            <Marketplace onProductClick={setSelectedProduct} />
            <AIToolsIndex onSelectTool={(id) => setCurrentView(`tool-${id}`)} />
            <FAQ />
            <Suspense fallback={<div className="h-96" />}>
              <WhyChooseUs />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <Testimonials />
            </Suspense>
          </motion.div>
        );
      case 'tools':
        return (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            <AIToolsIndex onSelectTool={(id) => setCurrentView(`tool-${id}`)} />
          </motion.div>
        );
      case 'marketplace':
        return (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-20"
          >
            <Marketplace onProductClick={setSelectedProduct} />
          </motion.div>
        );
      case 'about':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <About />
            </motion.div>
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <Contact />
            </motion.div>
          </Suspense>
        );
      case 'tool-article':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="tool-article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <ArticleGenerator />
            </motion.div>
          </Suspense>
        );
      case 'tool-wa-link':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="tool-wa-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <WALinkGenerator />
            </motion.div>
          </Suspense>
        );
      case 'tool-content':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="tool-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <ContentGenerator />
            </motion.div>
          </Suspense>
        );
      case 'tool-caption':
        return (
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <motion.div key="tool-caption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <CaptionGenerator />
            </motion.div>
          </Suspense>
        );
      default:
        return (
          <div className="pt-48 pb-24 text-center">
             <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">Feature Coming Soon!</h2>
             <p className="text-gray-400 mb-12">Kami sedang menyiapkan tool {currentView} untuk Anda.</p>
             <button 
                onClick={() => setCurrentView('home')}
                className="px-8 py-4 bg-primary text-white font-black rounded-2xl"
             >
                Kembali ke Beranda
             </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30 selection:text-white">
      <Navbar onNavClick={setCurrentView} currentView={currentView} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <PromoPopup />
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      <Toaster position="top-center" expand={false} richColors theme="dark" />
    </div>
  );
}
