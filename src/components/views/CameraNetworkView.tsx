import React, { useState } from 'react';
import { CameraNode, VehicleRecord } from '../../types';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  Cctv,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Gauge,
  Video,
  Layers,
  Sparkles,
  Zap,
  Car
} from 'lucide-react';

interface CameraNetworkViewProps {
  cameras: CameraNode[];
  vehicles: VehicleRecord[];
  onSelectCamera: (camera: CameraNode) => void;
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const CameraNetworkView: React.FC<CameraNetworkViewProps> = ({
  cameras,
  vehicles,
  onSelectCamera,
  onSelectVehicle,
  onNavigate,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCam, setActiveCam] = useState<CameraNode>(cameras[0]);

  // Extract unique zones
  const zones = ['ALL', ...Array.from(new Set(cameras.map((c) => c.zone)))];

  const filteredCameras = cameras.filter((cam) => {
    const matchesZone = selectedZone === 'ALL' || cam.zone === selectedZone;
    const matchesSearch =
      cam.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  // Find recent detections associated with active camera
  const cameraDetections = vehicles
    .flatMap((v) =>
      v.detections
        .filter((d) => d.cameraNodeId === activeCam.id)
        .map((d) => ({ ...d, parentPlate: v.plateNumber, vehicleType: v.vehicleType, vehicleColor: v.vehicleColor }))
    )
    .sort((a, b) => b.timestampRaw - a.timestampRaw);

  const trafficColors = {
    Low: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    Medium: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
    High: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
    Severe: 'text-red-400 bg-red-950/60 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <Cctv className="w-3.5 h-3.5 text-emerald-400" />
              SECTION 11: 20-NODE CCTV SURVEILLANCE INFRASTRUCTURE
            </span>
            <TransparencyBadge type="SIMULATED_FEED" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            City-Wide CCTV & ANPR Camera Node Management
          </h2>
          <p className="text-xs text-slate-300">
            Real-time health monitoring, flow rate throughput, edge AI model synchronization, and historical detection logs for all municipal video nodes.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cameras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Zone Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setSelectedZone(zone)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              selectedZone === zone
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* Main Grid: Cameras Table (7 Cols) & Selected Camera Inspector Drawer (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Camera Cards Table */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="pb-3 font-semibold">CAMERA ID</th>
                    <th className="pb-3 font-semibold">LOCATION & ZONE</th>
                    <th className="pb-3 font-semibold">STATUS</th>
                    <th className="pb-3 font-semibold">24H DETECTIONS</th>
                    <th className="pb-3 font-semibold">TRAFFIC LEVEL</th>
                    <th className="pb-3 font-semibold">SPEED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCameras.map((cam) => {
                    const isSelected = activeCam.id === cam.id;

                    return (
                      <tr
                        key={cam.id}
                        onClick={() => setActiveCam(cam)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-emerald-950/40 text-white font-bold'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="py-3 text-cyan-400 font-bold">{cam.id}</td>
                        <td className="py-3">
                          <div className="text-white font-bold">{cam.name}</div>
                          <div className="text-[10px] text-slate-500">{cam.zone}</div>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              cam.status === 'ONLINE'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                            }`}
                          >
                            {cam.status}
                          </span>
                        </td>
                        <td className="py-3 text-cyan-300">{cam.vehiclesDetected24h}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${trafficColors[cam.trafficLevel]}`}>
                            {cam.trafficLevel}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">{cam.avgSpeedKmh} km/h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Selected Camera Feed & Detections Drawer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-bold text-xs">
                  {activeCam.id}
                </span>
                <span className="text-white font-bold text-sm truncate max-w-[200px]">
                  {activeCam.name}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">SIMULATED STREAM</span>
            </div>

            {/* Camera Stream Simulated Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80"
                alt="Simulated CCTV Feed"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SIMULATED FEED • 30 FPS • PROTOTYPE AI SYNC</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500">SIMULATED FLOW RATE</div>
                <div className="text-white font-bold text-sm">{activeCam.currentFlowRatePerMin} veh/min</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500">SIMULATED SPEED</div>
                <div className="text-white font-bold text-sm">{activeCam.avgSpeedKmh} km/h</div>
              </div>
            </div>

            {/* Recent Vehicle Detections Log at this Camera */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>RECENT OBSERVED DETECTIONS AT {activeCam.id}</span>
                <span className="text-[10px] text-slate-400">{cameraDetections.length} recorded</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cameraDetections.length > 0 ? (
                  cameraDetections.slice(0, 5).map((det) => (
                    <div
                      key={det.id}
                      onClick={() => {
                        onSelectVehicle(det.parentPlate);
                        onNavigate('tracking');
                      }}
                      className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-cyan-400">{det.parentPlate}</div>
                        <div className="text-[10px] text-slate-400">
                          {det.vehicleColor} {det.vehicleType}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{det.timestamp}</div>
                        <div className="text-emerald-400 text-[10px]">
                          Demo OCR: {(det.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-500 text-xs">
                    No recent detections recorded in past 10 minutes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
