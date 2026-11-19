/** Original hand-drawn style floral spray in champagne gold & blush. */
export default function Floral({ className = '', flip = false }) {
  return (
    <svg
      className={`floral ${className}`}
      viewBox="0 0 220 220"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <radialGradient id="petal" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#fbe1e6" />
          <stop offset="70%" stopColor="#e9a4b4" />
          <stop offset="100%" stopColor="#b9566f" />
        </radialGradient>
        <linearGradient id="leaf" x1="0" x2="1">
          <stop offset="0%" stopColor="#d9b877" />
          <stop offset="100%" stopColor="#8d6a35" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#d9b877" strokeWidth="1.2" strokeLinecap="round" opacity=".85">
        <path d="M10 210 C60 170 90 130 120 70" />
        <path d="M60 172 C90 160 120 165 160 150" />
        <path d="M95 125 C70 110 55 90 50 60" />
      </g>
      <g fill="url(#leaf)" opacity=".85">
        <path d="M40 190 c10-22 32-26 40-22 -6 14-22 26-40 22z" />
        <path d="M110 160 c16-12 36-8 42-2 -12 10-30 12-42 2z" />
        <path d="M78 115 c-4-20 6-36 14-38 4 14-2 30-14 38z" />
        <path d="M58 84 c-16-8-20-26-16-32 12 4 20 18 16 32z" />
        <path d="M130 150 c10-16 28-18 34-14 -8 12-22 18-34 14z" />
      </g>
      <g>
        <g transform="translate(122 66)">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} rx="11" ry="17" cy="-12" fill="url(#petal)" transform={`rotate(${r})`} opacity=".95" />
          ))}
          <circle r="6" fill="#f3d79b" />
          <circle r="2.5" fill="#caa25c" />
        </g>
        <g transform="translate(162 150) scale(.7)">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} rx="11" ry="17" cy="-12" fill="url(#petal)" transform={`rotate(${r + 20})`} />
          ))}
          <circle r="6" fill="#f3d79b" />
        </g>
        <g transform="translate(50 58) scale(.5)">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} rx="11" ry="17" cy="-12" fill="#f6d3da" transform={`rotate(${r + 10})`} />
          ))}
          <circle r="6" fill="#e8c98a" />
        </g>
      </g>
      <g fill="#f3d79b">
        <circle cx="96" cy="40" r="2" /><circle cx="150" cy="104" r="1.6" /><circle cx="30" cy="150" r="1.4" />
        <circle cx="185" cy="120" r="1.8" /><circle cx="140" cy="30" r="1.2" />
      </g>
    </svg>
  );
}
