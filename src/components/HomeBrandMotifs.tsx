import './HomeBrandMotifs.css';

type BrandMotifProps = { className?: string };

const constructionTicks = Array.from({ length: 21 }, (_, index) => 36 + index * 20);
const networkOutlines = [
  [42, 24], [232, 24], [426, 24],
  [42, 146], [234, 146], [494, 146],
  [42, 268], [232, 268],
] as const;

export function BrandConstruction({ className = '' }: BrandMotifProps) {
  return <svg
    className={`kp-brand-motif kp-brand-construction ${className}`.trim()}
    viewBox="0 0 600 480"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    {/* The original mark's 155 × 158 geometry, enlarged like a construction drawing. */}
    <g className="kp-brand-construction__mark" transform="translate(-30 12) scale(2.85)">
      <rect width="67" height="158" rx="33" />
      <rect x="82" width="73" height="67" rx="22" />
      <rect x="82" y="82" width="73" height="76" rx="22" />
    </g>
    <g className="kp-brand-construction__datum">
      <path d="M548 16V464" />
      {constructionTicks.map((y, index) => <path
        key={y}
        d={`M${index % 5 === 0 ? 538 : 543} ${y}H${index % 5 === 0 ? 558 : 553}`}
      />)}
    </g>
    <path className="kp-brand-construction__axis" d="M-10 238H500" />
  </svg>;
}

export function BrandNetwork({ className = '' }: BrandMotifProps) {
  return <svg
    className={`kp-brand-motif kp-brand-network ${className}`.trim()}
    viewBox="0 0 600 400"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <g className="kp-brand-network__outlines">
      {networkOutlines.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="52" height="52" rx="16" />)}
    </g>
    <path className="kp-brand-network__route" d="M184 113H302M370 113H408V281H459M527 281H586" />
    <g className="kp-brand-network__junctions">
      <circle cx="408" cy="113" r="4" />
      <circle cx="408" cy="281" r="4" />
    </g>
    <rect className="kp-brand-network__blue" x="132" y="83" width="52" height="123" rx="26" />
    <rect className="kp-brand-network__lavender" x="302" y="82" width="68" height="62" rx="20" />
    <rect className="kp-brand-network__yellow" x="459" y="246" width="68" height="70" rx="20" />
    <circle className="kp-brand-network__yellow" cx="586" cy="281" r="4" />
  </svg>;
}

export function BrandModules({ className = '' }: BrandMotifProps) {
  return <svg
    className={`kp-brand-motif kp-brand-modules ${className}`.trim()}
    viewBox="0 0 310 280"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(50 32) scale(1.35)">
      <rect className="kp-brand-modules__pill" width="67" height="158" rx="33" />
      <rect className="kp-brand-modules__lavender" x="82" width="73" height="67" rx="22" />
      <rect className="kp-brand-modules__yellow" x="82" y="82" width="73" height="76" rx="22" />
    </g>
  </svg>;
}
