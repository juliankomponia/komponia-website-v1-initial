import type { ReactNode, SVGProps } from 'react';
import './technical-drawing.css';

export type TechnicalDrawingVariant = 'controller' | 'sensor' | 'machined' | 'sheet' | 'connector';

type TechnicalDrawingProps = SVGProps<SVGSVGElement> & {
  variant: TechnicalDrawingVariant;
};

type CalloutProps = {
  number: '01' | '02' | '03';
  x: number;
  y: number;
  path: string;
  point: [number, number];
};

function Callout({ number, x, y, path, point }: CalloutProps) {
  return <g className="kp-technical-drawing__callout">
    <path d={path} />
    <circle cx={point[0]} cy={point[1]} r="2.2" />
    <text x={x} y={y}>{number}</text>
  </g>;
}

function Controller() {
  return <>
    <g className="kp-technical-drawing__datum">
      <path d="M92 54V196M258 54V196M86 187H264M88 183L96 191M254 183L262 191" />
      <path d="M68 60V171M64 64L72 56M64 175L72 167M60 60H90M60 171H90" />
    </g>
    <g className="kp-technical-drawing__part">
      <rect x="92" y="60" width="150" height="104" rx="7" />
      <path d="M242 63L258 74V171H108L95 164M242 164L258 171" />
      <rect x="107" y="78" width="85" height="39" rx="2" />
      <path d="M117 102H129V93H145V108H158V89H180" />
      <path d="M206 85H226M206 94H226M206 103H220M106 134H228M117 144V154M137 144V154M157 144V154M177 144V154M197 144V154M217 144V154" />
      <circle cx="215" cy="119" r="3" />
    </g>
    <Callout number="01" x={40} y={38} path="M61 35H104L118 60" point={[118, 60]} />
    <Callout number="02" x={286} y={68} path="M281 64H269L192 96" point={[192, 96]} />
    <Callout number="03" x={286} y={209} path="M279 205H254L218 151" point={[218, 151]} />
  </>;
}

function Sensor() {
  return <>
    <g className="kp-technical-drawing__datum">
      <path d="M45 122H317M68 90V193M296 105V193M62 183H302M64 179L72 187M292 179L300 187" />
    </g>
    <g className="kp-technical-drawing__part">
      <path d="M68 105H104V139H68ZM74 105V139M96 105V139M68 113H57V131H68" />
      <path d="M104 103H132L145 89H178L192 103V141L178 155H145L132 141H104Z" />
      <path d="M132 103H192M132 141H192M145 89V155M178 89V155" />
      <path d="M192 108H209V136H192M198 108V136M204 108V136M209 116H290Q298 116 298 122Q298 128 290 128H209" />
      <path d="M112 111V133M119 111V133" />
    </g>
    <Callout number="01" x={35} y={61} path="M57 58H78L85 105" point={[85, 105]} />
    <Callout number="02" x={174} y={46} path="M183 51V68L162 89" point={[162, 89]} />
    <Callout number="03" x={286} y={74} path="M294 80V94L270 116" point={[270, 116]} />
  </>;
}

function Machined() {
  return <>
    <g className="kp-technical-drawing__datum">
      <path d="M81 83L181 38M89 79L93 87M172 38L176 46M89 87V177M288 97V188M281 183L291 188M94 177L194 222L291 179" />
      <path d="M82 171L96 177M189 216L194 228M286 174L292 183" />
    </g>
    <g className="kp-technical-drawing__part">
      <path d="M104 94L194 54L282 101L192 143ZM104 94V162L192 212L282 170V101M192 143V212" />
      <ellipse cx="169" cy="91" rx="17" ry="9" transform="rotate(-24 169 91)" />
      <ellipse cx="220" cy="115" rx="17" ry="9" transform="rotate(-24 220 115)" />
      <path d="M151 92Q165 80 184 89M202 116Q216 104 235 113" />
      <path d="M119 118L175 150V170L119 138ZM205 155L266 127V145L205 174Z" />
      <path d="M119 146L139 157M151 164L175 177M205 189L224 180M244 171L266 161" />
    </g>
    <Callout number="01" x={34} y={59} path="M56 56H91L116 88" point={[116, 88]} />
    <Callout number="02" x={287} y={45} path="M291 51V67L221 106" point={[221, 106]} />
    <Callout number="03" x={44} y={206} path="M66 202H85L129 133" point={[129, 133]} />
  </>;
}

function Sheet() {
  return <>
    <g className="kp-technical-drawing__datum">
      <path d="M98 90L202 43M100 84L105 94M193 42L198 52M287 92V169M283 97L291 89M283 173L291 165" />
      <path d="M162 208L276 163M159 204L165 213M273 159L279 168M151 130V213M273 151V176" />
    </g>
    <g className="kp-technical-drawing__part">
      <path d="M108 96L209 60L273 91L172 129ZM172 129V196L273 157V91" />
      <path d="M108 96V102L166 133V198L172 196M166 133L172 129" />
      <ellipse cx="176" cy="94" rx="12" ry="6" transform="rotate(-20 176 94)" />
      <ellipse cx="221" cy="90" rx="12" ry="6" transform="rotate(-20 221 90)" />
      <path d="M192 144L213 136V160L192 168ZM233 128L254 120V144L233 152Z" />
      <path d="M186 181L259 153" />
    </g>
    <Callout number="01" x={44} y={50} path="M66 47H96L132 87" point={[132, 87]} />
    <Callout number="02" x={287} y={55} path="M291 61V74L221 90" point={[221, 90]} />
    <Callout number="03" x={54} y={183} path="M76 180H126L166 149" point={[166, 149]} />
  </>;
}

function Connector() {
  return <>
    <g className="kp-technical-drawing__datum">
      <path d="M103 72V205M262 95V205M96 198H269M99 194L107 202M258 194L266 202" />
      <path d="M81 88V169M77 92L85 84M77 173L85 165M74 88H101M74 169H101" />
    </g>
    <g className="kp-technical-drawing__part">
      <rect x="104" y="88" width="136" height="81" rx="8" />
      <rect x="120" y="103" width="102" height="48" rx="4" />
      <path d="M234 88L262 104V183L240 169M262 183H126L110 169M240 107L262 119" />
      <path d="M141 88V79H204V88M149 79V72H196V79" />
      {[133, 157, 181, 205].map((x) => <g key={x}>
        <rect x={x} y="113" width="8" height="8" rx="1" />
        <rect x={x} y="132" width="8" height="8" rx="1" />
        <path d={`M${x} 170V183M${x + 6} 170V183`} />
      </g>)}
    </g>
    <Callout number="01" x={41} y={44} path="M63 41H115L149 76" point={[149, 76]} />
    <Callout number="02" x={286} y={79} path="M282 75H267L209 117" point={[209, 117]} />
    <Callout number="03" x={284} y={216} path="M278 212H258L209 182" point={[209, 182]} />
  </>;
}

const drawings = {
  controller: Controller,
  sensor: Sensor,
  machined: Machined,
  sheet: Sheet,
  connector: Connector,
} satisfies Record<TechnicalDrawingVariant, () => ReactNode>;

/**
 * Illustrative construction lines only. Callout numbers identify details;
 * they do not represent dimensions, tolerances, or other product guarantees.
 */
export default function TechnicalDrawing({ variant, className = '', ...props }: TechnicalDrawingProps) {
  const Drawing = drawings[variant];

  return <svg
    viewBox="0 0 360 240"
    {...props}
    className={`kp-technical-drawing ${className}`.trim()}
    data-variant={variant}
    aria-hidden="true"
    focusable="false"
  >
    <Drawing />
  </svg>;
}
