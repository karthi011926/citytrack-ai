import React from 'react';
import { CityAnalyticsSummary, CameraNode, RoadSegment } from '../../types';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Car,
  PieChart as PieIcon,
  Compass,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface TrafficAnalyticsViewProps {
  analytics: CityAnalyticsSummary;
  cameras: CameraNode[];
  roads: RoadSegment[];
  onNavigate: (navId: string) => void;
}

const PIE_COLORS = ['#06B6D4', '#3B82F6', '#10B981', '#F59E0B', '#A855F7'];

export const TrafficAnalyticsView: React.FC<TrafficAnalyticsViewProps> = ({
  analytics,
  cameras,
  roads,
  onNavigate,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              SECTION 9: CITY-WIDE TRAFFIC ANALYTICS
            </span>
            <TransparencyBadge type="DEMO_DATA" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Simulated Macro-Level Urban Traffic Analytics & Origin-Destination Matrix
          </h2>
          <p className="text-xs text-slate-300">
            Synthesizes simulated 24-hour vehicle throughput, peak-hour congestion curves, intersection load rankings, and vehicle category distributions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('simulation')}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <span>TEST WITH WHAT-IF SIMULATOR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 24-Hour Hourly Volume Curve */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>SIMULATED 24-HOUR VEHICLE VOLUME & CONGESTION FLOW (HOURLY)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">SIMULATED PEAK HOURS: 08:00 - 10:00 & 17:00 - 19:00</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.hourlyVehicleTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCongested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              <Area type="monotone" dataKey="count" name="Total Vehicles" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              <Area type="monotone" dataKey="congestedCount" name="Congested Corridor Volume" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorCongested)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Camera Density Ranking & Origin-Destination Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Load Density Ranking */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="text-xs font-mono font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              CAMERA INTERSECTION LOAD RANKINGS (24H DETECTIONS)
            </span>
            <span className="text-[10px] text-slate-400">TOP 8 NODES</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {analytics.cameraDensityRanking.map((cam, idx) => (
              <div
                key={cam.cameraId}
                className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-500 font-bold">#{idx + 1}</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
                    {cam.cameraId}
                  </span>
                  <span className="text-white font-bold">{cam.cameraName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-cyan-300 font-bold">{cam.count.toLocaleString()}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cam.trafficLevel === 'Severe'
                        ? 'bg-red-950 text-red-400'
                        : cam.trafficLevel === 'High'
                        ? 'bg-rose-950 text-rose-400'
                        : 'bg-amber-950 text-amber-400'
                    }`}
                  >
                    {cam.trafficLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Origin-Destination (OD) Matrix */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="text-xs font-mono font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              ORIGIN-DESTINATION (OD) ARTERIAL VOLUME CORRIDORS
            </span>
            <span className="text-[10px] text-slate-400">ZONE-TO-ZONE MATRIX</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {analytics.odFlowMatrix.map((od, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-white">
                  <span className="font-bold text-slate-300">{od.origin}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-cyan-300">{od.destination}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 border border-purple-500/40 font-bold">
                  {od.volume.toLocaleString()} veh/day
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Classification Breakdown */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="text-xs font-mono font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2.5">
          <span className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            VEHICLE FLEET COMPOSITION CLASSIFICATION
          </span>
          <span className="text-[10px] text-slate-400 font-mono">12,482 MONITORED VEHICLES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
          {analytics.vehicleTypeBreakdown.map((item, idx) => (
            <div
              key={item.type}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
            >
              <div className="text-slate-400 text-[11px] truncate">{item.type}</div>
              <div className="text-lg font-black text-white">{item.count.toLocaleString()}</div>
              <div className="text-cyan-400 font-bold text-xs">{item.percentage}% of traffic</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
