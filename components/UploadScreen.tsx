
import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import TerminalLine from './TerminalLine';

interface UploadScreenProps {
  onComplete: () => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(30);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    audio.playUpload();

    if (countdown <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Progress bar takes exactly 30 seconds to reach 100%
    const progressTimer = setInterval(() => {
      setProgress(prev => Math.min(prev + (100/300), 100)); // 300 increments of 100ms
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [countdown, onComplete]);

  // Generate random staggered delays for background tasks
  const getDelay = (index: number) => 500 + (index * 2000) + Math.random() * 1500;

  return (
    <div className="px-6 animate-in zoom-in-95 duration-500 flex flex-col items-center">
      <div className="w-full bg-[#ff003c] text-black py-4 px-6 rounded-2xl font-black text-center mb-10 shadow-[0_0_40px_rgba(255,0,60,0.3)] jitter">
        <div className="text-2xl uppercase tracking-tighter glitch">Data Breach</div>
        <div className="text-[10px] uppercase tracking-widest opacity-70">Remote Infiltration Active</div>
      </div>
      
      <div className="w-full glass p-6 rounded-3xl mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff003c]/20">
          <div 
            className="h-full bg-[#ff003c] transition-all duration-100 linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-[#ff003c] font-black text-sm uppercase tracking-[0.2em] mb-4 glitch">Exporting Intelligence</p>
        
        <div className="flex justify-between items-end mb-1">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Destination</span>
          <span className="text-xs font-mono">REMOTE_SERVERS_04</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[10px] text-gray-500 font-bold uppercase">Transferred</span>
          <span className="text-xs font-mono">{(progress * 1.84).toFixed(1)} GB</span>
        </div>
      </div>

      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute inset-0 scale-150 blur-3xl opacity-30 bg-[#ff003c] rounded-full animate-pulse"></div>
        <div className="text-8xl font-black text-[#ff003c] font-mono tracking-tighter z-10 glitch">
          {countdown}
        </div>
      </div>

      <div className="w-full space-y-1">
        <div className="text-[8px] uppercase tracking-widest text-[#ff003c] opacity-40 mb-2 font-bold">Infiltration Log</div>
        <TerminalLine text="ENCRYPTING_LOCAL_STORAGE..." type="error" delay={getDelay(0)} />
        <TerminalLine text="BYPASSING_ROOT_LOCK..." type="error" delay={getDelay(1)} />
        <TerminalLine text="DISABLING_EMERGENCY_SHUTDOWN..." type="error" delay={getDelay(2)} />
        <TerminalLine text="CLEANING_TEMP_LOGS..." type="error" delay={getDelay(3)} />
        <TerminalLine text="RE-ROUTING_IP_TRAFFIC..." type="error" delay={getDelay(4)} />
      </div>
    </div>
  );
};

export default UploadScreen;
