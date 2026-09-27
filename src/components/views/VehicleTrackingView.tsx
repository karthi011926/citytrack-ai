import React, { useState } from 'react';
import {
  CameraNode,
  RoadSegment,
  VehicleRecord,
  AnomalyAlert
} from '../../types';
import { CityMap } from '../map/CityMap';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  Search,
  Navigation,
  Sparkles,
  MapPin,
  Clock,
  Gauge,
  Layers,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Car,
  CheckCircle2,
  GitFork,
  Radio,
  ExternalLink
} from 'lucide-react';

interface VehicleTrackingViewProps {
  cameras: CameraNode[];
  roads: RoadSegment[];
  vehicles: VehicleRecord[];
  selectedVehicle: VehicleRecord;
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const VehicleTrackingView: React.FC<VehicleTrackingViewProps> = ({
  cameras,
  roads,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectVehicle(searchTerm.trim().toUpperCase());
    }
  };

  const detections = selectedVehicle.detections || [];
  const isTarget = selectedVehicle.plateNumber === 'TN45AB1234';

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
        <form onSubmit={handleSearch} className="flex-1 max-w-lg flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search plate (e.g. TN45AB1234, KA01MJ9081)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl text-xs font-mono font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
          >
            SEARCH
          </button>
        </form>

        {/* Quick Quick-Select Sample Plates */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-400 text-[11px]">Quick Picks:</span>
          {['TN45AB1234', 'KA01MJ9081', 'MH02CZ4490', 'DL04TR7721', 'AP09XY9988'].map((plate) => (
            <button
              key={plate}
              onClick={() => {
                setSearchTerm(plate);
                onSelectVehicle(plate);
              }}
              className={`px-2.5 py-1 rounded-lg border text-[11px] transition-all ${
                selectedVehicle.plateNumber === plate
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              {plate}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Summary Header Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0E172A] to-slate-900 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-mono text-base font-black tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                {selectedVehicle.plateNumber}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {selectedVehicle.vehicleColor} • {selectedVehicle.vehicleType}
              </span>
              {selectedVehicle.isBoloTarget && (
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/60 animate-pulse">
                  {selectedVehicle.boloTag || 'HIGH-INTEREST BOLO'}
                </span>
              )}
              <TransparencyBadge type="DEMO_DATA" size="sm" />
            </div>

            <p className="text-xs text-slate-400 font-mono">
              Aggregated across{' '}
              <span className="text-cyan-400 font-bold">{selectedVehicle.totalDetections} CCTV cameras</span> from{' '}
              <span className="text-white">{selectedVehicle.firstSeenTime}</span> to{' '}
              <span className="text-white">{selectedVehicle.lastSeenTime}</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('predictions')}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>PREDICT NEXT ROUTE</span>
            </button>

            {selectedVehicle.anomalyAlert && (
              <button
                onClick={() => onNavigate('alerts')}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>VIEW EXPLAINABLE ANOMALY</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: GIS Trajectory Map & Chronological Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trajectory Timeline Sequence (4 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>OBSERVED CROSS-CAMERA TRAJECTORY</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {detections.length} OBSERVED WAYPOINTS
              </span>
            </div>

            {/* Sequence Line (C01 -> C04 -> C09 -> C15) */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-emerald-500">
              {detections.map((det, index) => {
                const isLast = index === detections.length - 1;
                return (
                  <div key={det.id} className="relative group">
                    {/* Waypoint Number Badge */}
                    <span
                      className={`absolute -left-6 top-1 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold border ${
                        isLast
                          ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_10px_#06b6d4]'
                          : 'bg-slate-900 text-cyan-400 border-cyan-500/50'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 group-hover:border-cyan-500/40 transition-all font-mono text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                          <span className="text-[10px] px-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                            OBSERVED
                          </span>
                          <span>{det.cameraName}</span>
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {det.cameraNodeId}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{det.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-slate-500" />
                          <span>{det.speedEstimateKmh} km/h (Lane {det.laneNumber})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/60 text-slate-400">
                        <span>Demo OCR Confidence:</span>
                        <span className="text-emerald-400 font-bold">
                          {(det.confidence * 100).toFixed(0)}% (Simulated)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Movement Insight Box (Prompt Innovation Section 8) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI MOVEMENT INSIGHT</span>
              </div>
              <TransparencyBadge type="AI_PREDICTION" size="sm" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {selectedVehicle.movementInsight}
            </p>

            <div className="text-[10px] text-slate-500 italic font-mono">
              Note: This is an analytical machine-learning demonstration insight derived from multi-camera sequence clustering.
            </div>
          </div>

          {/* Traffic-Aware Corridor Notice (Prompt Innovation Section 4) */}
          {selectedVehicle.alternativeRouteNotice && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>TRAFFIC-AWARE CORRIDOR ADVISORY</span>
                </div>
                <TransparencyBadge type="EXPLAINABLE_AI" size="sm" />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedVehicle.alternativeRouteNotice}
              </p>

              <button
                onClick={() => onNavigate('predictions')}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 pt-1"
              >
                <span>View Dynamic Rerouting Vector</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Interactive GIS Trajectory Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>GIS Trajectory Reconstruction & Route Nodes</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Blue = Observed Path | Dashed = Demo AI Prediction
            </span>
          </div>

          <CityMap
            cameras={cameras}
            roads={roads}
            selectedVehicle={selectedVehicle}
            showPredictions={true}
            showCongestionLayers={true}
            mapHeight="h-[580px]"
            zoomLevel={13}
          />
        </div>
      </div>
    </div>
  );
};
