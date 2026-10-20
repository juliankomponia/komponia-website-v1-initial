import type { SVGProps } from 'react';
import './technical-drawing.css';

export type BrandDiscipline = 'engineering' | 'quality' | 'supply';
export type BrandModuleState = 'resting' | 'active' | 'connected' | 'assembled';

type BrandModuleProps = SVGProps<SVGGElement> & {
  discipline: BrandDiscipline;
  state?: BrandModuleState;
};

type BrandModuleIconProps = SVGProps<SVGSVGElement> & {
  discipline: BrandDiscipline;
  state?: BrandModuleState;
};

const geometry = {
  engineering: { width: 67, height: 158, radius: 33 },
  quality: { width: 73, height: 67, radius: 22 },
  supply: { width: 73, height: 76, radius: 22 },
} as const;

/** SVG group; place with a transform. Geometry follows the original brand mark. */
export function BrandModule({
  discipline,
  state = 'resting',
  className = '',
  ...props
}: BrandModuleProps) {
  const { width, height, radius } = geometry[discipline];

  return <g
    {...props}
    className={`kp-graphic-module ${className}`.trim()}
    data-discipline={discipline}
    data-state={state}
  >
    <rect width={width} height={height} rx={radius} />
  </g>;
}

/** Standalone module for HTML layouts; all content is decorative. */
export function BrandModuleIcon({
  discipline,
  state = 'resting',
  className = '',
  ...props
}: BrandModuleIconProps) {
  const { width, height } = geometry[discipline];

  return <svg
    viewBox={`-1 -1 ${width + 2} ${height + 2}`}
    {...props}
    className={`kp-graphic-module-icon ${className}`.trim()}
    aria-hidden="true"
    focusable="false"
  >
    <BrandModule discipline={discipline} state={state} />
  </svg>;
}

/** Original 155 × 158 arrangement, with individual modules still addressable. */
export function BrandMark({
  state = 'assembled',
  className = '',
  ...props
}: SVGProps<SVGSVGElement> & { state?: BrandModuleState }) {
  return <svg
    viewBox="-1 -1 157 160"
    {...props}
    className={`kp-graphic-brand-mark ${className}`.trim()}
    aria-hidden="true"
    focusable="false"
  >
    <BrandModule discipline="engineering" state={state} />
    <BrandModule discipline="quality" state={state} transform="translate(82 0)" />
    <BrandModule discipline="supply" state={state} transform="translate(82 82)" />
  </svg>;
}
