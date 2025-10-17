"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Pulsing bus icon (accepts optional size)
const createBusIcon = (color: string, size = 24) =>
  L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${Math.max(10, Math.floor(size * 0.5))}px;
      color: white;
      animation: pulse 1.5s infinite;
    ">🚌</div>`,
    className: "custom-bus-icon",
    iconSize: [size, size],
    iconAnchor: [Math.floor(size / 2), Math.floor(size / 2)],
  });

// Stop icon (accepts optional size)
const createStopIcon = (isNextStop: boolean, size = 14) => {
  const color = isNextStop ? "#f97316" : "#64748b";
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      ${isNextStop ? "animation: pulse 1.5s infinite;" : ""}
    "></div>`,
    className: "custom-stop-icon",
    iconSize: [size, size],
    iconAnchor: [Math.floor(size / 2), Math.floor(size / 2)],
  });
};

// MapUpdater to center selected route
function MapUpdater({ selectedRouteId, lines }: { selectedRouteId?: number; lines: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedRouteId) {
      const line = lines.find((l) => l.id === selectedRouteId);
      if (line) {
        map.flyTo([line.current_location.latitude, line.current_location.longitude], 13, {
          duration: 1.2,
        });
      }
    }
  }, [selectedRouteId, lines, map]);
  return null;
}

interface MapProps {
  lines: any[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
  className?: string;
}

export default function Map({
  lines,
  selectedRouteId,
  onRouteSelect,
  className = "",
}: MapProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeLines = lines.filter((l) => l.status.toLowerCase() === "active");
  const selectedLine = lines.find((l) => l.id === selectedRouteId);
 const markerRefs = useRef<{ [key: number]: any }>({});


  const defaultCenter: [number, number] = [3.139, 101.6869];

  useEffect(() => {
    if (selectedRouteId && markerRefs.current[selectedRouteId]) {
      setTimeout(() => markerRefs.current[selectedRouteId]?.openPopup(), 800);
    }
  }, [selectedRouteId]);

  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200 p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Transportation Map</h3>

      <div className="relative rounded-lg overflow-hidden border border-slate-200 min-h-[300px] sm:min-h-[500px]">
        <MapContainer
          {...({
            center: selectedLine
              ? [selectedLine.current_location.latitude, selectedLine.current_location.longitude]
              : defaultCenter,
            zoom: isMobile ? 13 : 11,
            // disable scroll wheel zoom on mobile to avoid accidental zooms; keep touchZoom/dragging enabled
            scrollWheelZoom: !isMobile,
            touchZoom: true,
            dragging: true,
            className: "h-[60vh] sm:h-[500px] w-full",
          } as any)}
         >
          <TileLayer
            {...({
              attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            } as any)}
          />

          <MapUpdater selectedRouteId={selectedRouteId} lines={lines} />

          {/* Bus Markers */}
          {activeLines.map((line: any) => {
             const isSelected = line.id === selectedRouteId;
             const busIcon = createBusIcon(isSelected ? "#10b981" : "#3b82f6", isMobile ? 32 : 24);
 
             return (
               <Marker
                 {...({
                   key: line.id,
                   position: [line.current_location.latitude, line.current_location.longitude],
                   icon: busIcon,
                   eventHandlers: { click: () => onRouteSelect?.(line.id) },
                 } as any)}
                 ref={(ref) => {
                   if (ref) markerRefs.current[line.id] = ref;
                 }}
               >
                <Popup>
                  <div
                    className={`p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg ${
                      isMobile ? "w-[86vw] max-w-[320px]" : "min-w-[220px]"
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-sm">{line.route_number}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          line.status.toLowerCase() === "active"
                            ? "bg-emerald-100 text-emerald-700 animate-pulse"
                            : "bg-amber-100 text-amber-700 animate-pulse"
                        }`}
                      >
                        {line.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">{line.name}</div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2"
                        style={{ width: `${line.passengers.utilization_percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {line.passengers.current}/{line.passengers.capacity} passengers
                    </div>
                    {line.incidents.length > 0 && (
                      <div className="mt-2 text-xs text-orange-600 font-medium">
                        {line.incidents.length} issue{line.incidents.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Bus Stops */}
          {activeLines.map((line: any) =>
            line.bus_stops?.map((stop: any) => (
              <Marker
                {...({
                  key: `stop-${stop.id}`,
                  position: [stop.latitude, stop.longitude],
                  icon: createStopIcon(stop.is_next_stop, isMobile ? 18 : 14),
                } as any)}
              >
                <Popup>
                  <div className={`p-2 text-xs text-slate-700 ${isMobile ? "w-[70vw] max-w-[260px]" : ""}`}>
                    <div className="font-semibold">{stop.name}</div>
                    <div>Route {line.route_number}</div>
                    <div className="text-orange-600 font-medium">
                      {stop.is_next_stop ? "Next Stop" : ""}
                    </div>
                    <div>ETA: {stop.estimated_arrival}</div>
                  </div>
                </Popup>
              </Marker>
            ))
          )}

          {/* Polyline Routes */}
          {activeLines.map((line: any) => {
             if (!line.bus_stops || line.bus_stops.length < 1) return null;
             const isSelected = line.id === selectedRouteId;
             const coords: [number, number][] = [
               [line.current_location.latitude, line.current_location.longitude],
               ...line.bus_stops.map((stop: any) => [stop.latitude, stop.longitude] as [number, number]),
             ];
             return (
               <Polyline
                 {...({
                  key: line.id,
                  positions: coords,
                  color: isSelected ? "#10b981" : "#3b82f6",
                  weight: isSelected ? 4 : 2,
                  opacity: 0.8,
                  dashArray: isSelected ? undefined : "5,5",
                } as any)}
              />
             );
           })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-lg text-xs sm:text-sm font-medium space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-xs">
              🚌
            </div>
            Selected Route
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs">
              🚌
            </div>
            Active Routes
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            Next Stop
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            Bus Stops
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
        <div className="p-2 bg-white/90 backdrop-blur-md rounded-xl shadow flex justify-between items-center">
          <span>Total Routes</span>
          <span className="font-semibold">{lines.length}</span>
        </div>
        <div className="p-2 bg-white/90 backdrop-blur-md rounded-xl shadow flex justify-between items-center">
          <span>Active Routes</span>
          <span className="font-semibold text-emerald-600">{activeLines.length}</span>
        </div>
        <div className="p-2 bg-white/90 backdrop-blur-md rounded-xl shadow flex justify-between items-center">
          <span>Avg Capacity</span>
          <span className="font-semibold">
            {Math.round(
              lines.reduce((a, l) => a + l.passengers.utilization_percentage, 0) / lines.length
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );
}
