
import React, { useState, useEffect } from 'react';
import { PrankScreen } from './types';
import ScanScreen from './components/ScanScreen';
import ListeningScreen from './components/ListeningScreen';
import UploadScreen from './components/UploadScreen';
import ShutdownScreen from './components/ShutdownScreen';
import RevealScreen from './components/RevealScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<PrankScreen>(PrankScreen.SCAN);
  const [isPrankActive, setIsPrankActive] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showExitWarning, setShowExitWarning] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0'));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // "Unstoppable" System Implementation
  useEffect(() => {
    if (!isPrankActive) return;

    // 1. Prevent closing or refreshing the tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'System is locked. Do not close.';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Detect if user tries to switch tabs (Anti-Escape)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowExitWarning(true);
        // If they try to leave, play an alarm sound (simulated by repeat trigger)
        console.log("UNAUTHORIZED EXIT ATTEMPT");
      } else {
        // When they come back, force focus
        window.focus();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3. Disable DevTools and Save Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's')
      ) {
        e.preventDefault();
        setShowExitWarning(true);
        setTimeout(() => setShowExitWarning(false), 2000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPrankActive]);

  useEffect(() => {
    let timer: any;

    if (!isPrankActive) return;

    if (currentScreen === PrankScreen.SCAN) {
      timer = setTimeout(() => {
        setCurrentScreen(PrankScreen.LISTENING);
      }, 12000);
    } else if (currentScreen === PrankScreen.LISTENING) {
      timer = setTimeout(() => {
        setCurrentScreen(PrankScreen.UPLOAD);
      }, 18000);
    }

    return () => clearTimeout(timer);
  }, [currentScreen, isPrankActive]);

  const handleStartPrank = () => {
    // Request Fullscreen for total takeover
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {
        console.log("Fullscreen request failed - requires user interaction first");
      });
    }
    
    setIsPrankActive(true);
    document.body.classList.add('no-cursor');
  };

  const handleFinishUpload = () => {
    setCurrentScreen(PrankScreen.SHUTDOWN);
  };

  const handleFinishShutdown = () => {
    setCurrentScreen(PrankScreen.REVEAL);
    document.body.classList.remove('no-cursor');
  };

  const handleRestart = () => {
    setIsPrankActive(false);
    setCurrentScreen(PrankScreen.SCAN);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`min-h-screen w-full bg-[#050505] text-white flex flex-col relative overflow-hidden select-none ${isPrankActive && currentScreen !== PrankScreen.REVEAL ? 'cursor-none' : ''}`}>
      
      {/* Exit Warning Overlay */}
      {showExitWarning && (
        <div className="fixed inset-0 z-[1000] bg-red-600/90 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-75">
          <div className="w-24 h-24 border-8 border-white rounded-full flex items-center justify-center mb-6 animate-pulse">
            <span className="text-6xl font-black italic">!</span>
          </div>
          <h1 className="text-4xl font-black uppercase mb-2 glitch">Unauthorized Intervention</h1>
          <p className="text-xl font-bold uppercase tracking-widest opacity-80">Exit protocols disabled by remote server</p>
          <div className="mt-8 p-4 bg-black text-white font-mono text-xs uppercase opacity-60">
            Persistent tracing active. Attempting to terminate process will result in local disk wipe.
          </div>
          <button 
            onClick={() => setShowExitWarning(false)}
            className="mt-10 px-8 py-4 bg-white text-black font-black uppercase rounded-full"
          >
            Acknowledge & Resume
          </button>
        </div>
      )}

      {/* Fake Mobile Status Bar */}
      {currentScreen !== PrankScreen.SHUTDOWN && (
        <div className="w-full flex justify-between items-center px-6 py-3 z-[100] opacity-40">
          <div className="text-[10px] font-black">{currentTime}</div>
          <div className="flex space-x-1.5 items-center">
            <div className="w-4 h-2 border border-white rounded-sm relative after:content-[''] after:absolute after:top-0.5 after:-right-1 after:w-0.5 after:h-1 after:bg-white">
              <div className="h-full bg-white w-2/3"></div>
            </div>
            <div className="text-[10px] font-black">5G</div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white/5 to-transparent opacity-30"></div>
        <div className="scanline"></div>
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className={`w-full ${currentScreen === PrankScreen.REVEAL ? '' : 'max-w-md'}`}>
          {currentScreen === PrankScreen.SCAN && <ScanScreen onStart={handleStartPrank} />}
          {currentScreen === PrankScreen.LISTENING && <ListeningScreen />}
          {currentScreen === PrankScreen.UPLOAD && (
            <UploadScreen onComplete={handleFinishUpload} />
          )}
          {currentScreen === PrankScreen.SHUTDOWN && (
            <ShutdownScreen onComplete={handleFinishShutdown} />
          )}
          {currentScreen === PrankScreen.REVEAL && <RevealScreen onRestart={handleRestart} />}
        </div>
      </main>

      {/* Floating UI Decorative Corners */}
      {currentScreen !== PrankScreen.SHUTDOWN && currentScreen !== PrankScreen.REVEAL && (
        <>
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/5 m-4"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/5 m-4"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/5 m-4"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/5 m-4"></div>
        </>
      )}
    </div>
  );
};

export default App;
