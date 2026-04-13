import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { ALL_PRODUCTS, WHATSAPP_NUMBER } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya asisten AI LapakMobile. Ada yang bisa saya bantu hari ini? Anda bisa tanya tentang harga diamond, paket streaming, atau cara order.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAIChatbot', handleOpen);
    return () => window.removeEventListener('openAIChatbot', handleOpen);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Prepare context about products
      const productContext = ALL_PRODUCTS.map(p => 
        `${p.name} (${p.category}): ${p.packages.map(pkg => `${pkg.name} seharga ${pkg.price}`).join(', ')}`
      ).join('\n');

      const systemInstruction = `
        Anda adalah asisten AI ramah untuk LapakMobile, toko top-up game dan produk digital termurah di Indonesia.
        Tugas Anda adalah membantu pengunjung menemukan produk dan memberikan informasi harga.
        
        DATA PRODUK KAMI:
        ${productContext}
        
        KONTAK ADMIN: WhatsApp ${WHATSAPP_NUMBER}
        
        ATURAN FORMAT JAWABAN:
        1. Gunakan Markdown untuk merapikan tulisan.
        2. Gunakan **Tebal** untuk nama produk atau harga penting.
        3. Gunakan List (Bullet points) untuk daftar harga agar mudah dibaca.
        4. Gunakan baris baru (Enter) yang cukup agar tidak menumpuk.
        5. Berikan sapaan yang hangat dan gunakan emoji yang relevan.
        6. Jika memberikan daftar harga, buatlah seperti ini:
           - **Paket A**: Rp 10.000
           - **Paket B**: Rp 20.000
        7. Jaga jawaban tetap profesional, santai, dan solutif.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Maaf, saya sedang mengalami gangguan teknis. Silakan hubungi admin via WhatsApp.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Maaf, saya tidak bisa merespon saat ini. Silakan hubungi admin langsung ya!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary text-dark rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all neon-glow group"
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-dark text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-primary animate-bounce">
          AI
        </span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="fixed bottom-24 left-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[70vh] glass rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-primary text-dark flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark/10 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold">Asisten AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-dark/40 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-dark/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-dark/30">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-secondary text-white rounded-tr-none' 
                        : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                    }`}>
                      {msg.role === 'model' ? (
                        <div className="markdown-body prose prose-invert prose-sm max-w-none">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 text-gray-400 text-sm italic border border-white/5 rounded-tl-none">
                      Sedang berpikir...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 bg-dark-lighter border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanya sesuatu..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-14 text-sm outline-none focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-dark rounded-xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-gray-600 text-center mt-3 uppercase tracking-widest font-bold">
                Powered by Gemini AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
