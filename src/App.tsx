import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DemoTourModal, DEMO_TOUR_STEPS } from './components/common/DemoTourModal';
import { OverviewView } from './components/views/OverviewView';
import { VehicleTrackingView } from './components/views/VehicleTrackingView';
import { PredictiveIntelligenceView } from './components/views/PredictiveIntelligenceView';
import { AlertCenterView } from './components/views/AlertCenterView';
import { WhatIfSimulationView } from './components/views/WhatIfSimulationView';
import { AnprScannerView } from './components/views/AnprScannerView';
import { CameraNetworkView } from './components/views/CameraNetworkView';
import { TrafficAnalyticsView } from './components/views/TrafficAnalyticsView';

import {
  CAMERA_NODES,
  ROAD_SEGMENTS,
  SAMPLE_VEHICLES_DATABASE,
  ACTIVE_ANOMALY_ALERTS,
  CITY_ANALYTICS,
  FEATURED_TARGET_VEHICLE
} from './services/cityDataService';
import { CameraNode, VehicleRecord } from './types';

export function App() {
  const [currentNav, setCurrentNav] = useState<string>('overview');
  const [selectedPlate, setSelectedPlate] = useState<string>('TN45AB1234');
  const [selectedCamera, setSelectedCamera] = useState<CameraNode>(CAMERA_NODES[0]);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [demoTourStepIdx, setDemoTourStepIdx] = useState<number>(0);
  const [simulationSurgeValue, setSimulationSurgeValue] = useState<number>(30);

  // Find currently selected vehicle record or fallback to featured vehicle
  const currentVehicle: VehicleRecord =
    SAMPLE_VEHICLES_DATABASE.find(
      (v) => v.plateNumber.toUpperCase() === selectedPlate.toUpperCase()
    ) || FEATURED_TARGET_VEHICLE;

  const handleSearchPlate = (plate: string) => {
    setSelectedPlate(plate);
    setCurrentNav('tracking');
  };

  const handleSelectCamera = (cam: CameraNode) => {
    setSelectedCamera(cam);
    setCurrentNav('cameras');
  };

  // Demo Tour Execution hook
  const handleExecuteTourStep = (step: (typeof DEMO_TOUR_STEPS)[0]) => {
    setCurrentNav(step.targetNav);
    if (step.targetPlate) {
      setSelectedPlate(step.targetPlate);
    }
    if (step.simulationSurge !== undefined) {
      setSimulationSurgeValue(step.simulationSurge);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans cyber-grid-bg">
      {/* Top Header */}
      <Header
        onSearchPlate={handleSearchPlate}
        onOpenDemoTour={() => setIsDemoTourOpen(true)}
        activeAlertsCount={ACTIVE_ANOMALY_ALERTS.length}
        currentNav={currentNav}
        onNavigate={setCurrentNav}
      />

      {/* Body Layout: Sidebar + Main Content View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentNav={currentNav}
          onNavigate={setCurrentNav}
          activeAlertCount={ACTIVE_ANOMALY_ALERTS.length}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {currentNav === 'overview' && (
            <OverviewView
              cameras={CAMERA_NODES}
              roads={ROAD_SEGMENTS}
              vehicles={SAMPLE_VEHICLES_DATABASE}
              alerts={ACTIVE_ANOMALY_ALERTS}
              analytics={CITY_ANALYTICS}
              onSelectVehicle={handleSearchPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'tracking' && (
            <VehicleTrackingView
              cameras={CAMERA_NODES}
              roads={ROAD_SEGMENTS}
              vehicles={SAMPLE_VEHICLES_DATABASE}
              selectedVehicle={currentVehicle}
              onSelectVehicle={setSelectedPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'predictions' && (
            <PredictiveIntelligenceView
              cameras={CAMERA_NODES}
              roads={ROAD_SEGMENTS}
              vehicles={SAMPLE_VEHICLES_DATABASE}
              selectedVehicle={currentVehicle}
              onSelectVehicle={setSelectedPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'alerts' && (
            <AlertCenterView
              alerts={ACTIVE_ANOMALY_ALERTS}
              onSelectVehicle={handleSearchPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'simulation' && (
            <WhatIfSimulationView
              cameras={CAMERA_NODES}
              roads={ROAD_SEGMENTS}
              initialSurge={simulationSurgeValue}
            />
          )}

          {currentNav === 'anpr' && (
            <AnprScannerView
              onSelectVehicle={handleSearchPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'cameras' && (
            <CameraNetworkView
              cameras={CAMERA_NODES}
              vehicles={SAMPLE_VEHICLES_DATABASE}
              onSelectCamera={handleSelectCamera}
              onSelectVehicle={handleSearchPlate}
              onNavigate={setCurrentNav}
            />
          )}

          {currentNav === 'analytics' && (
            <TrafficAnalyticsView
              analytics={CITY_ANALYTICS}
              cameras={CAMERA_NODES}
              roads={ROAD_SEGMENTS}
              onNavigate={setCurrentNav}
            />
          )}
        </main>
      </div>

      {/* 12-Step Presentation Tour Walkthrough Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentStepIndex={demoTourStepIdx}
        onSelectStep={setDemoTourStepIdx}
        onExecuteStepAction={handleExecuteTourStep}
      />
    </div>
  );
}

export default App;
