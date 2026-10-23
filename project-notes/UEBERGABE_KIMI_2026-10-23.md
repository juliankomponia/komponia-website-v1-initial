# Komponia Übergabe an Kimi

Stand: 23. Oktober 2026

Auftraggeber: Julian Gilljam

Zweck: Die bestehende Website mit Kimi weiterbearbeiten, ohne bereits abgeschlossene Arbeiten zu wiederholen.

## Projekt und aktueller Stand

**Das richtige Projekt ist das React-Projekt:**

`/Users/juliangilljam/Documents/Default Project/komponia-website-v1-initial`

Der ältere Ordner `/Users/juliangilljam/Documents/Default Project/Komponia_Website_final` gehört nicht zu dieser Umsetzung. Dessen Anleitung für eine statische HTML-Website mit Python-Server gilt hier nicht.

- Stack: React 19, TypeScript, Vite 7, Tailwind CSS, React Router mit HashRouter.
- Branch: `codex/homepage-structure-wow`.
- Remote: `https://github.com/juliankomponia/komponia-website-v1-initial.git` (privat).
- Letzter Website-Commit: `330be6b58076bcfa50af72bdf44c3739920d895e`.
- Vor Erstellung dieser Übergabe am 23.10.2026: Arbeitsbaum sauber; `git pull --ff-only` meldete „Already up to date“.
- Die anschließende Übergabe ist eine reine Dokumentationsänderung.
- Kimi-Inspect ist bereits über `kimi-plugin-inspect-react` in `vite.config.ts` eingebunden.

Julian hat bisher keinen neuen konkreten Änderungsauftrag nach der abgeschlossenen Überarbeitung genannt. Diese Übergabe ist keine Aufforderung zu einer weiteren Neugestaltung. Zuerst den aktuellen Stand übernehmen und Julians nächste konkrete Änderung klären.

## Lokal starten

Vor Änderungen den Status und Branch prüfen und mit GitHub abgleichen:

```sh
cd "/Users/juliangilljam/Documents/Default Project/komponia-website-v1-initial"
git status --short --branch
git pull --ff-only
```

Bei Konflikten anhalten und Julian fragen. Kein automatischer Reset, kein Force-Push, keine Änderungen nach main verschieben.

Falls Abhängigkeiten fehlen, `npm ci` ausführen. Anschließend:

```sh
npm run dev -- --host 127.0.0.1 --port 3000 --strictPort
```

Bei der Übergabeprüfung wurde kein laufender Server auf Port 3000 gefunden. Ein bereits offener Browser-Tab bedeutet daher nicht, dass der Server noch läuft.

- Startseite: `http://localhost:3000/#/`
- Zuletzt im Browserkontext geöffnete Seite: `http://localhost:3000/#/replacement-and-second-source`
- Separate Materialwechsel-Vorschau, nur im Entwicklungsmodus: `http://localhost:3000/#/vorschau/komponia-echt`

Das `#/` ist für die Routen erforderlich.

## Abgeschlossene Arbeiten vom 20. Oktober

| Commit | Umsetzung |
| --- | --- |
| `a0eebd5` | Vier neue lokale Fähigkeitenbilder; Startseite und Mega-Menüs von externen Bildern befreit; Herkunft dokumentiert. |
| `87b435d` | Why-Komponia-Inhalte in Supply integriert; WTS-Band und Anwendungen nach Kapitel 05 verschoben; Laufband, doppelte Prozessanzeige und verwaiste Linie entfernt; Abschlussmodul weiß gefüllt. |
| `23d8160` | Kompaktere Karten und Abstände, fünf Schriftrollen, ruhigere Labels und Einkaufsformulierungen; mobile Kapitelanzeige und Bedienung verbessert. |
| `330be6b` | Restliche ctfassets-Verweise entfernt; Unterseiten und Daten auf lokale Bilder umgestellt; Prüfbericht und Vergleichsbilder gespeichert. |

Die alte `project-notes/UEBERGABE_CHATGPT_2026-10-20.md` beschreibt den damaligen Auftrag vor diesen Commits. Ihre Fehlerliste ist kein aktuelles offenes Backlog. Die dort freigegebenen Arbeiten sind erledigt.

Die Startseite ist jetzt so gegliedert:

1. **01 Overview:** Hero.
2. **02 What we build:** Concept-to-Production, Capabilities, Custom Solutions mit Explosionsansicht, Component fields.
3. **03 How we work:** Prozess, Einkaufsinformationen, Netzwerk, Qualität.
4. **04 How we deliver:** Supply mit Vorteilskarten und Lieferrhythmus, Environment.
5. **05 Experience & inquiry:** WTS seit 1997, Anwendungen, blauer Abschluss mit Anfrage-Weiche.

Der frühere Anker `#page-section-why-komponia` bleibt als Kartenblock innerhalb von Supply erhalten. Die mobile Kapitelleiste hält den aktiven Eintrag horizontal sichtbar, ohne die Seite vertikal zu verschieben.

