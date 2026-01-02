
import React, { useState, useEffect } from 'react';

const WorldMap: React.FC = () => {
  const [targets, setTargets] = useState<{ x: number; y: number; id: number; intensity: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTargets(prev => [
          ...prev.slice(-10),
          { 
            x: Math.random() * 100, 
            y: Math.random() * 100, 
            id: Date.now(),
            intensity: Math.random()
          }
        ]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black/40 border border-green-500/20 rounded overflow-hidden terminal-glow group">
      <div className="absolute top-2 left-2 text-[9px] text-green-500/50 font-bold uppercase z-10">Global_Target_Map</div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 pointer-events-none opacity-10">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-green-500"></div>
        ))}
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
        {/* Simplified Map Outline Mockup */}
        <path 
          d="M10,40 Q20,30 30,35 T50,30 T70,40 T90,35 V60 Q80,70 60,65 T40,75 T20,65 Z" 
          fill="none" 
          stroke="#22c55e" 
          strokeWidth="0.5" 
          className="animate-pulse"
        />
        {targets.map(t => (
          <g key={t.id}>
            <circle cx={t.x} cy={t.y} r="1" fill="#ff0000" className="animate-ping" />
            <circle cx={t.x} cy={t.y} r="0.5" fill="#ff0000" />
            {t.intensity > 0.8 && (
              <line x1={t.x} y1={t.y} x2={t.x + 5} y2={t.y - 5} stroke="#ff0000" strokeWidth="0.2" strokeDasharray="1,1" />
            )}
          </g>
        ))}
      </svg>
      
      <div className="absolute bottom-2 right-2 text-[8px] text-red-500/70 font-mono">
        ACTIVE_THREATS: {targets.length}
      </div>
    </div>
  );
};

export default WorldMap;
