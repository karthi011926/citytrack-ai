import {
  CameraNode,
  VehicleRecord,
  RoadSegment,
  AnomalyAlert,
  SimulationResult,
  CityAnalyticsSummary,
} from '../types';

// City Geo-Center coordinates (Metropolitan Urban Area)
export const CITY_CENTER: [number, number] = [13.0475, 80.2225];

// 20 Strategic CCTV / ANPR Camera Nodes across City Zones
export const CAMERA_NODES: CameraNode[] = [
  {
    id: 'C01',
    name: 'Central Junction Main Flyover',
    zone: 'Downtown Core',
    lat: 13.0520,
    lng: 80.2210,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 1842,
    currentFlowRatePerMin: 48,
    avgSpeedKmh: 24,
    lastDetectionTime: '10:42:15',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R01', 'R02', 'R05']
  },
  {
    id: 'C02',
    name: 'Airport Express Gateway North',
    zone: 'Airport Corridor',
    lat: 13.0280,
    lng: 80.2010,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 1623,
    currentFlowRatePerMin: 36,
    avgSpeedKmh: 58,
    lastDetectionTime: '10:41:50',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R03', 'R07']
  },
  {
    id: 'C03',
    name: 'Central Arterial Boulevard',
    zone: 'Downtown Core',
    lat: 13.0590,
    lng: 80.2310,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 1911,
    currentFlowRatePerMin: 52,
    avgSpeedKmh: 21,
    lastDetectionTime: '10:42:08',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R01', 'R04']
  },
  {
    id: 'C04',
    name: 'North Ring Road Interchange',
    zone: 'Ring Corridor North',
    lat: 13.0710,
    lng: 80.2150,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 1450,
    currentFlowRatePerMin: 38,
    avgSpeedKmh: 46,
    lastDetectionTime: '10:39:12',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R05', 'R08', 'R09']
  },
  {
    id: 'C05',
    name: 'North-East Bypass Gate',
    zone: 'Ring Corridor North',
    lat: 13.0810,
    lng: 80.2410,
    status: 'ONLINE',
    trafficLevel: 'Low',
    vehiclesDetected24h: 890,
    currentFlowRatePerMin: 22,
    avgSpeedKmh: 64,
    lastDetectionTime: '10:38:44',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R09', 'R10']
  },
  {
    id: 'C06',
    name: 'South Airport Arterial Toll',
    zone: 'Airport Corridor',
    lat: 13.0150,
    lng: 80.1920,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 1780,
    currentFlowRatePerMin: 44,
    avgSpeedKmh: 35,
    lastDetectionTime: '10:41:02',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R03', 'R06']
  },
  {
    id: 'C07',
    name: 'Tech Zone East Boulevard',
    zone: 'Tech Park Corridor',
    lat: 13.0390,
    lng: 80.2520,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 2105,
    currentFlowRatePerMin: 62,
    avgSpeedKmh: 28,
    lastDetectionTime: '10:42:30',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R04', 'R11', 'R12']
  },
  {
    id: 'C08',
    name: 'Innovation Tech Park Main Gate',
    zone: 'Tech Park Corridor',
    lat: 13.0295,
    lng: 80.2610,
    status: 'ONLINE',
    trafficLevel: 'Severe',
    vehiclesDetected24h: 2340,
    currentFlowRatePerMin: 70,
    avgSpeedKmh: 16,
    lastDetectionTime: '10:42:22',
    aiEngineStatus: 'HIGH_LOAD',
    connectedRoads: ['R11', 'R13']
  },
  {
    id: 'C09',
    name: 'Central Business District Plaza',
    zone: 'Downtown Core',
    lat: 13.0480,
    lng: 80.2330,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 2020,
    currentFlowRatePerMin: 55,
    avgSpeedKmh: 22,
    lastDetectionTime: '10:42:14',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R02', 'R12', 'R14']
  },
  {
    id: 'C10',
    name: 'Harbor Road Freight Link',
    zone: 'Industrial Port',
    lat: 13.0690,
    lng: 80.2620,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 1120,
    currentFlowRatePerMin: 30,
    avgSpeedKmh: 42,
    lastDetectionTime: '10:40:11',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R10', 'R15']
  },
  {
    id: 'C11',
    name: 'West Peripheral Ring Checkpoint',
    zone: 'Outer Bypass',
    lat: 13.0560,
    lng: 80.1850,
    status: 'ONLINE',
    trafficLevel: 'Low',
    vehiclesDetected24h: 760,
    currentFlowRatePerMin: 18,
    avgSpeedKmh: 68,
    lastDetectionTime: '10:39:55',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R08', 'R16']
  },
  {
    id: 'C12',
    name: 'Metro Transit Hub North Gate',
    zone: 'Downtown Core',
    lat: 13.0620,
    lng: 80.2190,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 1680,
    currentFlowRatePerMin: 49,
    avgSpeedKmh: 26,
    lastDetectionTime: '10:41:40',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R05', 'R17']
  },
  {
    id: 'C13',
    name: 'University Campus South Gate',
    zone: 'Institutional Zone',
    lat: 13.0360,
    lng: 80.2290,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 940,
    currentFlowRatePerMin: 27,
    avgSpeedKmh: 38,
    lastDetectionTime: '10:38:19',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R02', 'R18']
  },
  {
    id: 'C14',
    name: 'South Ring Radial Link',
    zone: 'Ring Corridor South',
    lat: 13.0180,
    lng: 80.2220,
    status: 'WARNING',
    trafficLevel: 'Severe',
    vehiclesDetected24h: 1890,
    currentFlowRatePerMin: 58,
    avgSpeedKmh: 14,
    lastDetectionTime: '10:42:01',
    aiEngineStatus: 'CALIBRATING',
    connectedRoads: ['R06', 'R18', 'R19']
  },
  {
    id: 'C15',
    name: 'Tech Zone West Avenue',
    zone: 'Tech Park Corridor',
    lat: 13.0340,
    lng: 80.2440,
    status: 'ONLINE',
    trafficLevel: 'High',
    vehiclesDetected24h: 1980,
    currentFlowRatePerMin: 54,
    avgSpeedKmh: 25,
    lastDetectionTime: '10:42:18',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R12', 'R18', 'R20']
  },
  {
    id: 'C16',
    name: 'Industrial Logistics Corridor',
    zone: 'Industrial Port',
    lat: 13.0780,
    lng: 80.2550,
    status: 'ONLINE',
    trafficLevel: 'Low',
    vehiclesDetected24h: 820,
    currentFlowRatePerMin: 20,
    avgSpeedKmh: 52,
    lastDetectionTime: '10:37:05',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R10', 'R15']
  },
  {
    id: 'C17',
    name: 'Heritage District Gateway',
    zone: 'Historic Center',
    lat: 13.0450,
    lng: 80.2110,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 1150,
    currentFlowRatePerMin: 32,
    avgSpeedKmh: 31,
    lastDetectionTime: '10:40:48',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R16', 'R17']
  },
  {
    id: 'C18',
    name: 'Coastal Boulevard Overpass',
    zone: 'Coastal Strip',
    lat: 13.0410,
    lng: 80.2710,
    status: 'ONLINE',
    trafficLevel: 'Low',
    vehiclesDetected24h: 910,
    currentFlowRatePerMin: 24,
    avgSpeedKmh: 62,
    lastDetectionTime: '10:39:10',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R13', 'R21']
  },
  {
    id: 'C19',
    name: 'Eco Park Southern Bypass',
    zone: 'Ring Corridor South',
    lat: 13.0090,
    lng: 80.2380,
    status: 'ONLINE',
    trafficLevel: 'Low',
    vehiclesDetected24h: 640,
    currentFlowRatePerMin: 16,
    avgSpeedKmh: 65,
    lastDetectionTime: '10:35:20',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R19', 'R22']
  },
  {
    id: 'C20',
    name: 'Expressway Interchange East',
    zone: 'Outer Bypass',
    lat: 13.0210,
    lng: 80.2680,
    status: 'ONLINE',
    trafficLevel: 'Medium',
    vehiclesDetected24h: 1420,
    currentFlowRatePerMin: 40,
    avgSpeedKmh: 54,
    lastDetectionTime: '10:41:15',
    aiEngineStatus: 'OPTIMAL',
    connectedRoads: ['R20', 'R21', 'R22']
  }
];

