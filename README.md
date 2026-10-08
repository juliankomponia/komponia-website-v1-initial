# Komponia Website

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

Als nächster inhaltlicher Schritt sollen die Hauptpunkte im Manufacturing-Abschnitt anhand der gültigen Komponia-Strategie und der tatsächlichen Leistungen gemeinsam geklärt werden. Die aktuellen vier Karten sind CNC machining, 3D printing, Sheet metal fabrication und Injection molding. Zunächst Inhalte prüfen und Vorschläge abstimmen, erst nach Zustimmung umsetzen.

Der Startprompt dafür liegt in [project-notes/STARTPROMPT_MANUFACTURING_2026-10-08.txt](project-notes/STARTPROMPT_MANUFACTURING_2026-10-08.txt). Frühere Reviews, Prompts und Roadmaps sind Referenzmaterial. Zusätzliche Elemente aus dem Designsystem werden vor der Übernahme mit dem Nutzer abgestimmt.

Die gültigen Strategiedokumente liegen im getrennten privaten Repository `juliankomponia/Unternehmensstrategie` im Ordner `Komponia_Sourcura_Strategie`: `stage13_komponia.md` und `stage13_gesamtkonzept.md`.
