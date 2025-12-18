
import React, { useState } from 'react';
import TerminalLine from './TerminalLine';
import { audio } from '../utils/audio';

interface ScanScreenProps {
  onStart: () => void;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ onStart }) => {
  const [hasStarted, setHasStarted] = useState(false);

  const startPrank = () => {
    setHasStarted(true);
    audio.playScan();
    onStart();
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-in fade-in duration-1000">
        <div className="relative mb-12">
          {/* Glowing Rings */}
          <div className="absolute inset-0 scale-150 blur-3xl opacity-20 bg-[#00ff66] rounded-full"></div>
          <div className="w-48 h-48 rounded-full border border-[#00ff66]/20 flex items-center justify-center p-2">
            <div className="w-full h-full rounded-full border-2 border-[#00ff66]/40 border-t-[#00ff66] animate-[spin_3s_linear_infinite] flex items-center justify-center">
               <div className="w-[85%] h-[85%] rounded-full border border-[#00ff66]/10 animate-[spin_2s_linear_infinite_reverse]"></div>
            </div>
          </div>
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.22 0 2.383.218 3.46.616m.77 10.742A10.005 10.005 0 0112 21a10.007 10.007 0 01-5.115-1.398m0 0A10.021 10.021 0 0112 19c2.899 0 5.511 1.23 7.328 3.17M12 8V7m0 1v8m0 0l1.221-1.221m-1.221 1.221l-1.221-1.221m6.442-1.532A10.003 10.003 0 0012 3V2m0 0a10.003 10.003 0 017.328 17.17M12 3v1m0 0a10.003 10.003 0 00-7.328 17.17M12 3c1.22 0 2.383.218 3.46.616l.77 10.742A10.005 10.005 0 0112 21a10.007 10.007 0 01-5.115-1.398" />
            </svg>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
            SECURE<span className="text-[#00ff66]">NODE</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide max-w-[280px]">
            Remote Diagnostic Interface & Data Integrity Protocol
          </p>
          
          <button 
            onClick={startPrank}
            className="mt-8 group relative flex flex-col items-center"
          >
            <div className="px-10 py-5 bg-[#00ff66] text-black font-black text-lg tracking-widest uppercase neon-pulse rounded-full group-active:scale-95 transition-all">
              Initialize Secure Link
            </div>
            <span className="mt-4 text-[10px] text-[#00ff66] uppercase tracking-[0.3em] font-bold opacity-50">Requires Root System Access</span>
            <p className="mt-2 text-[8px] text-red-500 font-bold uppercase tracking-widest opacity-80">Warning: Process cannot be terminated once active</p>
          </button>
        </div>
      </div>
    );
  }

  // Generate random staggered delays
  const base = 200;
  const getDelay = (index: number) => base + (index * 600) + Math.random() * 400;

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="mb-8 p-4 glass rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</h2>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#ff003c] rounded-full animate-pulse mr-2"></div>
            <span className="text-xs font-black uppercase tracking-wider">Breach Analysis</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Session</h2>
          <span className="text-xs font-mono">#{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
        </div>
      </div>
      
      <div className="space-y-3 glass p-6 rounded-3xl min-h-[350px]">
        <TerminalLine text="Analyzing hardware signature..." delay={getDelay(0)} />
        <TerminalLine text="Locking browser interface..." type="warning" delay={getDelay(1)} />
        <TerminalLine text="FETCHING CLOUD-BASED THREAT INTEL..." delay={getDelay(2)} />
        <TerminalLine text="MICROPHONE HOOK DETECTED 🎤" type="error" delay={getDelay(3)} />
        <TerminalLine text="SCANNING LOCALIZED MEMORY..." delay={getDelay(4)} />
        <TerminalLine text="SYSTEM_LOCK: PERSISTENT" type="success" delay={getDelay(5)} />
        <TerminalLine text="Parsing audio frequencies..." delay={getDelay(6)} />
        <TerminalLine text="Tracing background activity..." delay={getDelay(7)} />
        <TerminalLine text="ESTABLISHING PERSISTENT CONNECTION..." type="info" delay={getDelay(8)} />
      </div>

      <div className="mt-12 text-center">
         <div className="inline-block px-4 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Kernel v2.4.19-Security-Stable
         </div>
      </div>
    </div>
  );
};

export default ScanScreen;
