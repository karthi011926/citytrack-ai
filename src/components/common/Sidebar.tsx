import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  ScanLine,
  Cctv,
  BarChart3,
  GitFork,
  Sliders,
  AlertOctagon,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badge?: string;
  isInnovation?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    sublabel: 'City Command Matrix',
    icon: LayoutDashboard,
  },
  {
    id: 'tracking',
    label: 'Vehicle Tracking',
    sublabel: 'Multi-Camera Trajectories',
    icon: Navigation,
    badge: 'CORE'
  },
  {
    id: 'predictions',
    label: 'Predictive Intelligence',
    sublabel: 'Next Route & Congestion',
    icon: GitFork,
    badge: 'AI INNV-1',
    isInnovation: true
  },
  {
    id: 'alerts',
    label: 'Alert Center',
    sublabel: 'Explainable Anomalies',
    icon: AlertOctagon,
    badge: 'AI INNV-2',
    isInnovation: true
  },
  {
    id: 'simulation',
    label: 'What-If Simulation',
    sublabel: 'Corridor Surge Sandbox',
    icon: Sliders,
    badge: 'INNV-4',
    isInnovation: true
  },
  {
    id: 'anpr',
    label: 'ANPR Scanner',
    sublabel: 'OCR Plate Detection',
    icon: ScanLine,
  },
  {
    id: 'cameras',
    label: 'Camera Network',
    sublabel: '20 Active CCTV Nodes',
    icon: Cctv,
    badge: '20 ON'
  },
  {
    id: 'analytics',
    label: 'Traffic Analytics',
    sublabel: 'OD Matrix & Heatmaps',
    icon: BarChart3,
  }
];

interface SidebarProps {
  currentNav: string;
  onNavigate: (navId: string) => void;
  activeAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  activeAlertCount,
}) => {
  return (
    <aside className="w-64 bg-[#0B101D] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none">
      {/* Navigation Links */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
          Navigation Architecture
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-slate-900 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r shadow-[0_0_8px_#06b6d4]"></span>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-slate-800/60 text-slate-400 group-hover:text-cyan-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                {item.id === 'alerts' && activeAlertCount > 0 ? (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                    {activeAlertCount}
                  </span>
                ) : item.badge ? (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      item.isInnovation
                        ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer System Status Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300 font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Engine</span>
            </div>
            <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono">
              READY (v2.6)
            </span>
          </div>

          <div className="space-y-1 text-[10px] text-slate-400 font-mono">
            <div className="flex justify-between">
              <span>ANPR Processing:</span>
              <span className="text-cyan-400">14.2 ms / frame</span>
            </div>
            <div className="flex justify-between">
              <span>Cross-Cam Match:</span>
              <span className="text-emerald-400">Active (20 nodes)</span>
            </div>
            <div className="flex justify-between">
              <span>Markov Predictor:</span>
              <span className="text-purple-400">Continuous</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
