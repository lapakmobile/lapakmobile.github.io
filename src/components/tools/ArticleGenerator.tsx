import React, { useState } from 'react';
import { ToolLayout } from './ToolLayout';

export const ArticleGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!keyword) return;
    setLoading(true);
    // Mock AI generation
    setTimeout(() => {
      setResult(`<h1>Manfaat ${keyword} untuk Masa Depan</h1>\n\n${keyword} merupakan topik yang semakin mendalam dibicarakan saat ini. Dalam artikel ini, kita akan membahas mengapa ${keyword} sangat penting...\n\n<h2>1. Keunggulan Utama</h2>\nDengan menggunakan ${keyword}, Anda bisa mengoptimalkan proses kerja secara efektif. Ini adalah solusi bagi para profesional di bidang ini.\n\n<h2>2. Langkah Implementasi</h2>\nMulai dengan memahami dasar-dasar ${keyword} secara mendalam sebelum melangkah ke tahap teknis lainnya.\n\n<h3>Kesimpulan</h3>\nInvestasi waktu Anda pada ${keyword} adalah keputusan yang tepat.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <ToolLayout
      title="AI Article Generator"
      description="Buat artikel SEO berkualitas tinggi hanya dengan satu klik."
      onGenerate={handleGenerate}
      result={result}
      loading={loading}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Main Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Contoh: Digital Marketing, AI, Resep Masakan"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none cursor-pointer"
            >
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Witty">Lucu/Witty</option>
              <option value="Persuasive">Persuasive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none cursor-pointer"
            >
              <option value="Short">Pendek</option>
              <option value="Medium">Medium</option>
              <option value="Long">Panjang</option>
            </select>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};
