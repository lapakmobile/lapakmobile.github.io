import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const WarningSection = () => {
  const warnings = [
    "Sudah transfer, admin langsung hilang.",
    "Komplain tidak ditanggapi sama sekali.",
    "Janji 1 Tahun, baru 3 hari akun sudah tidak aktif.",
    "Uang garansi gak balik."
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-12 translate-x-12 blur-3xl opacity-50" />
        
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-3xl">⚠️</span>
            Hati-Hati Langganan di Tempat Lain
            <span className="text-3xl">⚠️</span>
          </h2>
          <p className="mt-6 text-gray-600 font-semibold text-lg">
            Sudah banyak korban yang tertipu:
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4 mb-12">
          {warnings.map((text, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-gray-800 font-bold text-lg tracking-tight">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#F8F9FB] rounded-[32px] p-8 md:p-10 text-center border border-gray-100">
          <p className="text-xl md:text-2xl text-gray-800 font-bold leading-relaxed">
            Di sini, semua langganan <span className="text-[#6C5CE7] uppercase">Bergaransi</span>, <br />
            pelayanan <span className="text-[#6C5CE7] uppercase">Fast Respon</span>, dan terpercaya.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default WarningSection;
