import React from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
`
const wave = keyframes`
  0%, 60%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(-28deg); }
  20% { transform: rotate(12deg); }
  30% { transform: rotate(-24deg); }
  40% { transform: rotate(8deg); }
  50% { transform: rotate(-10deg); }
`
const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`
const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-1.5px); }
`

const Svg = styled.svg`
  display: block;
  overflow: visible;
  .body {
    animation: ${bob} 3s ease-in-out infinite;
  }
  .eye {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${blink} 4.2s infinite;
  }
  .arm {
    transform-box: fill-box;
    transform-origin: 10% 90%;
    animation: ${wave} ${({ $waveEvery }) => $waveEvery}s ease-in-out infinite;
  }
  .bulb {
    animation: ${glow} 1.6s ease-in-out infinite;
  }
`

/** A small friendly robot: blinks, bobs and waves. Pure SVG, scales with `size`. */
const Robot = ({ size = 40, waveEvery = 3.2, title }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64" $waveEvery={waveEvery} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
    {title && <title>{title}</title>}
    <defs>
      <linearGradient id="robot-head" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e6e3f5" />
      </linearGradient>
      <linearGradient id="robot-visor" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1b1a2e" />
        <stop offset="1" stopColor="#2c2347" />
      </linearGradient>
    </defs>
    <g className="body">
      {/* antenna */}
      <line x1="30" y1="12" x2="30" y2="5" stroke="#cfc9e8" strokeWidth="2.4" strokeLinecap="round" />
      <circle className="bulb" cx="30" cy="4.5" r="3.4" fill="#f4a261" />
      {/* ears */}
      <rect x="9" y="25" width="5" height="12" rx="2.5" fill="#cfc9e8" />
      <rect x="46" y="25" width="5" height="12" rx="2.5" fill="#cfc9e8" />
      {/* head */}
      <rect x="12" y="12" width="36" height="32" rx="12" fill="url(#robot-head)" />
      {/* visor + eyes + smile */}
      <rect x="16.5" y="18" width="27" height="17" rx="8.5" fill="url(#robot-visor)" />
      <ellipse className="eye" cx="24.5" cy="25.5" rx="2.8" ry="3.4" fill="#7ef0c6" />
      <ellipse className="eye" cx="35.5" cy="25.5" rx="2.8" ry="3.4" fill="#7ef0c6" />
      <path d="M26 30.5 Q30 33.5 34 30.5" stroke="#7ef0c6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="18.5" cy="38.5" r="2" fill="#f7a8b8" opacity="0.9" />
      <circle cx="41.5" cy="38.5" r="2" fill="#f7a8b8" opacity="0.9" />
      {/* body */}
      <rect x="20" y="45" width="20" height="13" rx="6" fill="url(#robot-head)" />
      <circle cx="30" cy="51.5" r="2.6" fill="#e85d75" />
      {/* waving arm */}
      <g className="arm">
        <rect x="41" y="40" width="5" height="13" rx="2.5" fill="#e6e3f5" transform="rotate(-35 43.5 46.5)" />
        <circle cx="49.5" cy="38.5" r="3.6" fill="#ffffff" />
      </g>
    </g>
  </Svg>
)

export default Robot
