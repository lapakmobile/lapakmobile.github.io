import { motion } from 'motion/react';
import { ArrowUpRight, Clock, User } from 'lucide-react';

const articles = [
  {
    title: "Cara Mendapatkan Canva Pro Murah & Legal 2026",
    excerpt: "Panduan lengkap cara upgrade akun Canva kamu menjadi Pro dengan harga termurah di Indonesia.",
    date: "12 May 2026",
    author: "Admin Lapak",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "ChatGPT Plus vs Free: Mana yang Worth It?",
    excerpt: "Bandingkan fitur GPT-4o, DALL-E 3, dan Data Analysis antara versi gratis dan berbayar.",
    date: "10 May 2026",
    author: "AI Expert",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "5 Tools AI Terbaik untuk Konten Kreator",
    excerpt: "Tingkatkan produktivitas kamu dengan tools AI pilihan untuk editing video dan caption otomatis.",
    date: "08 May 2026",
    author: "Creative Team",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-safe">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
            Edukasi & <span className="text-gradient">Artikel Digital</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tips, trik, dan panduan seputar teknologi digital serta AI untuk membantu produktivitas Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group overflow-hidden cursor-pointer flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-4 text-[10px] font-bold text-white uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    {article.date}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-display font-black text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <User className="w-3 h-3" />
                    {article.author}
                  </div>
                  <div className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
