
export interface LogEntry {
  id: string;
  type: 'info' | 'error' | 'success' | 'warning' | 'ai';
  message: string;
  timestamp: string;
}

export interface NetworkData {
  time: string;
  value: number;
}
