"use client";

import { useRef, useState, useEffect } from "react";
import BrandLogo from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "#dashboard", label: "Dashboard", icon: "📊" },
  { href: "#live-map", label: "Live Map", icon: "🗺️" },
  { href: "#routes", label: "Routes", icon: "🚌" },
  { href: "#schedule", label: "Schedule", icon: "⏰" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#dashboard");
  const [status, setStatus] = useState<"normal" | "delay" | "alert">("normal"); // حالة الخدمة
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close menu on outside click or ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("a,button");
    focusable[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    panelRef.current.addEventListener("keydown", trap);
    return () => panelRef.current?.removeEventListener("keydown", trap);
  }, [open]);

  useEffect(() => { if (!open && btnRef.current) btnRef.current.focus(); }, [open]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg">
      <div className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 select-none group" aria-label="Go to homepage">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
            <BrandLogo className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">Amana Transportation</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Public Transit System</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                ${active === link.href ? "bg-emerald-50 text-emerald-600 shadow-lg" : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"}
              `}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}

          {/* Live Service Indicator */}
          <div className="relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer group"
            onClick={() => {
              const next = status === "normal" ? "delay" : status === "delay" ? "alert" : "normal";
              setStatus(next);
            }}
          >
            <div
              className={`
                w-3 h-3 rounded-full border-2 motion-safe:animate-ping
                ${status === "normal" ? "bg-emerald-500 border-emerald-500" : status === "delay" ? "bg-yellow-400 border-yellow-500" : "bg-red-500 border-red-700"}
              `}
            />
            <span className={`
               text-sm font-semibold transition-colors
               ${status === "normal" ? "text-emerald-700" : status === "delay" ? "text-yellow-600" : "text-red-600"}
             `}>
               {status === "normal" ? "Live – All buses running" : status === "delay" ? "Minor Delay" : "Service Alert!"}
             </span>

            {/* Tooltip */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              {status === "normal"
                ? "All buses are running smoothly."
                : status === "delay"
                ? "Some buses are experiencing minor delays."
                : "Service is currently stopped on one or more routes."}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            ref={btnRef}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            onClick={() => setOpen(v => !v)}
          >
            {open ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        {/* backdrop */}
        <div className={`absolute inset-0 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{ zIndex: 48 }}>
          <div className={`w-full h-full bg-black/20 backdrop-blur-sm`} />
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          className={`absolute left-4 right-4 ${open ? "top-[56px]" : "top-[56px]"} transition-all duration-300 ${open ? "opacity-100 pointer-events-auto max-h-[60vh] translate-y-0" : "opacity-0 pointer-events-none max-h-0 -translate-y-2"}`}
          style={{ zIndex: 49 }}
        >
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl overflow-hidden">
            <div className="py-3 px-3 space-y-2">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => { setActive(link.href); setOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
                    ${active === link.href ? "bg-emerald-50 text-emerald-600 shadow-md" : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"}
                  `}
                >
                  <span className="text-xl" aria-hidden="true">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
