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
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-200 flex items-center justify-center shadow-md">
            <span className="text-2xl">🚌</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Active Routes</h2>
            <p className="text-sm text-slate-600">{routes.length} routes currently running</p>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="p-6">
        {displayRoutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <button className="w-full mt-6 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
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
    <div className="flex flex-col p-4 rounded-xl border border-slate-200 bg-gradient-to-tr from-white to-slate-50 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></div>
          <div>
            <div className="font-semibold text-slate-800">Route {route?.route_number || `#${index + 1}`}</div>
            <div className="text-sm text-slate-600">{route?.destination || "Downtown"}</div>
          </div>
        </div>

        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors}`}>
          {route?.status || "Active"}
        </span>
      </div>

      {/* Progress / Status bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
        <div
          className={`h-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
          style={{ width: isActive ? "75%" : "40%" }}
        ></div>
      </div>

      <div className="text-xs text-slate-500 mt-2">{isActive ? "On time" : "Check schedule"}</div>
    </div>
  );
}
