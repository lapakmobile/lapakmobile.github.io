import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { AI_TOOLS_LIST } from '../constants';

interface AIToolsIndexProps {
  onSelectTool: (toolId: string) => void;
}

export const AIToolsIndex: React.FC<AIToolsIndexProps> = ({ onSelectTool }) => {
  return (
    <section className="py-24 md:py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6">
               <LucideIcons.Cpu className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Efficiency Hub</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 leading-tight tracking-tight">
               Tools AI <span className="text-primary italic">Tanpa Biaya</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
               Buka potensi kreativitas Anda dengan koleksi tools AI canggih kami yang dirancang untuk mempercepat pekerjaan harian Anda.
            </p>
          </div>
          <div className="hidden md:block">
             <LucideIcons.ArrowRight className="w-12 h-12 text-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {AI_TOOLS_LIST.map((tool, index) => {
            const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer overflow-hidden"
                onClick={() => onSelectTool(tool.id)}
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Icon className="w-20 h-20" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-transform">
                  <Icon className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{tool.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium line-clamp-3">
                  {tool.description}
                </p>
                <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-white/5 w-fit px-5 py-2 rounded-xl group-hover:bg-primary transition-all">
                  Jalankan Tool
                  <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
