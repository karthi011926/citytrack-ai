import React, { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import {
  CameraNode,
  RoadSegment,
  VehicleRecord,
  RoutePrediction,
  AnomalyAlert
} from '../../types';
import { CITY_CENTER } from '../../services/cityDataService';
import {
  Cctv,
  Navigation,
  Sparkles,
  AlertTriangle,
  Layers,
  MapPin,
  Clock,
  Gauge,
  Activity
} from 'lucide-react';

// Custom Map Controller to smoothly pan/zoom when target vehicle or camera changes
interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

const MapController: React.FC<MapControllerProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Helper to create HTML DivIcons for Leaflet
const createCameraIcon = (
  id: string,
  trafficLevel: 'Low' | 'Medium' | 'High' | 'Severe',
  isWaypoint: boolean = false,
  waypointIndex?: number
) => {
  const colors = {
    Low: 'border-emerald-500 bg-emerald-950/90 text-emerald-400 shadow-[0_0_12px_#10b981]',
    Medium: 'border-amber-500 bg-amber-950/90 text-amber-400 shadow-[0_0_12px_#f59e0b]',
    High: 'border-rose-500 bg-rose-950/90 text-rose-400 shadow-[0_0_15px_#f43f5e]',
    Severe: 'border-red-600 bg-red-950/90 text-red-400 shadow-[0_0_20px_#ef4444]'
  };

  const styleClass = isWaypoint
    ? 'border-cyan-400 bg-cyan-950 text-cyan-300 shadow-[0_0_18px_#06b6d4] scale-110 ring-2 ring-cyan-400 ring-offset-2 ring-offset-black'
    : colors[trafficLevel];

  const html = `
    <div class="relative flex items-center justify-center w-8 h-8 rounded-xl border-2 ${styleClass} font-mono font-bold text-xs transition-all cursor-pointer">
      ${isWaypoint && waypointIndex !== undefined ? `<span>#${waypointIndex + 1}</span>` : `<span>${id}</span>`}
      ${
        trafficLevel === 'Severe' || trafficLevel === 'High'
          ? '<span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>'
          : ''
      }
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-camera-node',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const createVehicleCurrentMarkerIcon = (plate: string) => {
  const html = `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-12 h-12 rounded-full bg-cyan-500/20 animate-ping"></div>
      <div class="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950 border-2 border-cyan-400 shadow-[0_0_20px_#06b6d4] text-cyan-200 font-mono text-xs font-bold whitespace-nowrap">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span>${plate}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-vehicle-marker',
    iconSize: [120, 36],
    iconAnchor: [60, 18],
    popupAnchor: [0, -18]
  });
};

interface CityMapProps {
  cameras: CameraNode[];
  roads?: RoadSegment[];
  selectedVehicle?: VehicleRecord | null;
  selectedCamera?: CameraNode | null;
  onSelectCamera?: (camera: CameraNode) => void;
  showCongestionLayers?: boolean;
  showPredictions?: boolean;
  showAnomalies?: boolean;
  activeAlerts?: AnomalyAlert[];
  mapHeight?: string;
  zoomLevel?: number;
}

export const CityMap: React.FC<CityMapProps> = ({
  cameras,
  roads = [],
  selectedVehicle,
  selectedCamera,
  onSelectCamera,
  showCongestionLayers = true,
  showPredictions = true,
  showAnomalies = true,
  activeAlerts = [],
  mapHeight = 'h-[580px]',
  zoomLevel = 13
}) => {
  // Determine map center
  const centerPos: [number, number] = useMemo(() => {
    if (selectedCamera) {
      return [selectedCamera.lat, selectedCamera.lng];
    }
    if (selectedVehicle && selectedVehicle.detections.length > 0) {
      const lastDet = selectedVehicle.detections[selectedVehicle.detections.length - 1];
      const cam = cameras.find((c) => c.id === lastDet.cameraNodeId);
      if (cam) return [cam.lat, cam.lng];
    }
    return CITY_CENTER;
  }, [selectedCamera, selectedVehicle, cameras]);

  // Construct trajectory coordinates for selected vehicle
  const vehicleTrajectoryCoords: [number, number][] = useMemo(() => {
    if (!selectedVehicle || selectedVehicle.detections.length === 0) return [];
    return selectedVehicle.detections
      .map((det) => {
        const cam = cameras.find((c) => c.id === det.cameraNodeId);
        return cam ? ([cam.lat, cam.lng] as [number, number]) : null;
      })
      .filter((coord): coord is [number, number] => coord !== null);
  }, [selectedVehicle, cameras]);

  // Get waypoint camera IDs
  const waypointCameraIds = useMemo(() => {
    if (!selectedVehicle) return new Set<string>();
    return new Set(selectedVehicle.detections.map((d) => d.cameraNodeId));
  }, [selectedVehicle]);

  return (
    <div className={`relative w-full ${mapHeight} rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F19] shadow-2xl`}>
      <MapContainer
        center={centerPos}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        className="w-full h-full dark-tiles z-0"
      >
        <MapController center={centerPos} zoom={zoomLevel} />

        {/* Dark CartoDB Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Road Congestion Polyline Layers */}
        {showCongestionLayers &&
          roads.map((road) => {
            const colors = {
              Low: '#10B981',
              Medium: '#F59E0B',
              High: '#F43F5E',
              Severe: '#DC2626'
            };
            const color = colors[road.congestionLevel];

            return (
              <Polyline
                key={road.id}
                positions={road.coordinates}
                pathOptions={{
                  color,
                  weight: road.congestionLevel === 'Severe' ? 5 : 3.5,
                  opacity: 0.65,
                  dashArray: road.congestionLevel === 'Severe' ? '6, 6' : undefined
                }}
              >
                <Popup>
                  <div className="p-2 space-y-1 font-mono text-xs">
                    <div className="font-bold text-white text-sm">{road.name}</div>
                    <div className="flex justify-between text-slate-400">
                      <span>Flow Rate:</span>
                      <span className="text-cyan-400 font-bold">{road.currentFlowRate} veh/hr</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Congestion:</span>
                      <span className={`font-bold text-${road.congestionLevel === 'Low' ? 'emerald' : road.congestionLevel === 'Medium' ? 'amber' : 'rose'}-400`}>
                        {road.congestionIndexPct}% ({road.congestionLevel})
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Est Speed:</span>
                      <span className="text-white">{road.avgSpeedKmh} km/h</span>
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

        {/* Actual Vehicle Trajectory Polyline (Cyan Solid Glow) */}
        {vehicleTrajectoryCoords.length > 1 && (
          <Polyline
            positions={vehicleTrajectoryCoords}
            pathOptions={{
              color: '#06B6D4',
              weight: 5,
              opacity: 0.95
            }}
          />
        )}

        {/* AI Predicted Future Trajectory Lines (Dashed Purple / Cyan) */}
        {showPredictions &&
          selectedVehicle &&
          selectedVehicle.predictedNextLocations &&
          selectedVehicle.predictedNextLocations.map((pred, i) => (
            <Polyline
              key={`pred-${i}`}
              positions={pred.pathCoordinates}
              pathOptions={{
                color: i === 0 ? '#A855F7' : '#06B6D4',
                weight: 4,
                dashArray: '8, 8',
                opacity: 0.85
              }}
            >
              <Popup>
                <div className="p-2.5 font-mono text-xs space-y-1.5 max-w-xs">
                  <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI PREDICTED NEXT ROUTE</span>
                  </div>
                  <div className="text-white font-bold text-sm">
                    ➔ {pred.targetCameraName} ({pred.targetCameraId})
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Probability:</span>
                    <span className="text-cyan-400 font-bold text-sm">{pred.probabilityPct}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>ETA:</span>
                    <span>~{pred.estimatedEtaMinutes} min ({pred.distanceKm} km)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    {pred.reasoning}
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}

        {/* Anomaly / Alert Location Rings */}
        {showAnomalies &&
          activeAlerts.map((alert) => {
            const cam = cameras.find((c) => c.id === alert.cameraNodeId);
            if (!cam) return null;
            return (
              <Circle
                key={alert.id}
                center={[cam.lat, cam.lng]}
                radius={280}
                pathOptions={{
                  color: alert.severity === 'CRITICAL' ? '#EF4444' : '#F59E0B',
                  fillColor: alert.severity === 'CRITICAL' ? '#EF4444' : '#F59E0B',
                  fillOpacity: 0.25,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="p-2.5 font-mono text-xs space-y-1.5 max-w-xs">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{alert.severity} ANOMALY ALERT</span>
                    </div>
                    <div className="text-white font-bold">{alert.title}</div>
                    <div className="text-[11px] text-slate-300">{alert.explanation}</div>
                  </div>
                </Popup>
              </Circle>
            );
          })}

        {/* Camera Markers */}
        {cameras.map((camera) => {
          const isWaypoint = waypointCameraIds.has(camera.id);
          let waypointIndex: number | undefined;

          if (selectedVehicle && isWaypoint) {
            waypointIndex = selectedVehicle.detections.findIndex(
              (d) => d.cameraNodeId === camera.id
            );
          }

          const icon = createCameraIcon(
            camera.id,
            camera.trafficLevel,
            isWaypoint,
            waypointIndex !== -1 ? waypointIndex : undefined
          );

          return (
            <Marker
              key={camera.id}
              position={[camera.lat, camera.lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (onSelectCamera) onSelectCamera(camera);
                }
              }}
            >
              <Popup>
                <div className="p-2.5 font-mono text-xs space-y-2 min-w-[220px]">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="font-bold text-cyan-400 text-sm">{camera.id}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        camera.status === 'ONLINE'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-amber-950 text-amber-400'
                      }`}
                    >
                      {camera.status}
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-white text-sm">{camera.name}</div>
                    <div className="text-[11px] text-slate-400">{camera.zone}</div>
                  </div>

                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div className="flex justify-between">
                      <span>Traffic Level:</span>
                      <span
                        className={`font-bold ${
                          camera.trafficLevel === 'Low'
                            ? 'text-emerald-400'
                            : camera.trafficLevel === 'Medium'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {camera.trafficLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flow Rate:</span>
                      <span className="text-white font-bold">{camera.currentFlowRatePerMin} veh/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Speed:</span>
                      <span className="text-white">{camera.avgSpeedKmh} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>24h Detections:</span>
                      <span className="text-cyan-400 font-bold">{camera.vehiclesDetected24h}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[10px]">
                      <span>Last Seen:</span>
                      <span>{camera.lastDetectionTime}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Selected Vehicle Current Location Marker */}
        {selectedVehicle && selectedVehicle.detections.length > 0 && (() => {
          const lastDet = selectedVehicle.detections[selectedVehicle.detections.length - 1];
          const cam = cameras.find((c) => c.id === lastDet.cameraNodeId);
          if (!cam) return null;

          return (
            <Marker
              position={[cam.lat, cam.lng]}
              icon={createVehicleCurrentMarkerIcon(selectedVehicle.plateNumber)}
            >
              <Popup>
                <div className="p-2.5 font-mono text-xs space-y-1.5">
                  <div className="text-cyan-400 font-bold text-sm">
                    {selectedVehicle.plateNumber}
                  </div>
                  <div className="text-white text-xs">
                    {selectedVehicle.vehicleColor} {selectedVehicle.vehicleType}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Last at: {cam.name} ({lastDet.timestamp})
                  </div>
                  <div className="text-emerald-400 font-bold text-xs">
                    Demo OCR Confidence: {(lastDet.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })()}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-[400] p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md font-mono text-[11px] space-y-1.5 shadow-2xl">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-cyan-400" />
          <span>GIS Map Telemetry (Simulated)</span>
        </div>
        <div className="flex flex-col gap-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#06b6d4]"></span>
            <span>Observed Trajectory Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-purple-500 border-dashed border-t border-purple-300 rounded-full shadow-[0_0_6px_#a855f7]"></span>
            <span>Demo AI Predicted Route</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Simulated High Congestion Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Optimal Flow Rate Node</span>
          </div>
        </div>
      </div>
    </div>
  );
};
