import { COMPONENT_GROUPS, componentPath } from './components';

// Shared site data — image assets are hotlinked from the original CDN
export const IMG = {
  hero: 'https://images.ctfassets.net/q2hzfkp3j57e/2r70l0sARZoTvke2U43bzV/b071f83b38664b7295306d1bda95fd70/homepage_header_img.webp?w=1500',
  logoIntel: 'https://images.ctfassets.net/q2hzfkp3j57e/1TOBLDAwZqhqbMiwGbpcI5/b520e5880db1afc89847de7d97451f89/intel_v2.webp?h=120',
  logoAudi: 'https://images.ctfassets.net/q2hzfkp3j57e/5dfM4yq9zLWfOQMI1bzB3h/aab80a08d814250ae699fbb272eb91c4/Audi_v2.webp?h=120',
  logoNasa: 'https://images.ctfassets.net/q2hzfkp3j57e/73CSpNIHRcP79InwetXeXw/f2e78736896018454e1a7c6ebff6e689/NASA_v2.webp?h=120',
  logoHp: 'https://images.ctfassets.net/q2hzfkp3j57e/1UL1aFVMM1mJMexkaAsnGZ/d6a6d6d6bf7d251a59598813537ae86f/HP_logo.webp?h=120',
  certAmtivo: 'https://images.ctfassets.net/q2hzfkp3j57e/3n4swR3YkkSpOg27XHD6bu/f16b516d2cb3e0a5ec2a00a6bb198d02/ico_cert_amtivo_DEF.png',
  certIso: 'https://images.ctfassets.net/q2hzfkp3j57e/DIg3DiQU4Yrg87vLHvwng/99ed00e466d4fb90291144f545b12782/ico_cert_icon_horizontal_DEF__1_.svg',
  certAs: 'https://images.ctfassets.net/q2hzfkp3j57e/2iBQ7LuxhjNQcedshqkVE5/3bade7ab297b59b3cb11462fb85f4b7c/AS9100D_cert_icon_hero.svg',
  capCnc: 'https://images.ctfassets.net/q2hzfkp3j57e/5dIVfxkqGFvzjBkaHXVsA0/929fa91910df6d1e2fa5c32e7d4bf869/cnc_milling_capabilities__1_.webp?fit=thumb&fm=png&q=82',
  cap3dp: 'https://images.ctfassets.net/q2hzfkp3j57e/7mYMLpmZjw4DDQ1ICJdDdR/bb19fb3e9491cad7df51b6af3debfecd/3d_printing.webp?fit=thumb&fm=png&q=82',
  capSmf: 'https://images.ctfassets.net/q2hzfkp3j57e/2GG1dVocfDHoAT4cz1Cff4/56fb0f33eb102ef6828bdac641f211bc/sheet_metal_fabrication.webp?fit=thumb&fm=png&q=82',
  capIm: 'https://images.ctfassets.net/q2hzfkp3j57e/3cYkeHi8bTrHsJ1zGC4Hvq/8180dbc0062102832490325909b21fde/technologies_im_homepage.webp?fit=thumb&fm=png&q=82',
  map: 'https://images.ctfassets.net/q2hzfkp3j57e/7KykJzPuIlxsKBdpT9Og4z/2129d1020de9e6e95c6f92d10d3c825b/homepage_map_network_factories_v3.webp',
  interface: 'https://images.ctfassets.net/q2hzfkp3j57e/P60R6WMcdcfo6WhjDa9GT/a84f21ad61365df8433544c7304fe503/interface_10_2024.webp',
  facNl: 'https://images.ctfassets.net/q2hzfkp3j57e/1WRHlR8i3zDuTOqSj5Ojyw/dc5893cfa7d5d5c63fe1fe9afda66761/europe_3dp.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  facUs: 'https://images.ctfassets.net/q2hzfkp3j57e/1ggJGmypuiuG9XK7VkTVUB/5cf1a01b21eb9fe2fb8a505260e7889b/usa_3dp.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  facUk: 'https://images.ctfassets.net/q2hzfkp3j57e/16IZ5LP4kDYReGOFH0dEWN/7a93e263b36e2e1329fbac953d755763/UK.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  facIn: 'https://images.ctfassets.net/q2hzfkp3j57e/2smKKBY4ypJR0bKygdI86k/b5a21779c6d387565a2a312c17991e91/india_cnc.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  facCnSmf: 'https://images.ctfassets.net/q2hzfkp3j57e/5Deo0hvqzH0DFc5pIp7nWS/eec5557a934d254b006b00381dfe7295/china_smf.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  facCnCnc: 'https://images.ctfassets.net/q2hzfkp3j57e/6RJOMOuqBowVEnoQ6PNYsx/392d54e84b5a042289d6e669320e1244/china_cnc_2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseKepler: 'https://images.ctfassets.net/q2hzfkp3j57e/46cu1NlD6i6TWoU2dlK4Lf/3d408208e8bbfeb7513671090549b012/kepler.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseMondraker: 'https://images.ctfassets.net/q2hzfkp3j57e/6n0JZQESZC3FkUlxul0IuM/64adddd0db66496d964d2e1c75e060b1/mondraker.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseFillauer: 'https://images.ctfassets.net/q2hzfkp3j57e/1x1yj8Q8dCqItnZMUCliQR/48e7ee4da43e67375dbcfd66c53fe5a5/Running_Blade_29.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseSkelex: 'https://images.ctfassets.net/q2hzfkp3j57e/4SCE4jWVSXWuMTuXK2cv0D/671e70d1e45869f768950885c679ad31/skelex.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseDrone: 'https://images.ctfassets.net/q2hzfkp3j57e/4kowjTY7r1l17Ip0b3Ty60/1dc25e8250d1c8d35292659d95c9fe0d/droneseed_header_v3.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseLektri: 'https://images.ctfassets.net/q2hzfkp3j57e/3i2UJrHNYaygEY97VQDlqR/e900951ec3b76db416f07b5338ec1901/lektrico.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseAmpyx: 'https://images.ctfassets.net/q2hzfkp3j57e/1cZwvt84rSSxnEYDAGSicL/8e5b1faa57494838341158757916e5ba/ampyx.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseSnorri: 'https://images.ctfassets.net/q2hzfkp3j57e/5ZnONpDFS6KPJunRLFnJEv/47829b31881f8e401e5c48399cfd5cf5/SNORRICAM_STORY_22-20.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseFormify: 'https://images.ctfassets.net/q2hzfkp3j57e/7G44YwhunkAxVaUVTi60Ka/e5a9bbd1dc75b9087457ea21a7465fe1/DSCF2014-2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  caseLange: 'https://images.ctfassets.net/q2hzfkp3j57e/3tQfwigcSXOTRbrKfGuIJO/647c0f31c5794546fd211848d7c1dffe/Lange1.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  icoCert: 'https://images.ctfassets.net/q2hzfkp3j57e/4Nf4nXZsk30Hv6j3WufSFr/d7138e4bf745323f2726df6dc37fbf19/certification_blue.svg?w=150&fit=thumb',
  icoQc: 'https://images.ctfassets.net/q2hzfkp3j57e/2fSs6Bte5Yb44wuRCWxE4F/e84e70850202b2efe50fdce156547129/quality_control_blue.svg?w=150&fit=thumb',
  icoNetwork: 'https://images.ctfassets.net/q2hzfkp3j57e/2RfVlkvTHwlQQiG1E5RNue/d66f07f04112ec88a3e6d50e0ce1dc1f/network_blue.svg?w=150&fit=thumb',
  partHammer: 'https://images.ctfassets.net/q2hzfkp3j57e/1gjNyUIZiHBsm3KoYIe1SZ/97fa38a1523c3ebfc5d87d296b022746/us_hammer.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partTrueNorth: 'https://images.ctfassets.net/q2hzfkp3j57e/2ZI2o73KQtE2jjbS0OL2mX/ed1b290d9d23922e686bb5eb0384568d/true_north_design.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partAutocom: 'https://images.ctfassets.net/q2hzfkp3j57e/2tmkrITCIhvuJAMky09UOR/737e1c5adf51c938e4dcd1fb3c5a2594/2_autocom_manufacturing.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partTerumo: 'https://images.ctfassets.net/q2hzfkp3j57e/6SSOz6SvzSGNiT4f49qhCE/f2fe2825bbca9a9951ac1f1b447cb9cd/terumo_medical.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partAversan: 'https://images.ctfassets.net/q2hzfkp3j57e/15IzdkDEC6rvxWZm7Izg2Z/f4e5d1681211a934d20afe8a20ba5e0f/2_aversan.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partAllision: 'https://images.ctfassets.net/q2hzfkp3j57e/439DAADyfOsY1YeQ3cryJa/d0b88348bd0db11b56648a316e0a9ffa/2_allision_conner.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partUpna: 'https://images.ctfassets.net/q2hzfkp3j57e/GxvIlZDio07V5AfyQOpMJ/c4c1c973f9a9df8cf2cd545f542e7214/02_UPNA-Antenna-Group.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partAtv: 'https://images.ctfassets.net/q2hzfkp3j57e/3HhMHeLkWLWkHp83CYCEBl/61fd91ed8c70729cce5b466a713ee1f4/03_ATV-GmBH.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partSpace: 'https://images.ctfassets.net/q2hzfkp3j57e/4A4T7ZmCAC07VwRawjzGa0/e6c628def9912bbf2c5cc95bc83bc39e/01_Space-inventor.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partAudio: 'https://images.ctfassets.net/q2hzfkp3j57e/7669FqNcx3L7qIw2ggHVqL/8f45bf7e00b4c9bb7f09322a3782497a/04_Consolidated-Audio.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partEngels: 'https://images.ctfassets.net/q2hzfkp3j57e/38lx9l54cQI5FtyWOacEjU/22368594d49ffae92af387643d9f62a2/IM-Customer-part_Chris-Engels_03.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partHc: 'https://images.ctfassets.net/q2hzfkp3j57e/2v0eZRQWYTuoj3XiQdsTDb/14ea66e064c66908d0a941d0378d25b3/IM-Customer-part-HC-Group_02.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  partLektri: 'https://images.ctfassets.net/q2hzfkp3j57e/2Yy9ugwigAn8ZwUOitNVm1/6b5685c71fae7d6606c0f47b8d7f2f52/IM-Customer-part-Lektrico_12.jpg?w=1000&h=1000&fm=jpg&q=82&fit=thumb',
  indAero: 'https://images.ctfassets.net/q2hzfkp3j57e/7t4eIiQbiOscaYOth6tUAO/57b1d394b10d325cc616f09d8a0bded1/aerospace_card.webp?fit=thumb&fm=png&q=82',
  indMedical: 'https://images.ctfassets.net/q2hzfkp3j57e/4PUcQv45TqNSnf8Qn5nkZt/63bfd63b52d7db46265c0b55b81a8949/medical_industry.webp?fit=thumb&fm=png&q=82',
  indAuto: 'https://images.ctfassets.net/q2hzfkp3j57e/1ZQeisityYaljNQieTMKek/5e930abb2c6a36bec3bbd47950f7f130/automotive_card.webp?fit=thumb&fm=png&q=82',
  indRobot: 'https://images.ctfassets.net/q2hzfkp3j57e/78SPteQkIalfyDRkqopodS/77c8441624a37b1b3c2ce69f157f29bf/robotics_industry.webp?fit=thumb&fm=png&q=82',
  protolabsLogo: 'https://images.ctfassets.net/q2hzfkp3j57e/5cCmSunMujZ5TYEl5joQOb/752c7e53e0299696d2737116ec330206/protolabs_logo_2.webp',
  manyCnc: 'https://images.ctfassets.net/q2hzfkp3j57e/26YT44kq9SOt0JAzBRkZPj/69032018dbd17ddcec5997a97851eaa2/many_cnc_machined_parts_crop.webp',
  prodMockup: 'https://images.ctfassets.net/q2hzfkp3j57e/7LdPGVwDEUStWy1ni9enoq/053e8855c1f877432bb4ba3d9d9de052/PL_Production_Manufacturing_Mockup_05.webp',
  navHow: 'https://images.ctfassets.net/q2hzfkp3j57e/5BoH8WHH7Q04OF8jn5jBOG/ed6e1d78936f94f7f418a2d3d6a8e345/how_it_works_navbar_3.webp?w=350',
  navCap: 'https://images.ctfassets.net/q2hzfkp3j57e/2s4sweIabVIcxk6bimccMx/97ef28032a12be91b3909bce0c1c6581/capabilities_navbar_2.webp?w=500',
  navInd: 'https://images.ctfassets.net/q2hzfkp3j57e/6u6gZCEjS93Nn0QBjPmyRy/067bbc402a5f9af4c5aada2478970732/aviation_aerospace_kepler_hero.webp',
  navMat: 'https://images.ctfassets.net/q2hzfkp3j57e/4YS2NWMKShUhMo34dWJ8nw/83dd1c70321134ab46aa26b82cbefec7/Main_Nav_Materials.webp?w=500',
  navRes: 'https://images.ctfassets.net/q2hzfkp3j57e/1lrrRBIH7tnUCdC0Bg0WMD/aa830dd8a0e7e5c885cda3cba1dbaf87/Main_Nav_Resources.webp?w=500',
  navCompany: 'https://images.ctfassets.net/q2hzfkp3j57e/3E7Rja1E57711eco31pjVd/a2e6dc5e2001504f9b60ff6eca66e214/company_navbar.webp?w=350',
  heroCnc: 'https://images.ctfassets.net/q2hzfkp3j57e/6EBYxRZBkURacjIg9WmeZ0/b57c86b3c48ef5969ce8a21c866891b4/Print_example_with_CNC_machining_service.webp?w=1500',
  hero3dp: 'https://images.ctfassets.net/q2hzfkp3j57e/6kJRoiMEkBpbA90vfaIo5A/4f1084d83584dfc028915f1b7696b164/3dp_page_hero.webp?w=1500',
  heroSmf: 'https://images.ctfassets.net/q2hzfkp3j57e/1QaPyZTPWlDN55ZMK0XPew/895e16be4f0b58bb764f11b0c2957840/sheet_metal_service_hero.webp?w=1500',
  heroIm: 'https://images.ctfassets.net/q2hzfkp3j57e/50D7ZGO98ORfKS7qB1wpQF/e81d24477538f2113dd5c607b6ca07e5/IM_hero_v3.webp?w=1500',
  heroAbout: 'https://images.ctfassets.net/q2hzfkp3j57e/2bR7hUCzmdM95qih1gqoEH/5917462ba05e13ee792c4b70f77592bc/about_us_hero.webp?w=1500',
};

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
    image: IMG.navHow,
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
    image: IMG.navCap,
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
    image: IMG.navInd,
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
    image: IMG.navMat,
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
    image: IMG.navRes,
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
    image: IMG.navCompany,
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

