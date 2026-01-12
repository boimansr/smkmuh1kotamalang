
import React, { useState, useEffect } from 'react';
import { Clock, Calendar as CalendarIcon, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

export const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl no-invert">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-100 text-sm font-medium flex items-center gap-2 mb-1">
            <Clock size={16} />
            Current Time
          </p>
          <h2 className="text-4xl font-bold tracking-tight">{formatTime(time)}</h2>
        </div>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
          <CalendarIcon size={24} />
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg font-medium">{formatDate(time)}</p>
        <p className="text-blue-100/80 text-sm flex items-center gap-1 mt-1">
          <MapPin size={14} />
          Western Indonesia Time (GMT+7)
        </p>
      </div>
    </div>
  );
};

export const StatsCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode, color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow theme-card">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} no-invert`}>
        {icon}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium theme-text-muted">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1 theme-text">{value}</p>
  </div>
);

export const InfoCard: React.FC<{ title: string, subtitle: string, icon: React.ReactNode, children?: React.ReactNode }> = ({ title, subtitle, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden theme-card">
    <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3 theme-card-header">
      <div className="text-blue-600 no-invert">{icon}</div>
      <div>
        <h3 className="font-semibold text-slate-800 leading-none theme-text">{title}</h3>
        <p className="text-xs text-slate-400 mt-1 theme-text-muted">{subtitle}</p>
      </div>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);
