import { INDUSTRIAL_IMAGES as I } from './images';
import { COMPONENT_GROUPS, componentPath } from './components';

export type NavLink = { label: string; to: string; desc?: string; badge?: string };
export type NavGroup = { title: string | null; links: NavLink[]; plain?: boolean };
export type NavItem = {
  label: string;
  sub: string;
  image: string;
  compact?: boolean;
  overview?: NavLink;
  groups: NavGroup[]; // rendered as columns
  right?: NavGroup; // separated right column (e.g. Popular finishes)
};

export const NAV: NavItem[] = [
  {
    label: 'How it works',
    sub: 'On-demand, custom manufacturing',
    image: I.customEngineering,
    groups: [
      {
        title: 'How Protolabs Network works',
        links: [
          { label: 'How ordering works', desc: 'Using Protolabs Network from quote to delivery', to: '/how-ordering-works' },
          { label: 'IP protection', desc: 'How we guarantee security and confidentiality', to: '/ip-protection' },
        ],
      },
      {
        title: 'Quality & consistency',
        links: [
          { label: 'Quality standards', desc: 'Processes and systems for maintaining the highest quality', to: '/quality-and-lab' },
          { label: 'Manufacturing partners', desc: 'How we manage our suppliers', to: '/partner-network' },
        ],
      },
      {
        title: 'Features',
        links: [
          { label: 'Team Accounts', desc: 'How to collaborate with a team account', to: '/team-account' },
        ],
      },
    ],
  },
  {
    label: 'Capabilities',
    sub: 'Prototypes and production parts',
    image: I.heroComponents,
    groups: [
      {
        title: '3D printing', plain: true,
        links: [
          { label: '3D printing service', to: '/3d-printing' },
          { label: 'Fused Deposition Modeling (FDM)', to: '/3d-printing/fdm' },
          { label: 'Stereolithography (SLA)', to: '/3d-printing/sla-dlp' },
          { label: 'Selective Laser Sintering (SLS)', to: '/3d-printing/sls' },
          { label: 'Multi Jet Fusion (MJF)', to: '/3d-printing/mjf' },
        ],
      },
      {
        title: 'CNC machining', plain: true,
        links: [
          { label: 'CNC machining service', to: '/cnc-machining' },
          { label: 'CNC milling', to: '/cnc-machining/cnc-milling-service' },
          { label: 'CNC turning', to: '/cnc-machining/cnc-turning-service' },
        ],
      },
      {
        title: 'Additional services', plain: true,
        links: [
          { label: 'Sheet metal fabrication service', to: '/sheet-metal-fabrication' },
          { label: 'Injection molding service', to: '/injection-molding' },
          { label: 'Production orders', to: '/production-orders' },
        ],
      },
    ],
    right: {
      title: 'Popular finishes', plain: true,
      links: [
        { label: 'As machined', to: '/surface-finishing-services' },
        { label: 'Smooth machining', to: '/surface-finishing-services' },
        { label: 'Aluminum anodizing', to: '/surface-finishing-services' },
        { label: 'Bead blasting', to: '/surface-finishing-services' },
        { label: 'Polishing', to: '/surface-finishing-services' },
        { label: 'Vapor smoothing', to: '/surface-finishing-services', badge: 'New' },
        { label: 'Black oxide', to: '/surface-finishing-services' },
        { label: 'Powder coating', to: '/surface-finishing-services' },
        { label: 'View all surface finishes', to: '/surface-finishing-services' },
      ],
    },
  },
  {
    label: 'Industries',
    sub: 'Join thousands of industry leaders developing revolutionary products with Protolabs Network',
    image: I.sensors,
    groups: [
      {
        title: null,
        links: [
          { label: 'Aerospace & aviation manufacturing', desc: 'Go from development to launch faster', to: '/industries/aerospace-manufacturing' },
          { label: 'Automotive', desc: 'Drive product development and speed up innovation', to: '/industries/automotive-manufacturing' },
          { label: 'Industrial machinery', desc: 'Power your machines with cutting-edge technologies', to: '/industries/industrial-machinery' },
          { label: 'Consumer electronics', desc: 'From prototype to production to homes around the world', to: '/industries/electronics-manufacturing' },
          { label: 'Robotics & automation', desc: 'Build the most complex automated systems with ease', to: '/industries/robotics-automation' },
          { label: 'Medical', desc: 'Get the next healthcare innovation to market', to: '/industries/medical' },
          { label: 'All industries', desc: '', to: '/industries' },
        ],
      },
    ],
  },
  {
    label: 'Components',
    sub: 'Technical components for your application.',
    image: I.controllers,
    compact: true,
    overview: { label: 'All components', to: '/components' },
    groups: COMPONENT_GROUPS.map((group) => ({
      title: group.title,
      plain: true,
      links: [
        { label: 'Overview', to: componentPath(group) },
        ...group.products.map((product) => ({ label: product.title, to: componentPath(group, product) })),
      ],
    })),
  },
  {
    label: 'Resources',
    sub: 'All you need to know about digital manufacturing',
    image: I.customEngineering,
    groups: [
      {
        title: null,
        links: [
          { label: 'Knowledge base', desc: 'Product development, design and manufacturing', to: '/knowledge-base' },
          { label: 'Watch and learn', desc: 'A large collection of educational videos and tutorials', to: '/blog' },
          { label: 'Help center', desc: 'Expert advice for getting the most out of the Protolabs Network platform', to: '/knowledge-base' },
          { label: 'Guides', desc: 'Comprehensive guides for designers and engineers', to: '/guides' },
        ],
      },
      {
        title: null,
        links: [
          { label: 'Case studies', desc: 'Success stories from innovative companies using Protolabs Network', to: '/case-studies' },
          { label: 'Blog', desc: 'Industry trends, company news and product updates', to: '/blog' },
          { label: 'Newsletter', desc: 'Sign up for Protolabs Network tips, news and insights', to: '/newsletter' },
          { label: 'Reports and downloads', desc: 'Annual trend reports, posters and other downloadable content', to: '/get' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    sub: 'Learn about who we are and how it all started',
    image: I.heroComponents,
    groups: [
      {
        title: null,
        links: [
          { label: 'About us', desc: 'The Protolabs Network story', to: '/about' },
          { label: 'Become a partner', desc: 'How joining our manufacturing network grows your business', to: '/become-a-manufacturing-partner' },
          { label: 'Contact us', desc: 'We have offices in the United States and Europe', to: '/contact' },
          { label: 'Jobs', desc: 'Join our team', to: '/jobs' },
          { label: 'Protolabs Network', desc: 'Big news! We changed our name to Protolabs Network', to: '/brand-background' },
          { label: 'Sustainability', desc: 'Reducing emissions in manufacturing', to: '/sustainability' },
          { label: 'Team', desc: 'The people behind the platform', to: '/team' },
        ],
      },
    ],
  },
];
