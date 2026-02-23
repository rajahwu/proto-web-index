import React from 'react';

export const SeraphSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="sg" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
      </radialGradient>
      <filter id="gl">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="#0D0E12" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1A1C24" strokeWidth=".5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1A1C24" strokeWidth=".5" />
    <circle cx="200" cy="200" r="150" fill="url(#sg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="#2A2D38" strokeWidth=".5" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#D4A843" strokeWidth=".3" opacity=".3" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="#D4A843" strokeWidth=".8" opacity=".7" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#D4A843" strokeWidth=".4" opacity=".5" />
    <g stroke="#D4A843" strokeWidth=".6" opacity=".6" filter="url(#gl)">
      <line x1="200" y1="200" x2="200" y2="80" />
      <line x1="200" y1="200" x2="303.9" y2="140" />
      <line x1="200" y1="200" x2="303.9" y2="260" />
      <line x1="200" y1="200" x2="200" y2="320" />
      <line x1="200" y1="200" x2="96.1" y2="260" />
      <line x1="200" y1="200" x2="96.1" y2="140" />
    </g>
    <polygon points="200,105 282,152.5 282,247.5 200,295 118,247.5 118,152.5" fill="none" stroke="#D4A843" strokeWidth=".5" opacity=".4" />
    <g transform="translate(200,200)" filter="url(#gl)">
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".8" />
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".6" transform="rotate(60)" />
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".6" transform="rotate(120)" />
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".8" transform="rotate(180)" />
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".6" transform="rotate(240)" />
      <ellipse cx="0" cy="-15" rx="8" ry="30" fill="none" stroke="#D4A843" strokeWidth="1" opacity=".6" transform="rotate(300)" />
      <circle cx="0" cy="0" r="8" fill="#D4A843" fillOpacity=".15" stroke="#D4A843" strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill="#D4A843" fillOpacity=".9" />
    </g>
  </svg>
);

export const ShadowSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="sg" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#4A2D6B" stopOpacity=".35" />
        <stop offset="100%" stopColor="#4A2D6B" stopOpacity="0" />
      </radialGradient>
      <filter id="gl">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="#0D0E12" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1A1C24" strokeWidth=".5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1A1C24" strokeWidth=".5" />
    <circle cx="200" cy="200" r="150" fill="url(#sg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="#2A2D38" strokeWidth=".5" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#4A2D6B" strokeWidth=".3" opacity=".3" strokeDasharray="4 8" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="#4A2D6B" strokeWidth=".8" opacity=".7" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#4A2D6B" strokeWidth=".4" opacity=".5" />
    <g stroke="#4A2D6B" strokeWidth=".6" opacity=".5" filter="url(#gl)">
      <line x1="200" y1="200" x2="200" y2="80" />
      <line x1="200" y1="200" x2="270.7" y2="129.3" strokeDasharray="3 5" />
      <line x1="200" y1="200" x2="320" y2="200" />
      <line x1="200" y1="200" x2="270.7" y2="270.7" strokeDasharray="3 5" />
      <line x1="200" y1="200" x2="200" y2="320" />
      <line x1="200" y1="200" x2="129.3" y2="270.7" strokeDasharray="3 5" />
      <line x1="200" y1="200" x2="80" y2="200" />
      <line x1="200" y1="200" x2="129.3" y2="129.3" strokeDasharray="3 5" />
    </g>
    <g stroke="#4A2D6B" strokeWidth=".5" opacity=".4">
      <line x1="200" y1="115" x2="260" y2="140" />
      <line x1="285" y1="200" x2="260" y2="260" />
      <line x1="200" y1="285" x2="140" y2="260" />
      <line x1="115" y1="200" x2="140" y2="140" />
    </g>
    <g transform="translate(200,200)" filter="url(#gl)">
      <circle cx="0" cy="0" r="22" fill="none" stroke="#7B4FA2" strokeWidth=".8" opacity=".6" />
      <circle cx="-5" cy="0" r="18" fill="#4A2D6B" fillOpacity=".3" stroke="#7B4FA2" strokeWidth=".6" />
      <circle cx="5" cy="0" r="16" fill="#0D0E12" />
      <circle cx="-2" cy="0" r="3" fill="#7B4FA2" fillOpacity=".4" />
      <circle cx="-2" cy="0" r="1.2" fill="#7B4FA2" fillOpacity=".8" />
    </g>
  </svg>
);