// City Road Segments with Baseline & Live Congestion
export const ROAD_SEGMENTS: RoadSegment[] = [
  {
    id: 'R01',
    name: 'Central Arterial Flyover Way',
    fromCameraId: 'C01',
    toCameraId: 'C03',
    coordinates: [[13.0520, 80.2210], [13.0555, 80.2260], [13.0590, 80.2310]],
    baselineCapacityVehiclesPerHour: 2200,
    currentFlowRate: 2050,
    congestionIndexPct: 88,
    congestionLevel: 'High',
    avgSpeedKmh: 22
  },
  {
    id: 'R02',
    name: 'CBD Transit Link Road',
    fromCameraId: 'C01',
    toCameraId: 'C09',
    coordinates: [[13.0520, 80.2210], [13.0500, 80.2270], [13.0480, 80.2330]],
    baselineCapacityVehiclesPerHour: 2000,
    currentFlowRate: 1850,
    congestionIndexPct: 85,
    congestionLevel: 'High',
    avgSpeedKmh: 24
  },
  {
    id: 'R03',
    name: 'Airport Main Expressway',
    fromCameraId: 'C02',
    toCameraId: 'C06',
    coordinates: [[13.0280, 80.2010], [13.0215, 80.1965], [13.0150, 80.1920]],
    baselineCapacityVehiclesPerHour: 3200,
    currentFlowRate: 2400,
    congestionIndexPct: 68,
    congestionLevel: 'Medium',
    avgSpeedKmh: 52
  },
  {
    id: 'R04',
    name: 'Tech Corridor Link East',
    fromCameraId: 'C03',
    toCameraId: 'C07',
    coordinates: [[13.0590, 80.2310], [13.0490, 80.2415], [13.0390, 80.2520]],
    baselineCapacityVehiclesPerHour: 2400,
    currentFlowRate: 2250,
    congestionIndexPct: 90,
    congestionLevel: 'Severe',
    avgSpeedKmh: 18
  },
  {
    id: 'R05',
    name: 'North Ring Radial Expressway',
    fromCameraId: 'C01',
    toCameraId: 'C04',
    coordinates: [[13.0520, 80.2210], [13.0615, 80.2180], [13.0710, 80.2150]],
    baselineCapacityVehiclesPerHour: 2600,
    currentFlowRate: 1750,
    congestionIndexPct: 62,
    congestionLevel: 'Medium',
    avgSpeedKmh: 45
  },
  {
    id: 'R08',
    name: 'North-West Outer Link',
    fromCameraId: 'C04',
    toCameraId: 'C11',
    coordinates: [[13.0710, 80.2150], [13.0635, 80.2000], [13.0560, 80.1850]],
    baselineCapacityVehiclesPerHour: 1800,
    currentFlowRate: 720,
    congestionIndexPct: 35,
    congestionLevel: 'Low',
    avgSpeedKmh: 68
  },
  {
    id: 'R09',
    name: 'North Ring Bypass Way',
    fromCameraId: 'C04',
    toCameraId: 'C05',
    coordinates: [[13.0710, 80.2150], [13.0760, 80.2280], [13.0810, 80.2410]],
    baselineCapacityVehiclesPerHour: 1800,
    currentFlowRate: 680,
    congestionIndexPct: 30,
    congestionLevel: 'Low',
    avgSpeedKmh: 65
  },
  {
    id: 'R11',
    name: 'Innovation Parkway Tech Hub',
    fromCameraId: 'C07',
    toCameraId: 'C08',
    coordinates: [[13.0390, 80.2520], [13.0342, 80.2565], [13.0295, 80.2610]],
    baselineCapacityVehiclesPerHour: 2500,
    currentFlowRate: 2480,
    congestionIndexPct: 96,
    congestionLevel: 'Severe',
    avgSpeedKmh: 14
  },
  {
    id: 'R12',
    name: 'Central Tech Crosslink',
    fromCameraId: 'C09',
    toCameraId: 'C15',
    coordinates: [[13.0480, 80.2330], [13.0410, 80.2385], [13.0340, 80.2440]],
    baselineCapacityVehiclesPerHour: 2200,
    currentFlowRate: 1980,
    congestionIndexPct: 86,
    congestionLevel: 'High',
    avgSpeedKmh: 24
  },
  {
    id: 'R13',
    name: 'Coastline Connector',
    fromCameraId: 'C08',
    toCameraId: 'C18',
    coordinates: [[13.0295, 80.2610], [13.0352, 80.2660], [13.0410, 80.2710]],
    baselineCapacityVehiclesPerHour: 1600,
    currentFlowRate: 650,
    congestionIndexPct: 32,
    congestionLevel: 'Low',
    avgSpeedKmh: 60
  },
  {
    id: 'R17',
    name: 'Metro Link Corridor',
    fromCameraId: 'C12',
    toCameraId: 'C01',
    coordinates: [[13.0620, 80.2190], [13.0570, 80.2200], [13.0520, 80.2210]],
    baselineCapacityVehiclesPerHour: 2100,
    currentFlowRate: 1820,
    congestionIndexPct: 82,
    congestionLevel: 'High',
    avgSpeedKmh: 27
  },
  {
    id: 'R18',
    name: 'Campus Radial Avenue',
    fromCameraId: 'C13',
    toCameraId: 'C15',
    coordinates: [[13.0360, 80.2290], [13.0350, 80.2365], [13.0340, 80.2440]],
    baselineCapacityVehiclesPerHour: 1700,
    currentFlowRate: 1100,
    congestionIndexPct: 58,
    congestionLevel: 'Medium',
    avgSpeedKmh: 40
  },
  {
    id: 'R20',
    name: 'Expressway Hub Extension',
    fromCameraId: 'C15',
    toCameraId: 'C20',
    coordinates: [[13.0340, 80.2440], [13.0275, 80.2560], [13.0210, 80.2680]],
    baselineCapacityVehiclesPerHour: 2200,
    currentFlowRate: 1450,
    congestionIndexPct: 60,
    congestionLevel: 'Medium',
    avgSpeedKmh: 50
  }
];