export const CAPABILITIES = [
  {
    title: 'CNC machining',
    desc: 'Milling, turning and post-processing',
    specs: ['Tolerances down to ±.020 mm (±.001 in)', 'Lead times from 5 business days'],
    cta: 'See our CNC machining services',
    to: '/cnc-machining',
    img: IMG.capCnc,
  },
  {
    title: '3D printing',
    desc: 'FDM, SLA, SLS, MJF',
    specs: ['± 0.3% with a lower limit of ± 0.3 mm (± 0.012 in)', 'Lead times from 1 business day'],
    cta: 'See our 3D printing services',
    to: '/3d-printing',
    img: IMG.cap3dp,
  },
  {
    title: 'Sheet metal fabrication',
    desc: 'Laser cutting, bending, post-processing',
    specs: ['Tolerances down to ±0.1 mm (±.004 in)', 'Lead times from 5 business days'],
    cta: 'See our sheet metal fabrication services',
    to: '/sheet-metal-fabrication',
    img: IMG.capSmf,
  },
  {
    title: 'Injection molding',
    desc: 'Prototypes and production tooling',
    specs: ['Wide range of part complexities and sizes', '1 to 1M parts'],
    cta: 'See our injection molding capabilities',
    to: '/injection-molding',
    img: IMG.capIm,
  },
];




