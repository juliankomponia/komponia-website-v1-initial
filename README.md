# Komponia Website

## Aktive Startseite – Markenfeinschliff, 19. Oktober 2026

Die Startseite verwendet `Home.tsx`, `HomeExperience.tsx` und
`home-experience.css`: den bestehenden, bildbetonten Fictiv-orientierten Aufbau
mit Vier-Bilder-Hero und radialem Komponentenwechsel. Der freigegebene
„Komponia-Feinschliff“ ergänzt lokal eingebundene Sora, einheitliche Markenfarben,
kleine Abschnittslabels mit blauer Linie sowie ruhige Produktkarten.
Die Regeln gelten nur auf der Homepage, einschließlich Header und Footer.

Das angepasste Website-Designkonzept steht in
`project-notes/HOMEPAGE_BRAND_REFINEMENT_2026-10-19.txt`.
Frühere Stände unten sind historische Arbeitsnotizen; insbesondere `home.css`
und `HomeSectionsStand2.tsx` sind nicht die aktive Startseite.

## Preis, Versand und Umweltschutz – 17. Oktober 2026

Die aktive Startseite erklärt unter „Why Komponia“ den Preisvorteil durch gemeinsames
Einkaufsvolumen, größere Produktionslose mit Safety Stock und kleinen Teilabrufen
sowie den mit KI entworfenen Verpackungs- und Versandprozess. Ein Umweltabschnitt
verlinkt die überarbeitete Seite `/sustainability`; Menü und Footer nennen sie jetzt
„Environment & resource use“. `/production-orders` erläutert die Kostenmechanik und
fünf Schritte der Pack-/Versandplanung, `/oem-solutions` den Preisvorteil bei OEM-Betreuung.
Bestehende Komponenten und Stilklassen werden wiederverwendet.

Eine allgemeingültige Versandkostenquote für industrielle Serienkomponenten ließ
sich nicht belegen. OECD- und finnische Studienwerte haben andere Bezugsgrößen und
werden nicht als pauschaler Aufschlag auf den Teilepreis dargestellt. Quellen,
Abgrenzung und Prüfstand: `project-notes/PRICE_SHIPPING_ENVIRONMENT_2026-10-17.txt`.
Auf Wunsch ergänzt: Die finnischen 4,1 % Transportkosten am Umsatz stehen als
explizit abgegrenzter Studienwert mit Sternchen und Quellenlink auf der Startseite
und im Versandabschnitt von `/production-orders`.
Die zugehörigen Stage-13-Strategiedokumente wurden im Repository
`juliankomponia/Unternehmensstrategie` ergänzt.

## Leistungsbereich – 17. Oktober 2026

Auf dem wiederhergestellten Ausgangsstand `a71bb4a` zeigt „Our capabilities.“
jetzt die zwölf bestätigten Bereiche mit Industrial Components an erster Stelle.
OEM solutions, engineering, quality und supply chain coordination stehen im
Einleitungstext als gemeinsamer Leistungsumfang aller Bereiche.
Alle zwölf Karten verwenden den ursprünglichen Aufbau: freigestelltes Produktbild,
Titel, Kurztext, zwei Stichpunkte und Link. Die vier vorhandenen Fertigungsbilder
bleiben zugeordnet. Acht ergänzende, KI-generierte Produktmotive orientieren sich
an deren Bildstil und liegen lokal als transparente WebP-Dateien in
`src/assets/industrial/capabilities-20261017/`. Bildzuordnung und vollständige
Prompts: `project-notes/CAPABILITY_IMAGES_2026-10-17.json` (integriertes Imagegen).
Die Motive zeigen illustrative, generische Bauteile. Alle Karten führen zu einer
Leistungsseite. Der Anfrage-Link auf den ergänzten Seiten öffnet das bestehende
Formular mit vorausgefülltem Bereich. Hero, Kartenstile und Raster der Startseite
bleiben erhalten.
Produktionsbuild und ESLint der geänderten Komponenten erfolgreich. Kartenfolge,
mobile Darstellung und vorausgefüllte Anfragen im Browser geprüft.

## Capabilities-Menü und Leistungsseiten – 17. Oktober 2026

