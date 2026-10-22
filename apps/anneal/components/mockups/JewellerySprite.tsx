// Gradients and the ring symbol from design/v6/HomeV6.dc.html, drawn as SVG
// until product photography arrives (build-handoff.md, section 2).
export function JewellerySprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="jwGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6E3A8" />
          <stop offset=".35" stopColor="#D4A84B" />
          <stop offset=".6" stopColor="#F3D88D" />
          <stop offset="1" stopColor="#A9782A" />
        </linearGradient>
        <linearGradient id="jwGem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".45" stopColor="#DDE8F2" />
          <stop offset=".7" stopColor="#F9FBFF" />
          <stop offset="1" stopColor="#B9CCDD" />
        </linearGradient>
        <symbol id="jw-ring" viewBox="0 0 200 200">
          <ellipse
            cx="100"
            cy="128"
            rx="58"
            ry="46"
            fill="none"
            stroke="url(#jwGold)"
            strokeWidth="13"
          />
          <ellipse
            cx="100"
            cy="128"
            rx="58"
            ry="46"
            fill="none"
            stroke="#FFF7DA"
            strokeOpacity=".55"
            strokeWidth="2.5"
          />
          <path
            d="M86 84 L92 70 M114 84 L108 70"
            stroke="url(#jwGold)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M100 40 L124 62 L100 92 L76 62 Z"
            fill="url(#jwGem)"
            stroke="#9FB3C6"
            strokeWidth="1.2"
          />
          <path
            d="M76 62 L124 62 M100 40 L90 62 L100 92 L110 62 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity=".8"
            strokeWidth="1"
          />
          <path
            className="jwsh"
            d="M128 44 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 Z"
            fill="#FFFFFF"
          />
        </symbol>
      </defs>
    </svg>
  );
}
