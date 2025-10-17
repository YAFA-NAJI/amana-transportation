// components/BrandLogo.tsx
"use client";
import React from "react";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "w-12 h-12" }: BrandLogoProps) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-lg flex items-center justify-center ${className}`}
      aria-label="Amana Transportation Logo"
      role="img"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="text-white"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2.5" fill="url(#logo-gradient)" />
        <path
          d="M10 22c2-4 6-10 8-10s6 6 8 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="18" r="3" fill="currentColor" />
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}