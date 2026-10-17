import heroComponents from '../assets/industrial/neutral-20261011/hero-components.webp';
import qualityInspection from '../assets/industrial/quality-inspection.webp';
import controllers from '../assets/industrial/neutral-20261011/controller.webp';
import sensors from '../assets/industrial/neutral-20261011/probe.webp';
import heating from '../assets/industrial/neutral-20261011/heater.webp';
import pressureSwitches from '../assets/industrial/neutral-20261011/pressure-switch.webp';
import coreOem from '../assets/industrial/neutral-20261011/core-oem.webp';
import coreComponents from '../assets/industrial/neutral-20261011/core-components.webp';
import coreEngineering from '../assets/industrial/neutral-20261011/core-engineering.webp';
import coreSupply from '../assets/industrial/neutral-20261011/core-supply.webp';

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