// Core Featured Target Vehicle TN45AB1234
export const FEATURED_TARGET_VEHICLE: VehicleRecord = {
  plateNumber: 'TN45AB1234',
  vehicleType: 'Sedan',
  vehicleColor: 'Deep Obsidian Black',
  firstSeenTime: '09:58:10',
  lastSeenTime: '10:39:50',
  totalDetections: 4,
  currentCameraId: 'C15',
  currentCameraName: 'Tech Zone West Avenue',
  movementInsight:
    'Demo AI Pattern Analysis: Vehicle demonstrates a recurring multi-point commute pattern between OBSERVED camera C04 (North Ring) and OBSERVED camera C15 (Tech Zone) during weekday peak windows (10:00 - 11:00 AM). Travel corridor velocity remains within normal standard deviations except for detected segment anomaly between C04 and C09.',
  detections: [
    {
      id: 'DET-TN45-01',
      plateNumber: 'TN45AB1234',
      cameraNodeId: 'C01',
      cameraName: 'Central Junction Main Flyover',
      timestamp: '10:02:40',
      timestampRaw: 1727411560000,
      confidence: 0.98,
      vehicleType: 'Sedan',
      vehicleColor: 'Deep Obsidian Black',
      speedEstimateKmh: 28,
      laneNumber: 2,
      snapshotMock: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80',
      boundingBox: { x: 38, y: 52, width: 24, height: 12 }
    },
    {
      id: 'DET-TN45-02',
      plateNumber: 'TN45AB1234',
      cameraNodeId: 'C04',
      cameraName: 'North Ring Road Interchange',
      timestamp: '10:15:18',
      timestampRaw: 1727412318000,
      confidence: 0.97,
      vehicleType: 'Sedan',
      vehicleColor: 'Deep Obsidian Black',
      speedEstimateKmh: 48,
      laneNumber: 1,
      snapshotMock: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80',
      boundingBox: { x: 42, y: 55, width: 22, height: 11 }
    },
    {
      id: 'DET-TN45-03',
      plateNumber: 'TN45AB1234',
      cameraNodeId: 'C09',
      cameraName: 'Central Business District Plaza',
      timestamp: '10:27:14',
      timestampRaw: 1727413034000,
      confidence: 0.96,
      vehicleType: 'Sedan',
      vehicleColor: 'Deep Obsidian Black',
      speedEstimateKmh: 24,
      laneNumber: 3,
      snapshotMock: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80',
      boundingBox: { x: 40, y: 50, width: 25, height: 12 }
    },
    {
      id: 'DET-TN45-04',
      plateNumber: 'TN45AB1234',
      cameraNodeId: 'C15',
      cameraName: 'Tech Zone West Avenue',
      timestamp: '10:39:50',
      timestampRaw: 1727413790000,
      confidence: 0.95,
      vehicleType: 'Sedan',
      vehicleColor: 'Deep Obsidian Black',
      speedEstimateKmh: 26,
      laneNumber: 2,
      snapshotMock: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=400&q=80',
      boundingBox: { x: 39, y: 54, width: 23, height: 11 }
    }
  ],
  predictedNextLocations: [
    {
      targetCameraId: 'C12',
      targetCameraName: 'Metro Transit Hub North Gate',
      probabilityPct: 72,
      estimatedEtaMinutes: 4.2,
      distanceKm: 2.1,
      congestionAhead: 'High',
      pathCoordinates: [[13.0340, 80.2440], [13.0480, 80.2330], [13.0620, 80.2190]],
      suggestedAlternativeRoute: {
        viaCameraId: 'C11',
        viaCameraName: 'West Peripheral Ring Checkpoint',
        timeSavedMinutes: 8.5,
        reason: 'Current Central Arterial is operating at 88% capacity. Taking Western Bypass avoids CBD choke points.'
      },
      reasoning: 'Demo AI Prediction: Markov transition matrix indicates a 72% likelihood based on previous weekday trajectories.'
    },
    {
      targetCameraId: 'C15',
      targetCameraName: 'Tech Zone West Avenue',
      probabilityPct: 18,
      estimatedEtaMinutes: 6.8,
      distanceKm: 3.4,
      congestionAhead: 'High',
      pathCoordinates: [[13.0340, 80.2440], [13.0410, 80.2385], [13.0340, 80.2440]],
      reasoning: 'Demo AI Prediction: Secondary transition toward tech corridor work campuses.'
    },
    {
      targetCameraId: 'C11',
      targetCameraName: 'West Peripheral Ring Checkpoint',
      probabilityPct: 10,
      estimatedEtaMinutes: 9.1,
      distanceKm: 4.9,
      congestionAhead: 'Low',
      pathCoordinates: [[13.0340, 80.2440], [13.0520, 80.2090], [13.0560, 80.1850]],
      reasoning: 'Demo AI Prediction: Alternative bypass exit toward outer ring perimeter.'
    }
  ],
  anomalyAlert: {
    id: 'ALT-2026-901',
    alertType: 'ROUTE_TIME_ANOMALY',
    title: 'Explainable Observed Travel Time Inconsistency',
    vehiclePlate: 'TN45AB1234',
    cameraNodeId: 'C09',
    cameraName: 'Central Business District Plaza',
    timestamp: '10:27:14',
    severity: 'HIGH',
    explanation:
      'The observed transit interval (11.93 minutes between OBSERVED camera C04 at 10:15:18 and OBSERVED camera C09 at 10:27:14) is significantly lower than the estimated transit time (18.20 minutes under current simulated high CBD congestion). This indicates sustained high speed (>68 km/h in a 35 km/h urban corridor) or an unmonitored detour bypassing congested arterial junctions. (Note: Future destinations like C12 are model PREDICTIONS and not evaluated as observed travel anomalies).',
    evidence: {
      previousCamera: 'OBSERVED: C04 (North Ring Road Interchange)',
      previousTimestamp: '10:15:18',
      nextCamera: 'OBSERVED: C09 (Central Business District Plaza)',
      nextTimestamp: '10:27:14',
      timeDifferenceMinutes: 11.93,
      estimatedTransitMinutes: 18.20,
      expectedSpeedKmh: 24,
      observedSpeedKmh: 68
    },
    status: 'ACTIVE',
    actionProtocol: 'Dispatch traffic intersection unit to verify vehicle visual signature and plate legitimacy.'
  },
  alternativeRouteNotice:
    'Vehicle TN45AB1234 is approaching high-density corridor C09 ➔ C15 (Central Avenue: 86% simulated congestion). System recommends dynamic diversion via PREDICTED alternative node C11 (Outer Bypass) saving ~14 minutes.'
};

