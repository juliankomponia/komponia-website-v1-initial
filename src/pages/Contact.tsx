import { useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { ArrowRight, Download } from 'lucide-react';
import PageSections from '../components/PageSections';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import { COMPONENT_GROUPS } from '../data/components';
import { downloadText } from '../lib/download';
import './contact.css';

const TYPES = {
  component: 'Component selection or purchase',
  custom: 'Custom technical solution',
  oem: 'OEM component or series project',
  replacement: 'Replacement or discontinued component',
  'second-source': 'Additional source assessment',
  supply: 'Ongoing supply or repeat order',
  cooperation: 'Technical or supplier cooperation',
};
type InquiryType = keyof typeof TYPES;
type Values = { name: string; company: string; email: string; type: InquiryType; reference: string; requirements: string; quantity: string; date: string };
type Errors = Partial<Record<keyof Values, string>>;

function InquiryForm({ reference, type }: { reference: string; type: InquiryType }) {
  const [values, setValues] = useState<Values>({ name: '', company: '', email: '', type, reference, requirements: '', quantity: '', date: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [copying, setCopying] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const preview = useRef<HTMLDivElement>(null);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setDraft(null);
    setStatus('');
  }

  function review(event: FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!values.company.trim()) next.company = 'Enter your company.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Enter a valid business email address.';
    if (!values.requirements.trim()) next.requirements = 'Describe the component or result you need.';
    setErrors(next);
    setStatus('');
    if (Object.keys(next).length) {
      setDraft(null);
      const first = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDraft([
      'KOMPONIA — INQUIRY DRAFT',
      'Prepared locally. Not sent. This is a request for discussion, not an order.',
      '',
      `Name: ${values.name.trim()}`,
      `Company: ${values.company.trim()}`,
      `Business email: ${values.email.trim()}`,
      `Inquiry type: ${TYPES[values.type]}`,
      `Component / part reference: ${values.reference.trim() || 'To be clarified'}`,
      `Quantity / demand: ${values.quantity.trim() || 'To be clarified'}`,
      `Preferred date: ${values.date || 'To be clarified'}`,
      '', 'APPLICATION AND REQUIREMENTS', values.requirements.trim(),
      '', 'SUPPORTING DOCUMENTS',
      'Add the relevant drawing revision or datasheet through your agreed contact channel.',
    ].join('\n'));
    requestAnimationFrame(() => preview.current?.focus());
  }

  async function copyDraft() {
    if (!draft || copying) return;
    setCopying(true);
    let timer = 0;
    try {
      await Promise.race([
        navigator.clipboard.writeText(draft),
        new Promise<never>((_, reject) => { timer = window.setTimeout(() => reject(new Error('Clipboard unavailable')), 2000); }),
      ]);
      setStatus('Draft copied. Nothing has been sent.');
    } catch {
      setStatus('Copy is unavailable in this browser. Download the draft or select the text below.');
    } finally {
      clearTimeout(timer);
      setCopying(false);
    }
  }

  function field(key: 'name' | 'company' | 'email' | 'reference' | 'quantity' | 'date', label: string, required = false) {
    const help = key === 'reference' ? 'A part number, drawing revision or component category is enough.' : key === 'quantity' ? 'For example: sample quantity, first order or expected annual demand.' : undefined;
    return <div className="inquiry-field">
      <label htmlFor={`inquiry-${key}`}>{label}{required ? ' *' : ' (optional)'}</label>
      <input id={`inquiry-${key}`} name={key} type={key === 'email' ? 'email' : key === 'date' ? 'date' : 'text'}
        autoComplete={key === 'name' ? 'name' : key === 'company' ? 'organization' : key === 'email' ? 'email' : 'off'}
        required={required} maxLength={key === 'date' ? undefined : 200} value={values[key]}
        onChange={event => update(key, event.target.value)} aria-invalid={Boolean(errors[key])}
        aria-describedby={[help ? `help-${key}` : '', errors[key] ? `error-${key}` : ''].filter(Boolean).join(' ') || undefined} />
      {help && <p id={`help-${key}`} className="inquiry-help">{help}</p>}
      {errors[key] && <p id={`error-${key}`} className="inquiry-error">{errors[key]}</p>}
    </div>;
  }

  return <>
    <form ref={form} className="inquiry-form" noValidate onSubmit={review}>
      <p className="inquiry-help mb-6">* Required to prepare a complete draft. Your details stay on this page until you copy or download them.</p>
      {Object.values(errors).some(Boolean) && <p role="alert" className="inquiry-error mb-6">Check the highlighted fields before reviewing your draft.</p>}
      <div className="inquiry-fields">{field('name', 'Name', true)}{field('company', 'Company', true)}{field('email', 'Business email', true)}
        <div className="inquiry-field"><label htmlFor="inquiry-type">Inquiry type</label>
          <select id="inquiry-type" name="type" value={values.type} onChange={event => update('type', event.target.value as InquiryType)}>
            {Object.entries(TYPES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>
      {field('reference', 'Component or part reference')}
      <div className="inquiry-field"><label htmlFor="inquiry-requirements">Application and requirements *</label>
        <textarea id="inquiry-requirements" name="requirements" rows={5} required maxLength={5000} value={values.requirements}
          onChange={event => update('requirements', event.target.value)} aria-invalid={Boolean(errors.requirements)}
          aria-describedby={`help-requirements${errors.requirements ? ' error-requirements' : ''}`} />
        <p id="help-requirements" className="inquiry-help">What should the component do? Include known interfaces, operating conditions and the result you need. Open questions are welcome.</p>
        {errors.requirements && <p id="error-requirements" className="inquiry-error">{errors.requirements}</p>}
      </div>
      <div className="inquiry-fields">{field('quantity', 'Quantity or expected demand')}{field('date', 'Preferred delivery date')}</div>
      <p className="inquiry-help mb-6">Drawings and files are not uploaded here. List their references above and share the files through your agreed contact channel.</p>
      <button type="submit" className="btn-primary-l">Review inquiry draft <ArrowRight size={18} aria-hidden="true" /></button>
    </form>
    {draft && <div className="inquiry-preview mt-10" ref={preview} tabIndex={-1} aria-labelledby="draft-title">
      <h3 id="draft-title" className="text-xl font-medium mb-3">Your inquiry draft</h3>
      <p className="mb-5 text-[14px]">Review the details, then keep a copy for your conversation with Komponia. Nothing has been sent.</p>
      <pre className="inquiry-draft">{draft}</pre>
      <div className="flex flex-wrap gap-3 mt-5">
        <button type="button" className="btn-primary" onClick={() => downloadText('komponia-inquiry-draft.txt', draft)}><Download size={16} aria-hidden="true" /> Download draft (.txt)</button>
        <button type="button" className="btn-outline-primary" disabled={copying} onClick={copyDraft}>{copying ? 'Copying…' : 'Copy draft'}</button>
      </div>
    </div>}
    <p role="status" className="inquiry-help mt-4">{status}</p>
  </>;
}

export default function Contact() {
  const [params] = useSearchParams();
  const { search } = useLocation();
  const group = COMPONENT_GROUPS.find(entry => entry.slug === params.get('group'));
  const product = group?.products.find(entry => entry.slug === params.get('component'));
  const reference = product ? `${group!.title} / ${product.title}` : group?.title ?? '';
  const requested = params.get('type');
  const type: InquiryType = requested && Object.hasOwn(TYPES, requested) ? requested as InquiryType : 'component';
  return <div className="contact-page">
    <section className="bg-[#191919]">
      <div className="site-shell section-pad grid lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-[42rem]"><h1 className="hero-title text-white font-medium mb-5">Start with your requirement</h1>
          <p className="text-base md:text-lg text-white/70">A standard component, a custom solution or recurring supply. Prepare a short brief from the information you have.</p>
        </div>
        <img src={I.customEngineering} alt="Illustrative machined housing beside a technical drawing" className="w-full rounded-[3px] max-h-[380px] object-cover" />
      </div>
    </section>
    <PageSections />
    <section className="bg-white" data-section-label="Prepare an inquiry"><div className="site-shell section-pad inquiry-layout">
      <div><h2 className="h2-orig mb-6">Prepare an inquiry</h2><InquiryForm key={search} reference={reference} type={type} /></div>
      <aside className="inquiry-aside">
        <span className="inquiry-brand-rule" aria-hidden="true" />
        <h2 className="text-xl font-medium mb-4">Keep the first step simple</h2>
        <p>A current reference and a short description are enough to begin. You can clarify technical details, quantities and approvals in the next conversation.</p>
        <div className="border-t border-black/15 mt-7 pt-7"><h3 className="font-medium mb-3">Local preparation only</h3>
          <p>The website is not connected to a mailbox or submission service yet. Use your existing Komponia or WTS contact to share the draft.</p>
          <p className="mt-3">This form does not send messages, upload files or place orders. Reloading or leaving the page clears your entries.</p>
        </div>
        <Link to="/how-ordering-works" className="arrow-link mt-7">See the next steps <ArrowRight size={18} aria-hidden="true" /></Link>
      </aside>
    </div></section>
    <section className="bg-brand-gray" data-section-label="Supporting information"><div className="site-shell section-pad max-w-none">
      <div className="max-w-[48rem]"><h2 className="h2-orig mb-4">Add detail where it helps</h2><p className="mb-5">For a replacement, identify what must remain compatible. For a new part, state the required function. For repeat supply, add consumption and any proposed call-off arrangement.</p>
        <Link className="arrow-link" to="/guides">Browse preparation checklists <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </div></section>
  </div>;
}
