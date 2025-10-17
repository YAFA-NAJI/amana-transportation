"use client";
import React, { useState } from "react";
import MapWrapper from "./MapWrapper";
import RouteList from "./RouteList";
import Schedule from "@/components/Schedule";
import { BusLine } from "@/types/BusLine";
import { FaBus, FaMapMarkedAlt, FaClock } from "react-icons/fa";

interface DashboardClientProps {
  lines: BusLine[];
}

export default function DashboardClient({ lines }: DashboardClientProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<number | undefined>();
  const handleRouteSelect = (routeId: number) => setSelectedRouteId(routeId);

  return (
    <div className="space-y-10 p-6 bg-gray-50 min-h-screen">
      {/* GRID: MAP & ROUTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LIVE MAP */}
        <section
          id="live-map"
          className="scroll-mt-24 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkedAlt className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Live Map</h2>
              <p className="text-sm text-gray-500">
                Real-time bus locations across the city.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <MapWrapper
              lines={lines}
              selectedRouteId={selectedRouteId}
              onRouteSelect={handleRouteSelect}
            />
          </div>
        </section>

        {/* ROUTES */}
        <section
          id="routes"
          className="scroll-mt-24 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaBus className="text-green-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Routes</h2>
              <p className="text-sm text-gray-500">
                Browse available bus routes and select your route.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner hover:shadow-lg transition-shadow duration-300">
            <RouteList
              lines={lines}
              selectedRouteId={selectedRouteId}
              onRouteSelect={handleRouteSelect}
            />
          </div>
        </section>
      </div>

      {/* SCHEDULE */}
      <section
        id="schedule"
        className="scroll-mt-24 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaClock className="text-yellow-500 text-2xl" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Schedule</h2>
            <p className="text-sm text-gray-500">
              Upcoming departures & arrivals for selected routes.
            </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">
          <Schedule lines={lines} />
        </div>
      </section>
    </div>
  );
}
