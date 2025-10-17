"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import for Map component (no SSR)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

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

interface MapWrapperProps {
  className?: string;
  lines: BusLine[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
}

export default function MapWrapper({
  className = "",
  lines,
  selectedRouteId,
  onRouteSelect,
}: MapWrapperProps) {
  return (
    <section
      className={`bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl shadow-lg border border-slate-100 p-4 ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500 text-white text-lg shadow">
          🗺️
        </span>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Interactive Map
        </h2>
      </div>
      <Map
        className="!bg-transparent !border-0 !shadow-none p-0"
        lines={lines}
        selectedRouteId={selectedRouteId}
        onRouteSelect={onRouteSelect}
      />
    </section>
  );
}