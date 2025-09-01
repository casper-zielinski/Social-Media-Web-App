import React from "react";

function Logo() {
  return (
    <svg viewBox="-50 0 250 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
          <stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="1" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="25"
        cy="30"
        r="20"
        fill="url(#iconGradient)"
        opacity="0.1"
        filter="url(#glow)"
      />

      <g transform="translate(15, 20)">
        <circle cx="10" cy="10" r="3" fill="url(#iconGradient)" />
        <circle cx="5" cy="5" r="2" fill="url(#iconGradient)" opacity="0.8" />
        <circle cx="15" cy="8" r="2" fill="url(#iconGradient)" opacity="0.8" />
        <circle cx="8" cy="15" r="2" fill="url(#iconGradient)" opacity="0.8" />
        <circle cx="14" cy="16" r="2" fill="url(#iconGradient)" opacity="0.8" />

        <path
          d="M 7 7 Q 8 8 10 10"
          stroke="url(#iconGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 12 10 Q 13 9 15 8"
          stroke="url(#iconGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 10 13 Q 9 14 8 15"
          stroke="url(#iconGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 12 12 Q 13 14 14 16"
          stroke="url(#iconGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 10 10 Q 12 11 14 16"
          stroke="url(#iconGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        <path
          d="M 16 4 L 18 6 L 22 2"
          stroke="#00f2fe"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle
        cx="25"
        cy="30"
        r="18"
        fill="none"
        stroke="url(#iconGradient)"
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="18;22;18"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.1;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default Logo;