// 60+ Realistic Simulated Vehicles Bank
export const SAMPLE_VEHICLES_DATABASE: VehicleRecord[] = [
  FEATURED_TARGET_VEHICLE,
  {
    plateNumber: 'KA01MJ9081',
    vehicleType: 'SUV',
    vehicleColor: 'Titanium Silver',
    firstSeenTime: '08:45:10',
    lastSeenTime: '10:38:00',
    totalDetections: 6,
    currentCameraId: 'C08',
    currentCameraName: 'Innovation Tech Park Main Gate',
    isBoloTarget: true,
    boloTag: 'HIGH-INTEREST BOLO #882',
    movementInsight:
      'High-Interest Watchlist Hit: Vehicle entered Tech Corridor via C07 and parked at C08 perimeter. Consistent with reported priority alert.',
    detections: [
      {
        id: 'DET-KA01-01',
        plateNumber: 'KA01MJ9081',
        cameraNodeId: 'C02',
        cameraName: 'Airport Express Gateway North',
        timestamp: '08:45:10',
        timestampRaw: 1727406910000,
        confidence: 0.99,
        vehicleType: 'SUV',
        vehicleColor: 'Titanium Silver',
        speedEstimateKmh: 56,
        laneNumber: 1,
        snapshotMock: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80'
      },
      {
        id: 'DET-KA01-02',
        plateNumber: 'KA01MJ9081',
        cameraNodeId: 'C07',
        cameraName: 'Tech Zone East Boulevard',
        timestamp: '09:22:30',
        timestampRaw: 1727409150000,
        confidence: 0.97,
        vehicleType: 'SUV',
        vehicleColor: 'Titanium Silver',
        speedEstimateKmh: 32,
        laneNumber: 2,
        snapshotMock: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80'
      },
      {
        id: 'DET-KA01-03',
        plateNumber: 'KA01MJ9081',
        cameraNodeId: 'C08',
        cameraName: 'Innovation Tech Park Main Gate',
        timestamp: '10:38:00',
        timestampRaw: 1727413680000,
        confidence: 0.98,
        vehicleType: 'SUV',
        vehicleColor: 'Titanium Silver',
        speedEstimateKmh: 15,
        laneNumber: 1,
        snapshotMock: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: 'C18',
        targetCameraName: 'Coastal Boulevard Overpass',
        probabilityPct: 65,
        estimatedEtaMinutes: 8.0,
        distanceKm: 4.1,
        congestionAhead: 'Low',
        pathCoordinates: [[13.0295, 80.2610], [13.0352, 80.2660], [13.0410, 80.2710]],
        reasoning: 'Eastbound corridor clearance probability.'
      },
      {
        targetCameraId: 'C20',
        targetCameraName: 'Expressway Interchange East',
        probabilityPct: 35,
        estimatedEtaMinutes: 11.2,
        distanceKm: 5.6,
        congestionAhead: 'Medium',
        pathCoordinates: [[13.0295, 80.2610], [13.0250, 80.2640], [13.0210, 80.2680]],
        reasoning: 'Peripheral exit towards coastal expressway.'
      }
    ],
    anomalyAlert: {
      id: 'ALT-2026-902',
      alertType: 'HIGH_INTEREST_BOLO',
      title: 'Configured High-Interest BOLO Alert Triggered',
      vehiclePlate: 'KA01MJ9081',
      cameraNodeId: 'C08',
      cameraName: 'Innovation Tech Park Main Gate',
      timestamp: '10:38:00',
      severity: 'CRITICAL',
      explanation:
        'License plate KA01MJ9081 matches active high-priority alert watch catalog. Detected moving at slow speed (15 km/h) through Tech Park Gate 1.',
      evidence: {
        previousCamera: 'C07 (Tech Zone East)',
        previousTimestamp: '09:22:30',
        nextCamera: 'C08 (Innovation Tech Park)',
        nextTimestamp: '10:38:00'
      },
      status: 'ACTIVE',
      actionProtocol: 'Notify perimeter dispatch and maintain autonomous video tracking.'
    }
  },
  {
    plateNumber: 'MH02CZ4490',
    vehicleType: 'Commercial Truck',
    vehicleColor: 'Freight Blue',
    firstSeenTime: '06:10:00',
    lastSeenTime: '10:40:11',
    totalDetections: 5,
    currentCameraId: 'C10',
    currentCameraName: 'Harbor Road Freight Link',
    movementInsight:
      'Industrial Logistics Flow: Continuous movement along Port and North Bypass freight corridors. Heavy load velocity profile.',
    detections: [
      {
        id: 'DET-MH02-01',
        plateNumber: 'MH02CZ4490',
        cameraNodeId: 'C05',
        cameraName: 'North-East Bypass Gate',
        timestamp: '09:12:00',
        timestampRaw: 1727408520000,
        confidence: 0.94,
        vehicleType: 'Commercial Truck',
        vehicleColor: 'Freight Blue',
        speedEstimateKmh: 54,
        laneNumber: 3,
        snapshotMock: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80'
      },
      {
        id: 'DET-MH02-02',
        plateNumber: 'MH02CZ4490',
        cameraNodeId: 'C10',
        cameraName: 'Harbor Road Freight Link',
        timestamp: '10:40:11',
        timestampRaw: 1727413811000,
        confidence: 0.95,
        vehicleType: 'Commercial Truck',
        vehicleColor: 'Freight Blue',
        speedEstimateKmh: 42,
        laneNumber: 3,
        snapshotMock: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: 'C16',
        targetCameraName: 'Industrial Logistics Corridor',
        probabilityPct: 82,
        estimatedEtaMinutes: 5.5,
        distanceKm: 3.2,
        congestionAhead: 'Low',
        pathCoordinates: [[13.0690, 80.2620], [13.0735, 80.2585], [13.0780, 80.2550]],
        reasoning: 'Primary designated commercial heavy-vehicle freight corridor.'
      }
    ]
  },
  {
    plateNumber: 'DL04TR7721',
    vehicleType: 'Electric EV',
    vehicleColor: 'Pearl White',
    firstSeenTime: '09:00:22',
    lastSeenTime: '10:41:02',
    totalDetections: 5,
    currentCameraId: 'C06',
    currentCameraName: 'South Airport Arterial Toll',
    movementInsight:
      'Rapid Transit Corridor: High-speed commuter trajectory between Airport Gateway and Downtown arterial.',
    detections: [
      {
        id: 'DET-DL04-01',
        plateNumber: 'DL04TR7721',
        cameraNodeId: 'C02',
        cameraName: 'Airport Express Gateway North',
        timestamp: '10:20:15',
        timestampRaw: 1727412615000,
        confidence: 0.98,
        vehicleType: 'Electric EV',
        vehicleColor: 'Pearl White',
        speedEstimateKmh: 64,
        laneNumber: 1,
        snapshotMock: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80'
      },
      {
        id: 'DET-DL04-02',
        plateNumber: 'DL04TR7721',
        cameraNodeId: 'C06',
        cameraName: 'South Airport Arterial Toll',
        timestamp: '10:41:02',
        timestampRaw: 1727413862000,
        confidence: 0.99,
        vehicleType: 'Electric EV',
        vehicleColor: 'Pearl White',
        speedEstimateKmh: 42,
        laneNumber: 2,
        snapshotMock: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: 'C14',
        targetCameraName: 'South Ring Radial Link',
        probabilityPct: 78,
        estimatedEtaMinutes: 6.0,
        distanceKm: 3.5,
        congestionAhead: 'Severe',
        pathCoordinates: [[13.0150, 80.1920], [13.0165, 80.2070], [13.0180, 80.2220]],
        reasoning: 'Airport radial connector outbound flow.'
      }
    ]
  },
  {
    plateNumber: 'AP09XY9988',
    vehicleType: 'Transit Bus',
    vehicleColor: 'Urban Emerald Green',
    firstSeenTime: '07:30:00',
    lastSeenTime: '10:42:08',
    totalDetections: 8,
    currentCameraId: 'C03',
    currentCameraName: 'Central Arterial Boulevard',
    movementInsight:
      'Scheduled Transit Corridor: High-frequency bus lane sequence repeating every 45 minutes along Central Boulevard.',
    detections: [
      {
        id: 'DET-AP09-01',
        plateNumber: 'AP09XY9988',
        cameraNodeId: 'C01',
        cameraName: 'Central Junction Main Flyover',
        timestamp: '10:18:40',
        timestampRaw: 1727412520000,
        confidence: 0.99,
        vehicleType: 'Transit Bus',
        vehicleColor: 'Urban Emerald Green',
        speedEstimateKmh: 20,
        laneNumber: 1,
        snapshotMock: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80'
      },
      {
        id: 'DET-AP09-02',
        plateNumber: 'AP09XY9988',
        cameraNodeId: 'C03',
        cameraName: 'Central Arterial Boulevard',
        timestamp: '10:42:08',
        timestampRaw: 1727413928000,
        confidence: 0.98,
        vehicleType: 'Transit Bus',
        vehicleColor: 'Urban Emerald Green',
        speedEstimateKmh: 22,
        laneNumber: 1,
        snapshotMock: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: 'C07',
        targetCameraName: 'Tech Zone East Boulevard',
        probabilityPct: 88,
        estimatedEtaMinutes: 7.2,
        distanceKm: 3.1,
        congestionAhead: 'High',
        pathCoordinates: [[13.0590, 80.2310], [13.0490, 80.2415], [13.0390, 80.2520]],
        reasoning: 'Fixed public transit bus schedule route.'
      }
    ]
  },
  {
    plateNumber: 'HR26BR5500',
    vehicleType: 'SUV',
    vehicleColor: 'Midnight Blue',
    firstSeenTime: '09:40:15',
    lastSeenTime: '10:42:30',
    totalDetections: 4,
    currentCameraId: 'C07',
    currentCameraName: 'Tech Zone East Boulevard',
    movementInsight: 'Expressway inbound flow toward IT corridor tech hub.',
    detections: [
      {
        id: 'DET-HR26-01',
        plateNumber: 'HR26BR5500',
        cameraNodeId: 'C07',
        cameraName: 'Tech Zone East Boulevard',
        timestamp: '10:42:30',
        timestampRaw: 1727413950000,
        confidence: 0.97,
        vehicleType: 'SUV',
        vehicleColor: 'Midnight Blue',
        speedEstimateKmh: 26,
        laneNumber: 2,
        snapshotMock: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: 'C08',
        targetCameraName: 'Innovation Tech Park Main Gate',
        probabilityPct: 70,
        estimatedEtaMinutes: 3.8,
        distanceKm: 1.8,
        congestionAhead: 'Severe',
        pathCoordinates: [[13.0390, 80.2520], [13.0342, 80.2565], [13.0295, 80.2610]],
        reasoning: 'Direct Tech Park arterial flow.'
      }
    ]
  }
];

