
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { getLocalResponse } from '../services/localResponseService';
import { audioService } from '../services/audioService';

const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootLogs = [
    "OMNI_KERNEL_V4_LOADED...",
    "LOCAL_ENCRYPTION_ENGINE: ONLINE",
    "GHOST_SHELL_EMULATOR: ACTIVE",
    "SECURE_SHELL: CONNECTED_LOCAL",
    "OPERATOR_IDENTIFIED: ROOT",
    "--- SYSTEM READY ---"
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        addLog(bootLogs[currentLogIndex], 'success');
        audioService.playClick();
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev, { id: Math.random().toString(36), type, message, timestamp }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    audioService.playClick();
    const cmd = input.trim().toLowerCase();
    setInput('');
    addLog(`$ ${cmd}`, 'info');

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    if (cmd === 'hack') {
      audioService.playAlert();
      addLog('INITIATING_LOCAL_BRUTE_FORCE...', 'warning');
      setTimeout(() => addLog('BYPASSING_VIRTUAL_FIREWALL: 42%', 'info'), 400);
      setTimeout(() => addLog('ACCESS_GRANTED_BY_SHELL_INJECTION.', 'success'), 1200);
      return;
    }

    setIsProcessing(true);
    // 지연 시간 없이 로컬 응답 즉시 생성 (약간의 인공지능 느낌을 위해 아주 짧은 딜레이만 줌)
    setTimeout(() => {
      const response = getLocalResponse(cmd);
      addLog(`KAIROS_LOCAL: ${response}`, 'ai');
      audioService.playClick();
      setIsProcessing(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    audioService.playClick();
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-green-500/30 rounded p-6 font-mono overflow-hidden backdrop-blur-md relative terminal-glow">
      <div className="flex justify-between items-center border-b border-green-500/20 pb-3 mb-4">
        <div className="flex gap-4 text-[10px] tracking-tighter">
          <span className="text-green-500 animate-pulse font-bold">MODE: LOCAL_GHOST_SHELL</span>
          <span className="text-green-500/50">SEC: AES_LOCAL_OFFLINE</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1.5 mb-6 text-[13px] leading-relaxed scrollbar-hide"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4">
            <span className="text-green-900/40 shrink-0 select-none">[{log.timestamp}]</span>
            <span className={
              log.type === 'error' ? 'text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
              log.type === 'warning' ? 'text-yellow-500' :
              log.type === 'success' ? 'text-green-400 font-bold drop-shadow-[0_0_3px_rgba(34,197,94,0.8)]' :
              log.type === 'ai' ? 'text-cyan-400 italic' :
              'text-green-500/90'
            }>
              {log.message}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-4 animate-pulse text-cyan-400">
            <span className="text-green-900/40">[*]</span>
            <span className="tracking-widest">LOCAL_PROCESSING...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className="relative flex items-center border-t border-green-500/10 pt-5">
        <span className="mr-3 text-green-400 font-bold select-none">$</span>
        <input 
          type="text"
          autoFocus
          value={input}
          onChange={handleInputChange}
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 placeholder-green-900/50 uppercase"
          placeholder="ENTER CMD_CODE..."
        />
        <div className="w-2.5 h-5 bg-green-500/80 cursor-blink ml-1 shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
      </form>
    </div>
  );
};

export default Terminal;