## Einstiegspunkte im Code

Die folgenden Pfade sind relativ zum oben genannten React-Projekt.

| Aufgabe | Dateien |
| --- | --- |
| Routen und Seitenrahmen | `src/App.tsx`, `src/main.tsx` |
| Startseitenstruktur | `src/pages/Home.tsx` |
| Startseitentexte | `src/data/home-stand2.json` |
| Hero und Materialwechsel | `src/components/HomeHero.tsx`, `ConceptToProduction.tsx`, `ComponentSwitch.tsx` |
| Karten, Akkordeons und Prozess | `src/components/HomeExperience.tsx`, `ProcurementReadiness.tsx` |
| Sticky-Kapitelleiste | `src/components/PageSections.tsx`, `PageSections.css` |
| Explosionsansicht, Netzwerk, Supply, Abschluss und Anfrage-Weiche | `src/components/home-graphics/` |
| Homepage-Styling | `src/pages/home-experience.css`, `home-brand-expression.css`, `home-structure.css`, `home-graphics.css` |
| Header und Navigation | `src/components/Header.tsx`, `src/data/navigation.ts` |
| Allgemeine Unterseiten | `src/data/pages.json`, `src/components/GenericPage.tsx`, `Subpage.tsx` |
| Bildzuordnung | `src/data/images.ts`, `src/data/capability-images.ts` |
| Anfrageformular | `src/pages/Contact.tsx` |

CSS-Regeln an ihrer bestehenden Stelle bearbeiten, statt neue überschreibende Schichten anzuhängen. Alte abgelehnte Homepage-Layouts nicht wieder aktivieren. **`Sections.tsx` wird weiterhin von Unterseiten verwendet** und darf nicht pauschal als unbenutzt gelöscht werden.

## Kontext der zuletzt geöffneten Unterseite

`/replacement-and-second-source` ist ein Eintrag in `src/data/pages.json` (am Übergabestand ungefähr Zeile 1834), keine eigene Page-TSX-Datei. `GenericPage.tsx` rendert ihn.

Die Seite behandelt:
- das bestehende Bauteil und seine Anforderungen,
- relevante Unterschiede eines Ersatzteils,
- die Bewertung einer Zweitquelle,
- vereinbarte Prüfungen und Wechselbedingungen.

Für Textänderungen zuerst diesen JSON-Eintrag prüfen. Änderungen an `GenericPage.tsx` oder `Subpage.tsx` wirken auch auf andere Seiten. Homepage-Regeln unter `.kp-home` greifen hier nicht.

`heroImg` und Abschnitts-`img` verwenden registrierte Bildschlüssel, keine beliebigen Dateipfade. Die Schlüssel werden über `images.ts` beziehungsweise `PAGE_IMAGES` in `GenericPage.tsx` auf lokale Dateien abgebildet. Der letzte Abschnitt dieser Seite hat absichtlich kein Bild.

Diese Ziele erhalten:
- `/guides/replacement-assessment`
- `/contact?type=replacement`
- `/contact?type=second-source`

Die Kontaktwerte werden unterstützt. Das Formular bereitet Anfragen lokal vor; es gibt keinen Backend-Versand. Keine echte Anfrage zum Testen abschicken.

Die zuletzt geöffnete Seite ist nur Kontext. Julian hat dafür noch keine konkrete Änderung beauftragt.

## Gestaltungsregeln und bestehende Funktionen

- Website-Sprache Englisch; primärer CTA **Prepare an inquiry**; lokal eingebundene Schrift Sora.
- Komponia ist Engineering- und Beschaffungspartner mit persönlicher Abstimmung, keine Instant-Quote-Plattform.
- Farben: Blau `#3E5AF5`, Lavendel `#D4B9F3`, Gelb `#F7D44B`, Ink `#1F1F1D`, Warmgrau `#F5F5F1`.
- Bestätigte historische Aussage: **WTS since 1997**. Keine daraus abgeleiteten unbelegten Jubiläums- oder Erfahrungsaussagen ergänzen.
- Keine erfundenen Toleranzen, Lieferzeiten, Zertifikate, Standorte, Kundenlogos, Testimonials oder Erfolgszahlen.
- Illustrative Bilder als solche kennzeichnen. Keine neuen extern verlinkten Hubs-/Protolabs-Bilder einführen.
- Keine dekorativen Laufbänder, Glows, Glassmorphism, Partikel, Video-Hintergründe oder neue Animationsbibliotheken.
- Vier Hero-Slides, radialer Materialwechsel, Explosionsansicht mit manueller Steuerung, Netzwerk und Supply-Rhythmus erhalten.
- Fähigkeiten zeigen standardmäßig Bild, Titel und Kurzbeschreibung; Details/Spezifikationen/Zeichnungen bleiben aufklappbar. Erweiterung **8 → 12 → 8** erhalten.
- Tastaturbedienung, sichtbarer Fokus, mobile Bedienbarkeit und `prefers-reduced-motion` erhalten.
- Anfrage-Weiche unverändert lassen: `/contact?entry=part-number|drawing|application`.
- Nur Julians konkrete Änderungswünsche umsetzen. Die abschließende Designbewertung liegt bei ihm.

