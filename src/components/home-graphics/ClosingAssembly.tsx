import { useRevealOnce } from '../../hooks/useGraphicMotion';
import { BrandModule, BrandModuleIcon } from './BrandModule';
import './closing-assembly.css';

type ClosingAssemblyProps = {
  className?: string;
};

/** The same three disciplines meet in the original mark, once per page visit. */
export default function ClosingAssembly({ className = '' }: ClosingAssemblyProps) {
  const { ref, revealed } = useRevealOnce<HTMLElement>();

  return <figure
    ref={ref}
    className={`kp-closing-assembly ${className}`.trim()}
    data-revealed={revealed}
  >
    <svg
      className="kp-closing-assembly__drawing"
      viewBox="0 0 300 254"
      aria-hidden="true"
      focusable="false"
    >
      <g className="kp-closing-assembly__datum">
        <path d="M42 26H260M42 233H260M50 18V241M250 18V241" />
        <path d="M46 22L54 30M246 22L254 30M46 229L54 237M246 229L254 237" />
        <path d="M23 131H278" strokeDasharray="3 6" />
      </g>
      <g transform="translate(61 40) scale(1.15)">
        <g className="kp-closing-assembly__piece kp-closing-assembly__piece--engineering">
          <BrandModule discipline="engineering" state="assembled" />
        </g>
        <g transform="translate(82 0)">
          <g className="kp-closing-assembly__piece kp-closing-assembly__piece--quality">
            <BrandModule discipline="quality" state="assembled" />
          </g>
        </g>
        <g transform="translate(82 82)">
          <g className="kp-closing-assembly__piece kp-closing-assembly__piece--supply">
            <BrandModule discipline="supply" state="assembled" />
          </g>
        </g>
      </g>
    </svg>
    <figcaption>
      <span><BrandModuleIcon discipline="engineering" state="assembled" />Engineering</span>
      <span><BrandModuleIcon discipline="quality" state="assembled" />Quality</span>
      <span><BrandModuleIcon discipline="supply" state="assembled" />Supply</span>
    </figcaption>
  </figure>;
}
