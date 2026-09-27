import React from 'react';
import {
  CameraNode,
  RoadSegment,
  VehicleRecord,
  RoutePrediction
} from '../../types';
import { CityMap } from '../map/CityMap';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  GitFork,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Clock,
  Navigation,
  Compass,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PredictiveIntelligenceViewProps {
  cameras: CameraNode[];
  roads: RoadSegment[];
  vehicles: VehicleRecord[];
  selectedVehicle: VehicleRecord;
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const PredictiveIntelligenceView: React.FC<PredictiveIntelligenceViewProps> = ({
  cameras,
  roads,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onNavigate,
}) => {
  const predictions = selectedVehicle.predictedNextLocations || [];
  const primaryPrediction = predictions[0];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5 text-purple-400" />
              INNOVATION 1 & 3: PREDICTIVE ROUTE & TRAFFIC INTELLIGENCE
            </span>
            <TransparencyBadge type="AI_PREDICTION" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Markov Next-Camera Forecasting & Congestion-Aware Routing
          </h2>
          <p className="text-xs text-slate-300">
            Estimates probable forward trajectory vectors by analyzing sequential camera transitions, temporal velocities, and city-wide road network congestion.
          </p>
        </div>

        {/* Vehicle Plate Badge */}
        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-mono">ACTIVE TARGET</div>
            <div className="text-sm font-bold text-cyan-400 font-mono">
              {selectedVehicle.plateNumber}
            </div>
          </div>
          <button
            onClick={() => onNavigate('tracking')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono"
            title="Switch Target"
          >
            Switch
          </button>
        </div>
      </div>

      {/* Probability Cards & GIS Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Probability Forecasting List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>DEMO AI PREDICTION: PROBABILISTIC NEXT LOCATIONS</span>
              </div>
              <TransparencyBadge type="AI_PREDICTION" size="sm" />
            </div>

            <div className="space-y-3">
              {predictions.map((pred, idx) => {
                const isTop = idx === 0;
                return (
                  <div
                    key={pred.targetCameraId}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isTop
                        ? 'bg-purple-950/40 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 font-mono font-bold text-[10px] border border-purple-500/40">
                          PREDICTED
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-bold text-xs border border-slate-700">
                          {pred.targetCameraId}
                        </span>
                        <span className="text-xs font-bold text-white font-mono">
                          {pred.targetCameraName}
                        </span>
                      </div>
                      <div className="text-sm font-black text-cyan-300 font-mono">
                        {pred.probabilityPct}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isTop
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-400'
                            : 'bg-slate-500'
                        }`}
                        style={{ width: `${pred.probabilityPct}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Est. Travel Time: ~{pred.estimatedEtaMinutes} min</span>
                      <span>Distance: {pred.distanceKm} km</span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-sans mt-2 pt-2 border-t border-slate-800/60">
                      {pred.reasoning}
                    </div>

                    {/* Alternative Reroute Recommendation Box */}
                    {pred.suggestedAlternativeRoute && (
                      <div className="mt-2.5 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono space-y-1">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                          <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          <span>TRAFFIC-AWARE DIVERSIFICATION (SIMULATED)</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-sans">
                          {pred.suggestedAlternativeRoute.reason}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-bold">
                          ➔ Recommended Via: {pred.suggestedAlternativeRoute.viaCameraName} (Saves ~{pred.suggestedAlternativeRoute.timeSavedMinutes} mins)
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Model Methodology & Prediction Discrepancy Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 font-mono space-y-2">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI TRANSPARENCY & PREDICTION DISCREPANCY NOTICE</span>
            </div>
            <p className="leading-relaxed">
              Predictions are statistical estimations generated by Markov Transition Matrices and demo corridor congestion models. They represent forward probabilistic forecasts rather than guaranteed outcomes.
            </p>
            <p className="text-[10px] text-slate-500 italic">
              Technical Note: Comparing a predicted arrival with estimated route travel time is evaluated as a PREDICTION DISCREPANCY, not an observed travel anomaly. Travel time anomalies are strictly computed across verified OBSERVED camera detections.
            </p>
          </div>
        </div>

        {/* Right Col: Interactive Map with Branching Prediction Arcs (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Probabilistic Forward Vectors on GIS Map</span>
            </div>
            <span className="text-xs text-purple-400 font-mono">
              Purple Dashed Lines = Predicted Next Hops
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
