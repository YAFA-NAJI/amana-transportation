"use client";

import React from "react";

interface BusLine {
  id: number;
  name: string;
  route_number: string;
  status: string;
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  incidents: Array<{
    id: number;
    type: string;
    description: string;
    status: string;
    priority: string;
  }>;
}

interface RouteListProps {
  lines: BusLine[];
  selectedRouteId?: number;
  onRouteSelect?: (routeId: number) => void;
}

export default function RouteList({ lines, selectedRouteId, onRouteSelect }: RouteListProps) {
  const activeLines = lines.filter(line => line.status.toLowerCase() === 'active');
  const maintenanceLines = lines.filter(line => line.status.toLowerCase() === 'maintenance');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "emerald";
      case "maintenance":
        return "amber";
      default:
        return "gray";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Route Overview</h3>

      {/* Active Routes Grid */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-emerald-600 mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          Active Routes ({activeLines.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLines.map(line => (
            <div
              key={line.id}
              className={`relative flex flex-col p-4 rounded-xl border transition-all duration-200 cursor-pointer
                ${selectedRouteId === line.id ? 'bg-emerald-50 border-emerald-300 shadow-lg scale-105' : 'bg-emerald-100/30 border-emerald-200 hover:shadow-md hover:bg-emerald-50'}
              `}
              onClick={() => onRouteSelect?.(line.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-white font-bold text-sm
                  ${selectedRouteId === line.id ? 'bg-emerald-600' : 'bg-emerald-500'}
                `}>
                  {line.route_number}
                </div>
                <div className="text-xs font-medium text-emerald-600">{line.status}</div>
              </div>

              <div className="font-medium text-slate-800 mb-1">{line.name}</div>
              <div className="text-xs text-slate-600 mb-2">
                {line.passengers.current}/{line.passengers.capacity} passengers
              </div>

              {/* Utilization progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mb-2">
                <div
                  className={`h-2 rounded-full bg-emerald-500`}
                  style={{ width: `${line.passengers.utilization_percentage}%` }}
                />
              </div>

              {/* Incidents badge */}
              {line.incidents.length > 0 && (
                <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  {line.incidents.length} issue{line.incidents.length > 1 ? 's' : ''}
                </div>
              )}

              <div className="text-xs text-slate-500 mt-auto">Click to locate on map</div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Routes */}
      {maintenanceLines.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-amber-600 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            Maintenance ({maintenanceLines.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceLines.map(line => (
              <div
                key={line.id}
                className="flex flex-col p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-amber-500 text-white font-bold text-sm">
                    {line.route_number}
                  </div>
                  <div className="text-xs font-medium">Maintenance</div>
                </div>
                <div className="font-medium text-slate-800 mb-1">{line.name}</div>
                <div className="text-xs text-slate-600">Under maintenance</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-600 mb-3">Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500">Total Routes:</span>
            <span className="ml-1 font-medium">{lines.length}</span>
          </div>
          <div>
            <span className="text-slate-500">Active:</span>
            <span className="ml-1 font-medium text-emerald-600">{activeLines.length}</span>
          </div>
          <div>
            <span className="text-slate-500">Maintenance:</span>
            <span className="ml-1 font-medium text-amber-600">{maintenanceLines.length}</span>
          </div>
          <div>
            <span className="text-slate-500">Total Capacity:</span>
            <span className="ml-1 font-medium">{lines.reduce((sum, line) => sum + line.passengers.capacity, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
