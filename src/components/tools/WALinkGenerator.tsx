import React, { useState } from 'react';
import { ToolLayout } from './ToolLayout';
import { QRCodeSVG } from 'qrcode.react';

export const WALinkGenerator: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [qrVisible, setQrVisible] = useState(false);

  const handleGenerate = () => {
    if (!phone) return;
    const formattedPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    setResult(link);
    setQrVisible(true);
  };

  return (
    <ToolLayout
      title="WA Link Generator"
      description="Buat link WhatsApp instan untuk bisnis Anda lengkap dengan QR Code."
      onGenerate={handleGenerate}
      result={result}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Nomor WhatsApp</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Contoh: 6289650006000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-400 mb-2">Pesan Otomatis</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Halo Admin, saya mau tanya..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
          />
        </div>
        {qrVisible && result && (
          <div className="flex flex-col items-center gap-4 py-4">
             <div className="bg-white p-4 rounded-2xl">
                <QRCodeSVG value={result} size={150} />
             </div>
             <p className="text-xs text-gray-500">Scan QR Code untuk langsung Chat</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
