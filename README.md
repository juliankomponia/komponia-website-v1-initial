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
