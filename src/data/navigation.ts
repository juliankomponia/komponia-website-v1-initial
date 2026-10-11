import { INDUSTRIAL_IMAGES as I } from './images';
import { NAV as TEMPLATE_NAV, type NavLink } from './site';
import { COMPONENT_GROUPS, componentPath } from './components';

// Preserve the template's navigation structure and existing page routes.
// Komponia copy is kept separate from the shared manufacturing page data.
const LINK_COPY: Record<string, Partial<NavLink>> = {
  '/how-ordering-works': { label: 'How we work', desc: 'From your requirements to an agreed supply route' },
  '/ip-protection': { label: 'Information handling', desc: 'Agree how drawings and technical information are shared' },
  '/quality-and-lab': { label: 'Komponia-Lab & quality', desc: 'Agreed checks and ongoing quality support' },
  '/partner-network': { label: 'Supplier coordination', desc: 'Match manufacturers and sources to your requirements' },
  '/team-account': { label: 'Project coordination', desc: 'Align purchasing, engineering and production' },
  '/industries/aerospace-manufacturing': { label: 'Aerospace & aviation', desc: 'Requirements for demanding technical applications' },
  '/industries/automotive-manufacturing': { label: 'Automotive', desc: 'Components and manufacturing for vehicle applications' },
  '/industries/industrial-machinery': { label: 'Industrial machinery', desc: 'Parts and components for machines and equipment' },
  '/industries/electronics-manufacturing': { label: 'Electronics', desc: 'Components and housings for electronic equipment' },
  '/industries/robotics-automation': { label: 'Robotics & automation', desc: 'Interfaces, components and application requirements' },
  '/industries/medical': { label: 'Medical applications', desc: 'Project-specific requirements and qualification' },
  '/knowledge-base': { label: 'Knowledge base', desc: 'Technical background for component and process selection' },
  '/blog': { label: 'Insights', desc: 'Topics in components, engineering and supply' },
  '/guides': { label: 'Technical guides', desc: 'Information for purchasing and engineering' },
  '/case-studies': { label: 'Application examples', desc: 'Explore component and manufacturing use cases' },
  '/newsletter': { label: 'Project communication', desc: 'Agree updates and responsibilities for your project' },
  '/get': { label: 'Project preparation', desc: 'Drawings, specifications and quantities to clarify' },
  '/about': { label: 'About Komponia', desc: 'Components, custom solutions and ongoing supply' },
  '/become-a-manufacturing-partner': { label: 'Supplier collaboration', desc: 'Technical capabilities and requirements for cooperation' },
  '/contact': { label: 'Project enquiries', desc: 'Prepare and review a component or supply inquiry draft' },
  '/jobs': { label: 'Working with Komponia', desc: 'Technical, commercial and operational roles' },
  '/brand-background': { label: 'Brand background', desc: 'The relationship between Komponia, Sourcura and WTS' },
  '/sustainability': { label: 'Supply & resource planning', desc: 'Consider materials, stock and logistics for each project' },
  '/team': { label: 'Project responsibilities', desc: 'How technical and commercial work is coordinated' },
};

const GROUP_TITLES: Record<string, string> = {
  'How Protolabs Network works': 'Working with Komponia',
  'Quality & consistency': 'Requirements & supply',
  Features: 'Project planning',
};

const SECTION_COPY: Record<string, string> = {
  'How it works': 'Component selection, technical solutions and ongoing supply',
  Capabilities: 'In-house CAD, custom OEM solutions and suitable manufacturing partners',
  Industries: 'Technical requirements differ by application',
  Components: 'Technical components for your application',
  Resources: 'Information for component selection and project preparation',
  Company: 'Learn about Komponia and our approach',
};

function adaptLink(link: NavLink): NavLink {
  const replacement = LINK_COPY[link.to];
  const updated = { ...link, ...replacement, badge: undefined };
  // Keep plain capability lists plain; descriptions belong to the existing rich columns.
  if (link.desc === undefined) delete updated.desc;
  if (link.label === 'Watch and learn') updated.label = 'Technical insights';
  if (link.label === 'Help center') updated.label = 'Application support';
  return updated;
}