Das Capabilities-Menü enthält alle zwölf Bereiche mit Industrial Components zuerst.
Die vorhandenen CNC- und 3D-Unterverfahren bleiben erreichbar; die drei Linkspalten
und die zusätzliche Spalte „Solutions & supply“ verwenden die bisherigen Stile.
Acht neue Einstiegsseiten ergänzen die bestehenden vier Fertigungsseiten:
`/industrial-components`, `/cable-assemblies`, `/assembly-and-subassemblies`,
`/rubber-and-silicone`, `/die-casting`, `/extrusion`, `/sensors-and-measurement`
und `/vacuum-casting`. Die Komponentenkategorien bleiben unter `/components`
erreichbar und sind von den passenden Einstiegsseiten verlinkt.

`src/pages/Capability.tsx` übernimmt Abschnittsaufbau und Stilklassen von
`SheetMetal.tsx` sowie die bestehenden Bausteine SubHero, SectionLead, OrderingProcess,
Faq und DarkCta. Die Inhalte liegen in `src/data/capability-pages.json`.
Kategorien, Anforderungen, Optionen, Ablauf, FAQ und verwandte Leistungen sind
ausgearbeitet. Die Anfrage-CTAs übernehmen Bereich und Anfragetyp ins Formular.
Die ursprünglichen vier Seiten und gemeinsamen CSS-Dateien bleiben unverändert.
Die acht ergänzenden Titelbilder wurden mit dem integrierten Imagegen im Stil des
vorhandenen Sheet-Metal-Titelbildes erstellt. Dateien und Prompts sind in
`project-notes/CAPABILITY_HEROES_2026-10-17.json` dokumentiert.
Produktionsbuild, ESLint und Routen-/Kategorieabgleich erfolgreich. Im Browser
sind alle acht Seiten, das mobile Menü, Startseitenlinks, FAQ und die beiden
Anfragetypen (component/custom) mit Bereichsvorbelegung geprüft. Bei 790 px
Viewportbreite kein horizontaler Überlauf; keine Browserfehler.

## Historischer Stand: Stand 2, wiederhergestellt am 17. Oktober 2026

Die Startseite verwendet wieder Gestaltung, Vier-Bilder-Hero, Abschnittsnavigation,
vollständige Gliederung, Texte und Bildzuordnungen aus `27ac683`.
Die Wiederherstellung erfolgt mit einem neuen Commit auf `main`; die komplette
Historie einschließlich aller späteren Entwürfe bleibt erhalten.

Die historischen Homepage-Inhalte liegen separat in `src/data/home-stand2.json`,
`src/data/home-stand2-images.ts` und `src/components/HomeSectionsStand2.tsx`.
Die neueren Inhaltsdateien und Unterseiten bleiben als Fundus unverändert.
Bestätigte Unternehmensangaben, Footer und lokales Anfrageformular mit Mail-Link
bleiben erhalten. Die gemeinsamen Gestaltungsdateien entsprechen wieder Stand 2.
Keine Veröffentlichung. Details: `project-notes/STAND_2_RESTORATION_2026-10-17.txt`.

Aktuelle englischsprachige Komponia-Website auf Basis des bestehenden Protolabs-Templates mit React, TypeScript und Vite. Kommunikation und inhaltliche Abstimmung erfolgen auf Deutsch.

## Lokal starten

Getestet mit Node.js 24. Nach dem Klonen im Projektordner:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Die Vorschau läuft unter http://localhost:3000/#/.

Produktionsbuild prüfen:

```sh
npm run build
```

Abhängigkeiten, Build-Dateien, lokale Umgebungsdateien und Caches werden nicht eingecheckt. `package-lock.json` ist enthalten.

## Historische Arbeitsnotizen

Die folgenden Abschnitte dokumentieren frühere Arbeitsschritte; maßgeblich ist die aktive Grundlage oben.

## Gesicherter Stand am 8. Oktober 2026

- Header am Seitenanfang schwarz mit weißem Logo; beim Scrollen weiße Leiste mit farbigem Logo.
- Hero mit vier automatisch wechselnden Bildern und passenden Texten: Procurement, Engineered, Supply chain, Series.
- Schwarzer Bildverlauf. Beim Scrollen wechseln die Häkchen und die aktive Themenlinie zu Komponia-Lavendel `#D4B9F3`; oben sind sie weiß.
- Originale Komponia-Wortmarke, Poppins, Template und Seitenarchitektur erhalten.
- Die obere Menübeschriftung wurde bei den Hero- und Header-Designänderungen nicht umbenannt.
- „Components. Composed.“ ist im aktuellen Stand entfernt.