export const ExileSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="sg" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#6B7B8D" stopOpacity=".25" />
        <stop offset="100%" stopColor="#6B7B8D" stopOpacity="0" />
      </radialGradient>
      <filter id="gl">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="#0D0E12" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1A1C24" strokeWidth=".5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1A1C24" strokeWidth=".5" />
    <circle cx="200" cy="200" r="150" fill="url(#sg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="#2A2D38" strokeWidth=".5" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#6B7B8D" strokeWidth=".3" opacity=".3" />
    <path d="M 200 100 A 100 100 0 0 1 296 168" fill="none" stroke="#6B7B8D" strokeWidth=".8" opacity=".7" />
    <path d="M 287 240 A 100 100 0 0 1 113 240" fill="none" stroke="#6B7B8D" strokeWidth=".8" opacity=".7" />
    <path d="M 104 168 A 100 100 0 0 1 190 100" fill="none" stroke="#6B7B8D" strokeWidth=".8" opacity=".7" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#6B7B8D" strokeWidth=".4" opacity=".5" />
    <g filter="url(#gl)">
      <rect x="158" y="158" width="84" height="84" fill="none" stroke="#6B7B8D" strokeWidth=".6" opacity=".6" transform="rotate(12,200,200)" />
      <rect x="160" y="160" width="80" height="80" fill="none" stroke="#6B7B8D" strokeWidth=".3" opacity=".2" strokeDasharray="2 4" />
    </g>
    <g stroke="#6B7B8D" strokeWidth=".5" opacity=".4">
      <line x1="200" y1="200" x2="200" y2="90" />
      <line x1="200" y1="200" x2="310" y2="200" />
      <line x1="200" y1="200" x2="200" y2="310" />
      <line x1="200" y1="200" x2="90" y2="200" />
    </g>
    <g transform="translate(200,200)" filter="url(#gl)">
      <circle cx="0" cy="0" r="12" fill="none" stroke="#8BA0B5" strokeWidth=".6" opacity=".7" />
      <line x1="0" y1="-16" x2="0" y2="-8" stroke="#8BA0B5" strokeWidth="1" opacity=".3" />
      <line x1="16" y1="0" x2="8" y2="0" stroke="#8BA0B5" strokeWidth="1" opacity=".8" />
      <line x1="0" y1="16" x2="0" y2="8" stroke="#8BA0B5" strokeWidth="1" opacity=".8" />
      <line x1="-16" y1="0" x2="-8" y2="0" stroke="#8BA0B5" strokeWidth="1" opacity=".8" />
      <circle cx="2" cy="-1" r="2.5" fill="#8BA0B5" fillOpacity=".6" />
    </g>
  </svg>
);

export const PenitentSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="sg" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#B8863B" stopOpacity=".28" />
        <stop offset="100%" stopColor="#B8863B" stopOpacity="0" />
      </radialGradient>
      <filter id="gl">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="#0D0E12" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1A1C24" strokeWidth=".5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1A1C24" strokeWidth=".5" />
    <circle cx="200" cy="200" r="150" fill="url(#sg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="#2A2D38" strokeWidth=".5" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#B8863B" strokeWidth=".3" opacity=".25" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="#B8863B" strokeWidth=".8" opacity=".6" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#B8863B" strokeWidth=".4" opacity=".4" />
    <g filter="url(#gl)">
      <polygon points="200,290 130,140 270,140" fill="none" stroke="#B8863B" strokeWidth=".7" opacity=".6" />
      <polygon points="200,260 155,165 245,165" fill="none" stroke="#D4A04A" strokeWidth=".4" opacity=".35" />
      <line x1="200" y1="100" x2="200" y2="295" stroke="#B8863B" strokeWidth=".4" opacity=".5" />
    </g>
    <g stroke="#B8863B" strokeWidth=".4" opacity=".3">
      <line x1="160" y1="175" x2="240" y2="175" />
      <line x1="168" y1="205" x2="232" y2="205" />
      <line x1="176" y1="235" x2="224" y2="235" />
    </g>
    <g transform="translate(200,200)" filter="url(#gl)">
      <path d="M 0,-18 C 10,-10 12,2 8,12 C 5,18 -5,18 -8,12 C -12,2 -10,-10 0,-18 Z" fill="#B8863B" fillOpacity=".12" stroke="#D4A04A" strokeWidth=".7" opacity=".7" />
      <circle cx="0" cy="4" r="5" fill="none" stroke="#D4A04A" strokeWidth=".5" opacity=".6" />
      <circle cx="0" cy="4" r="2" fill="#D4A04A" fillOpacity=".7" />
    </g>
  </svg>
);

