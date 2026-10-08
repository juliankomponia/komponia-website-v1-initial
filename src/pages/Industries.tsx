import { CardGrid, SubHero } from '../components/Subpage';
import { DarkCta, SectionLead } from '../components/Sections';
import { INDUSTRIAL_IMAGES as I } from '../data/images';
import pages from '../data/pages.json';

const applicationImages: Record<string, string> = {
  'industries/aerospace-manufacturing': I.customEngineering,
  'industries/automotive-manufacturing': I.heroComponents,
  'industries/industrial-machinery': I.controllers,
  'industries/electronics-manufacturing': I.temperatureController,
  'industries/robotics-automation': I.pressureSwitches,
  'industries/medical': I.temperatureProbe,
};

const applicationCards = pages.filter(page => page.route.startsWith('industries/')).map(page => ({
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
        text="Component selection depends on the application, operating conditions and interfaces. Use the application guides below to prepare your technical requirements."
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