## Frühere Version

Der Git-Tag `before-hero-redesign-2026-10-07` enthält die rekonstruierte Version unmittelbar vor dem Vier-Bilder-Hero: ein statisches Bild links, feste Texte rechts, bereits mit dem damals freigegebenen Header-/Logo-Scrollwechsel. Die historischen Composed-Formulierungen sind dort noch enthalten.

Die ältere statische Referenzseite liegt weiterhin im separaten Repository `juliankomponia/Komponia_Website_final`.

## Weiterarbeiten

Auf einem weiteren Rechner dieses Repository klonen. Vor weiteren Änderungen den lokalen Git-Status prüfen und den aktuellen Stand abrufen; Änderungen nach Abschluss committen und pushen.

## Inhaltlicher Ausbau am 11. Oktober 2026 (vor dem Markenabgleich)

Die aktuelle Stage-13-Strategie ist in Homepage, Kernleistungen und Navigation eingearbeitet. Neue Seiten erläutern individuelle Lösungen, OEM-Betreuung, Ersatz/Zweitquellen sowie Kälte-/Klimatechnik, thermische/Foodservice-Geräte und Laborgeräte. Das Komponia-Lab, Inhouse-CAD, persönlicher Ansprechpartner, Import/Logistik und dynamischer Safety Stock werden ausdrücklich beschrieben. Das bestehende Design, die vier Hero-Bilder, Logo und Scroll-Verhalten sind erhalten; es wurden keine CSS-Dateien geändert.

Der Manufacturing-Abschnitt zeigt zuerst vier Kernleistungen: OEM solutions, Technical components, Custom development und Series supply. Darunter bleiben die vier bisherigen Fertigungsverfahren als konkrete Prozessoptionen erhalten. Beide Reihen verwenden die vorhandene Kartengestaltung.

Qualität und Markenherkunft verwenden jetzt `/quality-and-lab` und `/brand-background`. Die früheren Template-Adressen leiten weiterhin auf diese Seiten weiter. Das Anfrageformular bietet zusätzlich OEM-, Ersatz- und Zweitquellen-Anfragen, bleibt aber eine lokale Entwurfsvorbereitung ohne Versand.

Analyse, Quellen, Abgrenzungen und Prüfungen stehen in `project-notes/STRATEGY_CONTENT_REVIEW_2026-10-11.txt`. Die Veröffentlichungsvoraussetzungen stehen in `project-notes/PUBLICATION_PREPARATION.txt`. Die bisherige Manufacturing-Notiz vom 8. Oktober ist historische Referenz, kein aktueller Arbeitsauftrag.

Die gültigen Strategiedokumente liegen im getrennten privaten Repository `juliankomponia/Unternehmensstrategie` im Ordner `Komponia_Sourcura_Strategie`: `stage13_komponia.md` und `stage13_gesamtkonzept.md`.

## Markenabgleich und Kontakt am 11. Oktober 2026

- Komponia-Blau `#3E5AF5`, passende Hover-/Aktivfarben und Ink `#1F1F1D` ersetzen die bisherigen Template-Farben. Sora wird lokal für Überschriften eingebunden (inklusive OFL-Lizenz); Poppins bleibt für Fließtext erhalten.
- Die Startseite bündelt die Kernleistungen unter „Our capabilities“. Doppelte Angebots-, OEM-, Anforderungs- und Partnerblöcke sind dort entfernt; ihre Detailseiten und vorhandenen Daten bleiben verfügbar. Die vier Fertigungsverfahren bleiben erhalten.
- Vier neue, einheitliche Higgsfield-Motive zeigen OEM, Komponenten, Entwicklung und Serienversorgung. Optimierte WebP-Dateien und Herkunft/Prompts liegen in `src/assets/industrial/brand-20261011/`. Das neue Komponia-Brand-Kit in Higgsfield hat die ID `f8f2de78-33c7-4395-924e-8307cb86a1e0`.
- Der Ablauf zeigt je Schritt Kundeninput, Komponia-Leistung und Ergebnis. Der Lab-Bereich verwendet Lavendel, die Prozessnummern Gelb.
- Bestätigte Firmenangaben stehen zentral in `src/data/company.ts` und erscheinen im Footer und auf der Kontaktseite. Der Anfrageentwurf kann per Mail-Link an info@komponia.com im eigenen Mailprogramm geöffnet werden; Kopieren und Download bleiben verfügbar. Kein automatischer Website-Versand, kein Datei-Upload.
- Homepage-Hero, Logo, Navigation, vorhandene Raster und Seitenarchitektur bleiben erhalten. Vite erzeugt beim Build Dateinamen mit Inhalts-Hash für CSS, Schrift und Bilder.

