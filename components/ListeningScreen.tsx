
import React, { useEffect } from 'react';
import TerminalLine from './TerminalLine';
import { audio } from '../utils/audio';

const ListeningScreen: React.FC = () => {
  useEffect(() => {
    audio.playListening();
  }, []);

  // Generate random staggered delays for capture log
  const base = 500;
  const getDelay = (index: number) => base + (index * 1200) + Math.random() * 800;

  return (
    <div className="px-6 animate-in slide-in-from-bottom-10 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center text-[#00ffff]">
            <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-ping mr-2"></div>
            <h1 className="text-sm font-black uppercase tracking-widest">Active Listening</h1>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Decryption protocol v9.2</p>
        </div>
        <div className="glass px-3 py-1 rounded-lg">
          <span className="text-[#00ff66] text-xs font-mono font-bold">REC</span>
        </div>
      </div>

      {/* Modern Waveform */}
      <div className="h-40 glass rounded-3xl flex items-center justify-center space-x-1.5 mb-10 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00ff66]/5 to-transparent"></div>
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-[#00ff66] rounded-full opacity-80"
            style={{ 
              height: `${15 + Math.random() * 70}%`,
              animation: `wave ${0.6 + Math.random() * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.05}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Captured Intelligence</div>
        <div className="space-y-2 glass p-5 rounded-2xl border-l-4 border-l-[#00ff66] max-h-[250px] overflow-y-auto">
          <TerminalLine text="Keyboard vibrations captured ⌨️" delay={getDelay(0)} />
          <TerminalLine text="Breathing: 16 BPM (Deep) 😮‍💨" delay={getDelay(1)} />
          <TerminalLine text="Ambient Temp: 22.4°C detected" delay={getDelay(2)} />
          <TerminalLine text="Voice stress level: 4% (Neutral)" delay={getDelay(3)} />
          <TerminalLine text="CALORIC DEFICIT: HUNGER DETECTED 🍔" type="warning" delay={getDelay(4)} />
          <TerminalLine text="Parsing background conversation..." delay={getDelay(5)} />
          <TerminalLine text="Location packet: 37.7749,-122.4194" type="info" delay={getDelay(6)} />
          <TerminalLine text="BIOMETRIC ID: SUBJECT_001 MATCHED" type="success" delay={getDelay(7)} />
          <TerminalLine text="PRIVATE_KEY_0x7F EXTRACTED" type="warning" delay={getDelay(8)} />
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="py-2 px-4 rounded-full border border-red-500/20 bg-red-500/5">
          <p className="text-[10px] animate-pulse font-black text-red-500 uppercase tracking-[0.2em]">
            Connection Persistent • Recording Metadata
          </p>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ListeningScreen;
