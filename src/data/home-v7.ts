export type StageGroup = 'controls' | 'sensors' | 'heating' | 'pressure' | 'refrigeration' | 'custom';

export const STAGE_FILTERS: { id: 'all' | StageGroup; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'controls', label: 'Controls' },
  { id: 'sensors', label: 'Sensors' },
  { id: 'heating', label: 'Heating' },
  { id: 'pressure', label: 'Pressure & switching' },
  { id: 'refrigeration', label: 'Refrigeration & air' },
  { id: 'custom', label: 'Custom parts' },
];

type Four = [string, string, string, string];
export type StagePart = {
  slug: string;
  name: string;
  /** Short type designation – what the part is, technically. */
  type: string;
  groups: StageGroup[];
  /** Typical fields of application (general, not customer references). */
  use: string;
  variants: Four;
  clarify: Four;
};

/**
 * General descriptions of component types (round 8, precised). No Komponia-specific claims, no figures, no standards
 * beyond generic type names; the actual deliverable range is confirmed per inquiry.
 */
export const STAGE_PARTS: StagePart[] = [
  // Controls
  { slug: 'temperaturregler', name: 'Digital temperature controller', type: 'Electronic controller with display, panel or DIN-rail mounting', groups: ['controls'],
    use: 'Measures temperature via a probe and switches heating or cooling outputs – in machines, ovens, process and HVAC equipment.',
    variants: ['Panel-mount front formats', 'DIN-rail versions', 'On/off or PID control', 'Relay, SSR or analogue outputs'],
    clarify: ['Sensor input (Pt100, NTC, thermocouple)', 'Control mode & outputs', 'Supply voltage', 'Panel cut-out & front protection'] },
  { slug: 'kuehlstellenregler', name: 'Refrigeration controller', type: 'Electronic controller for refrigeration points', groups: ['controls', 'refrigeration'],
    use: 'Controls compressor, defrost and evaporator fans in cold rooms, display cabinets and commercial refrigerators.',
    variants: ['Panel-mount with display', 'Separate remote display', 'Single or multi-relay', 'With network interface'],
    clarify: ['Defrost type (electric, hot gas, off-cycle)', 'Number of probes & relays', 'Supply voltage', 'Mounting & display format'] },
  { slug: 'kapillarrohrthermostat', name: 'Capillary thermostat', type: 'Mechanical temperature switch with capillary and bulb', groups: ['controls', 'heating'],
    use: 'Switches without auxiliary power when the bulb temperature reaches the set value – in heating appliances, boilers, refrigeration and process equipment.',
    variants: ['Adjustable control thermostat', 'Limiter with manual reset', 'Single- or multi-pole', 'Bulb and capillary lengths'],
    clarify: ['Setting range', 'Switching function & contacts', 'Capillary & bulb', 'Mounting & knob'] },
  { slug: 'din-schienen-geraete', name: 'DIN-rail modules', type: 'Modular devices for top-hat rails', groups: ['controls'],
    use: 'Relays, timers, power supplies and controllers that sit side by side on the standard rail in control cabinets.',
    variants: ['Relays & timers', 'Power supplies', 'Controllers & indicators', 'Module widths'],
    clarify: ['Function', 'Voltage & current', 'Module width', 'Required approvals'] },
  // Sensors
  { slug: 'ntc-fuehler', name: 'NTC / PTC temperature probe', type: 'Thermistor probe with cable', groups: ['sensors'],
    use: 'Delivers the temperature signal to controllers in refrigeration, heating and household appliances.',
    variants: ['Stainless or plastic sleeve', 'Clamp-on or pipe probes', 'Air or immersion probes', 'PVC, silicone or PTFE cable'],
    clarify: ['Resistance value & curve', 'Temperature range', 'Sleeve & cable', 'Connector or cable end'] },
  { slug: 'pt100-widerstandsthermometer', name: 'Pt100 / Pt1000 resistance thermometer', type: 'Platinum resistance sensor with connection head', groups: ['sensors'],
    use: 'Measures temperature in pipes, tanks and machines where a stable, interchangeable signal is needed.',
    variants: ['Screw-in with connection head', 'Cable probes', '2-, 3- or 4-wire connection', 'With head-mounted transmitter'],
    clarify: ['Pt100 or Pt1000 & accuracy class', 'Wiring', 'Process connection & insertion length', 'Temperature range'] },
  { slug: 'druckmessumformer', name: 'Pressure transmitter', type: 'Electronic pressure sensor with analogue output', groups: ['sensors', 'pressure'],
    use: 'Converts pressure into a signal for control and monitoring – in hydraulics, compressed air, refrigeration and water systems.',
    variants: ['Relative or absolute pressure', 'Current or voltage output', 'Threaded process connections', 'Plug or cable outlet'],
    clarify: ['Measuring range', 'Output signal', 'Process connection & media', 'Electrical connection'] },
  // Heating
  { slug: 'rohrheizkoerper', name: 'Tubular heating element', type: 'Metal-sheathed resistance heater', groups: ['heating'],
    use: 'Heats air, liquids and surfaces – in ovens, tanks, appliances and for defrosting.',
    variants: ['Straight or bent shapes', 'Stainless or copper sheath', 'Screw-in nipples or flanges', 'Finned for air heating'],
    clarify: ['Power & voltage', 'Geometry & heated length', 'Medium & sheath material', 'Connection & sealing'] },
  { slug: 'heizpatrone', name: 'Cartridge heater', type: 'Cylindrical heater for bores', groups: ['heating'],
    use: 'Heats tools, moulds, plates and blocks from inside a bore.',
    variants: ['High or low watt density', 'Straight or angled leads', 'Integrated thermocouple', 'With flange or thread'],
    clarify: ['Diameter, length & bore fit', 'Power & voltage', 'Leads & protection', 'Operating temperature'] },
  { slug: 'heizfolie', name: 'Heating foil', type: 'Flexible flat heater', groups: ['heating'],
    use: 'Heats surfaces evenly – against condensation and frost, for displays, batteries, housings and devices.',
    variants: ['Silicone rubber', 'Polyimide film', 'Self-adhesive backing', 'With thermostat or sensor'],
    clarify: ['Outline & heated area', 'Power density & voltage', 'Material & temperature', 'Leads & connection'] },
  { slug: 'heizkabel', name: 'Heating cable', type: 'Trace and defrost heating cable', groups: ['heating', 'refrigeration'],
    use: 'Keeps pipes, drains, doors and drip trays free of frost – in refrigeration and building services.',
    variants: ['Self-regulating', 'Constant wattage', 'Silicone defrost heaters', 'Pre-assembled with cold lead'],
    clarify: ['Application & ambient', 'Length & power', 'Voltage', 'Cold lead & termination'] },
  // Pressure & switching
  { slug: 'hd-nd-druckschalter', name: 'HP/LP pressure switch', type: 'Dual pressure switch for refrigerant circuits', groups: ['pressure', 'refrigeration'],
    use: 'Switches off or signals when high or low pressure leaves the permitted range – in refrigeration and heat-pump systems.',
    variants: ['Single or dual switch', 'Automatic or manual reset', 'Adjustable or fixed setpoints', 'Flare or capillary connection'],
    clarify: ['Refrigerant & pressure ranges', 'Reset type', 'Connection', 'Required approvals'] },
  { slug: 'luftdruckwaechter', name: 'Differential pressure switch (air)', type: 'Membrane switch for air and non-aggressive gases', groups: ['pressure', 'refrigeration'],
    use: 'Monitors filters, fans and air ducts in ventilation and air-handling units.',
    variants: ['Setpoint ranges', 'Hose and duct connectors', 'Changeover contact', 'Cover and mounting options'],
    clarify: ['Setpoint range', 'Switching function', 'Hose connections', 'Protection class'] },
  { slug: 'bimetall-temperaturschalter', name: 'Bimetal thermal switch', type: 'Snap-action disc thermostat', groups: ['pressure', 'heating'],
    use: 'Protects motors, heaters and appliances against overtemperature.',
    variants: ['Normally closed or open', 'Automatic or manual reset', 'Housings & brackets', 'Leads or flat terminals'],
    clarify: ['Switching temperature & tolerance', 'Contact rating', 'Reset type', 'Housing & terminals'] },
  // Refrigeration & air
  { slug: 'scrollverdichter', name: 'Scroll compressor', type: 'Hermetic refrigerant compressor', groups: ['refrigeration'],
    use: 'Compresses refrigerant in air-conditioning, heat-pump and refrigeration systems.',
    variants: ['Fixed or variable speed', 'Single- or three-phase', 'Refrigerant-specific models', 'Tandem arrangements'],
    clarify: ['Refrigerant', 'Capacity & application limits', 'Voltage', 'Connections'] },
  { slug: 'schraubenverdichter', name: 'Screw compressor', type: 'Semi-hermetic refrigerant compressor', groups: ['refrigeration'],
    use: 'Compresses refrigerant at larger capacities in industrial refrigeration and chillers.',
    variants: ['Semi-hermetic or open', 'Capacity control', 'Economiser operation', 'Refrigerant-specific models'],
    clarify: ['Refrigerant', 'Capacity & operating point', 'Capacity control', 'Application limits'] },
  { slug: 'expansionsventil', name: 'Electronic expansion valve', type: 'Electrically actuated refrigerant valve', groups: ['refrigeration'],
    use: 'Meters refrigerant into the evaporator, driven by a superheat controller – in refrigeration and heat-pump circuits.',
    variants: ['Pulse-width or stepper motor actuation', 'Orifice sizes', 'Solder connections', 'Thermostatic alternative'],
    clarify: ['Refrigerant', 'Capacity & orifice', 'Controller & coil', 'Connections'] },
  { slug: 'magnetventil', name: 'Solenoid valve', type: '2/2-way valve with coil', groups: ['pressure'],
    use: 'Opens and closes lines for water, air, oil and other media electrically.',
    variants: ['Normally closed or open', 'Direct or servo-assisted', 'Threaded body sizes', 'Coil voltages & plugs'],
    clarify: ['Medium & pressure', 'Connection size', 'Coil voltage', 'Normally open / closed'] },
  { slug: 'heissgas-abtauschlange', name: 'Hot-gas defrost coil', type: 'Copper tube coil for drain pans', groups: ['refrigeration'],
    use: 'Uses hot gas to keep drain pans and evaporators free of ice.',
    variants: ['Coil geometries', 'Copper tube sizes', 'Solder or flare ends', 'Integrated in drain pans'],
    clarify: ['Geometry', 'Tube material', 'Connections', 'Operating pressure'] },
  { slug: 'axialventilator', name: 'Axial fan', type: 'Fan with axial air flow', groups: ['refrigeration'],
    use: 'Moves air through heat exchangers, condensers, control cabinets and equipment.',
    variants: ['AC or EC motors', 'Sizes & guards', 'Blowing or sucking', 'Plastic or metal impeller'],
    clarify: ['Airflow & pressure', 'Size', 'Voltage', 'Noise level'] },
  // Custom parts
  { slug: 'cnc-hydraulikblock', name: 'CNC hydraulic manifold', type: 'Machined block with drilled channels', groups: ['custom'],
    use: 'Distributes and controls hydraulic flow in machines and power units.',
    variants: ['Aluminium or steel', 'Cartridge valve cavities', 'Ports & bore patterns', 'Surface treatments'],
    clarify: ['3D data & drawing', 'Material & surface', 'Ports & pressure range', 'Quantities & call-offs'] },
  { slug: 'alu-druckgussgehaeuse', name: 'Die-cast aluminium enclosure', type: 'Cast housing with machined faces', groups: ['custom'],
    use: 'Protects electronics and mechanics in machines and outdoor equipment.',
    variants: ['Standard or custom moulds', 'With seal groove', 'Coated or raw', 'Machined after casting'],
    clarify: ['Dimensions & walls', 'Sealing requirement', 'Surface finish', 'Machining after casting'] },
  { slug: 'spritzguss-gehaeuse', name: 'Injection-moulded housing', type: 'Plastic part from a dedicated mould', groups: ['custom'],
    use: 'Encloses electronics and assemblies in devices and appliances.',
    variants: ['Technical thermoplastics', 'Two-shot or overmoulded', 'Inserts & snap fits', 'Textures & colours'],
    clarify: ['3D data & tolerances', 'Material & flammability rating', 'Mould ownership & quantities', 'Surface & colour'] },
  { slug: 'blechbiegeteil', name: 'Sheet-metal part', type: 'Laser-cut and bent part', groups: ['custom'],
    use: 'Brackets, covers and enclosures for machines, cabinets and equipment.',
    variants: ['Steel, stainless or aluminium', 'Cut, bent or welded', 'Press-in fasteners', 'Powder coating or plating'],
    clarify: ['Drawing & tolerances', 'Material & thickness', 'Surface treatment', 'Quantities'] },
  { slug: 'kabelkonfektion', name: 'Cable assembly', type: 'Pre-assembled cable or harness', groups: ['custom'],
    use: 'Connects sensors, controllers and actuators – ready to install in machines and devices.',
    variants: ['Single cables or harnesses', 'Crimped or moulded', 'Shielded versions', 'Labelled & tested'],
    clarify: ['Connectors & pin-out', 'Cable type & lengths', 'Environment', 'Testing & documentation'] },
  { slug: 'dichtungen', name: 'Rubber & silicone seals', type: 'O-rings, gaskets and moulded seals', groups: ['custom'],
    use: 'Seal housings, connections and covers against media, dust and moisture.',
    variants: ['O-rings', 'Flat gaskets & die-cuts', 'Moulded profiles', 'EPDM, NBR, FKM or silicone'],
    clarify: ['Medium & temperature', 'Dimensions & hardness', 'Material', 'Approvals if required'] },
];

export const partSrc = (slug: string, size: '600' | 'full' = 'full', kind: 'real' | 'brand' = 'real') =>
  `${import.meta.env.BASE_URL}components/${slug}/${kind}${size === '600' ? '-600' : ''}.webp`;

/** Rotatable parts (round 9): number of turntable frames in public/spin/<slug>/NN.webp. Empty = static rendering. */
export const SPIN: Record<string, number> = { 'pt100-widerstandsthermometer': 40, 'spritzguss-gehaeuse': 40 };
export const spinFrame = (slug: string, i: number) => `${import.meta.env.BASE_URL}spin/${slug}/${String(i).padStart(2, '0')}.webp`;