Aktuelle Prüfung und offene Veröffentlichungsschritte: `project-notes/BRAND_CONTACT_REVIEW_2026-10-11.txt` und `project-notes/PUBLICATION_PREPARATION.txt`.

## Fotografische Komponentenbilder am 11. Oktober 2026

Die aktive Bildserie liegt jetzt in `src/assets/industrial/photo-20261011/`: vier Komponentenbilder sowie vier Motive für OEM, Komponenten, Entwicklung und Serienversorgung. Mit Higgsfield überarbeitet, mit natürlicheren Materialoberflächen, weichem Studiolicht und physischen Hintergründen in Komponia-Blau, Lavendel und Gelb. Die Serie ersetzt auch wiederverwendete Motive auf Kategorie- und Detailseiten; die vier Homepage-Hero-Fotos bleiben erhalten.

Die Motive sind illustrative Beispiele, keine Fotos konkreter Herstellerprodukte. Prompts, Referenzen, Korrekturen und Dateiprüfsummen sind im zugehörigen `manifest.json` dokumentiert. Prüfung: `project-notes/PHOTO_REVIEW_2026-10-11.txt`.

## Aktueller Stand: Hubs-Referenz am 11. Oktober 2026

Auf Nutzerwunsch ersetzt ein enger Abgleich mit der aktuellen Hubs-Startseite die zuvor farbigen Bildserien und den immersiven Hero. Die Startseite verwendet einen geteilten Produkt-Hero mit den Schaltern „Components“ und „OEM & series“, ein 1152-px-Inhaltsraster bei 1440 px, 64-px-Abschnittsabstände und einheitliche hellgraue Produktkarten. Komponia-Sora, Markenblau, Logo, bestätigte Unternehmensangaben und fachliche Inhalte bleiben erhalten.

Acht neutrale Produktfreisteller und ein dunkles Hero-Motiv liegen in `src/assets/industrial/neutral-20261011/`. Diese Serie ist jetzt aktiv, auch in den verlinkten Komponentenseiten. Die älteren Bildserien und Hero-Fotos bleiben als historische Dateien erhalten. Der neue Home-Aufbau und seine Styles liegen in `src/pages/Home.tsx`, `src/components/HomeHero.tsx` und `src/pages/home.css`.

Referenzvergleich und Prüfungen: `project-notes/HUBS_HOME_REVIEW_2026-10-11.txt`.

## Aktueller Stand: Komponia-Details im Hubs-Raster, 11. Oktober 2026

Der abgestimmte Seitenaufbau bleibt erhalten. Die Markenverfeinerung folgt dem offiziellen Paket `Komponia_Design_fin`: lokal eingebundene Sora für die gesamte Website, Pillen-Buttons, 11-px-Labels mit blauer Linie, feine Outline-Icons, weiße Karten mit 14-px-Radius und grauer Kontur. Lavendel hebt den OEM-Teil der Hero-Headline hervor; der Lab-Abschnitt nutzt eine sehr helle Lavendelfläche. Gelb bleibt ein gezielter Akzent auf dunklem Grund.

Die originale, unveränderte SVG-Marke liegt in `src/assets/brand/komponia-mark.svg`. `KomponiaSignature.tsx` verbindet sie mit Sourcing, Engineering, Quality und Supply und ersetzt das wiederholte Produktbild im Herkunftsabschnitt. Die Branchenkarten zeigen passende Linien-Icons. Die neutralen Produktbilder bleiben aktiv; keine neue Bildserie wurde erzeugt. Die Startseitentexte sind kürzer und direkter formuliert.

Prüfungen und Abgrenzung: `project-notes/BRAND_DETAIL_REVIEW_2026-10-11.txt`.
