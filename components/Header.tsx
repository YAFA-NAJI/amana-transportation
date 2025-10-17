"use client";

import BrandLogo from "@/components/BrandLogo";

export default function Header({
  today,
  activeRoutes,
  busesOnline,
  status,
}: {
  today: string;
  activeRoutes: number;
  busesOnline: number;
  status: string;
}) {
  const statusIsNormal = status.toLowerCase().includes("normal");
  const statusColor = statusIsNormal ? "emerald" : "red";
  const statusIcon = statusIsNormal ? (
    <span className="animate-bounce">✔️</span>
  ) : (
    <span className="animate-pulse">⚠️</span>
  );

  return (
    <header className="relative overflow-hidden min-h-[500px] md:min-h-[480px] rounded-3xl border border-slate-200 shadow-2xl">
      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://www.shutterstock.com/image-photo/bus-traveling-on-asphalt-road-600nw-1345741577.jpg" 
          alt="Transit background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/40 via-white/20 to-emerald-100/50"></div>
      </div>

      <div className="relative px-6 md:px-12 py-16 md:py-24 flex flex-col items-center text-center space-y-10">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-${statusColor}-100 border border-${statusColor}-200 text-${statusColor}-700 font-semibold text-sm shadow-lg animate-pulse`}
          >
            <span className="text-lg">{statusIcon}</span>
            {status}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <BrandLogo className="w-20 h-20 mb-2 shadow-xl rounded-full bg-white/50 p-2" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 tracking-tight text-white drop-shadow-xl animate-gradient">
            Real-Time Transit Dashboard
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            Experience seamless city travel with Amana – track buses in real-time, discover the fastest routes, and stay ahead with instant service updates.

          </p>
          <div className="mt-5 flex gap-4 flex-wrap justify-center">
            <QuickAction href="#live-map" icon="🗺️" label="Live Map" />
            <QuickAction href="#routes" icon="🛣️" label="Routes Info" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <StatCard icon="📅" label="Service Day" value={today} description="Current schedule" />
          <StatCard icon="🛣️" label="Active Routes" value={activeRoutes} description="Routes in service" />
          <StatCard icon="🚌" label="Buses Online" value={busesOnline} description="Live tracking enabled" />
        </div>
      </div>
    </header>
  );
}

// StatCard — محسّن مع hover scale و shadow + glass effect
function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: string;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/30 backdrop-blur-md p-7 text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
      <div className="text-sm font-semibold text-white drop-shadow mb-1">{label}</div>
      <div className="text-xs text-white/80">{description}</div>
    </div>
  );
}

// QuickAction — محسّن مع hover و bounce + gradient
function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold shadow-lg hover:scale-105 hover:from-emerald-600 hover:to-emerald-800 transition-transform duration-300 text-lg animate-bounce-once"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  );
}
