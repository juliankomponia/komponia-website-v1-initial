import { useRevealOnce } from '../../hooks/useGraphicMotion';
import './flow-diagrams.css';

/** Package count is illustrative; the caption explicitly excludes fixed quantities or timing. */
export default function SupplyRhythm() {
  const { ref, revealed, reducedMotion } = useRevealOnce<HTMLElement>();

  return <figure
    ref={ref}
    className="kp-supply-rhythm"
    data-revealed={revealed || reducedMotion}
  >
    <div className="kp-supply-rhythm__canvas" aria-hidden="true">
      <svg className="kp-supply-rhythm__connections" viewBox="0 0 600 198" preserveAspectRatio="none">
        <path className="kp-flow-line" pathLength="1" d="M300 68V103H100V144" />
        <path className="kp-flow-line" pathLength="1" d="M300 103V144" />
        <path className="kp-flow-line" pathLength="1" d="M300 103H500V144" />
      </svg>
      <div className="kp-supply-rhythm__batch">
        <span>Larger production batch</span>
        <svg viewBox="0 0 600 34" preserveAspectRatio="none">
          <rect x="1" y="1" width="598" height="32" />
          <path className="kp-flow-line" d="M150 1V33M300 1V33M450 1V33" />
        </svg>
      </div>
      {[0, 1, 2].map(index => <div
        className="kp-supply-rhythm__delivery"
        key={index}
        data-delivery={index}
      >
        <svg viewBox="0 0 62 54">
          <path className="kp-flow-line kp-supply-rhythm__package" d="M8 14L31 2L54 14V40L31 52L8 40Z" />
          <path className="kp-flow-line" d="M8 14L31 26L54 14M31 26V52M20 8L43 20" />
        </svg>
      </div>)}
    </div>
    <div className="kp-supply-rhythm__release" aria-hidden="true">
      <span>Smaller call-offs</span>
      <span>Released around agreed demand</span>
    </div>
    <figcaption>
      <span className="sr-only">A larger production batch is divided into smaller call-offs. </span>
      Schematic – quantities and timing agreed per project.
    </figcaption>
  </figure>;
}
