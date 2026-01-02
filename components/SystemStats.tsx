
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { NetworkData } from '../types';

const SystemStats: React.FC = () => {
  const [data, setData] = useState<NetworkData[]>([]);
  const [cpu, setCpu] = useState(45);
  const [mem, setMem] = useState(62);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      setData(prev => {
        const newData = [...prev, { time: timeStr, value: Math.floor(Math.random() * 100) }];
        return newData.slice(-20);
      });

      setCpu(Math.floor(Math.random() * 100));
      setMem(prev => {
        const variation = Math.random() * 4 - 2;
        return Math.min(100, Math.max(0, prev + variation));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 border border-green-500/30 p-4 rounded backdrop-blur-sm flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-green-400">Node Status</h2>
        <span className="text-[10px] bg-green-900/40 px-2 py-0.5 rounded text-green-300 animate-pulse">STABLE</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-green-600 mb-1">CPU LOAD</p>
          <div className="h-2 bg-green-900/20 rounded-full overflow-hidden border border-green-500/20">
            <div 
              className="h-full bg-green-500 transition-all duration-500" 
              style={{ width: `${cpu}%` }}
            />
          </div>
          <p className="text-[10px] text-right mt-1">{cpu}%</p>
        </div>
        <div>
          <p className="text-[10px] text-green-600 mb-1">MEM USAGE</p>
          <div className="h-2 bg-green-900/20 rounded-full overflow-hidden border border-green-500/20">
            <div 
              className="h-full bg-green-400 transition-all duration-500" 
              style={{ width: `${mem}%` }}
            />
          </div>
          <p className="text-[10px] text-right mt-1">{mem.toFixed(1)}%</p>
        </div>
      </div>

      <div className="flex-1 min-h-[150px]">
        <p className="text-[10px] text-green-600 mb-2">NETWORK TRAFFIC (Gbit/s)</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ background: '#000', border: '1px solid #22c55e', fontSize: '10px' }} 
              labelStyle={{ display: 'none' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.1} 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto space-y-1 text-[9px] text-green-700">
        <div className="flex justify-between"><span>UUID:</span><span>8f2-ae92-012</span></div>
        <div className="flex justify-between"><span>IP:</span><span>192.168.0.101</span></div>
        <div className="flex justify-between"><span>UPTIME:</span><span>42:12:05</span></div>
      </div>
    </div>
  );
};

export default SystemStats;