export const INDUSTRIES = [
  { title: 'Aerospace & aviation', text: 'Aerodynamic parts for aircraft, drones, satellites and rockets with AS 9100 certification.', img: IMG.indAero },
  { title: 'Medical', text: 'Create custom medical devices and diagnostic equipment to get healthcare innovations into hospitals and homes.', img: IMG.indMedical },
  { title: 'Automotive', text: 'Fast-tracked development for electric vehicles and other automotive innovations.', img: IMG.indAuto },
  { title: 'Robotics & automation', text: 'Produce complex robotic systems, end effectors and automated machinery for this innovative industry.', img: IMG.indRobot },
];

export const CASE_STUDIES = [
  { name: 'Airbus', text: 'Protolabs’ combined manufacturing solution helps the leading aircraft innovator to develop batteries.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1jZSsLRBp9vVRfnz8dxs3W/d3f8b82db28c09b3b66f575590a6beb3/iStock-1141252190_resized__1_.jpg?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Kepler', text: 'Learn how Kepler rapidly went from a sketch on a napkin to a satellite in space with Protolabs Network CNC machining.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/46cu1NlD6i6TWoU2dlK4Lf/3d408208e8bbfeb7513671090549b012/kepler.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Mondraker', text: 'Find out how the Mondraker bicycle company used Protolabs Network to create custom bike parts in time for its pro mountain bikers to podium at Maribor track in the 2021 UCI Mountain Bike World Cup.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/6n0JZQESZC3FkUlxul0IuM/64adddd0db66496d964d2e1c75e060b1/mondraker.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Fillauer', text: 'Fillauer Composites uses carbon-fiber and fiberglass to build prosthetic feet. Fillauer partnered with Protolabs Network to reduce the cost of production and open up more time for their engineers to focus on perfecting the designs.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1x1yj8Q8dCqItnZMUCliQR/48e7ee4da43e67375dbcfd66c53fe5a5/Running_Blade_29.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Skelex', text: 'Skelex exoskeletons make your arms feel weightless using dynamic balancing. They also managed to solve the biggest challenge many hardware startups face: manufacturing-on-demand when a new opportunity arises.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/4SCE4jWVSXWuMTuXK2cv0D/671e70d1e45869f768950885c679ad31/skelex.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'DroneSeed', text: 'What if you could fight climate change with a fleet of tree-planting drones? That’s what DroneSeed is striving towards. With custom-built drones for each project and tight turnaround times, the Seattle-based startup leverages rapid manufacturing technologies to stay nimble.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/4kowjTY7r1l17Ip0b3Ty60/1dc25e8250d1c8d35292659d95c9fe0d/droneseed_header_v3.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Lektri.co', text: 'LEKTRI.CO is on a mission to make electric vehicle use more accessible and efficient. Learn how the telematics innovator designed its new destination chargers and how Protolabs Network built the robust casing and cover to match its futuristic design.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/3i2UJrHNYaygEY97VQDlqR/e900951ec3b76db416f07b5338ec1901/lektrico.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Ampyx Power', text: 'Find out how Protolabs Network helped Ampyx Power hit major milestones in its mission to develop a better way to harvest wind energy with autonomous aviation technology.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1cZwvt84rSSxnEYDAGSicL/8e5b1faa57494838341158757916e5ba/ampyx.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Snorricam', text: 'How Protolabs Network helped SnorriCam bring professional camera rigs from design to production.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/5ZnONpDFS6KPJunRLFnJEv/47829b31881f8e401e5c48399cfd5cf5/SNORRICAM_STORY_22-20.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Formify', text: 'Formify uses Protolabs Network\'s platform and Multi Jet Fusion (MJF) to create custom computer mice for pro gamers and casual users alike. Learn how the startup worked with Protolabs Network to produce the most innovative and personalized peripherals in the game.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/7G44YwhunkAxVaUVTi60Ka/e5a9bbd1dc75b9087457ea21a7465fe1/DSCF2014-2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Langefreunde Design Studio', text: 'Find out how Protolabs Network\'s engineers and manufacturing partners successfully accelerated the product development cycle.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/3tQfwigcSXOTRbrKfGuIJO/647c0f31c5794546fd211848d7c1dffe/Lange1.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Zinstax', text: 'Han Chen, the creator of Zinstax, discusses how he utilized both Hub\'s network and Protolab\'s digital factories to manufacture his camera back. He also delves into the inspiration behind his design and his love for film photography.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/57U0EN7HnX78a4AFasr407/720728f000f95a3658f23fc977335a1b/zinstax_thumbnail.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Relic EDC', text: 'How working with Protolabs Network brought in significant business for a CNC machining specialist.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/4nN8zguW4fbGGcRoVAWqKD/4fb29f8218e04d169098d30514249a45/relic_IMG_1190.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Philips', text: 'Protolabs Network and Protolabs worked together to deliver parts demanding both speed and complexity, helping an iconic consumer electronics brand to further improve their coffee machines.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/7AShGpneXcJwAATqYp5HhS/ef38bd5e6c37a334068ff9bc07727048/phillips_blogpost_header_v2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'GB MEC', text: 'Discover how Protolabs Network assists a traditional marine company to stay competitive through increased efficiency.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/6qa2M6dCVyBiLwcHrY3HO6/f2e48626cffd0b2e15d5cb26c7cd5fad/0Yacht_2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Otect', text: 'Otect makes specialized metal & plastic lens caps designed to fit Leica cameras perfectly, both in form and quality. Learn how the startup works with Protolabs Network to source high-precision parts that seamlessly fit Leica’s design and uphold the quality level.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1amEmSgxavjpBcn2jxVGAw/f5415c0b18eac117c9d9ed672f9f5933/Sequence_020.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Conquering Horizons', text: 'Learn how Protolabs Network helped Phil Eaglesham and Conquering Horizons debut their next-gen wheelchair at the Paralympics in 2021, manufacturing and delivering custom complex parts with only a matter of days before the prototype’s debut in Japan.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/7tHPwk7FhtSMzSd08pbXHL/3c866e5615b732d6848582a1566bad54/wide_image_Hubsconqueringhorizonsparalympics.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Hone Shaving', text: 'We matched the care and attention in the designs of these products with our manufacturing partners’ expert craftsmanship.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1pNwdm7xv3vnfydPlg02lN/ceecc44abef3e82de4d3a5f4baff8d60/Hone_Shaving.jpeg?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Alutech Cycles', text: 'Components for this electric mountain bike required agility, lightweight materials and fast manufacturing. Find out how we overcame the obstacles.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/kagH8CuSSKcnDpqdkDrfj/f163f1479e1fcd18631370e3729b33c9/711a5098_edited.png?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'New Infrared Technologies', text: 'How New Infrared Technologies’ cameras hit the gas in automotive brake manufacturing.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/WrpuFR8U3EiGQT4C0XktA/0e59d2df5b4fbaff443e1732f3561ea5/New_Infrared_Technologies_camera_in_factory.jpg?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
  { name: 'Envisics', text: 'Envisics’ augmented reality head-up displays project information onto drivers’ windshields, bringing the future of automotive innovation that much closer.', img: 'https://images.ctfassets.net/q2hzfkp3j57e/6nQBbopeeyVNV63cBdWY2J/b89e85787fe62bc933127439f1b608cb/J938-ENVISICS-WEB-V1.1-TO-PULL-FROM.00_01_32_09.Still038__1_.jpg?w=1000&h=1000&fm=jpg&q=82&fit=thumb' },
];

export const PARTS_GALLERY = [
  { label: 'HP PA 12', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1gjNyUIZiHBsm3KoYIe1SZ/97fa38a1523c3ebfc5d87d296b022746/us_hammer.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'US Hammer'], ['Description', 'A part for gasoline engine powered jackhammers'], ['Process', 'MJF'], ['Unit price', '$22.18'], ['Industry', 'Construction']] },
  { label: 'HP PA 12 - Dyed Black', img: 'https://images.ctfassets.net/q2hzfkp3j57e/2ZI2o73KQtE2jjbS0OL2mX/ed1b290d9d23922e686bb5eb0384568d/true_north_design.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'True North Design'], ['Purpose', 'Structural and vacuum EOAT components'], ['Process', 'SLS / MJF'], ['Unit price', '$69.23 / $34.33'], ['Industry', 'Automotive']] },
  { label: 'Markforged Onyx - Black', img: 'https://images.ctfassets.net/q2hzfkp3j57e/2tmkrITCIhvuJAMky09UOR/737e1c5adf51c938e4dcd1fb3c5a2594/2_autocom_manufacturing.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Autocom Manufacturing'], ['Purpose', 'A production part for 3D printed lathe gantry gripper fingers'], ['Process', 'FDM'], ['Unit price', '$48.86'], ['Industry', 'Automotive']] },
  { label: 'PC Stratasys - white', img: 'https://images.ctfassets.net/q2hzfkp3j57e/6SSOz6SvzSGNiT4f49qhCE/f2fe2825bbca9a9951ac1f1b447cb9cd/terumo_medical.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Terumo medical corporation'], ['Purpose', 'Prototyping parts used for a disposable electrical device'], ['Process', 'FDM'], ['Unit price', '$55.38 / $32.96'], ['Industry', 'Medical']] },
  { label: 'Formlabs Clear Resin', img: 'https://images.ctfassets.net/q2hzfkp3j57e/15IzdkDEC6rvxWZm7Izg2Z/f4e5d1681211a934d20afe8a20ba5e0f/2_aversan.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Aversan Inc'], ['Purpose', 'A prototyping part of an injection molded component for an automated door mechanism'], ['Process', 'SLA'], ['Unit price', '$29.83'], ['Industry', 'Aerospace']] },
  { label: 'Prototyping PLA', img: 'https://images.ctfassets.net/q2hzfkp3j57e/439DAADyfOsY1YeQ3cryJa/d0b88348bd0db11b56648a316e0a9ffa/2_allision_conner.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Allision Conner'], ['Purpose', 'End caps and cable strain relief for sheet metal enclosure'], ['Process', 'FDM'], ['Unit price', '$7.92 / $4.72 / $2.80'], ['Industry', 'Industrial Automation']] },
  { label: 'Aluminum 6082', img: 'https://images.ctfassets.net/q2hzfkp3j57e/GxvIlZDio07V5AfyQOpMJ/c4c1c973f9a9df8cf2cd545f542e7214/02_UPNA-Antenna-Group.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'UPNA\'s Antenna Group'], ['Purpose', 'A part for academic research'], ['Process', 'CNC machining'], ['Material', 'Aluminum 6082'], ['Surface finish', 'Smooth machining'], ['Unit price', '€299.17'], ['Industry', 'Research']] },
  { label: 'Aluminum 6061-T6', img: 'https://images.ctfassets.net/q2hzfkp3j57e/3HhMHeLkWLWkHp83CYCEBl/61fd91ed8c70729cce5b466a713ee1f4/03_ATV-GmBH.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'ATV GmbH'], ['Purpose', 'A part for mechanical adapters'], ['Process', 'CNC machining'], ['Material', 'Aluminum 6061-T6'], ['Surface finish', 'As machined'], ['Unit price', '€83.50'], ['Industry', 'Industrial automation']] },
  { label: 'Aluminum 7075-T6', img: 'https://images.ctfassets.net/q2hzfkp3j57e/4A4T7ZmCAC07VwRawjzGa0/e6c628def9912bbf2c5cc95bc83bc39e/01_Space-inventor.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Purpose', 'A part of an enclosure for electronics for a satellite'], ['Process', 'CNC machining'], ['Material', 'Aluminum 7075-T6'], ['Surface finish', 'Bead blasted + Anodized type ll (Matte)'], ['Unit price', '€36.98'], ['Industry', 'Aerospace']] },
  { label: 'Aluminum 6063', img: 'https://images.ctfassets.net/q2hzfkp3j57e/7669FqNcx3L7qIw2ggHVqL/8f45bf7e00b4c9bb7f09322a3782497a/04_Consolidated-Audio.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Consolidated Audio'], ['Purpose', 'Enclosure for moving coil step-up transformer'], ['Process', 'CNC machining'], ['Material', 'Aluminum 6063'], ['Surface finish', 'Bead blasted + Anodized type ll (Matte)'], ['Unit price', '€61.15'], ['Industry', 'Electronics']] },
  { label: 'Engels machines', img: 'https://images.ctfassets.net/q2hzfkp3j57e/38lx9l54cQI5FtyWOacEjU/22368594d49ffae92af387643d9f62a2/IM-Customer-part_Chris-Engels_03.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'Engels machines'], ['Process', 'Injection molding'], ['Material', 'PP'], ['Surface finish', 'D2'], ['Industry', 'Agriculture']] },
  { label: 'HC Groep', img: 'https://images.ctfassets.net/q2hzfkp3j57e/2v0eZRQWYTuoj3XiQdsTDb/14ea66e064c66908d0a941d0378d25b3/IM-Customer-part-HC-Group_02.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'HC Groep'], ['Process', 'Injection molding'], ['Material', 'ABS'], ['Surface finish', 'As machined'], ['Industry', 'Indoor climate technology']] },
  { label: 'LEKTRI.CO', img: 'https://images.ctfassets.net/q2hzfkp3j57e/2Yy9ugwigAn8ZwUOitNVm1/6b5685c71fae7d6606c0f47b8d7f2f52/IM-Customer-part-Lektrico_12.jpg?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Customer', 'LEKTRI.CO'], ['Process', 'Injection molding'], ['Material', 'PC + ABS'], ['Surface finish', 'VDI33'], ['Industry', 'EV charging']] },
];

