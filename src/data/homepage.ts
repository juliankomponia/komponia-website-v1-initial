export const HERO_CONTENT = {
  slides: {
    procurement: {
      title: 'Technical components.\nMatched to your application.',
      intro: 'We help manufacturers select, adapt and source components for their own devices, machines and systems.',
      lines: [
        'Standard components and suitable alternatives',
        'Technical advice for your application',
        'Agreed quantities and delivery requirements',
      ],
    },
    engineered: {
      title: 'Custom OEM solutions.\nFrom application to series.',
      intro: 'In-house CAD, samples and manufacturing partners help turn your requirements into a component for your product.',
      lines: [
        'CAD drawings and sketches in-house',
        'Prototypes, samples and manufacturing coordination',
        'Agreed checks before customer release',
      ],
    },
    supplyChain: {
      title: 'Technical sourcing.\nOne point of contact.',
      intro: 'Your contact coordinates manufacturers, import and logistics, bringing the practical work of international procurement together.',
      lines: [
        'Supplier search and technical coordination',
        'Import expertise and logistics coordination',
        'Personal support from inquiry to delivery',
      ],
    },
    series: {
      title: 'Series supply.\nPlanned around your demand.',
      intro: 'We align recurring deliveries, call-offs and dynamic safety stock, with quality support as your production needs change.',
      lines: [
        'Demand planning and agreed stock levels',
        'Call-offs matched to your requirements',
        'Quality support throughout ongoing supply',
      ],
    },
  },
};

export const CAPABILITIES = [
  {
    title: 'Components & advice.',
    description: 'Select standard components and suitable variants with technical advice for your application and coordinated manufacturer support.',
    points: [
      'Function, interfaces and operating conditions',
      'Selection, sourcing and repeat orders',
    ],
    linkLabel: 'Explore components',
    to: '/components',
  },
  {
    title: 'Custom OEM solutions.',
    description: 'Develop or adapt components for your own products, combining in-house CAD with suitable manufacturing partners, samples and agreed checks.',
    points: [
      'Drawings, sketches and technical development',
      'From samples to an agreed series specification',
    ],
    linkLabel: 'Explore OEM solutions',
    to: '/oem-solutions',
  },
  {
    title: 'Ongoing supply.',
    description: 'Bring demand planning, recurring deliveries and safety stock together, with one contact for supply and ongoing quality support.',
    points: [
      'Agreed quantities, stock and call-offs',
      'Support for changes and quality concerns',
    ],
    linkLabel: 'Explore ongoing supply',
    to: '/production-orders',
  },
];

export const COMPONENT_FIELDS = [
  {
    title: 'Controllers & control systems.',
    description: 'Control functions, sensor inputs and outputs matched to your equipment.',
    to: '/components/controllers-and-control-systems',
  },
  {
    title: 'Sensors & probes.',
    description: 'Measurement range, probe design and connections selected for the application.',
    to: '/components/sensors-and-probes',
  },
  {
    title: 'Heating elements.',
    description: 'Heating power, geometry and mounting considered together with the operating conditions.',
    to: '/components/heating-elements',
  },
  {
    title: 'Pressure & switching devices.',
    description: 'Switching points, process connections and electrical interfaces suited to the installation.',
    to: '/components/pressure-and-switching-devices',
  },
];

export const PROCESS_STEPS = [
  {
    title: 'Share the requirement.',
    input: 'A part number, drawing, sample or description.',
    work: 'We clarify the application, quantities and timing.',
    result: 'A clear starting point for your request.',
  },
  {
    title: 'Select or develop.',
    input: 'An existing specification or a new requirement.',
    work: 'We select standard parts or arrange development where needed.',
    result: 'A selected component or defined development route.',
  },
  {
    title: 'Check and agree.',
    input: 'The proposed component and supply approach.',
    work: 'We arrange samples and checks where needed and confirm the offer.',
    result: 'Agreed scope, responsibilities and delivery terms.',
  },
  {
    title: 'Supply and support.',
    input: 'Your order and agreed supply requirements.',
    work: 'We coordinate delivery, call-offs and ongoing quality support.',
    result: 'One contact for delivery and follow-up.',
  },
];

export const APPLICATIONS = [
  {
    title: 'Refrigeration & climate control.',
    description: 'Controls, temperature measurement and interfaces for refrigeration and climate equipment.',
    to: '/components/controllers-and-control-systems',
  },
  {
    title: 'Heating & thermal equipment.',
    description: 'Heating elements and control components for the required temperature and installation.',
    to: '/components/heating-elements',
  },
  {
    title: 'Machinery & plant engineering.',
    description: 'Standard and custom components matched to function, installation space and connections.',
    to: '/industries/industrial-machinery',
  },
  {
    title: 'Laboratory equipment.',
    description: 'Temperature control and sensing for equipment with application-specific requirements.',
    to: '/components/sensors-and-probes',
  },
];

export const SUPPLY_STEPS = [
  {
    title: 'Understand demand.',
    text: 'Review expected consumption, quantities and delivery timing together.',
  },
  {
    title: 'Agree the stock.',
    text: 'Set suitable safety stock, replenishment and commercial terms for your component.',
  },
  {
    title: 'Call off deliveries.',
    text: 'Receive agreed quantities as needed, with coordinated logistics and quality support.',
  },
  {
    title: 'Review and adapt.',
    text: 'Adjust the plan as demand, lead times or the component change.',
  },
];
