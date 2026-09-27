import React, { useState, useEffect } from 'react';
import {
  Activity,
  Search,
  Sliders,
  Sparkles,
  Shield,
  Bell,
  PlayCircle,
  HelpCircle,
  Radio
} from 'lucide-react';
import { TransparencyBadge } from './TransparencyBadge';

interface HeaderProps {
  onSearchPlate: (plate: string) => void;
  onOpenDemoTour: () => void;
  activeAlertsCount: number;
  currentNav: string;
  onNavigate: (navId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchPlate,
  onOpenDemoTour,
  activeAlertsCount,
  currentNav,
  onNavigate,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchPlate(searchInput.trim().toUpperCase());
      onNavigate('tracking');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080C14]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-cyan-900/40 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent font-mono">
                CityTrack AI
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded">
                v2.6-HACKATHON
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              AI Multi-Camera ANPR Trajectory & Traffic Intelligence
            </p>
          </div>
        </div>

        {/* Global Quick Vehicle Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Search vehicle plate (e.g. TN45AB1234, KA01MJ9081)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-24 py-1.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-0.5 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 rounded text-[11px] font-mono transition-all"
            >
              TRACK
            </button>
          </div>
        </form>

        {/* Action Controls & Presentation Demo Stepper Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Tour Button */}
          <button
            onClick={onOpenDemoTour}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all font-mono"
            title="Start 12-Step Presentation Walkthrough"
          >
            <PlayCircle className="w-4 h-4 fill-white/20 animate-spin-slow" />
            <span className="hidden sm:inline">DEMO PRESENTATION TOUR</span>
            <span className="sm:hidden">TOUR</span>
          </button>

          {/* Quick Target Quick-Select TN45AB1234 */}
          <button
            onClick={() => {
              setSearchInput('TN45AB1234');
              onSearchPlate('TN45AB1234');
              onNavigate('tracking');
            }}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 rounded-lg text-[11px] font-mono transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target: TN45AB1234</span>
          </button>

          {/* Alert Center Trigger */}
          <button
            onClick={() => onNavigate('alerts')}
            className={`relative p-2 rounded-lg border transition-all ${
              activeAlertsCount > 0
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-400 hover:bg-rose-900/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Active Intelligence Alerts"
          >
            <Bell className="w-4 h-4" />
            {activeAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-lg animate-pulse">
                {activeAlertsCount}
              </span>
            )}
          </button>

          {/* Real-time Clock Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-300 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{currentTime || '10:42:30'} UTC+5:30</span>
          </div>

          <div className="hidden 2xl:block">
            <TransparencyBadge type="DEMO_DATA" size="sm" />
          </div>
        </div>
      </div>
    </header>
  );
};