export const FACTORIES = [
  { label: '3D printing factory in Netherlands', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1WRHlR8i3zDuTOqSj5Ojyw/dc5893cfa7d5d5c63fe1fe9afda66761/europe_3dp.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2014'], ['Number of machines', '5'], ['Capabilities', 'SLS']] },
  { label: '3D printing facility in Texas, US', img: 'https://images.ctfassets.net/q2hzfkp3j57e/1ggJGmypuiuG9XK7VkTVUB/5cf1a01b21eb9fe2fb8a505260e7889b/usa_3dp.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2014'], ['Capabilities', 'MJF, FDM'], ['Machines', '63'], ['Equipment', 'HP 3D Jet Fusion 4200']] },
  { label: '3D printing factory in United Kingdom', img: 'https://images.ctfassets.net/q2hzfkp3j57e/16IZ5LP4kDYReGOFH0dEWN/7a93e263b36e2e1329fbac953d755763/UK.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2014'], ['Number of machines', '13'], ['Capabilities', 'SLS, FDM']] },
  { label: 'CNC machining factory in India', img: 'https://images.ctfassets.net/q2hzfkp3j57e/2smKKBY4ypJR0bKygdI86k/b5a21779c6d387565a2a312c17991e91/india_cnc.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2019'], ['Capabilities', 'CNC Machining 5, 4, 3 Axis. Mill Turn and turning'], ['Machines', 'Mazak &amp; Doosan'], ['Expertise', 'Fast, low-cost prototyping. Strong and complex end-use parts'], ['Description', 'Specializes in highly complex parts with difficult geometries and tight tolerances']] },
  { label: 'Sheet metal facility in Shenzhen, China', img: 'https://images.ctfassets.net/q2hzfkp3j57e/5Deo0hvqzH0DFc5pIp7nWS/eec5557a934d254b006b00381dfe7295/china_smf.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2014'], ['Capabilities', 'Laser cutting, bending, post processing'], ['Machines', '66'], ['Equipment', 'Amada RG 100 CNC Brake, Trumpf 200 Turret Punch Press']] },
  { label: 'CNC machining factory in China', img: 'https://images.ctfassets.net/q2hzfkp3j57e/6RJOMOuqBowVEnoQ6PNYsx/392d54e84b5a042289d6e669320e1244/china_cnc_2.webp?w=1000&h=1000&fm=jpg&q=82&fit=thumb', table: [['Established', '2015'], ['Capabilities', 'CNC parts for the medical and consumer products industries'], ['Machines', '40 CNC machines, 6 CNC bending presses'], ['Expertise', 'Visual prototypes and functional end parts'], ['Description', 'Produce end-product parts with high cosmetic requirements']] },
];
