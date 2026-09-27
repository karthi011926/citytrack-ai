import React, { useState } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
  Navigation,
  Activity,
  Sliders,
  AlertOctagon,
  Eye,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoTourStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  targetNav: string;
  targetPlate?: string;
  simulationSurge?: number;
  description: string;
  highlightPoints: string[];
}

export const DEMO_TOUR_STEPS: DemoTourStep[] = [
  {
    stepNumber: 1,
    title: 'Step 1: Open Overview Command Center',
    subtitle: 'Executive Telemetry & Simulated City-Wide Matrix',
    targetNav: 'overview',
    description:
      'Begin the demo in the CityTrack AI Executive Dashboard. Demonstrates high-level telemetry: 12,482 monitored vehicles, 20 simulated camera nodes, simulated current traffic conditions, and demo detection events.',
    highlightPoints: [
      'Simulated city-wide telemetry cards',
      'Simulated detection stream ticker',
      'Instant search and camera node overview'
    ]
  },
  {
    stepNumber: 2,
    title: 'Step 2: City-Wide Camera Network & Traffic Status',
    subtitle: 'Interactive GIS Network Layer',
    targetNav: 'cameras',
    description:
      'Review the 20 active simulated CCTV camera nodes across Downtown, Tech Corridor, Ring Roads, and Airport Arterials with simulated flow rate, average speeds, and edge AI stream health.',
    highlightPoints: [
      '20 geo-referenced simulated camera nodes',
      'Zone-based categorization and speed telemetry',
      'Simulated CCTV feeds with detection history log'
    ]
  },
  {
    stepNumber: 3,
    title: 'Step 3: Search Vehicle Plate "TN45AB1234"',
    subtitle: 'Target Vehicle Query & Cross-Camera Aggregation',
    targetNav: 'tracking',
    targetPlate: 'TN45AB1234',
    description:
      'Search for target vehicle TN45AB1234. CityTrack AI aggregates fragmented camera records into a coherent chronological identity.',
    highlightPoints: [
      'Instant plate fuzzy match & identity resolution',
      'First seen (09:58 at C01) to last seen (10:39 at C15)',
      '4 distinct OBSERVED multi-camera detection waypoints'
    ]
  },
  {
    stepNumber: 4,
    title: 'Step 4: Historical Multi-Camera Trajectory',
    subtitle: 'Cross-Camera Spatial Reconstruction: C01 ➔ C04 ➔ C09 ➔ C15',
    targetNav: 'tracking',
    targetPlate: 'TN45AB1234',
    description:
      'Visual trajectory reconstruction connecting 4 OBSERVED detections: Camera 01 (Central Junction at 10:02) ➔ Camera 04 (North Ring at 10:15) ➔ Camera 09 (CBD Plaza at 10:27) ➔ Camera 15 (Tech Zone West at 10:39).',
    highlightPoints: [
      'Sequential route line with numbered OBSERVED camera markers',
      'Segment speeds, lane numbers, and Demo OCR confidence ratings',
      'Interactive GIS path visualization'
    ]
  },
  {
    stepNumber: 5,
    title: 'Step 5: AI Movement Insight (Core Innovation)',
    subtitle: 'Recurring Corridor Pattern Extraction',
    targetNav: 'tracking',
    targetPlate: 'TN45AB1234',
    description:
      'CityTrack AI generates analytical movement insights: "Vehicle follows a recurring corridor between OBSERVED camera C04 and OBSERVED camera C15 during morning peak commute hours with standard velocity distribution."',
    highlightPoints: [
      'Behavioral pattern profiling without storing personal identities',
      'Corridor frequency and travel time baseline analysis',
      'Clear DEMO AI analytical insight labeling'
    ]
  },
  {
    stepNumber: 6,
    title: 'Step 6: Predictive Route Intelligence (Innovation 1)',
    subtitle: 'Markov Next-Camera Probabilistic Forecasting',
    targetNav: 'predictions',
    targetPlate: 'TN45AB1234',
    description:
      'Based on the previous OBSERVED trajectory sequence, the system estimates the most probable PREDICTED next camera intersections: C12 (72%), C15 (18%), C11 (10%) with estimated ETAs and congestion-aware rerouting.',
    highlightPoints: [
      'Probabilistic next-hop PREDICTED vectors',
      'Traffic-aware corridor warning (86% simulated congestion ahead)',
      'Dynamic rerouting suggestion saving ~14 minutes via C11 Outer Bypass'
    ]
  },
  {
    stepNumber: 7,
    title: 'Step 7: Explainable Anomaly Detection (Innovation 2)',
    subtitle: 'Observed Travel Time Inconsistency (11.9m vs 18.2m)',
    targetNav: 'alerts',
    targetPlate: 'TN45AB1234',
    description:
      'Instead of an opaque "Suspicious Vehicle" flag, CityTrack AI explains WHY: Observed 11.93-min interval between OBSERVED camera C04 (10:15) and OBSERVED camera C09 (10:27) is inconsistent with estimated 18.20-min transit time under high CBD congestion. Future destinations like C12 are PREDICTIONS, not observed anomalies.',
    highlightPoints: [
      'Detailed mathematical evidence comparison between OBSERVED detections',
      'Clear distinction: OBSERVED anomaly vs PREDICTED route',
      'Standardized triage and operational action protocols'
    ]
  },
  {
    stepNumber: 8,
    title: 'Step 8: Urban Traffic Analytics Dashboard',
    subtitle: 'Macro Flow Analytics & OD Matrix',
    targetNav: 'analytics',
    description:
      'Explore simulated city-wide macro analytics: 24-hour vehicle volume curves, camera density rankings, network average speed, and Origin-Destination (OD) matrix.',
    highlightPoints: [
      'Hourly volume & congestion index charts',
      'Origin-Destination flow matrix (Downtown ➔ Tech Corridor)',
      'Vehicle classification breakdown (Sedans, SUVs, Freight, Buses)'
    ]
  },
  {
    stepNumber: 9,
    title: 'Step 9: Open What-If Simulation Sandbox (Innovation 4)',
    subtitle: 'Interactive Urban Traffic Sandbox',
    targetNav: 'simulation',
    description:
      'Enter the What-If Simulation engine. Users can test urban stress-test scenarios and evaluate downstream network resilience before deploying field changes.',
    highlightPoints: [
      'Interactive surge multiplier and capacity sliders',
      'Scenario presets (Rush Hour Surge, Accident Lane Blockage)',
      'Prototype simulation calculation engine'
    ]
  },
  {
    stepNumber: 10,
    title: 'Step 10: Apply +30% Traffic Surge at Central Junction',
    subtitle: 'Simulating Peak-Hour Demand Shock',
    targetNav: 'simulation',
    simulationSurge: 30,
    description:
      'Trigger scenario: "Increase traffic at Central Junction (C01) by +30%". The AI calculates immediate pressure on feeder roads and junction capacity threshold.',
    highlightPoints: [
      'Traffic level elevates from High to Severe',
      'Average intersection delay increases by +13 minutes',
      'Direct visual comparison of Before vs After metrics'
    ]
  },
  {
    stepNumber: 11,
    title: 'Step 11: Simulated Effect on Surrounding Roads',
    subtitle: 'Downstream Spillover & Rerouting Recommendations',
    targetNav: 'simulation',
    simulationSurge: 30,
    description:
      'CityTrack AI identifies severe spillover on Road R01 (Central Arterial) and Road R02 (CBD Transit Link) and recommends activating green-wave bypass timing at C04.',
    highlightPoints: [
      'Downstream corridor impact breakdown',
      'Capacity saturation percentages',
      'Automated mitigation recommendations for traffic operators'
    ]
  },
  {
    stepNumber: 12,
    title: 'Step 12: Alert Center & Triage Matrix',
    subtitle: 'Unified Operational Dispatch & Hackathon Conclusion',
    targetNav: 'alerts',
    description:
      'Complete the presentation in the Alert Center. Review all 5 distinct anomaly categories: Route time anomalies, BOLO targets, unusual corridors, and congestion escalations.',
    highlightPoints: [
      'Multi-severity categorization (Critical, High, Medium, Info)',
      'Complete end-to-end intelligence loop demonstrated',
      'Ready for real-world API integration'
    ]
  }
];

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
  onExecuteStepAction: (step: DemoTourStep) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  currentStepIndex,
  onSelectStep,
  onExecuteStepAction,
}) => {
  if (!isOpen) return null;

  const currentStep = DEMO_TOUR_STEPS[currentStepIndex] || DEMO_TOUR_STEPS[0];
  const isLastStep = currentStepIndex === DEMO_TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      const nextIdx = currentStepIndex + 1;
      onSelectStep(nextIdx);
      onExecuteStepAction(DEMO_TOUR_STEPS[nextIdx]);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      onSelectStep(prevIdx);
      onExecuteStepAction(DEMO_TOUR_STEPS[prevIdx]);
    }
  };

  const handleJumpToStep = (idx: number) => {
    onSelectStep(idx);
    onExecuteStepAction(DEMO_TOUR_STEPS[idx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0F172A] border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 font-mono">
                  CityTrack AI — Guided Hackathon Presentation Tour
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/40 rounded-full">
                  STEP {currentStep.stepNumber} OF {DEMO_TOUR_STEPS.length}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                12-Step Complete Flow demonstrating predictive intelligence & explainable anomalies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker Bar */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
          {DEMO_TOUR_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.stepNumber}
                onClick={() => handleJumpToStep(idx)}
                className={`h-7 px-2.5 rounded text-xs font-mono font-bold flex items-center gap-1 shrink-0 transition-all ${
                  isCurrent
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)] scale-105'
                    : isCompleted
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                <span>{step.stepNumber}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              {currentStep.subtitle}
            </div>
            <h2 className="text-xl font-extrabold text-white font-mono">
              {currentStep.title}
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            {currentStep.description}
          </div>

          {/* Key Presentation Highlights */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              Key Presentation Highlights:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentStep.highlightPoints.map((point, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREVIOUS STEP</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onExecuteStepAction(currentStep);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950/60 transition-all"
            >
              CLOSE & EXPLORE PAGE
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
            >
              <span>{isLastStep ? 'FINISH PRESENTATION' : 'NEXT STEP'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
