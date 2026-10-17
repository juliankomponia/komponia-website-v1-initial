const heroComponents = '/assets/industrial/neutral-20261011/hero-components.webp';
const qualityInspection = '/assets/industrial/quality-inspection.webp';
const controllers = '/assets/industrial/neutral-20261011/controller.webp';
const sensors = '/assets/industrial/neutral-20261011/probe.webp';
const heating = '/assets/industrial/neutral-20261011/heater.webp';
const pressureSwitches = '/assets/industrial/neutral-20261011/pressure-switch.webp';
const coreOem = '/assets/industrial/neutral-20261011/core-oem.webp';
const coreComponents = '/assets/industrial/neutral-20261011/core-components.webp';
const coreEngineering = '/assets/industrial/neutral-20261011/core-engineering.webp';
const coreSupply = '/assets/industrial/neutral-20261011/core-supply.webp';

export const CORE_SERVICE_IMAGES = [coreOem, coreComponents, coreEngineering, coreSupply];
export const HERO_PRODUCT_IMAGE = heroComponents;

export const INDUSTRIAL_IMAGES = {
  heroComponents: coreComponents,
  customEngineering: coreEngineering,
  qualityInspection,
  ongoingSupply: coreSupply,
  controllers,
  sensors,
  heating,
  pressureSwitches,
  temperatureController: controllers,
  temperatureProbe: sensors,
  tubularHeater: heating,
};
