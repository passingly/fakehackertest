
import React, { useState, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import SystemStats from './components/SystemStats';

const App: React.FC = () => {
  const [isAlarm, setIsAlarm] = useState(false);
  const [region, setRegion] = useState('SFO1');

  useEffect(() => {
    const regions = ['SFO1', 'ICN1', 'NRT1', 'CDG1', 'LHR1'];
    const interval = setInterval(() => {
      setRegion(regions[Math.floor(Math.random() * regions.length)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full p-6 flex flex-col gap-6 overflow-hidden transition-colors duration-500 ${isAlarm ? 'bg-red-950/20' : 'bg-black'}`}>
      <MatrixRain />
      <div className="scanline"></div>

      {/* Header */}
      <header className="flex justify-between items-center z-10 px-6 py-3 bg-black/60 border border-green-500/30 rounded backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <div className="flex items-center gap-6">
          <div className="text-green-400 font-bold tracking-[0.4em] text-2xl drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
            EDGE<span className="text-white">NODE</span>
          </div>
          <div className="hidden lg:flex gap-6 text-[10px] text-green-700 font-mono border-l border-green-500/20 pl-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]"></div> 
              STATUS: STABLE
            </span>
            <span>REGION: {region}</span>
            <span className="text-green-500">RUNTIME: VERCEL_EDGE</span>
          </div>
        </div>
        <div className="flex flex-col items-end font-mono">
          <span className="text-[10px] text-green-500/40">AUTH_LEVEL: ROOT_OPERATOR</span>
          <span className="text-[11px] text-green-400 font-bold">SESSION: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 overflow-hidden">
        {/* Left Side: Stats (4 units) */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          <SystemStats />
          
          <div className="flex-1 bg-black/60 border border-green-500/20 p-5 rounded text-[10px] space-y-4 font-mono overflow-y-auto backdrop-blur-sm terminal-glow">
            <h3 className="text-green-400 border-b border-green-500/20 pb-2 mb-2 font-bold flex justify-between">
              <span>SECURITY_MONITOR</span>
              <span className="animate-pulse">● LIVE</span>
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-blue-400">
                <span>> SSL_HANDSHAKE</span>
                <span>OK</span>
              </div>
              <div className="flex justify-between text-green-500/70">
                <span>> PACKET_FILTER</span>
                <span>ACTIVE</span>
              </div>
              <div className="flex justify-between text-yellow-500">
                <span>> PING_DELAY</span>
                <span>14ms</span>
              </div>
              <div className="flex justify-between text-red-500 font-bold">
                <span>> BREACH_ATTEMPT</span>
                <span>BLOCKED</span>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-green-500/10 text-green-900 text-[9px] uppercase">
              Vercel Infrastructure Monitoring v4.2
            </div>
          </div>
        </section>

        {/* Right Side: Terminal (8 units) */}
        <section className="lg:col-span-9 h-full">
          <Terminal />
        </section>
      </main>

      {/* Footer */}
      <footer className="z-10 flex justify-between items-center text-[10px] text-green-800 bg-black/40 px-6 py-2 rounded border border-green-500/10 font-mono">
        <div className="flex gap-4 items-center">
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <span>POWERED BY VERCEL EDGE & GEMINI AI</span>
        </div>
        <div className="flex gap-8">
          <span>UPTIME: 100.0%</span>
          <span className="text-green-600">ENCRYPTION: 4096-BIT RSA</span>
          <span className="hidden md:inline">SYSTEM_ARCH: WASM_EDGE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
