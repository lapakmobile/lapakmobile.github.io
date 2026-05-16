import React from 'react';
import { Check, Shield, Zap, Heart, Globe, Lock } from 'lucide-react';
import { motion } from 'motion/react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Aman & Legal",
      desc: "Semua produk kami legal dan diperoleh melalui jalur resmi.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Proses Instan",
      desc: "Pesanan diproses otomatis dalam hitungan detik setelah bayar.",
      color: "yellow"
    },
    {
      icon: Heart,
      title: "Garansi Penuh",
      desc: "Kami memberikan garansi sesuai durasi paket yang Anda beli.",
      color: "red"
    },
    {
      icon: Globe,
      title: "Harga Terbaik",
      desc: "Harga jauh lebih kompetitif dibanding berlangganan langsung.",
      color: "green"
    },
    {
      icon: Lock,
      title: "Privasi Terjaga",
      desc: "Data Anda aman bersama kami, tidak akan disalahgunakan.",
      color: "purple"
    },
    {
      icon: Check,
      title: "Support 24/7",
      desc: "Tim support kami siap membantu kapan pun Anda membutuhkan.",
      color: "blue"
    }
  ];

  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      <div className="container-safe relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">Kenapa <span className="text-gradient">Lapak Mobile?</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium">
              Kami berkomitmen memberikan layanan terbaik untuk membantu kebutuhan digital Anda.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 border-white/5 card-hover-effect group"
            >
              <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-all`}>
                <feature.icon className={`w-7 h-7 text-blue-500 group-hover:text-blue-400`} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
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
