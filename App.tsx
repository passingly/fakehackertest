
import React, { useState, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import SystemStats from './components/SystemStats';
import WorldMap from './components/WorldMap';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [isAlarm, setIsAlarm] = useState(false);
  const [region, setRegion] = useState('LOCAL_NODE');

  useEffect(() => {
    const regions = ['LOCAL_HUB', 'GHOST_NET', 'VOID_0', 'SHADOW_LINK'];
    const interval = setInterval(() => {
      setRegion(regions[Math.floor(Math.random() * regions.length)]);
      if (Math.random() > 0.95) {
        setIsAlarm(true);
        audioService.playAlert();
        setTimeout(() => setIsAlarm(false), 2000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`relative w-full h-full p-6 flex flex-col gap-6 overflow-hidden transition-all duration-1000 ${isAlarm ? 'bg-red-950/30' : 'bg-[#000800]'}`}
      onClick={() => audioService.playClick()}
    >
      <MatrixRain />
      <div className="scanline"></div>

      <header className="flex justify-between items-center z-10 px-8 py-4 bg-black/80 border border-green-500/20 rounded backdrop-blur-2xl shadow-[0_0_50px_rgba(0,255,65,0.05)]">
        <div className="flex items-center gap-8">
          <div className="text-green-500 font-bold tracking-[0.5em] text-3xl drop-shadow-[0_0_15px_rgba(34,197,94,1)] glitch-hover cursor-default">
            OMNI<span className="text-white">SHELL</span>
          </div>
          <div className="hidden xl:flex gap-8 text-[11px] text-green-700 font-mono border-l border-green-500/30 pl-8">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping shadow-[0_0_10px_rgba(34,197,94,1)]"></div> 
              CORE_STATUS: STABLE
            </span>
            <span className="hover:text-green-400 transition-colors cursor-help">NODE: {region}</span>
            <span className="text-green-500/70">ARCH: STANDALONE_EDGE_V4</span>
          </div>
        </div>
        <div className="flex flex-col items-end font-mono">
          <span className="text-[10px] text-green-500/30">SEC_PROTO: GHOST_SHELL</span>
          <span className="text-xs text-green-400 font-bold tracking-widest">OP_ID: ROOT_#8892</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 overflow-hidden">
        <section className="lg:col-span-3 flex flex-col gap-6">
          <WorldMap />
          <SystemStats />
          
          <div className="flex-1 bg-black/80 border border-green-500/10 p-5 rounded text-[10px] space-y-4 font-mono overflow-hidden backdrop-blur-md terminal-glow relative group">
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <h3 className="text-green-400 border-b border-green-500/10 pb-2 mb-2 font-bold flex justify-between items-center">
              <span>OFFLINE_MONITOR</span>
              <span className="text-[8px] px-1.5 py-0.5 border border-green-500/50 rounded animate-pulse">STANDALONE</span>
            </h3>
            <div className="space-y-3 opacity-80">
              <div className="flex justify-between border-l-2 border-blue-500 pl-2">
                <span>> LOCAL_STORAGE</span>
                <span>OK</span>
              </div>
              <div className="flex justify-between border-l-2 border-green-500 pl-2">
                <span>> CACHE_READ</span>
                <span>FAST</span>
              </div>
              <div className="flex justify-between border-l-2 border-yellow-500 pl-2 text-yellow-500">
                <span>> INTERNAL_PING</span>
                <span>0.1ms</span>
              </div>
              <div className="flex justify-between border-l-2 border-red-500 pl-2 text-red-500">
                <span>> EXTERNAL_API</span>
                <span>DISCONNECTED</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-9 h-full">
          <Terminal />
        </section>
      </main>

      <footer className="z-10 flex justify-between items-center text-[10px] text-green-900 bg-black/60 px-8 py-3 rounded border border-green-500/5 font-mono">
        <div className="flex gap-6 items-center">
          <div className="w-3 h-3 bg-white rotate-45 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          <span className="tracking-[0.2em] font-bold">LOCAL_GHOST_NODE_PROTECTED</span>
        </div>
        <div className="flex gap-12">
          <span className="hidden sm:inline">NETWORK: AIRGAPPED</span>
          <span className="text-green-600">ENGINE: LOCAL_GHOST_V2</span>
          <span className="font-bold text-green-400">0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