// Populate 55 additional simulated vehicles for rich search and filtering
const PREFIXES = ['TN01', 'TN02', 'TN07', 'TN09', 'TN22', 'KL07', 'KA04', 'MH12', 'TS08', 'DL01'];
const TYPES: ('Sedan' | 'SUV' | 'Commercial Truck' | 'Electric EV' | 'Motorbike')[] = [
  'Sedan',
  'SUV',
  'Commercial Truck',
  'Electric EV',
  'Motorbike'
];
const COLORS = ['Midnight Black', 'Metallic Silver', 'Glacier White', 'Cobalt Blue', 'Crimson Red', 'Graphite Grey'];

for (let i = 1; i <= 50; i++) {
  const prefix = PREFIXES[i % PREFIXES.length];
  const char1 = String.fromCharCode(65 + (i % 26));
  const char2 = String.fromCharCode(65 + ((i + 5) % 26));
  const num = 1000 + i * 73;
  const plate = `${prefix}${char1}${char2}${num}`;
  const vType = TYPES[i % TYPES.length];
  const vColor = COLORS[i % COLORS.length];

  const camA = CAMERA_NODES[i % CAMERA_NODES.length];
  const camB = CAMERA_NODES[(i + 3) % CAMERA_NODES.length];
  const camC = CAMERA_NODES[(i + 7) % CAMERA_NODES.length];

  SAMPLE_VEHICLES_DATABASE.push({
    plateNumber: plate,
    vehicleType: vType,
    vehicleColor: vColor,
    firstSeenTime: `08:${(10 + (i % 40)).toString().padStart(2, '0')}:00`,
    lastSeenTime: `10:${(20 + (i % 22)).toString().padStart(2, '0')}:15`,
    totalDetections: 3 + (i % 4),
    currentCameraId: camC.id,
    currentCameraName: camC.name,
    movementInsight: `Urban Transit Pattern: Regular cross-zone commuter detected across ${camA.zone} and ${camC.zone}.`,
    detections: [
      {
        id: `DET-${i}-1`,
        plateNumber: plate,
        cameraNodeId: camA.id,
        cameraName: camA.name,
        timestamp: `09:${(10 + (i % 30)).toString().padStart(2, '0')}:10`,
        timestampRaw: Date.now() - 3600000 + i * 30000,
        confidence: 0.92 + (i % 8) * 0.01,
        vehicleType: vType,
        vehicleColor: vColor,
        speedEstimateKmh: 35 + (i % 30),
        laneNumber: (i % 3) + 1,
        snapshotMock: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80'
      },
      {
        id: `DET-${i}-2`,
        plateNumber: plate,
        cameraNodeId: camB.id,
        cameraName: camB.name,
        timestamp: `09:${(35 + (i % 20)).toString().padStart(2, '0')}:45`,
        timestampRaw: Date.now() - 1800000 + i * 30000,
        confidence: 0.94 + (i % 5) * 0.01,
        vehicleType: vType,
        vehicleColor: vColor,
        speedEstimateKmh: 40 + (i % 25),
        laneNumber: (i % 2) + 1,
        snapshotMock: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80'
      },
      {
        id: `DET-${i}-3`,
        plateNumber: plate,
        cameraNodeId: camC.id,
        cameraName: camC.name,
        timestamp: `10:${(20 + (i % 22)).toString().padStart(2, '0')}:15`,
        timestampRaw: Date.now() - 300000 + i * 3000,
        confidence: 0.95 + (i % 4) * 0.01,
        vehicleType: vType,
        vehicleColor: vColor,
        speedEstimateKmh: 30 + (i % 35),
        laneNumber: (i % 3) + 1,
        snapshotMock: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80'
      }
    ],
    predictedNextLocations: [
      {
        targetCameraId: camA.id,
        targetCameraName: camA.name,
        probabilityPct: 60 + (i % 30),
        estimatedEtaMinutes: 5 + (i % 6),
        distanceKm: 2.5 + (i % 4),
        congestionAhead: camA.trafficLevel,
        pathCoordinates: [[camC.lat, camC.lng], [camA.lat, camA.lng]],
        reasoning: 'Markov transition frequency projection based on current lane vector.'
      }
    ]
  });
}

