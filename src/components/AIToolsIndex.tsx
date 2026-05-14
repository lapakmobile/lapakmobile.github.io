import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { AI_TOOLS_LIST } from '../constants';

interface AIToolsIndexProps {
  onSelectTool: (toolId: string) => void;
}

export const AIToolsIndex: React.FC<AIToolsIndexProps> = ({ onSelectTool }) => {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Tools AI Gratis</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gunakan kekuatan AI untuk mengoptimalkan alur kerja kamu secara gratis. Cepat, akurat, dan mudah digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AI_TOOLS_LIST.map((tool, index) => {
            const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => onSelectTool(tool.id)}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  Gunakan Sekarang
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
