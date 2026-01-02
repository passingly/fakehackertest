
import React, { useState, useRef, useEffect } from 'react';
import { LogEntry } from '../types';
import { getCyberAssistantResponse } from '../services/geminiService';

const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'info', message: 'OMNI-OS v2.0 Initialization sequence complete.', timestamp: '00:00:01' },
    { id: '2', type: 'info', message: 'Hyper-link established via node 4x9.', timestamp: '00:00:02' },
    { id: '3', type: 'warning', message: 'Detecting minor trace from external firewall...', timestamp: '00:00:05' },
    { id: '4', type: 'success', message: 'User authenticated. Welcome, Operator.', timestamp: '00:00:06' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [...prev, { id: Date.now().toString(), type, message, timestamp }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.trim();
    setInput('');
    addLog(`> ${cmd}`, 'info');

    // Local commands
    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    if (cmd === 'help') {
      addLog('AVAILABLE CMDS: help, clear, scan, hack [target], chat [msg]', 'success');
      return;
    }
    if (cmd.startsWith('scan')) {
      addLog('Scanning local network topology...', 'info');
      setTimeout(() => addLog('Nodes found: [12.0.2.1, 12.0.2.5, 12.0.2.9]', 'success'), 800);
      return;
    }

    // AI commands / Natural language
    setIsProcessing(true);
    const aiResponse = await getCyberAssistantResponse(cmd);
    addLog(`KAIROS: ${aiResponse}`, 'ai');
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/60 border border-green-500/30 rounded p-4 font-mono overflow-hidden backdrop-blur-sm relative">
      <div className="flex justify-between items-center border-b border-green-500/20 pb-2 mb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] text-green-500/50 uppercase tracking-widest font-bold">Encrypted Session: #XA-992</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 mb-4 text-sm"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 leading-relaxed">
            <span className="text-green-900 select-none">[{log.timestamp}]</span>
            <span className={
              log.type === 'error' ? 'text-red-500' :
              log.type === 'warning' ? 'text-yellow-500' :
              log.type === 'success' ? 'text-blue-400' :
              log.type === 'ai' ? 'text-green-300 font-bold' :
              'text-green-500'
            }>
              {log.message}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3 animate-pulse">
            <span className="text-green-900">[*]</span>
            <span className="text-green-400">KAIROS is processing...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className="relative flex items-center">
        <span className="mr-2 text-green-400 font-bold animate-pulse">$</span>
        <input 
          type="text"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 placeholder-green-900"
          placeholder="ENTER COMMAND OR ASK KAIROS..."
        />
        <div className="absolute right-0 w-2 h-5 bg-green-500 cursor-blink"></div>
      </form>
    </div>
  );
};

export default Terminal;
