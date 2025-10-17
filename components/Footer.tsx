"use client";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 bg-gradient-to-tl from-emerald-50 via-white to-emerald-50 border-t border-slate-200 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand Section */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <BrandLogo className="w-10 h-10 sm:w-14 sm:h-14 shadow-md" />
            <div>
              <p className="font-extrabold text-emerald-700 text-lg leading-tight tracking-wide">
                Amana{" "}
                <span className="text-emerald-500">Transportation</span>
              </p>
              <p className="text-sm text-slate-500">Modern Public Transit</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 max-w-full sm:max-w-xs">
            Connecting your city with safe, fast, and reliable bus services.  
            Track routes, check schedules, and travel smarter with Amana.
          </p>
        </div>

        {/* Quick Links */}
     <div>
  <p className="text-sm font-semibold text-slate-800 mb-3">Quick Links</p>
  <ul className="grid grid-cols-2 gap-2 sm:gap-3">
    {[
      { name: "Dashboard", href: "#dashboard", icon: "📊" },
      { name: "Live Map", href: "#live-map", icon: "🗺️" },
      { name: "Routes", href: "#routes", icon: "🚌" },
      { name: "Schedule", href: "#schedule", icon: "⏰" },
    ].map((link) => (
      <li key={link.name}>
        <a
          href={link.href}
          className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-white shadow-md hover:bg-emerald-50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 group text-sm"
        >
          <span className="text-xl">{link.icon}</span>
          <span className="font-medium text-slate-700 group-hover:text-emerald-600">
            {link.name}
          </span>
        </a>
      </li>
    ))}
  </ul>
</div>


        {/* Contact / Social */}
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-3">Contact Us</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              Email:{" "}
              <Link href="mailto:info@amanatransit.com" className="hover:text-emerald-600 underline">
                info@amanatransit.com
              </Link>
            </li>
            <li>
              Hotline:{" "}
              <span className="font-medium text-slate-800">+60 3 9000 1234</span>
            </li>
            <li>
              Office: <span className="text-slate-700">Kuala Lumpur, Malaysia</span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <a
              aria-label="Twitter"
              href="#"
              className="p-3 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M22 5.8c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.5 1C18.3 4.5 17.2 4 16 4c-2.3 0-4.1 1.9-4.1 4.1 0 .3 0 .7.1 1C8.1 9 5 7.4 2.9 5c-.3.6-.5 1.3-.5 2 0 1.4.7 2.7 1.8 3.4-.6 0-1.2-.2-1.8-.5v.1c0 2 1.4 3.6 3.2 4-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.8 2.2 3.1 4.2 3.2-1.5 1.2-3.5 1.9-5.5 1.9H2c2 1.2 4.3 1.9 6.8 1.9 8.2 0 12.7-6.8 12.7-12.7v-.6c.9-.6 1.6-1.3 2.2-2.1z" />
              </svg>
            </a>

            <a
              aria-label="GitHub"
              href="#"
              className="p-3 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 7 9.6.5.1.7-.2.7-.5v-1.9c-2.9.7-3.5-1.3-3.5-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1.9-1 .9-1 .9-1.7 2.4-1.2 3-.9.1-.8.4-1.3.7-1.6-2.3-.3-4.7-1.2-4.7-5.2 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1a10.7 10.7 0 0 1 5.5 0c2-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4-2.4 4.9-4.7 5.2.4.4.8 1 .8 2.1v3.1c0 .3.2.6.7.5 4.2-1.4 7-5.1 7-9.6C22 6.6 17.5 2 12 2z" />
              </svg>
            </a>

            <a
              aria-label="LinkedIn"
              href="#"
              className="p-3 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.06 24V7.98h5.88V24H.06zM9.84 7.98h5.64v2.16h.08c.78-1.48 2.7-3.04 5.56-3.04 5.96 0 7.06 3.92 7.06 9.02V24h-5.88v-7.98c0-1.9-.03-4.34-2.64-4.34-2.64 0-3.04 2.06-3.04 4.2V24H9.84V7.98z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {year} Amana Transportation. All rights reserved.</p>
          <p>
            Made with <span className="text-emerald-500">♥</span> for your city.
          </p>
        </div>
      </div>
    </footer>
   );
 }
