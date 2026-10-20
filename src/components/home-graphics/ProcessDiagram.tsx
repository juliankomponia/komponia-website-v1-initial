import { BrandModuleIcon } from './BrandModule';
import { useRevealOnce } from '../../hooks/useGraphicMotion';
import './flow-diagrams.css';

const stages = [
  { label: 'Requirement', discipline: 'engineering' },
  { label: 'Technical review', discipline: 'engineering' },
  { label: 'Quotation', discipline: 'engineering' },
  { label: 'Samples & release', discipline: 'quality' },
  { label: 'Series supply', discipline: 'supply' },
] as const;

type ProcessDiagramProps = {
  activeStep: number;
};

/** The existing lifecycle tabs remain the only controls for this diagram. */
export default function ProcessDiagram({ activeStep }: ProcessDiagramProps) {
  const { ref, revealed, reducedMotion } = useRevealOnce<HTMLElement>();
  const active = Number.isFinite(activeStep)
    ? Math.max(0, Math.min(stages.length - 1, Math.floor(activeStep)))
    : 0;

  return <figure
    ref={ref}
    className="kp-process-diagram"
    data-revealed={revealed || reducedMotion}
  >
    <div className="kp-process-diagram__track" aria-hidden="true">
      <svg className="kp-process-diagram__lines" viewBox="0 0 1000 48" preserveAspectRatio="none">
        <path className="kp-flow-line kp-process-diagram__baseline" d="M100 24H900" />
        {stages.slice(1).map((stage, index) => <path
          key={stage.label}
          className={`kp-flow-line kp-process-diagram__progress kp-flow--${stage.discipline}`}
          d={`M${100 + index * 200} 24H${300 + index * 200}`}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={active > index ? 0 : 1}
        />)}
      </svg>
      <div className="kp-process-diagram__nodes">
        {stages.map((stage, index) => <div
          key={stage.label}
          className="kp-process-diagram__node"
          data-active={active === index}
          data-passed={active > index}
        >
          <span className="kp-process-diagram__module">
            <BrandModuleIcon
              discipline={stage.discipline}
              state={active === index ? 'active' : active > index ? 'connected' : 'resting'}
            />
          </span>
          <span className="kp-process-diagram__number">{String(index + 1).padStart(2, '0')}</span>
        </div>)}
      </div>
    </div>
    <figcaption className="kp-process-diagram__caption">
      <span><span className="kp-process-diagram__current">{String(active + 1).padStart(2, '0')}</span> / 05 <strong>{stages[active].label}</strong></span>
      <span className="kp-process-diagram__scope">Steps follow the agreed scope.</span>
    </figcaption>
  </figure>;
}