## Bilder und Nachweise

Die vier neuen Motive liegen unter `src/assets/industrial/capabilities-20261020/`:
`cnc.webp`, `printing.webp`, `sheetMetal.webp`, `injection.webp`.

Sie wurden mit Higgsfield erzeugt, visuell geprüft und als WebP mit Qualität 86 in 1296 × 768 px gespeichert. Die vorhandenen acht Vergleichsbilder sind freigestellte Katalogmotive; die neue Serie folgt dieser Bildsprache.

- Prompts, Job-IDs, Herkunft und verworfener erster CNC-Versuch: `project-notes/HOMEPAGE_CAPABILITY_IMAGES_2026-10-20.json`.
- Abschlussbericht: `project-notes/homepage-polish-2026-10-20/ABSCHLUSSBERICHT.txt`.
- Vorher-/Nachherbilder und Messwerte: `project-notes/homepage-polish-2026-10-20/before/` und `after/`.

Die README-Einleitung beschreibt teilweise einen älteren Stand. Für die jüngste Überarbeitung sind diese Übergabe, die vier Commits und der Abschlussbericht maßgeblich.

## Prüfstand vom 20. Oktober

Die folgenden Ergebnisse stammen aus der damaligen Abnahme; am 23.10. wurden Projekt- und Git-Stand geprüft, keine neuen Website-Änderungen vorgenommen.

| Browserbreite | Seitenhöhe vorher | Seitenhöhe nachher |
| --- | ---: | ---: |
| 1280 px | 13.508 px | 9.763 px |
| 820 px | 15.301 px | 11.933 px |
| 390 px | 24.296 px | 16.507 px |
| 320 px | 25.188 px | 17.668 px |

Gemessen nach Durchlaufen der Seite bei jeweils 900 px Fensterhöhe, einschließlich verzögert geladener Grafiken. Ziele erreicht: unter 10.000 px bei 1280 und unter 17.000 px bei 390. Keine Seitenüberbreite an diesen vier Breiten.

Haupt-Bundle: **592,82 kB / 160,42 kB gzip**, zuvor 612,44 / 165,13 kB. Keine neuen Abhängigkeiten im Überarbeitungsauftrag. Der bestehende Vite-Hinweis für Pakete über 500 kB bleibt.

Bestanden:
- Build, gezieltes ESLint für 18 geänderte Quelldateien und `git diff --check`.
- Keine `ctfassets`-Verweise oder `IMG.`-Zugriffe unter `src`.
- Alle 133 Bildzuordnungen der 41 Datenseiten gültig; 49 statische Medienimporte vorhanden.
- Browserprüfung der Startseite, der vier Verfahrensseiten sowie `quality-and-lab` und `ip-protection`, ohne neue Konsolenfehler.
- Sechs Kapitelpositionen auf Desktop und Mobil sowie die wesentlichen Interaktionen einschließlich aller drei Anfragewege.

Noch nicht umfassend geprüft: physische Touch-Hardware, Live-Wechsel der Betriebssystem-Einstellung für reduzierte Bewegung und jede einzelne der 41 Datenseiten. `replacement-and-second-source` wurde für diese Übergabe im Code gelesen, nicht neu visuell abgenommen. Der globale ESLint-Lauf hat bekannte unabhängige Befunde in `components/ui`; nicht als vollständig fehlerfrei bezeichnen.

## Vorgehen bei der nächsten Änderung

1. Den konkreten Wunsch mit Julian festhalten und die passende Datei beziehungsweise Route prüfen.
2. Gezielt ändern; bestehende Funktionen und Inhalte erhalten.
3. `npm run build`, gezieltes `npx eslint` für die geänderten TS/TSX-Dateien und `git diff --check` ausführen.
4. Betroffene Ansichten bei 320, 390, 820 und 1280 px prüfen; bei Homepage-Änderungen auch Seitenhöhe und Kapitelanzeige beachten.
5. Änderungen und Prüfgrenzen kurz dokumentieren, sinnvoll committen und auf denselben Branch pushen, damit MacBook und Mac mini synchron bleiben.

Git-Identität: `juliankomponia <325582059+juliankomponia@users.noreply.github.com>`.

Nur als spätere Vorschläge offen: ein früher kompakter Verweis auf die Anfrage-Weiche und echte WTS-Werkstatt-/Lagerfotos, sobald geeignetes Material vorliegt. Beides wurde bewusst nicht umgesetzt und ist kein automatischer Folgeauftrag.
