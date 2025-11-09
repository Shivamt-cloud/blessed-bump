import React from 'react';
import './Logo.css';

function Logo({ size = 40 }) {
  return (
    <div className="logo-container">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="blessed-bump-logo"
      >
        <defs>
          <radialGradient id="auraGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#FFEFF7" />
            <stop offset="60%" stopColor="#FFD6E9" />
            <stop offset="100%" stopColor="#F9B9D2" />
          </radialGradient>
          <radialGradient id="haloGradient" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#FFE6F0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFC5DD" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="bumpGradient" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#FFD9E8" />
            <stop offset="55%" stopColor="#FF9DBF" />
            <stop offset="100%" stopColor="#FF78A8" />
          </radialGradient>
          <radialGradient id="babyHeadGradient" cx="45%" cy="45%" r="70%">
            <stop offset="0%" stopColor="#FFEDE2" />
            <stop offset="100%" stopColor="#FFC9AE" />
          </radialGradient>
          <radialGradient id="babyBodyGradient" cx="50%" cy="60%" r="75%">
            <stop offset="0%" stopColor="#FFF3E8" />
            <stop offset="100%" stopColor="#FFD8BF" />
          </radialGradient>
          <radialGradient id="motherSkinGradient" cx="50%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#FFE6EF" />
            <stop offset="100%" stopColor="#FF9FBD" />
          </radialGradient>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8AAF" />
            <stop offset="100%" stopColor="#FF4D88" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#F28BB3" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Soft background aura */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="url(#auraGradient)"
          className="logo-aura"
        />

        {/* Inner glow */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="url(#haloGradient)"
          className="logo-halo"
        />

        {/* Mother's Body (Bump) */}
        <ellipse
          cx="50"
          cy="65"
          rx="35"
          ry="25"
          fill="url(#bumpGradient)"
          stroke="#FF91B0"
          strokeWidth="2.2"
          className="bump"
        />

        {/* Highlight arc on bump */}
        <path
          d="M 30 55 Q 50 40 70 55"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className="bump-highlight"
        />

        {/* Baby's head inside bump */}
        <circle
          cx="45"
          cy="50"
          r="12"
          fill="url(#babyHeadGradient)"
          stroke="#F9B9A2"
          strokeWidth="1.4"
          className="baby-head"
        />

        {/* Baby's body inside bump */}
        <ellipse
          cx="45"
          cy="65"
          rx="10"
          ry="15"
          fill="url(#babyBodyGradient)"
          stroke="#FFCFB2"
          strokeWidth="1.2"
          className="baby-body"
        />

        {/* Baby's eyes */}
        <circle cx="41" cy="48" r="1.5" fill="#333" className="baby-eye" />
        <circle cx="49" cy="48" r="1.5" fill="#333" className="baby-eye" />

        {/* Baby's smile */}
        <path
          d="M 41 52 Q 45 55 49 52"
          fill="none"
          stroke="#333"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="baby-smile"
        />

        {/* Mother's face (simple outline) */}
        <circle
          cx="50"
          cy="25"
          r="12"
          fill="url(#motherSkinGradient)"
          stroke="#FF91B0"
          strokeWidth="2"
          className="mother-face"
        />

        {/* Mother's eyes */}
        <circle cx="46" cy="23" r="1" fill="#666" className="mother-eye" />
        <circle cx="54" cy="23" r="1" fill="#666" className="mother-eye" />

        {/* Mother's smile */}
        <path
          d="M 46 28 Q 50 31 54 28"
          fill="none"
          stroke="#666"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="mother-smile"
        />

        {/* Hair accent */}
        <path
          d="M 38 20 Q 50 8 62 20 Q 58 17 50 17 Q 42 17 38 20 Z"
          fill="#FF8EB9"
          opacity="0.75"
          className="mother-hair"
        />

        {/* Arms connecting to bump */}
        <path
          d="M 15 25 Q 10 40 25 55"
          fill="none"
          stroke="#FFB6C6"
          strokeWidth="4"
          strokeLinecap="round"
          className="mother-arm-left"
        />
        <path
          d="M 85 25 Q 90 40 75 55"
          fill="none"
          stroke="#FFB6C6"
          strokeWidth="4"
          strokeLinecap="round"
          className="mother-arm-right"
        />
        
        {/* Heart on bump */}
        <path
          d="M 58 55 L 60 52 L 62 55 L 64 57 Q 64 59 62 61 Q 60 63 58 65 Q 56 63 54 61 Q 52 59 52 57 Z"
          fill="url(#heartGradient)"
          className="heart"
        />

        {/* Sparkles */}
        <g className="logo-sparkles">
          <path
            d="M 25 35 L 27 40 L 32 42 L 27 44 L 25 49 L 23 44 L 18 42 L 23 40 Z"
            fill="rgba(255,255,255,0.85)"
          />
          <path
            d="M 82 40 L 83.5 43.5 L 87 45 L 83.5 46.5 L 82 50 L 80.5 46.5 L 77 45 L 80.5 43.5 Z"
            fill="rgba(255,255,255,0.8)"
          />
          <path
            d="M 32 78 L 33 81 L 36 82 L 33 83 L 32 86 L 31 83 L 28 82 L 31 81 Z"
            fill="rgba(255,255,255,0.75)"
          />
        </g>
      </svg>
    </div>
  );
}

export default Logo;

