import { useRevealOnce } from '../../hooks/useGraphicMotion';
import './technical-drawing.css';

type ConnectionLineProps = {
  className?: string;
};

/** A single orthogonal datum connecting adjacent sections without layout motion. */
export default function ConnectionLine({ className = '' }: ConnectionLineProps) {
  const { ref, revealed } = useRevealOnce<HTMLDivElement>();

  return <div
    ref={ref}
    className={`kp-connection-line ${className}`.trim()}
    data-revealed={revealed}
    aria-hidden="true"
  >
    <svg viewBox="0 0 1200 52" preserveAspectRatio="none" focusable="false">
      <path pathLength="1" d="M8 0V18H582V44H1192V52" />
    </svg>
  </div>;
}
