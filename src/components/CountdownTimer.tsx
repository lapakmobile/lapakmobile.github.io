import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-4 bg-[#1A1A1E] border border-white/5 rounded-full px-5 py-2.5">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em]">Promo Berakhir:</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-[#2A2A2E] px-2.5 py-1 rounded-md text-white font-mono font-bold text-sm min-w-[34px] text-center border border-white/10">
          {format(timeLeft.hours)}
        </div>
        <span className="text-white/20 font-bold">:</span>
        <div className="bg-[#2A2A2E] px-2.5 py-1 rounded-md text-white font-mono font-bold text-sm min-w-[34px] text-center border border-white/10">
          {format(timeLeft.minutes)}
        </div>
        <span className="text-white/20 font-bold">:</span>
        <div className="bg-[#2A2A2E] px-2.5 py-1 rounded-md text-white font-mono font-bold text-sm min-w-[34px] text-center border border-white/10">
          {format(timeLeft.seconds)}
        </div>
      </div>
    </div>
  );
}
