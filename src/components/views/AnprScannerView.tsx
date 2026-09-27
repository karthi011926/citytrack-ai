import React, { useState } from 'react';
import { CameraNode, VehicleRecord, VehicleDetection } from '../../types';
import { TransparencyBadge } from '../common/TransparencyBadge';
import {
  ScanLine,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Camera,
  Layers,
  Clock,
  Gauge,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  Cpu
} from 'lucide-react';

interface AnprSample {
  id: string;
  plateNumber: string;
  title: string;
  cameraNodeId: string;
  cameraName: string;
  timestamp: string;
  confidence: number;
  vehicleType: 'Sedan' | 'SUV' | 'Commercial Truck' | 'Electric EV' | 'Transit Bus' | 'Motorbike';
  vehicleColor: string;
  speedKmh: number;
  lane: number;
  imageUrl: string;
  box: { top: string; left: string; width: string; height: string };
}

const SAMPLE_CAPTURES: AnprSample[] = [
  {
    id: 'SMP-01',
    plateNumber: 'TN45AB1234',
    title: 'High-Resolution Obsidian Sedan Capture',
    cameraNodeId: 'C09',
    cameraName: 'Central Business District Plaza',
    timestamp: '10:27:14',
    confidence: 0.96,
    vehicleType: 'Sedan',
    vehicleColor: 'Deep Obsidian Black',
    speedKmh: 24,
    lane: 3,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    box: { top: '56%', left: '38%', width: '24%', height: '10%' }
  },
  {
    id: 'SMP-02',
    plateNumber: 'KA01MJ9081',
    title: 'Titanium Silver SUV BOLO Hit',
    cameraNodeId: 'C08',
    cameraName: 'Innovation Tech Park Main Gate',
    timestamp: '10:38:00',
    confidence: 0.98,
    vehicleType: 'SUV',
    vehicleColor: 'Titanium Silver',
    speedKmh: 15,
    lane: 1,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    box: { top: '52%', left: '42%', width: '22%', height: '11%' }
  },
  {
    id: 'SMP-03',
    plateNumber: 'MH02CZ4490',
    title: 'Heavy Logistics Commercial Carrier',
    cameraNodeId: 'C10',
    cameraName: 'Harbor Road Freight Link',
    timestamp: '10:40:11',
    confidence: 0.95,
    vehicleType: 'Commercial Truck',
    vehicleColor: 'Freight Blue',
    speedKmh: 42,
    lane: 3,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    box: { top: '60%', left: '40%', width: '25%', height: '12%' }
  },
  {
    id: 'SMP-04',
    plateNumber: 'DL04TR7721',
    title: 'Airport Arterial Electric EV Express',
    cameraNodeId: 'C06',
    cameraName: 'South Airport Arterial Toll',
    timestamp: '10:41:02',
    confidence: 0.99,
    vehicleType: 'Electric EV',
    vehicleColor: 'Pearl White',
    speedKmh: 64,
    lane: 1,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    box: { top: '54%', left: '45%', width: '20%', height: '9%' }
  },
  {
    id: 'SMP-05',
    plateNumber: 'AP09XY9988',
    title: 'Public Urban Transit Bus Transit',
    cameraNodeId: 'C03',
    cameraName: 'Central Arterial Boulevard',
    timestamp: '10:42:08',
    confidence: 0.98,
    vehicleType: 'Transit Bus',
    vehicleColor: 'Urban Emerald Green',
    speedKmh: 22,
    lane: 1,
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
    box: { top: '65%', left: '35%', width: '28%', height: '13%' }
  }
];

interface AnprScannerViewProps {
  onSelectVehicle: (plate: string) => void;
  onNavigate: (navId: string) => void;
}

