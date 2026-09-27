import React, { useState } from 'react';
import { AnomalyAlert, AlertSeverity, AnomalyType } from '../../types';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  Shield,
  CheckCircle2,
  Filter,
  Car,
  Cctv,
  ArrowRight,
  Sparkles,
  Zap,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AlertCenterViewProps {
  alerts: AnomalyAlert[];
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const AlertCenterView: React.FC<AlertCenterViewProps> = ({
  alerts: initialAlerts,
  onSelectVehicle,
  onNavigate,
}) => {
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(initialAlerts);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [selectedAlert, setSelectedAlert] = useState<AnomalyAlert>(initialAlerts[0]);

  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter === 'ALL') return true;
    return alert.severity === severityFilter;
  });

  const handleStatusChange = (id: string, newStatus: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED') => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    if (selectedAlert.id === id) {
      setSelectedAlert((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const severityBadges = {
    CRITICAL: 'bg-rose-950 text-rose-300 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
    HIGH: 'bg-amber-950 text-amber-300 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]',
    MEDIUM: 'bg-yellow-950 text-yellow-300 border-yellow-500/50',
    INFO: 'bg-blue-950 text-blue-300 border-blue-500/50'
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              INNOVATION 2: EXPLAINABLE ANOMALY ENGINE
            </span>
            <TransparencyBadge type="EXPLAINABLE_AI" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Explainable Anomaly & Traffic Incident Dispatch Matrix
          </h2>
          <p className="text-xs text-slate-300">
            Moves past simple alarm flags to provide verified mathematical causality, temporal inconsistency metrics, and actionable operational protocols.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'INFO'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                severityFilter === sev
                  ? 'bg-amber-500 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Alert List (5 Cols) & Deep Explanation Inspector (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Alerts List */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
          {filteredAlerts.map((alert) => {
            const isSelected = selectedAlert.id === alert.id;

            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer font-mono text-xs space-y-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      severityBadges[alert.severity]
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white font-mono leading-snug">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-sans">
                    {alert.explanation}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-cyan-400 font-bold">
                    {alert.vehiclePlate || alert.cameraNodeId}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold ${
                      alert.status === 'ACTIVE'
                        ? 'text-rose-400 animate-pulse'
                        : alert.status === 'ACKNOWLEDGED'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    ● {alert.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Deep Explainable Evidence Inspector */}
        <div className="lg:col-span-7 space-y-4">
          {selectedAlert && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                        severityBadges[selectedAlert.severity]
                      }`}
                    >
                      {selectedAlert.severity} PRIORITY
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      ID: {selectedAlert.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white font-mono">
                    {selectedAlert.title}
                  </h3>
                </div>

                {/* Status Toggles */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  {(['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedAlert.id, st)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        selectedAlert.status === st
                          ? 'bg-slate-800 text-white font-bold border border-slate-700'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Explainable Reasoning (Innovation 2 Highlight) */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI CAUSALITY & REASONING EXPLANATION</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedAlert.explanation}
                </p>
              </div>

              {/* Mathematical Evidence Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">
                  Verified Sensor Evidence & Metrics:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {selectedAlert.evidence.previousCamera && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">PREVIOUS OBSERVED DETECTION</div>
                      <div className="text-white font-bold">{selectedAlert.evidence.previousCamera}</div>
                      <div className="text-slate-400 text-[11px]">{selectedAlert.evidence.previousTimestamp}</div>
                    </div>
                  )}

                  {selectedAlert.evidence.nextCamera && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">NEXT OBSERVED DETECTION</div>
                      <div className="text-white font-bold">{selectedAlert.evidence.nextCamera}</div>
                      <div className="text-slate-400 text-[11px]">{selectedAlert.evidence.nextTimestamp}</div>
                    </div>
                  )}

                  {selectedAlert.evidence.timeDifferenceMinutes !== undefined && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">OBSERVED TIME INTERVAL</div>
                      <div className="text-rose-400 font-bold text-sm">
                        {selectedAlert.evidence.timeDifferenceMinutes} minutes
                      </div>
                      <div className="text-slate-400 text-[10px]">Cross-camera transit timestamp delta</div>
                    </div>
                  )}

                  {selectedAlert.evidence.estimatedTransitMinutes !== undefined && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">ESTIMATED ROUTE TRAVEL TIME</div>
                      <div className="text-cyan-400 font-bold text-sm">
                        {selectedAlert.evidence.estimatedTransitMinutes} minutes
                      </div>
                      <div className="text-slate-400 text-[10px]">GIS shortest path under simulated current traffic</div>
                    </div>
                  )}

                  {selectedAlert.evidence.observedSpeedKmh !== undefined && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="text-slate-500 text-[10px]">OBSERVED INTERPOLATED SPEED</div>
                      <div className="text-rose-400 font-bold text-sm">
                        {selectedAlert.evidence.observedSpeedKmh} km/h
                      </div>
                      <div className="text-slate-400 text-[10px]">Expected Corridor Speed: {selectedAlert.evidence.expectedSpeedKmh || 35} km/h</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Action Protocol */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>OPERATIONAL ACTION PROTOCOL</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {selectedAlert.actionProtocol}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedAlert.vehiclePlate && (
                  <button
                    onClick={() => {
                      onSelectVehicle(selectedAlert.vehiclePlate!);
                      onNavigate('tracking');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-mono font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all"
                  >
                    <span>RECONSTRUCT TRAJECTORY ({selectedAlert.vehiclePlate})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => onNavigate('cameras')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs rounded-xl transition-all"
                >
                  INSPECT CAMERA FEED ({selectedAlert.cameraNodeId})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
