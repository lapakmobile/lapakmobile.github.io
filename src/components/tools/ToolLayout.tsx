import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onGenerate: () => void;
  result?: string;
  loading?: boolean;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children, onGenerate, result, loading }) => {
  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success('Disalin ke clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-black text-white mb-4">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="glass p-8 rounded-3xl border border-white/10">
          {children}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGenerate}
            disabled={loading}
            className="w-full mt-8 py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Generating...' : 'Generate Result'}
          </motion.button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-3xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Hasil Generate</h3>
              <div className="flex gap-2">
                <button onClick={copyToClipboard} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors" title="Salin">
                  <Copy className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors" title="Download">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 text-gray-300 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
