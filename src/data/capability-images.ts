import { IMG } from './site';
import components from '../assets/industrial/capabilities-20261017/components.webp';
import cables from '../assets/industrial/capabilities-20261017/cables.webp';
import assembly from '../assets/industrial/capabilities-20261017/assembly.webp';
import rubber from '../assets/industrial/capabilities-20261017/rubber.webp';
import casting from '../assets/industrial/capabilities-20261017/casting.webp';
import extrusion from '../assets/industrial/capabilities-20261017/extrusion.webp';
import sensors from '../assets/industrial/capabilities-20261017/sensors.webp';
import vacuum from '../assets/industrial/capabilities-20261017/vacuum.webp';

export const CAPABILITY_IMAGES: Record<string, string> = {
  components,
  cnc: IMG.capCnc,
  printing: IMG.cap3dp,
  sheetMetal: IMG.capSmf,
  injection: IMG.capIm,
  cables,
  assembly,
  rubber,
  casting,
  extrusion,
  sensors,
  vacuum,
};
