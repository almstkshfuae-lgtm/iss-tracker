import React from 'react';
import { ISSData } from '../services/issService';
import { Activity, Globe, Navigation, Zap } from 'lucide-react';

interface DashboardProps {
  data: ISSData | null;
  error: string | null;
}

export const Dashboard = ({ data, error }: DashboardProps) => {
  if (error) {
    return (
      <div className="absolute bottom-8 left-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg backdrop-blur-md text-red-200 font-mono text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span>SIGNAL LOST: {error}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="absolute bottom-8 left-8 p-4 bg-black/40 border border-white/10 rounded-lg backdrop-blur-md text-white/50 font-mono text-sm animate-pulse">
        ACQUIRING SIGNAL...
      </div>
    );
  }

  return (
    <div className="absolute bottom-8 left-8 flex flex-col gap-4 w-80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h1 className="text-xl font-bold tracking-tighter text-white">ORBITAL TRACKER</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-xs font-mono text-green-500">LIVE</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2">
        <MetricCard 
          label="LATITUDE" 
          value={data.latitude.toFixed(4)} 
          unit="°" 
          icon={<Globe className="w-3 h-3" />}
        />
        <MetricCard 
          label="LONGITUDE" 
          value={data.longitude.toFixed(4)} 
          unit="°" 
          icon={<Globe className="w-3 h-3" />}
        />
        <MetricCard 
          label="ALTITUDE" 
          value={data.altitude.toFixed(2)} 
          unit="km" 
          icon={<Navigation className="w-3 h-3" />}
        />
        <MetricCard 
          label="VELOCITY" 
          value={data.velocity.toFixed(0)} 
          unit="km/h" 
          icon={<Activity className="w-3 h-3" />}
        />
      </div>

      {/* Footer / Status */}
      <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-2">
        ID: {data.id} // VISIBILITY: {data.visibility}
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, unit, icon }: { label: string, value: string, unit: string, icon: React.ReactNode }) => (
  <div className="bg-black/40 border border-white/10 p-3 rounded hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-2 text-white/40 mb-1">
      {icon}
      <span className="text-[10px] font-bold tracking-wider">{label}</span>
    </div>
    <div className="font-mono text-lg text-white group-hover:text-blue-400 transition-colors">
      {value} <span className="text-xs text-white/30 ml-1">{unit}</span>
    </div>
  </div>
);
