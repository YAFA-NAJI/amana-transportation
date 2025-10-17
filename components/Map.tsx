"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import type { Marker as LeafletMarker } from 'leaflet';

// Fix default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createBusIcon = (color: string) =>
  L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: white;
    ">🚌</div>`,
    className: 'custom-bus-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const createStopIcon = (isNextStop: boolean) => {
  const color = isNextStop ? '#f97316' : '#64748b';
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-stop-icon',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

interface BusLine {
  id: number;
  name: string;
  route_number: string;
  current_location: { latitude: number; longitude: number; address: string; };
  status: string;
  passengers: { current: number; capacity: number; utilization_percentage: number; };
  bus_stops: Array<{ id: number; name: string; latitude: number; longitude: number; estimated_arrival: string; is_next_stop: boolean; }>;
  incidents: Array<{ id: number; type: string; description: string; reported_by: string; reported_time: string; status: string; priority: string; }>;
}

interface MapProps {
  className?: string;
  lines: BusLine[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
}

// Update map center when selected route changes
function MapUpdater({ selectedRouteId, lines }: { selectedRouteId?: number; lines: BusLine[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedRouteId) {
      const line = lines.find(l => l.id === selectedRouteId);
      if (line) map.setView([line.current_location.latitude, line.current_location.longitude], 13);
    }
  }, [selectedRouteId, lines, map]);
  return null;
}

export default function Map({ className = "", lines, selectedRouteId, onRouteSelect }: MapProps) {
  const activeLines = lines.filter(l => l.status.toLowerCase() === 'active');
  const selectedLine = lines.find(l => l.id === selectedRouteId);
const markerRefs = useRef<{ [key: number]: any }>({});

  const defaultCenter: [number, number] = [3.1390, 101.6869];
  const defaultZoom = 11;

  useEffect(() => {
    if (selectedRouteId && markerRefs.current[selectedRouteId]) {
      setTimeout(() => markerRefs.current[selectedRouteId]?.openPopup(), 800);
    }
  }, [selectedRouteId]);

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-slate-200 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Transportation Map</h3>

      <div className="relative rounded-lg min-h-[500px] overflow-hidden border border-slate-200">
        <MapContainer
          style={{ height: '500px', width: '100%' }}
          whenCreated={(map) => {
            if (selectedLine) map.setView([selectedLine.current_location.latitude, selectedLine.current_location.longitude], defaultZoom);
            else map.setView(defaultCenter, defaultZoom);
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater selectedRouteId={selectedRouteId} lines={lines} />

          {/* Bus Markers */}
          {activeLines.map(line => (
            <Marker
              key={`bus-${line.id}`}
              position={[line.current_location.latitude, line.current_location.longitude]}
              icon={createBusIcon(line.id === selectedRouteId ? '#10b981' : '#3b82f6')}
              eventHandlers={{ click: () => onRouteSelect?.(line.id) }}
              ref={ref => { if (ref) markerRefs.current[line.id] = ref; }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="font-semibold text-sm text-slate-800 mb-1">Route {line.route_number}</div>
                  <div className="text-xs text-gray-600 mb-3 font-medium">{line.name}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <span className={`font-medium px-2 py-1 rounded text-xs ${line.status.toLowerCase() === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{line.status}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Bus Stops */}
          {activeLines.flatMap(line =>
            line.bus_stops.map(stop => (
              <Marker key={`stop-${stop.id}`} position={[stop.latitude, stop.longitude]} icon={createStopIcon(stop.is_next_stop)}>
                <Popup>
                  <div className="p-2">
                    <div className="font-semibold text-sm">{stop.name}</div>
                    <div className="text-xs text-gray-500">ETA: {stop.estimated_arrival}</div>
                  </div>
                </Popup>
              </Marker>
            ))
          )}

          {/* Route Lines */}
          {activeLines.map(line => {
            if (!line.bus_stops || line.bus_stops.length < 1) return null;
            const routeCoordinates: [number, number][] = [
              [line.current_location.latitude, line.current_location.longitude],
              ...line.bus_stops.map(stop => [stop.latitude, stop.longitude] as [number, number])
            ];
            return <Polyline key={`route-${line.id}`} positions={routeCoordinates} color={line.id === selectedRouteId ? '#10b981' : '#3b82f6'} weight={line.id === selectedRouteId ? 4 : 2} opacity={0.7} />;
          })}
        </MapContainer>
      </div>
    </div>
  );
}
