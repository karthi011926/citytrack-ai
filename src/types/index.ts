export type TrafficLevel = 'Low' | 'Medium' | 'High' | 'Severe';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type AnomalyType =
  | 'ROUTE_TIME_ANOMALY'
  | 'UNUSUAL_CORRIDOR'
  | 'HIGH_INTEREST_BOLO'
  | 'SUDDEN_CONGESTION_SPIKE'
  | 'CONGESTION_ESCALATION';

export interface CameraNode {
  id: string; // e.g. 'C01'
  name: string; // e.g. 'Main Central Junction'
  zone: string; // e.g. 'Downtown Core', 'Tech Park Corridor', 'Airport Gateway'
  lat: number;
  lng: number;
  status: 'ONLINE' | 'WARNING' | 'OFFLINE';
  trafficLevel: TrafficLevel;
  vehiclesDetected24h: number;
  currentFlowRatePerMin: number;
  avgSpeedKmh: number;
  lastDetectionTime: string;
  aiEngineStatus: 'OPTIMAL' | 'HIGH_LOAD' | 'CALIBRATING';
  cctvFeedUrl?: string;
  connectedRoads: string[];
}

export interface VehicleDetection {
  id: string;
  plateNumber: string;
  cameraNodeId: string;
  cameraName: string;
  timestamp: string;
  timestampRaw: number;
  confidence: number; // e.g. 0.96 (96%)
  vehicleType: 'Sedan' | 'SUV' | 'Commercial Truck' | 'Electric EV' | 'Transit Bus' | 'Motorbike';
  vehicleColor: string;
  speedEstimateKmh: number;
  laneNumber: number;
  snapshotMock: string;
  boundingBox?: { x: number; y: number; width: number; height: number };
}

export interface RoutePrediction {
  targetCameraId: string;
  targetCameraName: string;
  probabilityPct: number; // e.g. 72%
  estimatedEtaMinutes: number;
  distanceKm: number;
  congestionAhead: TrafficLevel;
  pathCoordinates: [number, number][];
  suggestedAlternativeRoute?: {
    viaCameraId: string;
    viaCameraName: string;
    timeSavedMinutes: number;
    reason: string;
  };
  reasoning: string;
}

export interface AnomalyAlert {
  id: string;
  alertType: AnomalyType;
  title: string;
  vehiclePlate?: string;
  cameraNodeId: string;
  cameraName: string;
  timestamp: string;
  severity: AlertSeverity;
  explanation: string;
  evidence: {
    previousCamera?: string;
    previousTimestamp?: string;
    nextCamera?: string;
    nextTimestamp?: string;
    timeDifferenceMinutes?: number;
    estimatedTransitMinutes?: number;
    expectedSpeedKmh?: number;
    observedSpeedKmh?: number;
  };
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  actionProtocol: string;
}

export interface VehicleRecord {
  plateNumber: string;
  vehicleType: 'Sedan' | 'SUV' | 'Commercial Truck' | 'Electric EV' | 'Transit Bus' | 'Motorbike';
  vehicleColor: string;
  firstSeenTime: string;
  lastSeenTime: string;
  totalDetections: number;
  currentCameraId: string;
  currentCameraName: string;
  isBoloTarget?: boolean;
  boloTag?: string;
  movementInsight: string;
  detections: VehicleDetection[];
  predictedNextLocations: RoutePrediction[];
  anomalyAlert?: AnomalyAlert;
  alternativeRouteNotice?: string;
}

export interface RoadSegment {
  id: string;
  name: string;
  fromCameraId: string;
  toCameraId: string;
  coordinates: [number, number][];
  baselineCapacityVehiclesPerHour: number;
  currentFlowRate: number;
  congestionIndexPct: number; // 0 - 100%
  congestionLevel: TrafficLevel;
  avgSpeedKmh: number;
}

export interface SimulationResult {
  junctionId: string;
  junctionName: string;
  surgePct: number;
  statusBefore: TrafficLevel;
  statusAfter: TrafficLevel;
  delayIncreaseMin: number;
  networkCongestionIndexBefore: number;
  networkCongestionIndexAfter: number;
  affectedRoads: {
    roadId: string;
    roadName: string;
    statusBefore: TrafficLevel;
    statusAfter: TrafficLevel;
    flowBefore: number;
    flowAfter: number;
    spilloverRisk: 'LOW' | 'MEDIUM' | 'CRITICAL';
  }[];
  mitigationRecommendation: string;
}

export interface CityAnalyticsSummary {
  totalVehiclesMonitored: number;
  activeCamerasCount: number;
  totalCamerasCount: number;
  currentCityTrafficIndex: TrafficLevel;
  activeAlertsCount: number;
  avgNetworkSpeedKmh: number;
  hourlyVehicleTrend: { hour: string; count: number; congestedCount: number }[];
  cameraDensityRanking: { cameraId: string; cameraName: string; count: number; trafficLevel: TrafficLevel }[];
  odFlowMatrix: { origin: string; destination: string; volume: number }[];
  vehicleTypeBreakdown: { type: string; count: number; percentage: number }[];
}
