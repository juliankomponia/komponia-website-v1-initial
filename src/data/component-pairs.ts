export type ComponentPair = { slug: string; name: string; category?: string };
export const componentPairs: ComponentPair[] = [
  { slug: "scrollverdichter", name: "Scrollverdichter", category: "Kälte" },
  { slug: "schraubenverdichter", name: "Schraubenverdichter", category: "Kälte" },
  { slug: "hd-nd-druckschalter", name: "HD/ND-Druckschalter", category: "Sensorik" },
  { slug: "luftdruckwaechter", name: "Luftdruckwächter", category: "Sensorik" },
  { slug: "druckmessumformer", name: "Druckmessumformer", category: "Sensorik" },
  { slug: "expansionsventil", name: "Expansionsventil", category: "Kälte" },
  { slug: "magnetventil", name: "Magnetventil", category: "Ventile" },
  { slug: "heissgas-abtauschlange", name: "Heißgas-Abtauschlange", category: "Kälte" },
  { slug: "axialventilator", name: "Axialventilator", category: "Lüftung" },
  { slug: "alu-druckgussgehaeuse", name: "Alu-Druckgussgehäuse", category: "Gehäuse" },
  { slug: "cnc-hydraulikblock", name: "CNC-Hydraulikblock", category: "CNC" },
  { slug: "din-schienen-geraete", name: "DIN-Schienen-Geräte", category: "Elektrik" },
];
