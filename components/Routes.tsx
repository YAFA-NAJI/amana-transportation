"use client";

import React from "react";

interface Route {
  route_number?: string;
  destination?: string;
  status?: string;
  id?: number;
}

interface RoutesProps {
  routes: Route[];
  className?: string;
}

export default function Routes({ routes, className = "" }: RoutesProps) {
  const displayRoutes = routes.slice(0, 5);

  return (
    <section
      id="routes"
      className={`rounded-2xl bg-white border border-slate-200 shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-200 flex items-center justify-center shadow-md">
            <span className="text-xl sm:text-2xl">🚌</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Active Routes</h2>
            <p className="text-sm text-slate-600">{routes.length} routes currently running</p>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-none overflow-auto">
        {displayRoutes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayRoutes.map((route, index) => (
              <RouteCard key={route.id || index} route={route} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚌</span>
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">No Active Routes</h3>
            <p className="text-slate-500">Routes will appear here when they become available</p>
          </div>
        )}

        <button className="w-full mt-4 sm:mt-6 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
          View All Routes →
        </button>
      </div>
    </section>
  );
}

function RouteCard({ route, index }: { route: Route; index: number }) {
  const status = String(route?.status ?? "Active").toLowerCase();
  const isActive = status === "active";
  const statusColors = isActive
    ? "bg-emerald-500 text-white"
    : status === "delayed"
    ? "bg-amber-500 text-white"
    : "bg-slate-400 text-white";

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // optional: navigate or trigger action
        }
      }}
      className={`flex flex-col p-3 sm:p-4 rounded-xl border border-slate-200 bg-gradient-to-tr from-white to-slate-50 shadow transition-transform duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
        ${isActive ? "hover:shadow-lg motion-safe:transform motion-safe:hover:-translate-y-1" : "hover:shadow-md"}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isActive ? "bg-emerald-500 motion-safe:animate-pulse" : "bg-slate-400"}`}></div>
          <div>
            <div className="font-semibold text-slate-800">Route {route?.route_number || `#${index + 1}`}</div>
            <div className="text-sm text-slate-600 truncate">{route?.destination || "Downtown"}</div>
          </div>
        </div>

        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors}`}>
          {route?.status || "Active"}
        </span>
      </div>

      {/* Progress / Status bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={isActive ? 75 : 40} aria-label="Occupancy">
        <div
          className={`h-2 rounded-full ${isActive ? "bg-emerald-500 motion-safe:animate-pulse" : "bg-slate-400"}`}
          style={{ width: isActive ? "75%" : "40%" }}
        ></div>
      </div>

      <div className="text-xs text-slate-500 mt-2">{isActive ? "On time" : "Check schedule"}</div>
    </div>
  );
}
