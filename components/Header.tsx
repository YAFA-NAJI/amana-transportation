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
  // use fixed Tailwind classes (avoid dynamic class names)
  const statusClasses = statusIsNormal
    ? { bg: "bg-emerald-100", border: "border-emerald-200", text: "text-emerald-700", icon: "✔️" }
    : { bg: "bg-red-100", border: "border-red-200", text: "text-red-700", icon: "⚠️" };
  const statusIcon = <span className="motion-safe:animate-bounce">{statusClasses.icon}</span>;

  return (
    <header className="relative overflow-hidden min-h-[360px] md:min-h-[480px] rounded-3xl border border-slate-200 shadow-2xl">
      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://www.shutterstock.com/image-photo/bus-traveling-on-asphalt-road-600nw-1345741577.jpg"
          alt="Transit background"
          className="w-full h-full object-cover object-center brightness-75"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/40 via-white/20 to-emerald-100/50 pointer-events-none"></div>
      </div>

      <div className="relative px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-24 flex flex-col items-center text-center space-y-8">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusClasses.bg} ${statusClasses.border} ${statusClasses.text} font-semibold text-sm shadow-lg motion-safe:animate-pulse`}
          >
            <span className="text-lg" aria-hidden="true">
              {statusIcon}
            </span>
            <span>{status}</span>
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <BrandLogo className="w-14 h-14 sm:w-20 sm:h-20 mb-2 shadow-xl rounded-full bg-white/50 p-2" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-2 tracking-tight text-white drop-shadow-xl">
            Real-Time Transit Dashboard
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto drop-shadow">
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
    <div className="rounded-2xl border border-slate-200 bg-white/30 backdrop-blur-md p-5 sm:p-7 text-center shadow-xl hover:shadow-2xl motion-safe:hover:scale-105 transition-transform duration-300">
      <div className="text-3xl sm:text-4xl mb-3">{icon}</div>
      <div className="text-xl sm:text-2xl font-extrabold text-white drop-shadow mb-1">{value}</div>
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
      className="inline-flex items-center gap-3 px-5 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-semibold shadow-lg hover:scale-105 hover:from-emerald-600 hover:to-emerald-800 transition-transform duration-200 text-base sm:text-lg motion-safe:animate-bounce"
      role="button"
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
