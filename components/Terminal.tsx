
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { getCyberAssistantResponse } from '../services/geminiService';

const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootLogs = [
    "VERCEL_EDGE_RUNTIME: v1.24.0 INITIALIZING...",
    "CONNECTING TO GLOBAL EDGE NETWORK [SFO1, ICN1, NRT1]...",
    "HANDSHAKE PROTOCOL: SECURE-AES-GCM",
    "ENVIRONMENT: PRODUCTION",
    "AI_LINK: KAIROS SENTIENT ASSISTANT ONLINE.",
    "READY FOR OPERATOR INPUT."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        addLog(bootLogs[currentLogIndex], 'success');
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400);

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

    const cmd = input.trim().toLowerCase();
    setInput('');
    addLog(`$ ${cmd}`, 'info');

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    if (cmd === 'help') {
      addLog('CORE_SYSTEM_COMMANDS: help, clear, status, network, logs, chat [msg]', 'success');
      return;
    }
    if (cmd === 'status') {
      addLog('SYSTEM_HEALTH: NOMINAL', 'success');
      addLog('CPU: 12% | MEM: 1.2GB/16GB | EDGE: SFO1', 'info');
      return;
    }
    if (cmd === 'network') {
      addLog('Tracing edge hop route...', 'info');
      setTimeout(() => addLog('LOCAL -> VERCEL_EDGE [10.2.1.1] -> TARGET', 'success'), 1000);
      return;
    }

    setIsProcessing(true);
    const aiResponse = await getCyberAssistantResponse(cmd);
    addLog(`KAIROS: ${aiResponse}`, 'ai');
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-green-500/30 rounded p-4 font-mono overflow-hidden backdrop-blur-md relative terminal-glow">
      <div className="flex justify-between items-center border-b border-green-500/20 pb-2 mb-4">
        <div className="flex gap-2 text-[10px]">
          <span className="text-red-500">● ERR: 0</span>
          <span className="text-yellow-500">● WARN: 0</span>
          <span className="text-green-500">● LIVE: SFO1</span>
        </div>
        <span className="text-[10px] text-green-500/50 uppercase font-bold">VERCEL EDGE TERMINAL</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 mb-4 text-[13px] leading-tight scrollbar-hide"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <span className="text-green-900 shrink-0">[{log.timestamp}]</span>
            <span className={
              log.type === 'error' ? 'text-red-500' :
              log.type === 'warning' ? 'text-yellow-500' :
              log.type === 'success' ? 'text-green-400 font-bold' :
              log.type === 'ai' ? 'text-cyan-400 italic' :
              'text-green-500'
            }>
              {log.message}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3 animate-pulse text-cyan-400">
            <span className="text-green-900">[*]</span>
            <span>KAIROS ANALYZING PACKETS...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className="relative flex items-center border-t border-green-500/10 pt-4">
        <span className="mr-2 text-green-400 font-bold">$</span>
        <input 
          type="text"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 placeholder-green-900"
          placeholder="ENTER SYSTEM COMMAND..."
        />
        <div className="w-2 h-5 bg-green-500/80 cursor-blink ml-1 shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
      </form>
    </div>
  );
};

export default Terminal;
