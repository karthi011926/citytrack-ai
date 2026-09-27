import React from 'react';
import { Sparkles, Cpu, AlertTriangle, ShieldCheck, Database, Eye, Navigation } from 'lucide-react';

export type TransparencyType =
  | 'DEMO_DATA'
  | 'AI_PREDICTION'
  | 'SIMULATION'
  | 'SIMULATED_FEED'
  | 'EXPLAINABLE_AI'
  | 'OBSERVED'
  | 'PREDICTED';

interface TransparencyBadgeProps {
  type: TransparencyType;
  size?: 'sm' | 'md';
  customLabel?: string;
}

export const TransparencyBadge: React.FC<TransparencyBadgeProps> = ({
  type,
  size = 'md',
  customLabel,
}) => {
  const configs = {
    DEMO_DATA: {
      label: 'SIMULATED DEMO DATASET',
      icon: Database,
      bg: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
      glow: ''
    },
    AI_PREDICTION: {
      label: 'DEMO AI PREDICTION',
      icon: Sparkles,
      bg: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40',
      glow: 'shadow-[0_0_12px_rgba(6,182,212,0.25)]'
    },
    SIMULATION: {
      label: 'WHAT-IF PROTOTYPE SIMULATION',
      icon: Cpu,
      bg: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
      glow: 'shadow-[0_0_12px_rgba(139,92,246,0.25)]'
    },
    SIMULATED_FEED: {
      label: 'SIMULATED CCTV STREAM',
      icon: ShieldCheck,
      bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.25)]'
    },
    EXPLAINABLE_AI: {
      label: 'EXPLAINABLE ANOMALY ENGINE',
      icon: AlertTriangle,
      bg: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]'
    },
    OBSERVED: {
      label: 'OBSERVED DETECTION',
      icon: Eye,
      bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
      glow: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]'
    },
    PREDICTED: {
      label: 'PREDICTED LOCATION',
      icon: Navigation,
      bg: 'bg-purple-950/80 text-purple-300 border-purple-500/50',
      glow: 'shadow-[0_0_10px_rgba(168,85,247,0.3)]'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold border rounded-full backdrop-blur-md ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${config.bg} ${config.glow}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {customLabel || config.label}
    </span>
  );
};
