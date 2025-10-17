"use client";

import React, { useMemo } from "react";
import type { BusLine } from "@/types/BusLine";

type Props = { lines: BusLine[] };

// نحصل على المحطات من BusLine
function getStops(line: BusLine) {
  return line.bus_stops || [];
}

// نحدد المحطة التالية
function pickNextStop(line: BusLine) {
  const stops = getStops(line);
  if (!stops.length) return null;

  const next = stops.find((s) => s.is_next_stop);
  if (next) return next;

  return stops[0] || null;
}

export default function Schedule({ lines }: Props) {
  const rows = useMemo(() => {
    return (lines || []).map((line) => {
      const nextStop = pickNextStop(line);
      return {
        id: line.id,
        routeName: line.name,
        routeNumber: line.route_number,
        status: line.status.toLowerCase(),
        nextStopName: nextStop?.name || "—",
        arrival: nextStop?.estimated_arrival || "N/A",
        driver: line.driver?.name || "N/A",
        vehicle: line.vehicle_info?.model || "N/A",
        licensePlate: line.vehicle_info?.license_plate || "N/A",
        passengers: `${line.passengers.current}/${line.passengers.capacity} (${line.passengers.utilization_percentage}%)`,
      };
    });
  }, [lines]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Routes — Next Stop & Arrival</h3>

      {rows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex flex-col p-4 bg-gradient-to-tr from-white to-slate-50 border border-slate-200 rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-slate-800">{r.routeName}</div>
                  <div className="text-sm text-slate-600">Route: {r.routeNumber}</div>
                  <div className="text-sm text-slate-600 mt-1">Next Stop: {r.nextStopName}</div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    r.status === "active"
                      ? "bg-emerald-500 text-white"
                      : r.status === "maintenance"
                      ? "bg-amber-500 text-white"
                      : "bg-slate-400 text-white"
                  }`}
                >
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </span>
              </div>

              <div className="mt-2 text-sm text-slate-700 font-medium">
                Arrival: {r.arrival}
              </div>

              <div className="mt-2 text-xs text-slate-500">
                Driver: {r.driver} <br />
                Vehicle: {r.vehicle} ({r.licensePlate}) <br />
                Passengers: {r.passengers}
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-2 rounded-full ${
                    r.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                  style={{ width: r.status === "active" ? "75%" : "40%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚌</span>
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">No routes available</h3>
          <p className="text-slate-500">Routes will appear here when they become available</p>
        </div>
      )}
    </section>
  );
}
