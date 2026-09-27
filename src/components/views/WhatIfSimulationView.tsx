import React, { useState, useMemo } from 'react';
import { CameraNode, RoadSegment, SimulationResult } from '../../types';
import { runWhatIfSimulation } from '../../services/cityDataService';
import { CityMap } from '../map/CityMap';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Activity,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  Cpu
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface WhatIfSimulationViewProps {
  cameras: CameraNode[];
  roads: RoadSegment[];
  initialSurge?: number;
}

export const WhatIfSimulationView: React.FC<WhatIfSimulationViewProps> = ({
  cameras,
  roads,
  initialSurge = 30,
}) => {
  const [selectedJunctionId, setSelectedJunctionId] = useState<string>('C01');
  const [surgePercent, setSurgePercent] = useState<number>(initialSurge);
  const [laneCapacityPercent, setLaneCapacityPercent] = useState<number>(100);

  // Compute simulation outcome
  const simResult: SimulationResult = useMemo(() => {
    return runWhatIfSimulation(selectedJunctionId, surgePercent, laneCapacityPercent);
  }, [selectedJunctionId, surgePercent, laneCapacityPercent]);

  // Chart data for Before vs After comparison
  const chartData = useMemo(() => {
    return simResult.affectedRoads.map((road) => ({
      name: road.roadName.split(' ')[0] + ' (' + road.roadId + ')',
      'Baseline Flow': road.flowBefore,
      'Simulated Surge Flow': road.flowAfter,
    }));
  }, [simResult]);

  // Preset Scenario Handlers
  const handleApplyPreset = (junctionId: string, surge: number, capacity: number) => {
    setSelectedJunctionId(junctionId);
    setSurgePercent(surge);
    setLaneCapacityPercent(capacity);
  };

  const statusColors = {
    Low: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    Medium: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
    High: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
    Severe: 'text-red-400 bg-red-950/60 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              INNOVATION 4: WHAT-IF URBAN TRAFFIC SANDBOX
            </span>
            <TransparencyBadge type="SIMULATION" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Urban Stress-Test & Cascading Spillover Simulation Engine
          </h2>
          <p className="text-xs text-slate-300">
            Model artificial demand surges, lane closures, and adverse weather events to predict downstream network choke points prior to deploying signal changes.
          </p>
        </div>

        {/* Preset Scenarios Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/90 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[11px] px-1">Presets:</span>
          <button
            onClick={() => handleApplyPreset('C01', 30, 100)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all text-[11px]"
          >
            +30% Central Junction
          </button>
          <button
            onClick={() => handleApplyPreset('C06', 40, 50)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 transition-all text-[11px]"
          >
            Airport Lane Blockage (-50%)
          </button>
          <button
            onClick={() => handleApplyPreset('C08', 50, 100)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all text-[11px]"
          >
            Tech Park Rush Hour (+50%)
          </button>
        </div>
      </div>

      {/* Main Grid: Controls & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Simulation Controls & Before/After Scorecard (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>SIMULATION PARAMETERS</span>
              </div>
              <button
                onClick={() => {
                  setSurgePercent(0);
                  setLaneCapacityPercent(100);
                }}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Target Junction Selector */}
            <div className="space-y-1.5 font-mono text-xs">
              <label className="text-slate-400 font-bold">Target Intersection / Flyover:</label>
              <select
                value={selectedJunctionId}
                onChange={(e) => setSelectedJunctionId(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500 text-xs"
              >
                {cameras.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.name} ({c.zone})
                  </option>
                ))}
              </select>
            </div>

            {/* Slider 1: Traffic Surge % */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Simulated Traffic Surge:</span>
                <span className="text-purple-400 font-bold text-sm">+{surgePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={surgePercent}
                onChange={(e) => setSurgePercent(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (Nominal)</span>
                <span>+50% (Heavy Surge)</span>
                <span>+100% (Gridlock)</span>
              </div>
            </div>

            {/* Slider 2: Lane Capacity % */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Available Lane Capacity:</span>
                <span className="text-cyan-400 font-bold text-sm">{laneCapacityPercent}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="10"
                value={laneCapacityPercent}
                onChange={(e) => setLaneCapacityPercent(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>20% (Severe Incident Blockage)</span>
                <span>100% (Full Lanes Open)</span>
              </div>
            </div>
          </div>

          {/* Before vs After Impact Scorecard */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-500/30 space-y-4 font-mono text-xs">
            <div className="text-xs font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span>BEFORE VS AFTER IMPACT MATRIX</span>
              <span className="text-purple-400 font-bold">{simResult.junctionName.split(' ')[0]} ({simResult.junctionId})</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Before Card */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-500">BASELINE STATE</div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-xs border ${statusColors[simResult.statusBefore]}`}>
                    {simResult.statusBefore}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Network Index: <span className="text-white font-bold">{simResult.networkCongestionIndexBefore}%</span>
                </div>
              </div>

              {/* After Card */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/50 space-y-1 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <div className="text-[10px] text-purple-400 font-bold">SIMULATED AFTER STATE</div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-xs border ${statusColors[simResult.statusAfter]}`}>
                    {simResult.statusAfter}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Network Index: <span className="text-purple-400 font-bold">{simResult.networkCongestionIndexAfter}%</span>
                </div>
              </div>
            </div>

            {/* Average Delay Increase Metric */}
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Estimated Delay Increase:</span>
              </div>
              <span className="text-base font-black text-rose-300">
                +{simResult.delayIncreaseMin} mins
              </span>
            </div>

            {/* AI Mitigation Recommendation */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-slate-300 font-sans">
              <div className="text-[11px] text-cyan-400 font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI MITIGATION STRATEGY</span>
              </div>
              <p className="text-xs leading-relaxed">
                {simResult.mitigationRecommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Affected Corridors & Flow Comparison Chart (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Affected Downstream Corridors List */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>DOWNSTREAM AFFECTED CORRIDORS & SPILLOVER RISK</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {simResult.affectedRoads.length} CORRIDORS LINKED
              </span>
            </div>

            <div className="space-y-2.5">
              {simResult.affectedRoads.map((road) => (
                <div
                  key={road.roadId}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{road.roadName}</span>
                      <span className="text-[10px] text-slate-500">({road.roadId})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Flow: <span className="text-slate-300">{road.flowBefore}</span> ➔{' '}
                      <span className="text-purple-400 font-bold">{road.flowAfter} veh/hr</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColors[road.statusBefore]}`}>
                      {road.statusBefore}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColors[road.statusAfter]}`}>
                      {road.statusAfter}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                        road.spilloverRisk === 'CRITICAL'
                          ? 'bg-red-500 text-black animate-pulse'
                          : road.spilloverRisk === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {road.spilloverRisk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before vs After Surge Chart */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>VEHICLE FLOW RATE COMPARISON (VEHICLES / HOUR)</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="Baseline Flow" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated Surge Flow" fill="#A855F7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
