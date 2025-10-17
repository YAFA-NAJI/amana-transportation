"use client";
import React from "react";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" }: BrandLogoProps) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-emerald-400 to-sky-600 shadow-md flex items-center justify-center ${className}`}
      aria-label="Amana Transportation Logo"
      role="img"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 38 38"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="19"
          cy="19"
          r="17"
          stroke="white"
          strokeWidth="2"
          fill="url(#circle-gradient)"
        />
        <rect
          x="10"
          y="13"
          width="18"
          height="12"
          rx="3"
          fill="white"
          stroke="none"
        />
        <rect x="12" y="15" width="14" height="6" rx="1" fill="#0ea5e9" />
        <circle cx="14" cy="26" r="1.8" fill="#059669" />
        <circle cx="24" cy="26" r="1.8" fill="#059669" />
        <path
          d="M11 20h16"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="circle-gradient"
            x1="0"
            y1="0"
            x2="38"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
