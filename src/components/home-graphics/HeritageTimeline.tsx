import './closing-assembly.css';

/** The only dated milestone is the documented WTS start in 1997. */
export default function HeritageTimeline() {
  return <div className="kp-heritage-timeline">
    <svg viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M1 8H239M1 2V14M239 2V14" />
    </svg>
    <div><span>1997</span><span>today</span></div>
  </div>;
}
