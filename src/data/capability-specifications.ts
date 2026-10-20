type CapabilitySpecification = {
  process: string;
  application: string;
  specify: string;
};

// Condensed from the existing capability pages and home-stand2 content.
// These describe selection topics and inquiry inputs, not guaranteed performance.
export const CAPABILITY_SPECIFICATIONS: Record<string, CapabilitySpecification> = {
  // capability-pages.json: Industrial Components
  components: {
    process: 'Selection & sourcing',
    application: 'Controls, sensors, heating & switching',
    specify: 'Part reference, function, interfaces & quantities',
  },
  // CncMachining.tsx
  cnc: {
    process: 'Milling & turning',
    application: 'Custom machined parts',
    specify: 'Drawing, material, critical dimensions & quantities',
  },
  // ThreeDPrinting.tsx
  printing: {
    process: 'Additive manufacturing',
    application: 'Prototypes & functional parts',
    specify: 'Model, intended use, material & quantities',
  },
  // SheetMetal.tsx
  sheetMetal: {
    process: 'Cutting & bending',
    application: 'Cut and formed sheet parts',
    specify: 'Drawing, material, thickness & quantities',
  },
  // InjectionMolding.tsx
  injection: {
    process: 'Tooling & molding',
    application: 'Custom plastic parts',
    specify: 'Model, material, expected volumes & sample needs',
  },
  // capability-pages.json: Cable Assemblies
  cables: {
    process: 'Cable & harness assembly',
    application: 'Connections between components',
    specify: 'Connector references, pin list, lengths & quantities',
  },
  // capability-pages.json: Assembly & Subassemblies
  assembly: {
    process: 'Mechanical & electromechanical assembly',
    application: 'Units for equipment integration',
    specify: 'Parts list, assembly drawing, interfaces & checks',
  },
  // capability-pages.json: Rubber & Silicone
  rubber: {
    process: 'Elastomer molding',
    application: 'Seals, gaskets & membranes',
    specify: 'Geometry, material, hardness & operating conditions',
  },
  // capability-pages.json: Die Casting
  casting: {
    process: 'Aluminum & zinc casting',
    application: 'Custom cast components',
    specify: 'Drawing, alloy, quantities & machined interfaces',
  },
  // capability-pages.json: Extrusion
  extrusion: {
    process: 'Metal & plastic extrusion',
    application: 'Cut and finished profiles',
    specify: 'Cross-section, material, lengths & quantities',
  },
  // capability-pages.json: Sensors & Measurement
  sensors: {
    process: 'Selection & configuration',
    application: 'Measurement and equipment integration',
    specify: 'Range, required accuracy, interfaces & conditions',
  },
  // capability-pages.json: Vacuum Casting
  vacuum: {
    process: 'Polyurethane casting',
    application: 'Prototype evaluation & small runs',
    specify: 'Model, material properties, quantities & finish',
  },
};
