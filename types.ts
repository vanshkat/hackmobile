
export enum PrankScreen {
  SCAN = 'SCAN',
  LISTENING = 'LISTENING',
  UPLOAD = 'UPLOAD',
  SHUTDOWN = 'SHUTDOWN',
  REVEAL = 'REVEAL'
}

export interface TerminalLine {
  text: string;
  type: 'info' | 'error' | 'success' | 'warning';
  delay?: number;
}
