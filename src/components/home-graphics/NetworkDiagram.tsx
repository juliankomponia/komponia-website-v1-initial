import { BrandMark, BrandModuleIcon } from './BrandModule';
import { useRevealOnce } from '../../hooks/useGraphicMotion';
import './flow-diagrams.css';

const routes = [
  { label: 'CNC', discipline: 'engineering' },
  { label: 'Sheet metal', discipline: 'engineering' },
  { label: '3D printing', discipline: 'engineering' },
  { label: 'Standard parts', discipline: 'engineering' },
  { label: 'Electrical / sensors', discipline: 'engineering' },
  { label: 'QC', discipline: 'quality' },
] as const;

export default function NetworkDiagram() {
  const { ref, revealed, reducedMotion } = useRevealOnce<HTMLElement>();

  return <figure
    ref={ref}
    className="kp-network-diagram"
    data-revealed={revealed || reducedMotion}
  >
    <figcaption className="kp-network-diagram__caption">
      <span>Specialist processes</span>
      <span>Schematic</span>
    </figcaption>
    <div className="kp-network-diagram__canvas">
      <svg
        className="kp-network-diagram__connections"
        viewBox="0 0 600 372"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g className="kp-network-diagram__routes">
          <path className="kp-flow-line kp-flow--engineering" pathLength="1" d="M100 90V120H300V145" />
          <path className="kp-flow-line kp-flow--engineering" pathLength="1" d="M300 90V145" />
          <path className="kp-flow-line kp-flow--engineering" pathLength="1" d="M500 90V120H300" />
          <path className="kp-flow-line kp-flow--engineering" pathLength="1" d="M300 227V252H100V282" />
          <path className="kp-flow-line kp-flow--engineering" pathLength="1" d="M300 252V282" />
          <path className="kp-flow-line kp-flow--quality" pathLength="1" d="M300 252H500V282" />
        </g>
      </svg>
      {routes.slice(0, 3).map(route => <div className="kp-network-diagram__node" key={route.label}>
        <BrandModuleIcon discipline={route.discipline} state="connected" />
        <span>{route.label}</span>
      </div>)}
      <div className="kp-network-diagram__hub">
        <BrandMark state="assembled" />
        <div><strong>komponia</strong><span>Coordination</span></div>
      </div>
      {routes.slice(3).map(route => <div className="kp-network-diagram__node" key={route.label}>
        <BrandModuleIcon discipline={route.discipline} state="connected" />
        <span>{route.label === 'QC' ? <abbr title="Quality control">QC</abbr> : route.label}</span>
      </div>)}
    </div>
    <p className="kp-network-diagram__note">Manufacturing routes, components and quality checks coordinated around your requirement.</p>
  </figure>;
}