export const NAV = TEMPLATE_NAV.map((item) => ({
  ...item,
  image: item.label === 'How it works' ? I.customEngineering : item.label === 'Components' ? I.controllers : item.image,
  sub: SECTION_COPY[item.label] ?? item.sub,
  groups: item.label === 'Industries' ? [{ title: null, links: [
    { label: 'OEM solutions', desc: 'Components for your own devices, machines and systems', to: '/oem-solutions' },
    { label: 'Refrigeration & climate control', desc: 'Control, sensing and switching for your equipment', to: '/industries/refrigeration-climate-control' },
    { label: 'Thermal & foodservice equipment', desc: 'Heating, measurement and control considered together', to: '/industries/thermal-foodservice' },
    { label: 'Machinery & plant engineering', desc: 'Parts and components for machines and equipment', to: '/industries/industrial-machinery' },
    { label: 'Laboratory equipment', desc: 'Application-specific sensing and control requirements', to: '/industries/laboratory-equipment' },
    { label: 'All applications', desc: 'Explore further application requirements', to: '/industries' },
  ] }] : item.groups.map((group) => ({
    ...group,
    title: group.title ? GROUP_TITLES[group.title] ?? group.title : null,
    links: group.links.map(adaptLink),
  })),
  right: item.label === 'Capabilities' ? { title: 'Solutions & supply', plain: true, links: [
    { label: 'Custom solutions & in-house CAD', to: '/custom-solutions' },
    { label: 'OEM solutions', to: '/oem-solutions' },
    { label: 'Komponia-Lab & quality', to: '/quality-and-lab' },
    { label: 'Recurring supply & safety stock', to: '/production-orders' },
    { label: 'Replacement & second sources', to: '/replacement-and-second-source' },
    { label: 'Surface finishes', to: '/surface-finishing-services' },
  ] } : item.right ? { ...item.right, title: 'Surface finishes', links: item.right.links.map(adaptLink) } : undefined,
}));

export type FooterLinkData = { label: string; to: string };

export const FOOTER_COLUMNS: { title: string; links: FooterLinkData[] }[] = [
  {
    title: 'About',
    links: [
      { label: 'About Komponia', to: '/about' },
      { label: 'OEM solutions', to: '/oem-solutions' },
      { label: 'How we work', to: '/how-ordering-works' },
      { label: 'Quality & qualification', to: '/quality-and-lab' },
      { label: 'Information handling', to: '/ip-protection' },
      { label: 'Brand background', to: '/brand-background' },
    ],
  },
  {
    title: 'Solutions & manufacturing',
    links: [
      { label: 'Custom solutions & CAD', to: '/custom-solutions' },
      { label: 'Replacement & second sources', to: '/replacement-and-second-source' },
      { label: 'CNC machining', to: '/cnc-machining' },
      { label: 'CNC milling', to: '/cnc-machining/cnc-milling-service' },
      { label: 'CNC turning', to: '/cnc-machining/cnc-turning-service' },
      { label: '3D printing', to: '/3d-printing' },
      { label: 'Sheet metal fabrication', to: '/sheet-metal-fabrication' },
      { label: 'Injection molding', to: '/injection-molding' },
      { label: 'Surface finishing', to: '/surface-finishing-services' },
      { label: 'Production planning', to: '/production-orders' },
    ],
  },
  {
    title: 'Components',
    links: [
      { label: 'All components', to: '/components' },
      ...COMPONENT_GROUPS.map((group) => ({ label: group.title, to: componentPath(group) })),
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Knowledge base', to: '/knowledge-base' },
      { label: 'Technical guides', to: '/guides' },
      { label: 'Application examples', to: '/case-studies' },
      { label: 'Industries', to: '/industries' },
      { label: 'Technical insights', to: '/blog' },
    ],
  },
  {
    title: 'Work with us',
    links: [
      { label: 'Project enquiries', to: '/contact' },
      { label: 'Supplier collaboration', to: '/become-a-manufacturing-partner' },
      { label: 'Supplier coordination', to: '/partner-network' },
      { label: 'Project responsibilities', to: '/team' },
      { label: 'Supply & resource planning', to: '/sustainability' },
    ],
  },
];
