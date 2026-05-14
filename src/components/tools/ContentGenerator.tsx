import React, { useState } from 'react';
import { ToolLayout } from './ToolLayout';

export const ContentGenerator: React.FC = () => {
  const [platform, setPlatform] = useState('TikTok');
  const [niche, setNiche] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!niche) return;
    setLoading(true);
    setTimeout(() => {
      setResult(`Ide Konten Viral untuk ${platform} (${niche}):\n\n1. "POV: Kamu baru sadar kalau ${niche} itu..." (Hook yang relatable)\n2. "3 Rahasia ${niche} yang jarang orang tahu!" (Edukasi)\n3. "Day in my life sebagai pecinta ${niche}" (Storytelling)\n4. "Jangan lakukan ini kalau kamu mau sukses di ${niche}!" (Kontroversi/Tips)\n\nCTA: Komen "MAU" kalau kamu butuh part 2!`);
      setLoading(false);
    }, 1500);
  };

  return (
    <ToolLayout
      title="Content Idea Generator"
      description="Dapatkan ide konten viral yang disesuaikan dengan platform pilihan Anda."
      onGenerate={handleGenerate}
      result={result}
      loading={loading}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none cursor-pointer"
          >
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram (Reels)</option>
            <option value="YouTube">YouTube (Shorts)</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter/X</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Niche / Topik</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Contoh: Kuliner, Teknologi, Fashion"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
};