export const AnprScannerView: React.FC<AnprScannerViewProps> = ({
  onSelectVehicle,
  onNavigate,
}) => {
  const [selectedSample, setSelectedSample] = useState<AnprSample>(SAMPLE_CAPTURES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleSelectSample = (sample: AnprSample) => {
    setIsScanning(true);
    setCustomImage(null);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsScanning(false);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
      }, 600);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold flex items-center gap-1.5">
              <ScanLine className="w-3.5 h-3.5 text-cyan-400" />
              SECTION 6: ANPR & OCR INFERENCE ENGINE
            </span>
            <TransparencyBadge type="DEMO_DATA" size="sm" />
            <TransparencyBadge type="SIMULATED_FEED" size="sm" />
          </div>
          <h2 className="text-xl font-bold text-white font-mono">
            Optical Character Recognition & Vehicle Plate Extraction
          </h2>
          <p className="text-xs text-slate-300">
            Transforms raw edge CCTV frames into structured vehicle detections with OCR confidence scoring, timestamp telemetry, and instant trajectory lookup hooks.
          </p>
        </div>

        {/* Upload Custom Image Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all shrink-0">
          <Upload className="w-4 h-4 text-cyan-400" />
          <span>UPLOAD VEHICLE CAPTURE</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Main Grid: Visual Frame with Bounding Box & OCR Result Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Frame & Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>CCTV FRAME CAPTURE ({selectedSample.cameraNodeId})</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                AI BOUNDING BOX ACTIVE
              </span>
            </div>

            {/* Image Frame Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center group">
              <img
                src={customImage || selectedSample.imageUrl}
                alt="Vehicle CCTV"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bounding Box on License Plate */}
              {!isScanning && (
                <div
                  className="absolute border-2 border-cyan-400 rounded bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-start justify-start p-1 pointer-events-none animate-pulse"
                  style={{
                    top: selectedSample.box.top,
                    left: selectedSample.box.left,
                    width: selectedSample.box.width,
                    height: selectedSample.box.height,
                  }}
                >
                  <span className="px-1.5 py-0.2 bg-cyan-500 text-black font-mono font-extrabold text-[9px] rounded -mt-4 shadow">
                    PLATE: {selectedSample.plateNumber} (Demo OCR: {(selectedSample.confidence * 100).toFixed(0)}%)
                  </span>
                </div>
              )}

              {/* Scanning Laser Sweep Effect */}
              {isScanning && (
                <div className="absolute inset-0 bg-cyan-950/40 backdrop-blur-xs flex items-center justify-center">
                  <div className="w-full h-1 bg-cyan-400 shadow-[0_0_25px_#06b6d4] animate-bounce"></div>
                  <span className="absolute px-3 py-1 bg-black/80 rounded-full text-cyan-300 font-mono text-xs border border-cyan-500">
                    INFERRING OCR MATRIX...
                  </span>
                </div>
              )}

              {/* Timestamp & Camera Watermark */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 font-mono text-[11px] text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>REC • {selectedSample.cameraNodeId} — {selectedSample.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Sample Test Bank Selector */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-slate-400 uppercase font-bold">
              Select Sample Camera Capture Bank:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              {SAMPLE_CAPTURES.map((sample) => {
                const isSel = selectedSample.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSel
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{sample.plateNumber}</div>
                    <div className="text-[10px] text-slate-500 truncate">{sample.cameraNodeId}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* OCR Result Card & Trajectory Jump Hook (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>EXTRACTED OCR TELEMETRY</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                DEMO CONFIDENCE: {(selectedSample.confidence * 100).toFixed(0)}%
              </span>
            </div>

            {/* Big Plate Number Display */}
            <div className="p-4 rounded-xl bg-slate-950 border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-center space-y-1">
              <div className="text-[10px] text-slate-500 font-bold tracking-widest">
                DETECTED LICENSE NUMBER
              </div>
              <div className="text-3xl font-black text-cyan-300 tracking-wider font-mono">
                {selectedSample.plateNumber}
              </div>
              <div className="text-[11px] text-slate-400">
                {selectedSample.vehicleColor} • {selectedSample.vehicleType}
              </div>
            </div>

            {/* Extracted Fields Table */}
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Camera Node ID:</span>
                <span className="text-white font-bold">{selectedSample.cameraNodeId} ({selectedSample.cameraName})</span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Detection Timestamp:</span>
                <span className="text-white font-bold">{selectedSample.timestamp}</span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Demo OCR Confidence:</span>
                <span className="text-emerald-400 font-bold">
                  {(selectedSample.confidence * 100).toFixed(1)}% (Simulated prototype score)
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Lane & Speed:</span>
                <span className="text-white font-bold">Lane {selectedSample.lane} • {selectedSample.speedKmh} km/h</span>
              </div>
            </div>

            {/* Reconstruct Multi-Camera Trajectory Button */}
            <button
              onClick={() => {
                onSelectVehicle(selectedSample.plateNumber);
                onNavigate('tracking');
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>RECONSTRUCT MULTI-CAMERA TRAJECTORY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
