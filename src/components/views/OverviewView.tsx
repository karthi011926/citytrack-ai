import React from 'react';
import {
  CameraNode,
  RoadSegment,
  VehicleRecord,
  AnomalyAlert,
  CityAnalyticsSummary
} from '../../types';
import { CityMap } from '../map/CityMap';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  Car,
  Cctv,
  Activity,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  GitFork,
  Sliders,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Zap,
  Radio
} from 'lucide-react';

interface OverviewViewProps {
  cameras: CameraNode[];
  roads: RoadSegment[];
  vehicles: VehicleRecord[];
  alerts: AnomalyAlert[];
  analytics: CityAnalyticsSummary;
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  cameras,
  roads,
  vehicles,
  alerts,
  analytics,
  onSelectVehicle,
  onNavigate,
}) => {
  const featuredVehicle = vehicles.find((v) => v.plateNumber === 'TN45AB1234') || vehicles[0];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner with Core Innovation Pitch & Transparency Notice */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                PS 26127 • NEXT-GEN ANPR ENGINE
              </span>
              <TransparencyBadge type="DEMO_DATA" size="sm" />
              <TransparencyBadge type="EXPLAINABLE_AI" size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
              CityTrack AI: Connected Multi-Camera Vehicle Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Moving beyond fragmented camera-by-camera license plate logs into{' '}
              <span className="text-cyan-300 font-semibold">
                cross-camera trajectory reconstruction, predictive Markov route forecasting, explainable anomaly detection, and urban what-if simulations.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                onSelectVehicle('TN45AB1234');
                onNavigate('tracking');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <span>TRACK FEATURED TARGET (TN45AB1234)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Executive Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>TOTAL MONITORED VEHICLES</span>
            <Car className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono tracking-tight">
            {analytics.totalVehiclesMonitored.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% vs 24h rolling average</span>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>ACTIVE CAMERAS</span>
            <Cctv className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
            <span>{analytics.activeCamerasCount}</span>
            <span className="text-xs text-slate-400 font-normal">/ {analytics.totalCamerasCount} Online</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% City CCTV Node Uptime</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>SIMULATED CURRENT TRAFFIC</span>
            <Activity className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono tracking-tight flex items-baseline gap-2">
            <span>{analytics.currentCityTrafficIndex.toUpperCase()}</span>
            <span className="text-xs text-slate-400 font-normal">(74% Load)</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Simulated peak hour load on Central Flyover</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden group hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>DETECTED ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono tracking-tight flex items-baseline gap-2">
            <span>{String(alerts.length).padStart(2, '0')}</span>
            <span className="text-xs text-slate-400 font-normal">Active Anomalies</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-rose-400 font-mono">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>1 High-Priority Route Anomaly</span>
          </div>
        </div>
      </div>

      {/* 4 Core Innovation Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Innovation 1 */}
        <div
          onClick={() => onNavigate('predictions')}
          className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              INNOVATION 1
            </span>
            <GitFork className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-white font-mono mb-1">
            Predictive Route Intelligence
          </h3>
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            Forecasts next probable camera nodes (e.g. C12: 72%, C15: 18%) based on multi-camera Markov models.
          </p>
          <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold group-hover:underline">
            <span>View Predictions</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Innovation 2 */}
        <div
          onClick={() => onNavigate('alerts')}
          className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-500/40">
              INNOVATION 2
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-white font-mono mb-1">
            Explainable Anomaly Engine
          </h3>
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            Explains exact mathematical causality (2m interval vs 8m transit time) instead of generic opaque flags.
          </p>
          <div className="flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold group-hover:underline">
            <span>Explain Anomalies</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Innovation 3 */}
        <div
          onClick={() => {
            onSelectVehicle('TN45AB1234');
            onNavigate('tracking');
          }}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              INNOVATION 3
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-white font-mono mb-1">
            Traffic-Aware Trajectories
          </h3>
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            Merges vehicle movements with real-time road congestion to suggest dynamic alternative routes.
          </p>
          <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-semibold group-hover:underline">
            <span>Explore Routing</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Innovation 4 */}
        <div
          onClick={() => onNavigate('simulation')}
          className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-500/40">
              INNOVATION 4
            </span>
            <Sliders className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-white font-mono mb-1">
            What-If Urban Simulation
          </h3>
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            Interactive sandbox to simulate traffic surges (+30% at Central Junction) and view cascading spillover.
          </p>
          <div className="flex items-center gap-1 text-xs font-mono text-purple-400 font-semibold group-hover:underline">
            <span>Run Simulation</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Command Center: Interactive GIS Map + Real-time Telemetry Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City-Wide Map (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                Simulated City-Wide Surveillance Matrix
              </h3>
              <span className="text-xs text-slate-400 font-mono">(20 Simulated Nodes)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('cameras')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View Camera Grid</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <CityMap
            cameras={cameras}
            roads={roads}
            selectedVehicle={featuredVehicle}
            activeAlerts={alerts}
            mapHeight="h-[480px]"
            zoomLevel={13}
          />
        </div>

        {/* Live Incoming Detection Stream & Fast Quick Search */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>SIMULATED DETECTION STREAM</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {vehicles.slice(0, 7).map((veh) => {
                const lastDet = veh.detections[veh.detections.length - 1];
                const isTarget = veh.plateNumber === 'TN45AB1234';

                return (
                  <div
                    key={veh.plateNumber}
                    onClick={() => {
                      onSelectVehicle(veh.plateNumber);
                      onNavigate('tracking');
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer text-xs font-mono ${
                      isTarget
                        ? 'bg-cyan-950/70 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white tracking-wide">
                          {veh.plateNumber}
                        </span>
                        {isTarget && (
                          <span className="px-1 py-0.2 rounded text-[9px] bg-cyan-500 text-black font-extrabold">
                            FEATURED
                          </span>
                        )}
                        {veh.isBoloTarget && (
                          <span className="px-1 py-0.2 rounded text-[9px] bg-rose-500 text-white font-extrabold animate-pulse">
                            BOLO
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {lastDet?.timestamp || '10:42:15'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{lastDet?.cameraName.split(' ')[0]} ({lastDet?.cameraNodeId})</span>
                      <span className="text-emerald-400">
                        Demo OCR: {((lastDet?.confidence || 0.96) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('anpr')}
              className="w-full py-2 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <span>OPEN ANPR SCANNER / OCR WORKFLOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
