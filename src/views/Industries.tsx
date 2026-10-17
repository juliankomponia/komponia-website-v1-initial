'use client';

import { CardGrid, SubHero } from '../components/Subpage';
import { DarkCta, SectionLead } from '../components/Sections';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import pages from '../data/pages.json';

const applicationImages: Record<string, string> = {
  'industries/refrigeration-climate-control': I.controllers,
  'industries/thermal-foodservice': I.heating,
  'industries/laboratory-equipment': I.sensors,
  'industries/aerospace-manufacturing': I.customEngineering,
  'industries/automotive-manufacturing': I.heroComponents,
  'industries/industrial-machinery': I.controllers,
  'industries/electronics-manufacturing': I.temperatureController,
  'industries/robotics-automation': I.pressureSwitches,
  'industries/medical': I.temperatureProbe,
};

const priorityApplications = ['industries/refrigeration-climate-control', 'industries/thermal-foodservice', 'industries/industrial-machinery', 'industries/laboratory-equipment'];
const applicationCards = pages.filter(page => page.route.startsWith('industries/')).sort((a, b) => {
  const rank = (route: string) => { const index = priorityApplications.indexOf(route); return index < 0 ? priorityApplications.length : index; };
  return rank(a.route) - rank(b.route);
}).map(page => ({
  title: page.title,
  text: page.subtitle,
  img: applicationImages[page.route],
  link: 'Read application requirements',
  to: `/${page.route}`,
}));

export default function Industries() {
  return (
    <>
      <SubHero
        eyebrow="Applications"
        title="Applications and requirements"
        text="We support OEMs and industrial users with components for their own equipment. Refrigeration, climate control, thermal equipment and machinery are core starting fields; each further application is assessed against its specific requirements."
        img={I.sensors}
        cta="Prepare an inquiry"
      />
      <section data-section-label="Applications" className="bg-white"><div className="wrap-orig section-pad">
        <SectionLead title="Start with the application">Function, installation and operating conditions guide the component selection.</SectionLead>
        <CardGrid cards={applicationCards} />
      </div></section>
      <DarkCta />
    </>
  );
}
