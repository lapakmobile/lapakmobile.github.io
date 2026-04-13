import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2 } from 'lucide-react';
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
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Harga Diamond ML?",
    "Paket Streaming Murah?",
    "Cara Order?",
    "Apakah Aman?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAIChatbot', handleOpen);
    return () => window.removeEventListener('openAIChatbot', handleOpen);
  }, []);

  const getLocalResponse = (query: string): string | null => {
    const q = query.toLowerCase();
    
    if (q.includes('cara order') || q.includes('cara pesan') || q.includes('gimana order') || q.includes('tutorial')) {
      return `**Cara Order di LapakMobile:**\n\n1. Pilih produk di halaman utama.\n2. Klik tombol **"Pesan Sekarang"**.\n3. Anda akan diarahkan ke WhatsApp Admin (${WHATSAPP_NUMBER}).\n4. Lakukan pembayaran & produk diproses instan (1-5 menit)! ⚡`;
    }

    if (q.includes('ml') || q.includes('mobile legends') || q.includes('diamond') || q.includes('starlight')) {
      const ml = ALL_PRODUCTS.find(p => p.name.toLowerCase().includes('mobile legends'));
      if (ml) {
        return `**Harga Diamond Mobile Legends:**\n\n${ml.packages.map(pkg => `- **${pkg.name}**: ${pkg.price}`).join('\n')}\n\nKlik produk ML di home untuk pesan! 🎮`;
      }
    }

    if (q.includes('streaming') || q.includes('netflix') || q.includes('youtube') || q.includes('premium') || q.includes('disney') || q.includes('hbogo')) {
      const streaming = ALL_PRODUCTS.filter(p => p.category.toLowerCase().includes('streaming'));
      if (streaming.length > 0) {
        return `**Paket Streaming Populer:**\n\n${streaming.map(p => `- **${p.name}**: Mulai ${p.packages[0].price}`).join('\n')}\n\nCek kategori Streaming untuk detailnya! 📺`;
      }
    }

    if (q.includes('aman') || q.includes('legal') || q.includes('percaya') || q.includes('penipu') || q.includes('bukti')) {
      return `Tenang kak! LapakMobile **100% Aman & Legal**. Kami sudah melayani ribuan transaksi dengan proses otomatis 24 jam. Testimoni bisa cek di ulasan produk ya! ✅`;
    }

    if (q.includes('harga') || q.includes('list') || q.includes('daftar')) {
      return `Kami menyediakan berbagai produk digital dengan harga termurah! Silakan ketik nama game atau layanan yang kakak cari (contoh: "Harga ML" atau "Harga Netflix"). 💰`;
    }

    if (q.includes('admin') || q.includes('wa') || q.includes('whatsapp') || q.includes('hubungi')) {
      return `Kakak bisa hubungi Admin WhatsApp kami di **${WHATSAPP_NUMBER}** untuk bantuan lebih lanjut. Admin kami siap membantu 24 jam! 📱`;
    }

    // Smart Product Search Fallback
    const matchedProduct = ALL_PRODUCTS.find(p => q.includes(p.name.toLowerCase()));
    if (matchedProduct) {
      return `**Harga ${matchedProduct.name}:**\n\n${matchedProduct.packages.map(pkg => `- **${pkg.name}**: ${pkg.price}`).join('\n')}\n\nKlik produk di home untuk pesan sekarang! 🚀`;
    }

    return null;
  };

  const handleSend = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const userMessage = typeof e === 'string' ? e : input.trim();
    
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setStreamingMessage('');

    // Try local response first for speed
    const localResponse = getLocalResponse(userMessage);
    if (localResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', text: localResponse }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      // Prepare context about products
      const productContext = ALL_PRODUCTS.map(p => 
        `- **${p.name}** (${p.category}): Paket tersedia: ${p.packages.map(pkg => `${pkg.name} (${pkg.price})`).join(', ')}`
      ).join('\n');

      const systemInstruction = `
        Anda adalah **Asisten AI LapakMobile**, pakar layanan top-up game dan produk digital termurah di Indonesia.
        
        Tugas utama Anda:
        1. Memberikan informasi harga produk secara akurat berdasarkan data di bawah.
        2. Memandu pengguna cara melakukan pemesanan (Order).
        3. Menjawab pertanyaan umum (FAQ) tentang keamanan dan kecepatan proses.

        DATA PRODUK LAPAKMOBILE:
        ${productContext}
        
        PANDUAN PEMESANAN:
        - Pilih produk yang diinginkan di halaman utama.
        - Klik tombol **"Pesan Sekarang"** pada kartu produk.
        - Anda akan diarahkan ke WhatsApp Admin (${WHATSAPP_NUMBER}) dengan format otomatis.
        - Lakukan pembayaran sesuai instruksi admin.
        - Produk akan diproses instan (1-5 menit).

        INFORMASI PENTING:
        - Semua layanan legal dan aman 100%.
        - Proses otomatis 24 jam.
        - Admin WhatsApp: ${WHATSAPP_NUMBER}

        ATURAN KOMUNIKASI:
        - Gunakan Bahasa Indonesia yang ramah, santai, namun profesional.
        - Gunakan emoji yang relevan (⚡, 🎮, 💎, 🚀).
        - Gunakan Markdown: **Tebal** untuk harga/produk, List untuk daftar.
        - Jika produk tidak ada di daftar, sarankan hubungi admin untuk request.
        - Berikan jawaban yang ringkas dan mudah dibaca.
      `;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', text: userMessage }],
          systemInstruction
        })
      });

      if (!response.ok) throw new Error('Failed to fetch from API');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const { content } = JSON.parse(data);
                fullResponse += content;
                setStreamingMessage(fullResponse);
              } catch (e) {
                console.error('Error parsing SSE:', e);
              }
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: fullResponse }]);
      setStreamingMessage('');
    } catch (error) {
      console.error("Chatbot Error:", error);
      
      // Smart Fallback if AI fails
      const fallbackMsg = `Maaf kak, sistem AI kami sedang sibuk. 🙏\n\n**Tapi jangan khawatir!** Kakak bisa langsung tanya ke **Admin WhatsApp** (${WHATSAPP_NUMBER}) untuk respon super cepat, atau cek daftar harga langsung di menu **Produk**.`;
      
      setMessages(prev => [...prev, { role: 'model', text: fallbackMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button - Hidden (Controlled by ActionCenter) */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary text-dark rounded-full items-center justify-center shadow-2xl hover:scale-110 transition-all neon-glow group"
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

              {/* Streaming Message */}
              {streamingMessage && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 text-gray-200 text-sm border border-white/5 rounded-tl-none">
                      <div className="markdown-body prose prose-invert prose-sm max-w-none">
                        <Markdown>{streamingMessage}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && !streamingMessage && (
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

              {/* Suggested Questions */}
              {!isLoading && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-gray-400 hover:bg-primary hover:text-dark hover:border-primary transition-all"
                    >
                      {q}
                    </button>
                  ))}
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
                Powered by ChatGPT
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
