
import React, { useEffect } from 'react';
import { audio } from '../utils/audio';

interface RevealScreenProps {
  onRestart: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ onRestart }) => {
  useEffect(() => {
    audio.playReveal();
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'System Security Alert',
          text: 'Check this system diagnostic tool! 😱',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Prank link copied to clipboard! Send it to your next victim 😈');
      }
    } catch (err) {
      console.error('Sharing failed', err);
    }
  };

  return (
    <div className="animate-in fade-in duration-1000 h-screen flex flex-col items-center justify-start pt-12 text-red-600 font-mono relative overflow-hidden">
      {/* Fake FBI/System Seizure Header */}
      <div className="border-4 border-red-600 p-4 mb-8 text-center bg-red-600/10 w-full jitter">
        <h1 className="text-3xl font-black uppercase tracking-tighter glitch">
          ACCESS DENIED
        </h1>
        <p className="text-xs mt-1 font-bold">DEVICE SEIZED BY REMOTE PROTOCOL</p>
      </div>

      <div className="w-full space-y-4 px-4 text-sm">
        <div className="space-y-1">
          <p className="opacity-50 font-bold">[INTERNAL LOG 88.2]</p>
          <p className="glitch opacity-80">> GEOLOCATION: BROADCASTING...</p>
          <p>> FACIAL BIOMETRICS: CAPTURED</p>
          <p className="glitch opacity-80">> LOCAL AUTHORITIES: NOTIFIED</p>
          <p>> UNIT DISPATCH: IN PROGRESS (EST. 4 MINS)</p>
        </div>

        <div className="border border-red-600/30 p-4 bg-red-900/5 relative">
          <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none"></div>
          <p className="text-red-400 relative z-10 leading-tight">
            This device has been flagged for illegal data interception. All local files have been encrypted. Do not attempt to power off or restart the device. Attempting to tamper will accelerate data erasure.
          </p>
        </div>
      </div>

      <div className="mt-auto mb-12 text-center w-full px-6 flex flex-col space-y-6">
        
        {/* New "Send" / Share Option */}
        <button 
          onClick={handleShare}
          className="bg-white text-black font-black py-4 px-8 rounded-2xl uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 transition-transform"
        >
          Propagate Virus (Send to Friends) 😈
        </button>

        <p className="text-[10px] text-red-900 uppercase tracking-widest animate-pulse font-black glitch">
          Connection Status: PERSISTENT_TRACE_ACTIVE
        </p>
        
        {/* The "Safety Reveal" integrated as a technical flag */}
        <div className="p-3 bg-white/5 border border-white/10 rounded-xl relative group">
          <div className="absolute inset-0 bg-[#00ff66]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          <p className="text-[#00ff66] text-[10px] uppercase font-bold tracking-widest">
            [SYS_REPORT: THIS_IS_A_PRANK_NO_DATA_WAS_TAKEN]
          </p>
          <p className="text-white/20 text-[8px] mt-1 italic uppercase tracking-tighter">
            (Authorized personal only: Tap here to reset kernel)
          </p>
          <button 
            onClick={onRestart}
            className="absolute inset-0 w-full h-full opacity-0 cursor-default"
            aria-label="Secret Restart"
          />
        </div>
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(255,0,0,0.08)_50%,transparent_50%)] bg-[length:100%_2px] opacity-30"></div>
    </div>
  );
};

export default RevealScreen;
