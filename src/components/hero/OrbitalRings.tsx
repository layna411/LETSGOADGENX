import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface OrbitalRingsProps {
  activeModule: string | null;
}

export const OrbitalRings: React.FC<OrbitalRingsProps> = ({ activeModule }) => {
  const prefersReducedMotion = useReducedMotion();

  // 6 balanced anchor points in 740x580 viewBox centered at (370, 290)
  const moduleAnchors: Record<string, { x: number; y: number; color: string }> = {
    website: { x: 170, y: 110, color: '#38BDF8' },
    mobile: { x: 570, y: 110, color: '#B7A0FF' },
    marketing: { x: 150, y: 290, color: '#22C55E' },
    design: { x: 590, y: 290, color: '#8B5CF6' },
    video: { x: 170, y: 470, color: '#F472B6' },
    photography: { x: 570, y: 470, color: '#FBBF24' },
  };

  const center = { x: 370, y: 290 };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none"
      viewBox="0 0 740 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="orbitCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.45" />
        </linearGradient>

        <filter id="orbitGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="intenseGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ================================================================ */}
      {/* 1. ROTATING ELLIPTICAL ORBITAL RINGS (CENTERED AT 370, 290)      */}
      {/* ================================================================ */}
      {/* Inner Elliptical Orbit (Tilted -12deg) */}
      <g
        transform={`translate(${center.x}, ${center.y})`}
        className={!prefersReducedMotion ? 'animate-[spin_50s_linear_infinite_reverse]' : ''}
      >
        <ellipse
          rx="145"
          ry="90"
          stroke="url(#orbitCyanBlue)"
          strokeWidth="1.2"
          strokeDasharray="6 14"
          className="opacity-50"
          transform="rotate(-12)"
        />
        {/* Balanced Nodes on Inner Orbit */}
        <circle cx="140" cy="0" r="3" fill="#38BDF8" filter="url(#orbitGlow)" />
        <circle cx="-140" cy="0" r="2.5" fill="#B7A0FF" filter="url(#orbitGlow)" />
      </g>

      {/* Mid Elliptical Orbit (Tilted 15deg) */}
      <g
        transform={`translate(${center.x}, ${center.y})`}
        className={!prefersReducedMotion ? 'animate-[spin_65s_linear_infinite]' : ''}
      >
        <ellipse
          rx="220"
          ry="135"
          stroke="url(#orbitCyanBlue)"
          strokeWidth="1.4"
          strokeDasharray="8 20"
          className="opacity-45"
          transform="rotate(15)"
        />
        {/* Balanced Symmetrical Nodes on Mid Orbit */}
        <circle cx="0" cy="132" r="3" fill="#06B6D4" filter="url(#orbitGlow)" />
        <circle cx="0" cy="-132" r="3" fill="#8B5CF6" filter="url(#orbitGlow)" />
      </g>

      {/* Outer Elliptical Orbit (Tilted -8deg) - Fully within boundaries */}
      <g
        transform={`translate(${center.x}, ${center.y})`}
        className={!prefersReducedMotion ? 'animate-[spin_85s_linear_infinite_reverse]' : ''}
      >
        <ellipse
          rx="285"
          ry="170"
          stroke="url(#orbitCyanBlue)"
          strokeWidth="1.2"
          strokeDasharray="10 24"
          className="opacity-35"
          transform="rotate(-8)"
        />
        {/* Balanced Nodes on Outer Orbit */}
        <circle cx="280" cy="0" r="3" fill="#38BDF8" filter="url(#orbitGlow)" />
        <circle cx="-280" cy="0" r="3" fill="#B7A0FF" filter="url(#orbitGlow)" />
      </g>

      {/* ================================================================ */}
      {/* 2. DYNAMIC ENERGY CONDUIT PATHS TO 6 REMAINING SERVICE MODULES   */}
      {/* ================================================================ */}
      {Object.entries(moduleAnchors).map(([key, anchor]) => {
        const isCurrent = activeModule === key;

        return (
          <g key={key}>
            {/* Base Conduit Ray from Exact Center to Anchor */}
            <line
              x1={center.x}
              y1={center.y}
              x2={anchor.x}
              y2={anchor.y}
              stroke={isCurrent ? anchor.color : '#38BDF8'}
              strokeWidth={isCurrent ? '3' : '1.2'}
              strokeDasharray={isCurrent ? 'none' : '4 8'}
              strokeOpacity={isCurrent ? '1' : '0.28'}
              filter={isCurrent ? 'url(#intenseGlow)' : undefined}
              className="transition-all duration-300"
            />

            {/* Traveling Data Packet Photon along each line */}
            <circle
              r={isCurrent ? '4.5' : '2.5'}
              fill={anchor.color}
              filter="url(#orbitGlow)"
              opacity={isCurrent ? '1' : '0.75'}
            >
              <animate
                attributeName="cx"
                values={`${center.x};${anchor.x};${center.x}`}
                dur={isCurrent ? '1.4s' : `${3.2 + (anchor.x % 3) * 0.8}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${center.y};${anchor.y};${center.y}`}
                dur={isCurrent ? '1.4s' : `${3.2 + (anchor.x % 3) * 0.8}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Anchor Target Terminal Node */}
            <circle
              cx={anchor.x}
              cy={anchor.y}
              r={isCurrent ? '5.5' : '3.5'}
              fill={anchor.color}
              filter="url(#orbitGlow)"
              className="transition-all duration-300"
            />
            {isCurrent && (
              <circle
                cx={anchor.x}
                cy={anchor.y}
                r="11"
                stroke={anchor.color}
                strokeWidth="2"
                className="animate-ping opacity-80"
              />
            )}
          </g>
        );
      })}

      {/* Radiating Circular Pulse Wave Centered at (370, 300) */}
      <circle
        cx={center.x}
        cy={center.y}
        r="75"
        stroke="#38BDF8"
        strokeWidth="1.5"
        filter="url(#orbitGlow)"
        className="opacity-0"
      >
        <animate
          attributeName="r"
          values="75;190"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
