import React, { useState } from 'react';
import { ToolLayout } from './ToolLayout';

export const CaptionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('Viral');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!topic) return;
    setLoading(true);
    setTimeout(() => {
      setResult(`Hasil Caption (${style}):\n\nCapek banget nungguin momen yang pas? Padahal ${topic} bisa mulai sekarang juga! ✨\n\nTag temen kamu yang harus liat ini! 👇\n\n#${topic.replace(/\s+/g, '')} #viral #trending #tipsandtricks`);
      setLoading(false);
    }, 1200);
  };

  return (
    <ToolLayout
      title="Social Media Caption"
      description="Buat caption yang menarik dan mematikan untuk sosial media Anda."
      onGenerate={handleGenerate}
      result={result}
      loading={loading}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Tentang Apa Postingan Ini?</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Diskon sepatu, Tips diet, Update software"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Gaya Caption</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none cursor-pointer"
          >
            <option value="Viral">Viral/Kekinian</option>
            <option value="Formal">FormalBusiness</option>
            <option value="Emotional">Emosional/Sentimental</option>
            <option value="Minimalist">Minimalis</option>
          </select>
        </div>
      </div>
    </ToolLayout>
  );
};