// System Active Anomaly Alerts List (6 Explanatory Alerts)
export const ACTIVE_ANOMALY_ALERTS: AnomalyAlert[] = [
  {
    id: 'ALT-2026-901',
    alertType: 'ROUTE_TIME_ANOMALY',
    title: 'Explainable Observed Travel Time Inconsistency',
    vehiclePlate: 'TN45AB1234',
    cameraNodeId: 'C09',
    cameraName: 'Central Business District Plaza',
    timestamp: '10:27:14',
    severity: 'HIGH',
    explanation:
      'The observed transit interval (11.93 minutes between OBSERVED camera C04 at 10:15:18 and OBSERVED camera C09 at 10:27:14) is significantly lower than the estimated transit time (18.20 minutes under current simulated high CBD congestion). This indicates sustained high speed (>68 km/h in a 35 km/h urban corridor) or an unmonitored detour bypassing congested arterial junctions. (Note: Future destinations like C12 are model PREDICTIONS and not evaluated as observed travel anomalies).',
    evidence: {
      previousCamera: 'OBSERVED: C04 (North Ring Road Interchange)',
      previousTimestamp: '10:15:18',
      nextCamera: 'OBSERVED: C09 (Central Business District Plaza)',
      nextTimestamp: '10:27:14',
      timeDifferenceMinutes: 11.93,
      estimatedTransitMinutes: 18.20,
      expectedSpeedKmh: 24,
      observedSpeedKmh: 68
    },
    status: 'ACTIVE',
    actionProtocol: 'Dispatch traffic intersection unit to verify vehicle visual signature and plate legitimacy.'
  },
  {
    id: 'ALT-2026-902',
    alertType: 'HIGH_INTEREST_BOLO',
    title: 'Configured High-Interest Watchlist Hit',
    vehiclePlate: 'KA01MJ9081',
    cameraNodeId: 'C08',
    cameraName: 'Innovation Tech Park Main Gate',
    timestamp: '10:38:00',
    severity: 'CRITICAL',
    explanation:
      'License plate KA01MJ9081 matches active high-priority alert watch catalog (Tag #882). Detected slowing down (15 km/h) at Innovation Tech Park Gate 1.',
    evidence: {
      previousCamera: 'OBSERVED: C07 (Tech Zone East Boulevard)',
      previousTimestamp: '09:22:30',
      nextCamera: 'OBSERVED: C08 (Innovation Tech Park Main Gate)',
      nextTimestamp: '10:38:00',
      expectedSpeedKmh: 40,
      observedSpeedKmh: 15
    },
    status: 'ACTIVE',
    actionProtocol: 'Notify perimeter dispatch and maintain autonomous video tracking.'
  },
  {
    id: 'ALT-2026-903',
    alertType: 'UNUSUAL_CORRIDOR',
    title: 'Unusual Off-Hours Heavy Logistics Movement',
    vehiclePlate: 'MH02CZ4490',
    cameraNodeId: 'C16',
    cameraName: 'Industrial Logistics Corridor',
    timestamp: '10:40:11',
    severity: 'MEDIUM',
    explanation:
      'Heavy commercial freight vehicle MH02CZ4490 entered restricted inner perimeter road R10 outside designated heavy freight transport window (02:00 - 06:00).',
    evidence: {
      previousCamera: 'OBSERVED: C05 (North-East Bypass Gate)',
      previousTimestamp: '09:12:00',
      nextCamera: 'OBSERVED: C10 (Harbor Road Freight Link)',
      nextTimestamp: '10:40:11'
    },
    status: 'ACTIVE',
    actionProtocol: 'Log environmental compliance infraction and flag at toll barrier.'
  },
  {
    id: 'ALT-2026-904',
    alertType: 'SUDDEN_CONGESTION_SPIKE',
    title: 'Sudden Congestion Volume Surge Detected',
    cameraNodeId: 'C01',
    cameraName: 'Central Junction Main Flyover',
    timestamp: '10:42:00',
    severity: 'HIGH',
    explanation:
      'Vehicle ingress rate increased by +42% over the last 15 minutes (from 34 to 48 vehicles/min). Queue length on feeder road R01 has reached 850m under simulated current conditions.',
    evidence: {
      estimatedTransitMinutes: 6.0,
      observedSpeedKmh: 16
    },
    status: 'ACTIVE',
    actionProtocol: 'Initiate dynamic green-light signal timing cycle elongation on North-South corridor.'
  },
  {
    id: 'ALT-2026-905',
    alertType: 'CONGESTION_ESCALATION',
    title: 'Downstream Congestion Cascade Propagation',
    cameraNodeId: 'C14',
    cameraName: 'South Ring Radial Link',
    timestamp: '10:42:01',
    severity: 'CRITICAL',
    explanation:
      'Severe bottleneck at C14 has cascaded back 1.8km to C06 (Airport Arterial), causing simulated average corridor travel speeds to drop from 48 km/h to 14 km/h.',
    evidence: {
      timeDifferenceMinutes: 12.0,
      estimatedTransitMinutes: 4.5,
      expectedSpeedKmh: 50,
      observedSpeedKmh: 14
    },
    status: 'ACTIVE',
    actionProtocol: 'Activate electronic overhead VMS message signs advising airport travelers to divert to Outer Bypass C11.'
  },
  {
    id: 'ALT-2026-906',
    alertType: 'ROUTE_TIME_ANOMALY',
    title: 'Abnormal Multi-Camera Dwell Duration',
    vehiclePlate: 'TN07EE8819',
    cameraNodeId: 'C17',
    cameraName: 'Heritage District Gateway',
    timestamp: '10:35:10',
    severity: 'INFO',
    explanation:
      'Vehicle was detected at C17 after an unexplained 94-minute dwell time between C13 and C17 (expected transit time: 6 minutes). Stationary parking in loading bay identified.',
    evidence: {
      previousCamera: 'OBSERVED: C13 (University Campus South Gate)',
      previousTimestamp: '09:01:00',
      nextCamera: 'OBSERVED: C17 (Heritage District Gateway)',
      nextTimestamp: '10:35:10',
      timeDifferenceMinutes: 94.1,
      estimatedTransitMinutes: 6.0
    },
    status: 'ACKNOWLEDGED',
    actionProtocol: 'Closed as normal parking dwell.'
  }
];

