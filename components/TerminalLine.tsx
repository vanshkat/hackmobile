
import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';

interface TerminalLineProps {
  text: string;
  type?: 'info' | 'error' | 'success' | 'warning';
  delay?: number;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ text, type = 'info', delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      if (currentIdx < text.length) {
        setDisplayedText(text.slice(0, currentIdx + 1));
        // Add subtle typing sound
        if (currentIdx % 2 === 0) { // Play every 2nd char to avoid sounding too busy
          audio.playType();
        }
        currentIdx++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25); 

    return () => clearInterval(typingInterval);
  }, [started, text]);

  if (!started && delay > 0) return <div className="mb-1 min-h-[1.5em]" />;

  const colorClass = {
    info: 'text-[#00ff66]',
    error: 'text-[#ff003c]',
    success: 'text-cyan-400',
    warning: 'text-yellow-400'
  }[type];

  const isTyping = started && displayedText.length < text.length;

  return (
    <div className={`mb-1 font-mono text-sm sm:text-base ${colorClass} flex items-start min-h-[1.5em]`}>
      <span className="mr-2 opacity-40 shrink-0 select-none">$</span>
      <span className="break-all">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-4 bg-current ml-1 animate-[pulse_0.5s_infinite] align-middle"></span>
        )}
      </span>
    </div>
  );
};

export default TerminalLine;
