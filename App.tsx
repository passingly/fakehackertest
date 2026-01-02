
import React, { useState, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import SystemStats from './components/SystemStats';

const App: React.FC = () => {
  const [isAlarm, setIsAlarm] = useState(false);

  // Random alarm effect for "immersion"
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsAlarm(true);
        setTimeout(() => setIsAlarm(false), 2000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full p-4 flex flex-col gap-4 overflow-hidden transition-colors duration-300 ${isAlarm ? 'bg-red-900/10' : 'bg-black'}`}>
      <MatrixRain />
      
      {/* Scanline overlay */}
      <div className="scanline"></div>

      {/* Header */}
      <header className="flex justify-between items-center z-10 px-4 py-2 bg-black/40 border-b border-green-500/20 rounded shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <div className="flex items-center gap-4">
          <div className="text-green-500 font-bold tracking-[0.3em] text-xl">
            OMNI<span className="text-green-300">HACKER</span>
          </div>
          <div className="hidden md:flex gap-4 ml-8 text-[10px] text-green-700 font-mono">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div> LINK: ACTIVE</span>
            <span>SAT: X-902-B</span>
            <span>SEC: LVL-9</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-green-500/50 uppercase">User: Anonymous_Operator</div>
          <div className="text-[10px] text-green-500">Node: {Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 z-10 overflow-hidden">
        {/* Sidebar: Stats */}
        <section className="lg:col-span-1 flex flex-col gap-4">
          <SystemStats />
          
          <div className="flex-1 bg-black/80 border border-green-500/30 p-4 rounded text-[10px] space-y-3 font-mono overflow-y-auto">
            <h3 className="text-green-400 border-b border-green-500/20 pb-1 mb-2">SECURITY_ALERTS</h3>
            <div className="text-red-500/80 animate-pulse">! ATTEMPTED BYPASS: 12.0.2.1</div>
            <div className="text-yellow-500/80">! BRUTE_FORCE: BLOCKED [NODE_9]</div>
            <div className="text-green-500/80">√ ENCRYPTION_ROTATED [SHA-256]</div>
            <div className="text-blue-500/80">i NEW_VPN_TUNNEL: BUCHAREST_NODE</div>
            <div className="text-red-500/80 font-bold">! CRITICAL: DATA_STREAM_DETECTED</div>
          </div>
        </section>

        {/* Center: Terminal */}
        <section className="lg:col-span-3 h-full">
          <Terminal />
        </section>
      </main>

      {/* Alarm Overlay */}
      {isAlarm && (
        <div className="fixed inset-0 pointer-events-none z-50 border-[10px] border-red-500/20 animate-pulse flex items-center justify-center">
          <div className="bg-red-500/20 px-10 py-4 text-red-500 font-bold text-4xl border border-red-500 backdrop-blur-xl">
            SYSTEM BREACH DETECTED
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="z-10 flex justify-between items-center text-[9px] text-green-700 bg-black/40 p-2 rounded border border-green-500/10">
        <div>&copy; 2025 UNDERGROUND_REVOLUTION.SH</div>
        <div className="flex gap-4">
          <span className="animate-pulse">LATENCY: 12ms</span>
          <span>PACKETS: 14223/s</span>
          <span className="text-green-500">ENCRYPTION: AES-4096-CTR</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