// City Analytics Summary Metrics
export const CITY_ANALYTICS: CityAnalyticsSummary = {
  totalVehiclesMonitored: 12482,
  activeCamerasCount: 20,
  totalCamerasCount: 20,
  currentCityTrafficIndex: 'High',
  activeAlertsCount: 6,
  avgNetworkSpeedKmh: 36.4,
  hourlyVehicleTrend: [
    { hour: '00:00', count: 420, congestedCount: 40 },
    { hour: '02:00', count: 210, congestedCount: 20 },
    { hour: '04:00', count: 350, congestedCount: 30 },
    { hour: '06:00', count: 1180, congestedCount: 180 },
    { hour: '07:00', count: 2450, congestedCount: 520 },
    { hour: '08:00', count: 4890, congestedCount: 1650 },
    { hour: '09:00', count: 6120, congestedCount: 2480 },
    { hour: '10:00', count: 5840, congestedCount: 2210 },
    { hour: '11:00', count: 4920, congestedCount: 1720 },
    { hour: '12:00', count: 4350, congestedCount: 1320 },
    { hour: '13:00', count: 4100, congestedCount: 1200 },
    { hour: '14:00', count: 4420, congestedCount: 1390 },
    { hour: '15:00', count: 5080, congestedCount: 1850 },
    { hour: '16:00', count: 5980, congestedCount: 2340 },
    { hour: '17:00', count: 6890, congestedCount: 2950 },
    { hour: '18:00', count: 7120, congestedCount: 3180 },
    { hour: '19:00', count: 6420, congestedCount: 2600 },
    { hour: '20:00', count: 4890, congestedCount: 1750 },
    { hour: '21:00', count: 3200, congestedCount: 920 },
    { hour: '22:00', count: 1840, congestedCount: 380 }
  ],
  cameraDensityRanking: [
    { cameraId: 'C08', cameraName: 'Innovation Tech Park Gate', count: 2340, trafficLevel: 'Severe' },
    { cameraId: 'C07', cameraName: 'Tech Zone East Blvd', count: 2105, trafficLevel: 'High' },
    { cameraId: 'C09', cameraName: 'CBD Plaza', count: 2020, trafficLevel: 'High' },
    { cameraId: 'C15', cameraName: 'Tech Zone West Ave', count: 1980, trafficLevel: 'High' },
    { cameraId: 'C03', cameraName: 'Central Arterial Blvd', count: 1911, trafficLevel: 'High' },
    { cameraId: 'C14', cameraName: 'South Ring Radial Link', count: 1890, trafficLevel: 'Severe' },
    { cameraId: 'C01', cameraName: 'Central Junction Flyover', count: 1842, trafficLevel: 'High' },
    { cameraId: 'C06', cameraName: 'Airport Arterial Toll', count: 1780, trafficLevel: 'High' }
  ],
  odFlowMatrix: [
    { origin: 'Downtown Core', destination: 'Tech Park Corridor', volume: 4420 },
    { origin: 'Ring Corridor North', destination: 'Downtown Core', volume: 3180 },
    { origin: 'Airport Corridor', destination: 'Downtown Core', volume: 2450 },
    { origin: 'Tech Park Corridor', destination: 'Outer Bypass', volume: 1820 },
    { origin: 'Historic Center', destination: 'Downtown Core', volume: 1540 },
    { origin: 'Industrial Port', destination: 'Outer Bypass', volume: 1320 }
  ],
  vehicleTypeBreakdown: [
    { type: 'Private Sedans', count: 5240, percentage: 42 },
    { type: 'SUVs & Crossovers', count: 3490, percentage: 28 },
    { type: 'Motorcycles & Two-Wheelers', count: 1870, percentage: 15 },
    { type: 'Commercial Trucks & Freight', count: 1120, percentage: 9 },
    { type: 'Transit Buses & Shuttles', count: 762, percentage: 6 }
  ]
};

