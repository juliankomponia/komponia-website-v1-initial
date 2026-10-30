import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import Dossier from '../v9/Dossier';

const CHECKS = ['Dimensions', 'Function', 'Batch sample', 'Documented result'];

const STEPS = [
  { label: 'Inquiry', title: 'Start with what you have.', text: 'A part number, a drawing, a sample or an application description. We clarify function, interfaces and quantities with you.' },
  { label: 'Sketch & CAD', title: 'Your requirement takes shape.', text: 'We prepare CAD and sketches in-house and align manufacturing details with the selected manufacturer.' },
  { label: 'Sample & checks', title: 'Check the agreed requirements.', text: 'We organise samples with suitable manufacturers and carry out agreed dimensional and functional checks in the Komponia Lab. Scope, criteria and documentation are defined with you.' },
  { label: 'Series', title: 'From your approval to series.', text: 'After your approval, suitable manufacturers produce the agreed component version and quantities. We coordinate production and ongoing quality.' },
  { label: 'Supply', title: 'Plan production. Call off as needed.', text: 'We coordinate purchasing volumes, economical production lots and smaller call-offs. Stock levels, delivery schedules and responsibilities are agreed around your demand.' },
] as const;

function StepCopy({ index }: { index: number }) {
  const step = STEPS[index];
  return <div className="kp7-stepcopy" data-on>
    <p className="kp7-mono kp7-stepcopy__num"><span>{String(index + 1).padStart(2, '0')}</span> {step.label}</p>
    <h3>{step.title}</h3>
    <p>{step.text}</p>
    {index === 2 && <ul className="kp7-checks">{CHECKS.map(c => <li key={c}><Check size={16} aria-hidden="true" />{c}</li>)}</ul>}
  </div>;
}

/** The visitor selects a process step; the page keeps its normal scrolling behaviour. */
export default function ProcessStory() {
  const [step, setStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setStep(index);
    setHasInteracted(true);
    if (focus) tabs.current[index]?.focus();
  };

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % STEPS.length,
      ArrowLeft: (index - 1 + STEPS.length) % STEPS.length,
      Home: 0,
      End: STEPS.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    select(targets[event.key], true);
  };

  return <section className="kp7-process kp-process" id="page-section-how-we-work" data-section-label="03 How we work" aria-labelledby="kp7-process-title">
    <header className="kp-container kp7-head">
      <p className="kp7-mono kp7-head__label"><span>03</span>How we work</p>
      <h2 id="kp7-process-title">From your requirement to <em>recurring supply.</em></h2>
      <p className="kp7-head__intro">One contact coordinates selection, engineering, agreed checks and delivery. Standard parts and repeat orders start at the relevant step.</p>
    </header>

    <div className="kp-container kp-process__body">
      <div className="kp-process__tabs" role="tablist" aria-label="Explore the process" aria-orientation="horizontal">
        {STEPS.map((s, i) => <button
          key={s.label}
          ref={el => { tabs.current[i] = el; }}
          type="button"
          role="tab"
          id={`kp-process-tab-${i}`}
          aria-controls={`kp-process-panel-${i}`}
          aria-selected={i === step}
          tabIndex={i === step ? 0 : -1}
          onClick={() => select(i)}
          onKeyDown={event => onKey(event, i)}
        ><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{s.label}</button>)}
      </div>

      {STEPS.map((s, i) => <div
        key={s.label}
        className="kp-process__panel"
        role="tabpanel"
        id={`kp-process-panel-${i}`}
        aria-labelledby={`kp-process-tab-${i}`}
        tabIndex={0}
        hidden={i !== step}
      >{i === step && <div className="kp-process__content" data-animate={hasInteracted || undefined}>
        <div className="kp-process__copy">
          <StepCopy index={step} />
          <p className="kp7-contact"><span aria-hidden="true" />One contact throughout your project</p>
        </div>
        <div className="kp-process__visual"><Dossier step={step} /></div>
      </div>}</div>)}
    </div>

    <div className="kp-container kp7-process__foot">
      <Link to="/contact" className="kp-button kp-button--white">Prepare an inquiry <ArrowRight size={18} aria-hidden="true" /></Link>
      <Link to="/how-ordering-works" className="kp-text-link kp7-link">See the inquiry process <ArrowRight size={18} aria-hidden="true" /></Link>
      <p className="kp7-note">Illustrative process overview. Manufacturing route, checks, quantities and supply terms are agreed for each project.</p>
    </div>
  </section>;
}
