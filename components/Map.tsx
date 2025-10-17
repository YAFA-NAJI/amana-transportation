
"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const createBusIcon = (color: string) => {
  return L.divIcon({
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
};

// Custom stop icon
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
  current_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: string;
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  bus_stops: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    estimated_arrival: string;
    is_next_stop: boolean;
  }>;
  incidents: Array<{
    id: number;
    type: string;
    description: string;
    reported_by: string;
    reported_time: string;
    status: string;
    priority: string;
  }>;
}

interface MapProps {
  className?: string;
  lines: BusLine[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
}

// Component to handle map updates when selectedRouteId changes
function MapUpdater({ selectedRouteId, lines }: { selectedRouteId?: number; lines: BusLine[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedRouteId) {
      const selectedLine = lines.find(line => line.id === selectedRouteId);
      if (selectedLine) {
        // Center the map on the selected bus
        map.setView(
          [selectedLine.current_location.latitude, selectedLine.current_location.longitude],
          13
        );
      }
    }
  }, [selectedRouteId, lines, map]);

  return null;
}

export default function Map({ className = "", lines, selectedRouteId, onRouteSelect }: MapProps) {
  const activeLines = lines.filter(line => line.status.toLowerCase() === 'active');
  const selectedLine = lines.find(line => line.id === selectedRouteId);
  const markerRefs = useRef<{ [key: number]: L.Marker }>({});

  // Default center to Kuala Lumpur if no data
  const defaultCenter: [number, number] = [3.1390, 101.6869]; // Kuala Lumpur coordinates
  const defaultZoom = 11;

  // Auto-open popup when route is selected
  useEffect(() => {
    if (selectedRouteId && markerRefs.current[selectedRouteId]) {
      // Small delay to ensure map has finished centering
      setTimeout(() => {
        markerRefs.current[selectedRouteId]?.openPopup();
      }, 800);
    }
  }, [selectedRouteId]);

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-slate-200 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Transportation Map</h3>
      
      {/* Real Map Container */}
<div className="relative rounded-lg min-h-[500px] overflow-hidden border border-slate-200">
 <MapContainer
  style={{ height: '500px', width: '100%' }}
  whenCreated={(map) => {
    if (selectedLine) {
      map.setView(
        [selectedLine.current_location.latitude, selectedLine.current_location.longitude],
        defaultZoom
      );
    } else {
      map.setView(defaultCenter, defaultZoom);
    }
  }}
>

    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/* Map updater component */}
    <MapUpdater selectedRouteId={selectedRouteId} lines={lines} />
          
          {/* Map updater component */}
          <MapUpdater selectedRouteId={selectedRouteId} lines={lines} />
          
          {/* Bus Markers */}
          {activeLines.map((line) => {
            const isSelected = line.id === selectedRouteId;
            const busIcon = createBusIcon(isSelected ? '#10b981' : '#3b82f6');
            
            return (
              <Marker
                key={`bus-${line.id}`}
                position={[line.current_location.latitude, line.current_location.longitude]}
                icon={busIcon}
                eventHandlers={{
                  click: () => onRouteSelect?.(line.id),
                }}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[line.id] = ref;
                  }
                }}
              >
                <Popup key={`popup-${line.id}`}>
                  <div className="p-2 min-w-[200px]">
                    <div className="font-semibold text-sm text-slate-800 mb-1">
                      Route {line.route_number}
                    </div>
                    <div className="text-xs text-gray-600 mb-3 font-medium">
                      {line.name}
                    </div>
                    <div className="text-xs space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Status:</span>
                        <span className={`font-medium px-2 py-1 rounded text-xs ${
                          line.status.toLowerCase() === 'active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {line.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Passengers:</span>
                        <span className="font-medium">
                          {line.passengers.current}/{line.passengers.capacity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Capacity:</span>
                        <span className="font-medium">
                          {line.passengers.utilization_percentage}%
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Current Location:</div>
                        <div className="text-xs text-gray-700 font-medium">
                          {line.current_location.address}
                        </div>
                      </div>
                      {line.incidents.length > 0 && (
                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Issues:</span>
                            <span className="text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded text-xs">
                              {line.incidents.length} issue{line.incidents.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Click route card for details
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          {/* Bus Stops */}
          {activeLines.map((line) => 
            line.bus_stops?.map((stop) => (
              <Marker
                key={`stop-${stop.id}`}
                position={[stop.latitude, stop.longitude]}
                icon={createStopIcon(stop.is_next_stop)}
              >
                <Popup>
                  <div className="p-2">
                    <div className="font-semibold text-sm">{stop.name}</div>
                    <div className="text-xs text-gray-600 mb-1">
                      Route {line.route_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      ETA: {stop.estimated_arrival}
                    </div>
                    {stop.is_next_stop && (
                      <div className="text-xs text-orange-600 font-medium mt-1">
                        Next Stop
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))
          )}
          
          {/* Route Lines */}
          {activeLines.map((line) => {
            const isSelected = line.id === selectedRouteId;
            const routeColor = isSelected ? '#10b981' : '#3b82f6';
            const routeWeight = isSelected ? 4 : 2;
            
            if (line.bus_stops && line.bus_stops.length > 1) {
              const routeCoordinates: [number, number][] = [
                [line.current_location.latitude, line.current_location.longitude],
                ...line.bus_stops.map(stop => [stop.latitude, stop.longitude] as [number, number])
              ];
              
              return (
                <Polyline
                  key={`route-${line.id}`}
                  positions={routeCoordinates}
                  color={routeColor}
                  weight={routeWeight}
                  opacity={0.7}
                />
              );
            }
            return null;
          })}
        </MapContainer>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
          <div className="text-xs font-semibold text-slate-700 mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-xs">🚌</div>
              <span className="text-xs text-slate-600">Selected Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs">🚌</div>
              <span className="text-xs text-slate-600">Active Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></div>
              <span className="text-xs text-slate-600">Next Stop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full border-2 border-white"></div>
              <span className="text-xs text-slate-600">Bus Stops</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-slate-500">Total Routes:</span>
          <span className="ml-1 font-medium">{lines.length}</span>
        </div>
        <div>
          <span className="text-slate-500">Active:</span>
          <span className="ml-1 font-medium text-emerald-600">
            {activeLines.length}
          </span>
        </div>
      </div>
    </div>
  );
}
