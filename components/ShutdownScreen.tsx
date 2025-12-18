
import React, { useEffect, useState } from 'react';
import { audio } from '../utils/audio';

interface ShutdownScreenProps {
  onComplete: () => void;
}

const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'critical' | 'blackout'>('critical');

  useEffect(() => {
    audio.playShutdown();

    const criticalTimer = setTimeout(() => {
      setPhase('blackout');
    }, 1500);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(criticalTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (phase === 'blackout') {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center animate-out fade-out fill-mode-forwards duration-1000 delay-[2000ms]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-75 flex flex-col items-center justify-center space-y-4">
      <div className="text-red-500 font-bold text-center space-y-2">
        <p className="text-2xl animate-pulse">CRITICAL SYSTEM ERROR</p>
        <p className="text-xs font-mono opacity-70">Error Code: 0x000000EF (CRITICAL_PROCESS_DIED)</p>
      </div>
      <div className="w-full h-1 bg-white/10 overflow-hidden rounded">
        <div className="h-full bg-red-600 animate-[loading_1.5s_ease-in-out]"></div>
      </div>
      <p className="text-[10px] uppercase tracking-widest opacity-40">Initiating Emergency Shutdown...</p>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ShutdownScreen;
