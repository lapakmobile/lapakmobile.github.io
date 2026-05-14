import React from 'react';
import { Check, Shield, Zap, Heart, Globe, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Aman & Legal",
      desc: "Semua produk kami legal dan diperoleh melalui jalur resmi.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Zap,
      title: "Proses Instan",
      desc: "Pesanan diproses otomatis dalam hitungan detik setelah bayar.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Heart,
      title: "Garansi Penuh",
      desc: "Kami memberikan garansi sesuai durasi paket yang Anda beli.",
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      icon: Globe,
      title: "Harga Terbaik",
      desc: "Harga jauh lebih kompetitif dibanding berlangganan langsung.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Lock,
      title: "Privasi Terjaga",
      desc: "Data Anda aman bersama kami, tidak akan disalahgunakan.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Check,
      title: "Support 24/7",
      desc: "Admin kami siap membantu kapan pun Anda membutuhkan.",
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Kenapa Lapak Mobile?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kami berkomitmen memberikan layanan terbaik untuk membantu kebutuhan digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
