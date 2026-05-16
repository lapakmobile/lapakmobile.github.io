import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { AI_TOOLS_LIST } from '../constants';

interface AIToolsIndexProps {
  onSelectTool: (toolId: string) => void;
}

export const AIToolsIndex: React.FC<AIToolsIndexProps> = ({ onSelectTool }) => {
  return (
    <section id="tools-section" className="py-24 relative overflow-hidden">
      <div className="container-safe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <LucideIcons.Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Efficiency Hub</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                Gratis <br />
                <span className="text-gradient">Tools AI Canggih</span>
              </h2>
              <p className="text-slate-400 font-medium">
                Buka potensi kreativitas Anda dengan koleksi tools AI canggih kami yang dirancang untuk mempercepat pekerjaan harian Anda.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_TOOLS_LIST.map((tool, index) => {
            const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectTool(tool.id)}
                className="glass-card p-8 flex flex-col group cursor-pointer card-hover-effect"
              >
                <div className="w-14 h-14 premium-gradient rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {tool.description}
                </p>

                <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest bg-white/5 w-fit px-4 py-2 rounded-xl group-hover:bg-blue-600 transition-all font-display">
                  Coba Gratis
                  <LucideIcons.ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