export const RebelSVG: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="sg" cx="50%" cy="50%" r="35%">
        <stop offset="0%" stopColor="#8B2D3A" stopOpacity=".3" />
        <stop offset="100%" stopColor="#8B2D3A" stopOpacity="0" />
      </radialGradient>
      <filter id="gl">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="400" height="400" fill="#0D0E12" />
    <line x1="200" y1="0" x2="200" y2="400" stroke="#1A1C24" strokeWidth=".5" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="#1A1C24" strokeWidth=".5" />
    <circle cx="200" cy="200" r="150" fill="url(#sg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="#2A2D38" strokeWidth=".5" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#8B2D3A" strokeWidth=".3" opacity=".3" />
    <path d="M 200 100 A 100 100 0 0 1 290 230" fill="none" stroke="#8B2D3A" strokeWidth=".8" opacity=".7" />
    <path d="M 280 250 A 100 100 0 0 1 110 230" fill="none" stroke="#8B2D3A" strokeWidth=".8" opacity=".7" />
    <path d="M 108 215 A 100 100 0 0 1 195 100" fill="none" stroke="#8B2D3A" strokeWidth=".8" opacity=".7" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#8B2D3A" strokeWidth=".4" opacity=".5" />
    <g filter="url(#gl)">
      <polyline points="130,260 200,130 270,260" fill="none" stroke="#C04050" strokeWidth=".8" opacity=".6" />
      <polyline points="155,240 200,160 245,240" fill="none" stroke="#8B2D3A" strokeWidth=".5" opacity=".4" />
      <line x1="200" y1="130" x2="200" y2="85" stroke="#C04050" strokeWidth=".5" opacity=".5" />
      <line x1="200" y1="130" x2="175" y2="95" stroke="#C04050" strokeWidth=".3" opacity=".3" />
      <line x1="200" y1="130" x2="225" y2="95" stroke="#C04050" strokeWidth=".3" opacity=".3" />
    </g>
    <g transform="translate(200,200)" filter="url(#gl)">
      <path d="M 0,-15 A 15 15 0 0 1 13,7.5" fill="none" stroke="#C04050" strokeWidth=".8" opacity=".7" />
      <path d="M 10,11 A 15 15 0 0 1 -13,7.5" fill="none" stroke="#C04050" strokeWidth=".8" opacity=".7" />
      <path d="M -10,11 A 15 15 0 0 1 -3,-15" fill="none" stroke="#C04050" strokeWidth=".8" opacity=".7" />
      <line x1="-8" y1="-8" x2="8" y2="8" stroke="#C04050" strokeWidth="1.2" opacity=".8" />
      <line x1="8" y1="-8" x2="-8" y2="8" stroke="#C04050" strokeWidth="1.2" opacity=".8" />
      <circle cx="0" cy="0" r="2" fill="#C04050" fillOpacity=".9" />
    </g>
  </svg>
);

export const SvgComponents: Record<string, React.FC> = {
  seraph: SeraphSVG,
  shadow: ShadowSVG,
  exile: ExileSVG,
  penitent: PenitentSVG,
  rebel: RebelSVG,
};

export default SvgComponents;
