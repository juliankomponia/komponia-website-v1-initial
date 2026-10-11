import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ClipboardList, DraftingCompass, Network, Repeat2, ScanLine, Truck } from 'lucide-react';
import { HOME_CONTENT as H } from '../data/home';
import BrandLabel from './BrandLabel';
import './ProcessExplorer.css';

const details = [
  { icon: ClipboardList, input: 'Application, references, quantities and preferred dates.', output: 'A shared understanding of the requirement.', labels: ['Application', 'Requirement', 'Scope'], caption: 'The application sets the starting point.' },
  { icon: DraftingCompass, input: 'The required function, interfaces and operating conditions.', output: 'A selected standard part or a defined custom version.', labels: ['Requirement', 'Part definition', 'Variant'], caption: 'From the requirement to a defined component.' },
  { icon: Network, input: 'The part definition and technical and commercial requirements.', output: 'Manufacturer options and the scope to agree.', labels: ['Part definition', 'Source options', 'Scope'], caption: 'Technical requirements connect with the sourcing route.' },
  { icon: ScanLine, input: 'Samples, required documents and agreed checks.', output: 'A basis for application release.', labels: ['Sample', 'Agreed checks', 'Release'], caption: 'Samples and documents support the release decision.' },
  { icon: Truck, input: 'The agreed specification and delivery conditions.', output: 'Coordinated purchasing, import and logistics.', labels: ['Specification', 'Logistics', 'Delivery'], caption: 'The agreed conditions guide procurement and delivery.' },
  { icon: Repeat2, input: 'Repeat demand, call-offs and changes to the requirement.', output: 'Coordinated supply and ongoing quality support.', labels: ['Demand', 'Call-offs', 'Review'], caption: 'Repeat demand informs the next supply cycle.' },
];

type DrawingKind = 'document' | 'part' | 'source' | 'check' | 'box' | 'repeat';

function LineDrawing({ kind }: { kind: DrawingKind }) {
  if (kind === 'document') return <g>
    <path d="M-29-40H12L30-22V39H-29Z" />
    <path d="M12-40V-22H30M-17-10H16M-17 1H9M-17 25H-2" />
    <path d="M7 22L13 28L24 14" className="k-process__drawing-accent" />
  </g>;
  if (kind === 'part') return <g>
    <path d="M-37-19L0-40L37-19V23L0 44L-37 23Z" />
    <path d="M-37-19L0 2L37-19M0 2V44" />
    <path d="M-20-10L0-22L20-10L0 2Z" className="k-process__drawing-accent" />
    <path d="M-25 6V16L-13 23M13 23L25 16V6" />
  </g>;
  if (kind === 'source') return <g>
    <path d="M-32-25H-11L0-4M32-25H11L0-4M0 12V29" />
    <rect x="-45" y="-37" width="25" height="25" rx="5" />
    <rect x="20" y="-37" width="25" height="25" rx="5" />
    <rect x="-14" y="26" width="28" height="25" rx="5" />
    <circle r="15" cy="-2" className="k-process__drawing-accent" />
    <path d="M-5-2L-1 2L6-5" className="k-process__drawing-accent" />
  </g>;
  if (kind === 'check') return <g>
    <path d="M-43-19V-35H-27M27-35H43V-19M43 21V37H27M-27 37H-43V21" />
    <path d="M-24-11L0-25L24-11V17L0 31L-24 17ZM-24-11L0 3L24-11M0 3V31" />
    <path d="M-47 3H47" className="k-process__drawing-accent" />
    <circle cx="0" cy="3" r="4" className="k-process__drawing-point" />
  </g>;
  if (kind === 'box') return <g>
    <path d="M-36-16L0-36L36-16V23L0 43L-36 23ZM-36-16L0 4L36-16M0 4V43" />
    <path d="M-17-26L18-6V7L7 13V0" className="k-process__drawing-accent" />
    <path d="M-27 13L-13 21M-27 21L-19 26" />
  </g>;
  return <g>
    <path d="M-30-24A39 39 0 0 1 39 0M39 0V-20M39 0H19M30 26A39 39 0 0 1-39 0M-39 0V20M-39 0H-19" />
    <path d="M-15-8L0-17L15-8V10L0 19L-15 10ZM-15-8L0 1L15-8M0 1V19" className="k-process__drawing-accent" />
  </g>;
}

const drawingKinds: DrawingKind[][] = [
  ['part', 'document', 'document'],
  ['document', 'part', 'part'],
  ['part', 'source', 'document'],
  ['part', 'check', 'document'],
  ['document', 'box', 'box'],
  ['document', 'repeat', 'check'],
];

function ProcessDiagram({ step }: { step: number }) {
  const detail = details[step];
  return <figure className="k-process__figure">
    <div className="k-process__figure-top"><span className="k-process__figure-mark" aria-hidden="true" /><span>Requirement to supply</span><span>0{step + 1} / 06</span></div>
    <svg className="k-process__diagram" viewBox="0 0 520 280" fill="none" aria-hidden="true" focusable="false">
      <path className="k-process__connector" d="M132 132H174M166 126L174 132L166 138M346 132H388M380 126L388 132L380 138" />
      <rect x="184" y="43" width="152" height="177" rx="18" className="k-process__node-back" />
      {[78, 260, 442].map((x, index) => <g key={x}>
        <g transform={`translate(${x} 125) scale(${index === 1 ? 1.1 : 0.7})`} className={`k-process__drawing${index === 1 ? ' k-process__drawing--main' : ''}`}>
          <LineDrawing kind={drawingKinds[step][index]} />
        </g>
        <text x={x} y={index === 1 ? 200 : 191} className="k-process__diagram-label">{detail.labels[index]}</text>
      </g>)}
      <path d="M242 235H278" className="k-process__figure-rule" />
    </svg>
    <figcaption>{detail.caption}<span>Illustrative process</span></figcaption>
  </figure>;
}

export default function ProcessExplorer() {
  const [activeStep, setActiveStep] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const steps = H.process.steps;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + steps.length) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    tabs.current[next]?.focus();
  }

  return <div className="k-process" data-home-reveal aria-labelledby={`${id}-heading`}>
    <div className="k-process__heading">
      <BrandLabel>How we work</BrandLabel>
      <h2 id={`${id}-heading`}>{H.process.title}</h2>
      <p>{H.process.intro}</p>
    </div>
    <div className="k-process__tabs" role="tablist" aria-label="Explore the process">
      {steps.map((step, index) => {
        const Icon = details[index].icon;
        return <button className="k-process__tab" type="button" role="tab" key={step.title}
          id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={activeStep === index}
          tabIndex={activeStep === index ? 0 : -1} ref={element => { tabs.current[index] = element; }}
          onClick={() => setActiveStep(index)} onKeyDown={event => onTabKeyDown(event, index)}>
          <span className="k-process__tab-top"><span>0{index + 1}</span><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
          <span className="k-process__tab-label">{step.title}</span>
        </button>;
      })}
    </div>
    {steps.map((step, index) => <div className="k-process__panel" key={step.title} role="tabpanel"
      id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={activeStep !== index}>
      <div className="k-process__copy">
        <span className="k-process__step-label">Step 0{index + 1}</span>
        <h3>{step.title}.</h3>
        <p className="k-process__description">{step.text}</p>
        <dl className="k-process__details">
          <div><dt>Starting point</dt><dd>{details[index].input}</dd></div>
          <div><dt>The outcome</dt><dd>{details[index].output}</dd></div>
        </dl>
      </div>
      <ProcessDiagram step={index} />
    </div>)}
  </div>;
}
