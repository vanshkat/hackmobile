
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createOscillator(freq: number, type: OscillatorType = 'sine', duration: number = 0.5, volume: number = 0.1, fadeOut: boolean = true) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    if (fadeOut) {
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
    return { osc, gain };
  }

  playScan() {
    // Technical rhythmic beeps
    const sequence = [880, 1760, 1320, 880];
    sequence.forEach((freq, i) => {
      setTimeout(() => this.createOscillator(freq, 'square', 0.05, 0.02), i * 100);
    });
  }

  playListening() {
    // Submarine/Sonar style pulse
    const interval = setInterval(() => {
      this.createOscillator(1200, 'sine', 1.0, 0.015);
      setTimeout(() => this.createOscillator(1500, 'sine', 0.05, 0.01), 100);
    }, 2000);
    
    // Stop after 15 seconds (typical listening duration)
    setTimeout(() => clearInterval(interval), 15000);
  }

  playUpload() {
    // High-speed data transfer "chirping"
    const playChirp = () => {
      const freq = Math.random() * 2000 + 1000;
      this.createOscillator(freq, 'sawtooth', 0.03, 0.01);
    };

    const interval = setInterval(playChirp, 80);
    // Increased duration to match the 30s upload
    setTimeout(() => clearInterval(interval), 29000);
  }

  playShutdown() {
    this.init();
    if (!this.ctx) return;
    
    // Power down sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 2);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 2);
  }

  playReveal() {
    // Dramatic Hacker "Victory" Sound
    // 1. Digital "Unlock" chime
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.createOscillator(freq, 'sine', 1.2, 0.04), i * 80);
    });

    // 2. Low ominous sub drop
    setTimeout(() => {
      this.init();
      if (!this.ctx) return;
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.frequency.setValueAtTime(80, this.ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 2);
      subGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2.5);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start();
      sub.stop(this.ctx.currentTime + 2.5);
    }, 400);

    // 3. Final digital "blip"
    setTimeout(() => {
      this.createOscillator(2200, 'square', 0.1, 0.02);
    }, 2000);
  }

  playType() {
    // Very subtle typing tick
    this.createOscillator(Math.random() * 100 + 400, 'sine', 0.01, 0.005, true);
  }
}

export const audio = new SoundEngine();