// What-If Simulation Calculation Engine
export function runWhatIfSimulation(
  junctionId: string,
  surgePercent: number, // e.g. +30%
  laneCapacityPercent: number = 100 // e.g. 100% or 50% for accident lane closure
): SimulationResult {
  const targetCam = CAMERA_NODES.find((c) => c.id === junctionId) || CAMERA_NODES[0];
  const initialTraffic = targetCam.trafficLevel;
  
  // Calculate new status
  let newTraffic: 'Low' | 'Medium' | 'High' | 'Severe' = initialTraffic;
  const multiplier = (1 + surgePercent / 100) / (laneCapacityPercent / 100);

  if (multiplier > 1.45 || (initialTraffic === 'High' && surgePercent >= 20)) {
    newTraffic = 'Severe';
  } else if (multiplier > 1.18 || (initialTraffic === 'Medium' && surgePercent >= 25)) {
    newTraffic = 'High';
  } else if (multiplier > 0.9) {
    newTraffic = 'Medium';
  } else {
    newTraffic = 'Low';
  }

  const delayIncrease = Math.round(surgePercent * 0.42 + (100 - laneCapacityPercent) * 0.25);

  // Identify affected roads connected to this junction
  const affectedRoads = ROAD_SEGMENTS.filter(
    (r) => r.fromCameraId === junctionId || r.toCameraId === junctionId
  ).map((r) => {
    const flowMultiplier = 1 + surgePercent / 100;
    const newFlow = Math.round(r.currentFlowRate * flowMultiplier);
    const capacityRatio = newFlow / r.baselineCapacityVehiclesPerHour;

    let roadStatusAfter: 'Low' | 'Medium' | 'High' | 'Severe' = 'Medium';
    let spilloverRisk: 'LOW' | 'MEDIUM' | 'CRITICAL' = 'LOW';

    if (capacityRatio >= 0.95) {
      roadStatusAfter = 'Severe';
      spilloverRisk = 'CRITICAL';
    } else if (capacityRatio >= 0.80) {
      roadStatusAfter = 'High';
      spilloverRisk = 'MEDIUM';
    } else if (capacityRatio >= 0.50) {
      roadStatusAfter = 'Medium';
      spilloverRisk = 'LOW';
    } else {
      roadStatusAfter = 'Low';
      spilloverRisk = 'LOW';
    }

    return {
      roadId: r.id,
      roadName: r.name,
      statusBefore: r.congestionLevel,
      statusAfter: roadStatusAfter,
      flowBefore: r.currentFlowRate,
      flowAfter: newFlow,
      spilloverRisk
    };
  });

  return {
    junctionId: targetCam.id,
    junctionName: targetCam.name,
    surgePct: surgePercent,
    statusBefore: initialTraffic,
    statusAfter: newTraffic,
    delayIncreaseMin: delayIncrease,
    networkCongestionIndexBefore: 74,
    networkCongestionIndexAfter: Math.min(99, Math.round(74 + surgePercent * 0.55)),
    affectedRoads: affectedRoads.length > 0 ? affectedRoads : [
      {
        roadId: 'R01',
        roadName: 'Central Arterial Flyover Way',
        statusBefore: 'High',
        statusAfter: 'Severe',
        flowBefore: 2050,
        flowAfter: Math.round(2050 * (1 + surgePercent / 100)),
        spilloverRisk: 'CRITICAL'
      },
      {
        roadId: 'R02',
        roadName: 'CBD Transit Link Road',
        statusBefore: 'High',
        statusAfter: 'Severe',
        flowBefore: 1850,
        flowAfter: Math.round(1850 * (1 + surgePercent / 100)),
        spilloverRisk: 'CRITICAL'
      },
      {
        roadId: 'R05',
        roadName: 'North Ring Radial Expressway',
        statusBefore: 'Medium',
        statusAfter: 'High',
        flowBefore: 1750,
        flowAfter: Math.round(1750 * (1 + surgePercent / 100)),
        spilloverRisk: 'MEDIUM'
      }
    ],
    mitigationRecommendation:
      surgePercent >= 30
        ? 'High Spillover Warning: Recommend activating dynamic bypass signal timing at C04 and redirecting 25% of Tech Park outbound traffic via C11 Western Bypass.'
        : 'Moderate Delay: Recommend adjusting adaptive signal cycle duration by +15 seconds on main arterial.'
  };
}
