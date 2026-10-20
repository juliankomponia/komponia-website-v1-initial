# ÜBERGABE AN CHATGPT / CODEX — KOMPONIA-STARTSEITE PROFESSIONALISIEREN

Stand: 20. Oktober 2026, 19:00 Uhr
Erstellt von: Claude (Analyse im Browser bei 1280/820/390/320 px und Code-Review)
Auftraggeber: Julian Gilljam

---

## 0. Kurzfassung des Auftrags

Die Startseite funktioniert technisch, wirkt aber noch nicht professionell genug. Sie ist zu lang, zu kleinteilig und an einigen Stellen erkennbar „KI-gebaut“. Außerdem lädt sie Fremdbilder von hubs.com.

Dein Auftrag:

1. **Fremdbilder entfernen und ersetzen** (rechtlich dringend).
2. **Die zwei freigegebenen Zusammenlegungen umsetzen** (A und B unten).
3. **Das Laufband entfernen** und weitere KI-typische Elemente beruhigen.
4. **Die Seite professionalisieren**, orientiert an der Wettbewerbsrecherche: kürzer, klarere Hierarchie, weniger Etiketten, einheitliche Bildsprache, Nutzenargumente für Einkäufer.
5. **Gründlich prüfen** (Build, ESLint, Browser bei vier Breiten, Seitenhöhen) und **sauber committen und pushen**.

Keine komplette Neugestaltung. Navigation, Vier-Bilder-Hero, Materialwechsel, Explosionsansicht, Netzwerkschema, Supply-Rhythmus, Qualitätskarten, Anfrage-Weiche und alle bedienbaren Inhalte bleiben erhalten.

---

## 1. Projekt, Git, Vorschau

- Richtiges Projekt (React / TypeScript / Vite):
  `/Users/juliangilljam/Documents/Default Project/komponia-website-v1-initial`
- NICHT bearbeiten: `/Users/juliangilljam/Documents/Default Project/Komponia_Website_final`
- Branch: `codex/homepage-structure-wow`, Stand `31512d0` (Doku-Commit nach `36092fb`)
- Remote: `https://github.com/juliankomponia/komponia-website-v1-initial.git` (privat)
- Identität: `juliankomponia <325582059+juliankomponia@users.noreply.github.com>`
- Vor Änderungen: `git status`, Remote prüfen, `git pull --ff-only`. Bei Konflikten anhalten. Kein Reset, kein Force-Push, nichts nach main.
- Diese Übergabe liegt als `project-notes/UEBERGABE_CHATGPT_2026-10-20.md` im Repo. Bitte mit deinem ersten Commit einchecken.

Vorschau:
- `http://localhost:3000/#/`
- `http://localhost:3000/#/vorschau/komponia-echt`

Erst prüfen, ob Port 3000 läuft, sonst:
`npm run dev -- --host 127.0.0.1 --port 3000 --strictPort`

**Browserzugriff:** Bei der letzten Codex-Sitzung wurde der Zugriff auf localhost:3000 abgewiesen. Claude hatte heute über einen anderen Browser normalen Zugriff; die Seite läuft also. Wenn dein Browserzugriff wieder gesperrt ist, nicht umgehen, sondern Julian sofort bitten, die Freigabe zu erteilen oder die App neu zu starten. Visuelle Aussagen ohne Browser klar als ungeprüft kennzeichnen.

---

## 2. Feste Grenzen (unverändert gültig)

- Leitbild „Das 30-jährige Start-up“ ist eine Gestaltungsidee. Belegt ist nur: **WTS since 1997**.
- Komponia ist persönlicher Engineering- und Beschaffungspartner, keine Instant-Quote-Plattform. Schwerpunkt: Projektentwicklung, OEM, individuelle Lösungen, Mengenbündelung, Abrufe.
- Website-Sprache Englisch. Primär-CTA „Prepare an inquiry“. Schrift: lokal eingebundene Sora.
- Farben: Blau `#3E5AF5` Engineering/Beschaffung, Lavendel `#D4B9F3` Qualität, Gelb `#F7D44B` Versorgung, Ink `#1F1F1D`, Warmgrau `#F5F5F1`. Farbe überwiegend als Signal; Vollflächen nur dunkles Netzwerkband und blauer Abschluss; Qualität auf Weiß.
- Keine erfundenen Toleranzen, Lieferzeiten, Mengen, Zertifikate, Standorte, Kundenlogos, Testimonials, Erfolgszahlen. Grafiken dürfen so etwas auch nicht indirekt suggerieren. Offene Punkte stehen in der Liste „Von Julian zu bestätigen“ im Phase-C-Bericht.
- Generierte Bilder bleiben als illustrativ gekennzeichnet und dokumentiert.
- Keine Glows, Farbblobs, Glassmorphism, Partikel, Video-Hintergründe, Lottie, three.js. Keine neue Animationsbibliothek.
- Materialwechsel bleibt weich und radial. Kein blauer Scan-Strich.
- Die alten abgelehnten Entwürfe `home.css`, `Sections.tsx`, `HomeSectionsStand2.tsx` nicht reaktivieren.

---

## 3. Befunde aus Claudes Analyse (Grundlage dieses Auftrags)

### Beobachtete Fehler

**F1 — Fremdbilder von hubs.com (höchste Priorität).**
Vier Fähigkeiten-Karten der Startseite laden Bilder vom Contentful-Server von Protolabs/Hubs (`images.ctfassets.net/q2hzfkp3j57e`):
- `src/data/capability-images.ts`: `cnc`, `printing`, `sheetMetal`, `injection` verweisen auf `IMG.capCnc`, `IMG.cap3dp`, `IMG.capSmf`, `IMG.capIm` aus `src/data/site.ts`.
- `src/data/site.ts` enthält über 30 solcher Verweise und den Kommentar, dass die Bilder vom Original-CDN verlinkt sind. Darunter: Kundenlogos (Intel, Audi, NASA, HP), Zertifikatsgrafiken (ISO, AS9100, Amtivo), Hubs-Fabrikfotos, Case-Study-Bilder, Weltkarte.
- `src/data/pages.json` enthält 93 weitere Verweise.
- Unterseiten: `CncMachining.tsx` (`IMG.heroCnc`, `IMG.facIn`), `ThreeDPrinting.tsx` (`IMG.hero3dp`, `IMG.interface`, `IMG.facNl`), `SheetMetal.tsx` (`IMG.heroSmf`), `InjectionMolding.tsx` (`IMG.heroIm`). Die Fabrikfotos stehen dort neben Komponia-Text, als wären es eigene Quellen. Das verstößt gegen „keine erfundenen Produktionsstandorte“.

**F2 — Seitenlänge.** Gemessen heute:
- 1280 px: **13.230 px** (vor Phase A/B/C: 11.565 px)
- 820 px: 15.244 px
- 390 px: **24.042 px**
- 320 px: 24.872 px

Zum Vergleich, heute gemessen bei 1280 px: Hadrian 3.470, igus 4.863, Bossard 6.282, Fictiv 9.057, hubs.com 9.715.

**F3 — Kapitelnavigation widerspricht dem Inhalt.** Kapitel „02 What we build“ umfasst auch das 1997-Band und „Production quantities. Agreed call-offs.“. Die Sticky-Leiste zeigt „What we build“, während man über Einkaufsvolumen liest. Ursache: Reihenfolge wurde erhalten, Kapitelmarker aber thematisch gesetzt.

### Gestalterische Befunde

**G1 — Doppelte Aussage.** „Production quantities. Agreed call-offs.“ (`#page-section-why-komponia`) und „Production-scale pricing. Deliveries that fit.“ (`#page-section-ongoing-supply`) beschreiben beide Mengenbündelung und Abrufe.

**G2 — Dreifache Schrittanzeige im Prozess.** Über den Lifecycle-Tabs stehen zusätzlich die fünf Modul-Pillen (`ProcessDiagram.tsx`) und die Zeile „01 / 05 Requirement“. Inaktive Pillen haben 28 % Deckkraft (`flow-diagrams.css`, `.kp-process-diagram__module > svg { opacity: .28 }`) und sind auf dem Handy kaum sichtbar.

**G3 — Verwaiste Verbindungslinie.** `ConnectionLine` unter der Einkaufsleiste (`Home.tsx`, `kp-graphic--connection`) erscheint als einzelne blaue Treppenlinie im Weißraum und wirkt wie ein Darstellungsfehler.

**G4 — Abschlussmodul.** In `ClosingAssembly` erscheint das blaue Engineering-Modul auf blauem Grund nur als weiße Kontur (`closing-assembly.css`: `[data-discipline='engineering'] { stroke: #fff }`). Im Banner „Future Industrial“ sind Module auf Blau weiß gefüllt.

**G5 — Das Laufband wirkt nach KI-Vorlage.** `ProcessBand.tsx` (große, laufende Begriffe „CNC milling, Sheet metal, Sensors …“ mit Pause-Knopf, eingebunden in `Home.tsx` über `kp-process-band-container`). Julian empfindet es ausdrücklich als „nach AI aussehend“. Es fügt keine Information hinzu.

**G6 — Etiketten-Stapel.** Viele Abschnitte haben Kapitelmarker („02 WHAT WE BUILD“) + Eyebrow („ENGINEERING & SERIES SUPPLY“) + H2. Drei Hierarchieebenen vor dem eigentlichen Inhalt wirken generisch und unruhig.

**G7 — Fähigkeiten-Karten zu dicht.** 8 bzw. 12 Karten mit Foto, „Schematic“-Knopf und je drei Spezifikationszeilen (Process / Application / To specify). Das Raster wirkt wie ein Datenblatt, nicht wie ein Einstieg.

**G8 — Uneinheitliche Bildsprache.** Nebeneinander: generierte Werkbankfotos, Hubs-Studiofotos, ein blauer 3D-Render (Kompressor), Menschen im Hero. Professionelle Wettbewerber halten eine durchgehende Bildsprache.

### Was gut ist und bleibt

- Materialwechsel am Kompressor.
- Explosionsansicht (stärkster neuer Moment; Callouts verständlich; manuell steuerbar).
- Netzwerkschema mit Komponia im Zentrum.
- Supply-Rhythmus (einfach und ehrlich).
- 1997-Band, Anfrage-Weiche, blauer Abschluss.
- Keine Seitenüberbreite bei 320/390/820/1280 px. Was technisch übersteht, sind bewusst horizontal scrollbare Tab- und Kapitelleisten.
- Animationscode ist sauber (Observer-Cleanup, Live-Reduced-Motion, keine Renders beim Scrollen).

---

## 4. Wettbewerbsrecherche: was professionelle Seiten anders machen

Heute im Browser angesehen: hubs.com, fictiv.com, xometry.eu, hadrian.co, bossard.com, igus.eu. Nur als Muster lesen, nichts kopieren (keine Texte, Bilder, Grafiken, Layouts).

| Seite | Höhe bei 1280 px | Was sie professionell macht | Übertragung auf Komponia |
|---|---|---|---|
| **Hadrian** (Fertigungs-Start-up gegen Großkonzerne) | 3.470 px | Sehr wenige, große Abschnitte. Kurze, selbstbewusste Sätze. Technische Blueprint-Grafik in einem Rahmen. Kleine Großbuchstaben-Labels in Monospace-Anmutung. Ruhige, enge Farbpalette. | Weniger Abschnitte, größere Gesten. Technische Zeichnung als gerahmtes Hauptmotiv statt vieler kleiner Zeichnungen. Kurze Sätze. |
| **Bossard** (Beschaffungs- und Engineering-Partner, direkt vergleichbares Modell) | 6.282 px | Leistungen in drei klaren Säulen (Produkte, Engineering, Logistik). Nutzen für Kunden in Einkäufersprache: Time to Market, schlankere Prozesse, Kosten, Qualität und Sicherheit, Designoptimierung, Gesamtkosten (TCO). | Ein Nutzenblock in Einkäufersprache statt Werbeslogans. Ohne Zahlen, ohne Versprechen, aber mit den Begriffen, die Einkäufer intern verwenden. |
| **igus** (verspielt und trotzdem Konzern) | 4.863 px | Früh „Your way to the right component“ mit zwei klaren Wegen: Standardteil finden oder Fertigung vergleichen. | Die vorhandene Anfrage-Weiche ist die stärkere Version davon. Prüfen, ob ein kompakter Verweis darauf weiter oben sinnvoll ist (nur Vorschlag, nicht ohne Freigabe verschieben). |
| **hubs.com** | 9.715 px | Fähigkeiten-Karten mit harten Fakten; Netzwerk als Karte mit Partner-Steckbriefen; zentral definierte Qualitätsstandards. | Ist bereits übernommen. Jetzt verdichten: weniger Zeilen pro Karte. |
| **Fictiv** | 9.057 px | Hero mit kurzer Häkchen-Liste und zwei CTAs; Vertrauensleiste direkt unter dem Hero. | Kein Logo-Streifen (haben wir nicht). Die Einkaufsleiste „For procurement teams“ ist unser Gegenstück. |
| **Xometry** | — | Sehr klare Dreiteilung: Kapazität, Angebot, Qualitätssicherung; „Wie bestellen Sie Teile?“ als Prozess. | Bestätigt die Kapitelidee, aber mit wenigen, klar getrennten Blöcken. |

**Die gemeinsamen Muster professioneller Industrie-Seiten:**
1. **Kürze.** 3.500 bis 10.000 px. Jeder Abschnitt hat genau eine Aufgabe.
2. **Eine Bildsprache.** Entweder Studiofotos auf neutralem Grund oder dokumentarische Werkstattfotos, nicht gemischt.
3. **Eine Label-Ebene.** Entweder kleiner Eyebrow oder Kapitelnummer, nie beides gestapelt.
4. **Bewegung ist selten und funktional.** Keine dekorativen Laufbänder. Bewegung erklärt etwas (Prozess, Aufbau) oder fehlt.
5. **Einkäufersprache.** Nutzen werden in Begriffen formuliert, die ein Einkaufsleiter intern weitergeben kann.
6. **Ruhige Typografie.** Wenige Schriftgrößen, großer Kontrast zwischen Headline und Fließtext, viel Weißraum zwischen Abschnitten, wenig innerhalb.

---

## 5. Freigegebene Änderungen (von Julian bestätigt)

### 5.1 Fremdbilder ersetzen (F1)

**Startseite (Pflicht in diesem Auftrag):**
- Vier neue Bilder per Higgsfield erzeugen für `cnc`, `printing`, `sheetMetal`, `injection`. Julian hat die Credits freigegeben.
- Stil exakt wie die vorhandenen acht generierten Fähigkeitenbilder in `src/assets/industrial/capabilities-20261017/` (vorher ansehen). Vorgaben aus `src/assets/industrial/manifest.json`: plausible Mechanik, natürliche Werkbankfotografie, kein Text, keine Logos, kein Neon, keine Glows, keine Menschen.
- Motive: ein CNC-gefrästes Aluminiumteil; ein 3D-gedrucktes Funktionsteil (z. B. Halterung aus PA12, matt grau); ein gekantetes und gelasertes Blechteil; ein spritzgegossenes Kunststoffteil mit sichtbarem Anspritzpunkt. Keine Maschinen mit Herstellerlogo.
- Ablage: `src/assets/industrial/capabilities-20261020/`. WebP, Qualität 86, max. 1600 px Breite, wie bisher.
- Herkunft, Prompts und Job-IDs dokumentieren in `project-notes/HOMEPAGE_CAPABILITY_IMAGES_2026-10-20.json` (gleiches Schema wie die vorhandenen Manifeste).
- `capability-images.ts` auf die lokalen Dateien umstellen. Danach darf die Startseite **keinen** Request mehr an `images.ctfassets.net` senden. Im Browser prüfen (Netzwerk-Tab oder `document.images`).
- Bilder vor dem Einbau ansehen. Unbrauchbare Ergebnisse (Fantasie-Text, unplausible Geometrie, Logos) verwerfen und neu erzeugen.

**Rest der Website (zweiter Schritt, im selben Auftrag, eigener Commit):**
- Alle `IMG`-Einträge in `site.ts` entfernen, die nirgends mehr verwendet werden. Insbesondere Kundenlogos und Zertifikatsgrafiken dürfen nicht im Code bleiben.
- Hubs-Fabrikfotos (`facNl`, `facIn` usw.) auf den Unterseiten entfernen. Ersatz durch vorhandene eigene illustrative Bilder oder durch eine der neuen SVG-Grafiken (z. B. Netzwerkschema). Keine Fabrikfotos generieren, die wie echte Standorte wirken.
- Hero-Bilder der vier Verfahrensunterseiten durch die neuen lokalen Bilder ersetzen.
- `pages.json` durchgehen: jeden `ctfassets`-Verweis ersetzen oder entfernen. Wenn das zu umfangreich wird, die verbleibenden Verweise vollständig auflisten (Datei, Schlüssel, Seite) und Julian fragen, statt sie stillschweigend stehen zu lassen.
- Am Ende: `grep -rn ctfassets src` liefert entweder nichts oder eine dokumentierte Restliste.

### 5.2 Zusammenlegung A — „Why Komponia“ in Supply

- Die drei Vorteilskarten aus `#page-section-why-komponia` (Shared purchasing power / Larger runs, smaller call-offs / Smarter packing, lower freight costs) werden Teil des Supply-Abschnitts `#page-section-ongoing-supply` in Kapitel 04.
- Der eigenständige Abschnitt „Production quantities. Agreed call-offs.“ entfällt als eigener Abschnitt. Überschrift und Intro des Supply-Abschnitts bleiben führend; die Karten sitzen darunter oder neben dem Supply-Rhythmus.
- Der Quellenhinweis „Transport-cost reference“ (`<details class="kp-source">`) wandert mit.
- Anker `#page-section-why-komponia` weiter erreichbar halten (z. B. als `id` am neuen Kartenblock), damit Links aus Navigation oder Footer nicht brechen. Alle internen Links auf diesen Anker prüfen.

### 5.3 Zusammenlegung B — Kapitel an Inhalt anpassen

- Das **1997-Band** (`#wts-experience`) und die **Anwendungen** (`.kp-applications`) wandern in Kapitel 05 direkt vor den blauen Abschluss.
- Reihenfolge danach:
  1. 01 Hero
  2. 02 What we build: Concept-to-Production → Capabilities → Custom Solutions (Explosionsansicht) → Component fields
  3. 03 How we work: Prozess → Einkaufsleiste → Netzwerk → Qualität
  4. 04 How we deliver: Supply (inkl. Vorteilskarten und Supply-Rhythmus) → Environment
  5. 05 Experience & inquiry: 1997-Band → Anwendungen → blauer Abschluss mit Anfrage-Weiche
- Die Sticky-Kapitelleiste muss danach an jeder Stelle der Seite das richtige Kapitel anzeigen. Bei 1280 und 390 px an mehreren Stellen prüfen.
- **Wenn Julian später das 1997-Band als frühen Vertrauensanker oben haben will:** dann als Teil von „01 Overview“ direkt nach dem Hero führen, nicht unter 02.

### 5.4 Laufband entfernen (G5)

- `ProcessBand` aus `Home.tsx` entfernen, ebenso den Container `kp-process-band-container`.
- Komponente und CSS löschen, wenn sie nirgends sonst verwendet werden.
- Kein Ersatz durch eine andere Laufbewegung. Wenn zwischen Component fields und Prozess ein Übergang fehlt, reicht der Kapitelwechsel selbst.

### 5.5 Kleine Korrekturen

- **G2 Prozess:** Nur noch eine Schrittanzeige. Die Lifecycle-Tabs bleiben die Steuerung. Die Modul-Pillen entweder entfernen oder zur dezenten Fortschrittslinie direkt in der Tableiste reduzieren. Die Zeile „01 / 05 Requirement“ entfällt. Was übrig bleibt, braucht ausreichenden Kontrast (inaktive Elemente nicht unter etwa 3:1 gegenüber dem Hintergrund, wenn sie Information tragen).
- **G3:** `ConnectionLine` unter der Einkaufsleiste entfernen.
- **G4:** Engineering-Modul im Abschluss weiß füllen, analog zum Banner „Future Industrial“.

---

## 6. Professionalisierung (Gestaltungsauftrag)

Ziel: Die Seite soll wirken wie die Website eines etablierten Industriepartners mit eigener Handschrift. Ruhiger, größer, kürzer. Die Wow-Momente (Materialwechsel, Explosionsansicht, Netzwerk, Abschluss) wirken stärker, wenn drumherum weniger los ist.

### 6.1 Längenziel

- 1280 px: **unter 10.000 px** (heute 13.230).
- 390 px: **unter 17.000 px** (heute 24.042).
- Erreichen durch Zusammenlegungen, weniger Labels, kompaktere Karten, Kürzungen von Wiederholungen. Nichts ersatzlos streichen: Was von der Startseite verschwindet, bleibt über Link auf der passenden Unterseite erreichbar.
- Vorher/Nachher-Höhen bei allen vier Breiten messen und berichten.

### 6.2 Eine Label-Ebene pro Abschnitt (G6)

- Am Kapitelanfang: nur der Kapitelmarker („02 What we build“). Der Eyebrow darunter entfällt.
- Innerhalb eines Kapitels: nur ein Eyebrow, kein Kapitelmarker.
- Eyebrows einheitlich gestalten: eine Größe, eine Laufweite, eine Farbe.

### 6.3 Fähigkeiten-Karten verdichten (G7)

- Standardansicht: Bild, Titel, **eine** Zeile Beschreibung, Pfeil.
- Spezifikationszeilen (Process / Application / To specify) und „Schematic“-Zeichnung erst bei Hover, Fokus oder Antippen, oder in einer aufklappbaren Detailzone. Inhalte nicht löschen.
- Die Erweiterung 8 → 12 → 8 bleibt.
- Kartenhöhe im Grundzustand deutlich reduzieren. Bei 390 px nicht mehr als etwa eine Bildschirmhöhe pro zwei Karten.

### 6.4 Bildsprache vereinheitlichen (G8)

- Für alle Komponenten- und Fähigkeitenbilder dieselbe Anmutung: neutraler, heller Werkbank- oder Studiohintergrund, weiches Seitenlicht, gleiche Perspektive (leicht erhöht, ca. 30°), gleicher Bildausschnitt.
- Gleiche Seitenverhältnisse und Bildbehandlung (Ecken, Rand, Hintergrundfarbe der Bildfläche) in allen Karten.
- Den blauen Kompressor-Render im Materialwechsel nicht ändern (bewusste Komponia-Darstellung).
- Hero-Bilder mit Menschen bleiben, sofern sie nicht als echte Komponia-Mitarbeiter ausgegeben werden.

### 6.5 Typografie und Abstände

- Höchstens fünf Schriftgrößen auf der Startseite (Hero-Headline, H2, H3/Kartentitel, Fließtext, Label). Bestehende Abweichungen auflösen.
- Abstand zwischen Abschnitten großzügig und einheitlich, innerhalb der Abschnitte enger. Das schafft die klaren Abschnittswechsel.
- Zeilenlänge im Fließtext auf etwa 60–75 Zeichen begrenzen.
- Einheitliche Buttons: eine Höhe, ein Radius, zwei Varianten (primär, Textlink).
- Einheitliche Karten: ein Radius, eine Randfarbe, kein Schatten oder überall derselbe.

### 6.6 Einkäufersprache (orientiert an Bossard)

- Die Vorteilskarten (nach Zusammenlegung A) und die Einkaufsleiste in Begriffen formulieren, die ein Einkaufsleiter intern weitergeben kann: Gesamtkosten, Prozessaufwand, Lieferantenanzahl, Planbarkeit, Dokumentation, Ansprechpartner.
- Keine Zahlen, Prozentsätze oder garantierten Einsparungen. Nur beschreiben, was Komponia tut, nicht was es garantiert.
- Jeder geänderte Satz muss mit den bestätigten Fakten vereinbar sein. Im Zweifel den bisherigen Text lassen.

### 6.7 Weitere KI-Anmutung reduzieren

Gezielt prüfen und beruhigen:
- Formulierungen mit dem Muster „X. Y.“ (zwei Kurzsätze als Headline) nicht in jeder Überschrift. Etwa die Hälfte darf es bleiben, der Rest wird ein normaler Satz.
- Gleiche Kartenmuster nacheinander (z. B. drei gleiche Karten, dann vier gleiche Karten) aufbrechen.
- Überflüssige Mikro-Hinweise („Steps follow the agreed scope.“, „Schematic“-Badges auf jeder Karte, „Assembly study“) auf das Nötigste reduzieren.
- Animierte Linien, die nur dekorieren, entfernen. Animation nur dort, wo sie einen Aufbau oder Ablauf erklärt.

### 6.8 Optional, nur als Vorschlag im Bericht (nicht umsetzen)

- Kompakter Verweis auf die Anfrage-Weiche direkt unter dem Hero (Muster igus „Your way to the right component“).
- Spätere echte Fotos aus der WTS-Werkstatt oder vom Lager, sobald vorhanden; sie würden mehr Vertrauen schaffen als jede generierte Aufnahme.

---

## 7. Technische Anforderungen

- Keine neue Abhängigkeit.
- Haupt-Bundle darf nicht wachsen (Stand Phase C: 612,44 kB roh / 165,13 kB gzip). Durch das Entfernen von ProcessBand und Pillen sollte es leicht sinken.
- `prefers-reduced-motion` weiterhin respektieren.
- Tastatur- und Touch-Bedienung aller Interaktionen, sichtbarer Fokus auch auf Ink und Blau.
- Keine Seitenüberbreite bei 320, 390, 820, 1280 px.
- Anfrage-Weiche und Formular (`/#/contact?entry=part-number|drawing|application`) unverändert lassen. Beim Testen keine echte Anfrage senden.
- CSS-Überschreibungen zwischen `home-experience.css`, `home-brand-expression.css`, `home-structure.css`, `home-graphics.css` beim Umbau aufräumen, nicht weiter stapeln. Tote Regeln für entfernte Elemente löschen.

---

## 8. Vorgehen

1. **Bestandsaufnahme (kurz):** Code und Seite ansehen, Befunde aus Abschnitt 3 bestätigen oder widerlegen. Wenn ein Befund nicht zutrifft, im Bericht sagen.
2. **Commit 1 — Fremdbilder Startseite:** vier neue Bilder, Manifest, `capability-images.ts`. Prüfen, dass kein `ctfassets`-Request mehr von der Startseite ausgeht.
3. **Commit 2 — Struktur:** Zusammenlegungen A und B, Laufband raus, Prozessanzeige reduziert, Verbindungslinie raus, Abschlussmodul gefüllt.
4. **Commit 3 — Professionalisierung:** Labels, Karten, Bildsprache, Typografie, Abstände, Einkäufersprache.
5. **Commit 4 — Fremdbilder Rest der Website:** `site.ts`, Unterseiten, `pages.json`.
6. **Pushen** nach jedem Commit, damit Julian auf anderen Rechnern mitverfolgen kann.

Nach jedem Commit: `npm run build`, gezieltes ESLint der geänderten Dateien, `git diff --check`, Browserprüfung.

Gezielter ESLint-Aufruf (anpassen an geänderte Dateien):
`npx eslint src/pages/Home.tsx src/components/HomeExperience.tsx src/components/home-graphics/*.tsx src/data/capability-images.ts`

Vollständiges ESLint hat bekannte, unabhängige Fehler in `components/ui`. Die Seite nicht als vollständig fehlerfrei bezeichnen.

---

## 9. Prüfung (vor dem Bericht)

- Screenshots vorher/nachher bei 320, 390, 820, 1280 px für: Hero, Capabilities, Explosionsansicht, Prozess, Supply, Abschluss. Ablegen in `project-notes/homepage-polish-2026-10-20/`.
- Seitenhöhen bei allen vier Breiten.
- Sticky-Kapitelleiste an mindestens sechs Scrollpositionen.
- Interaktionen: Hero-Tabs inkl. Pfeiltasten, Materialwechsel, 8 → 12 → 8, Fähigkeiten-Details per Hover/Fokus/Tap, Explosionsansicht (normal, schnell, zurückscrollen, manuelle Knöpfe), Component-Field-Akkordeons, Lifecycle-Tabs, Qualitätskarten, Supply-Akkordeons, drei Anfragewege.
- Konsole ohne neue Fehler.
- `document.images` und Netzwerk: keine Requests an `ctfassets.net` von der Startseite.
- Bundle-Größen vorher/nachher.

---

## 10. Abschlussbericht (Deutsch, kurz)

- Was pro Commit geändert wurde, mit Commit-Hash.
- Seitenhöhen und Bundle vorher/nachher.
- Neue Bilder mit Ablageort und Manifest.
- Verbleibende `ctfassets`-Verweise (sollte leer sein) oder begründete Restliste.
- Was bewusst nicht umgesetzt wurde und warum.
- Vorschläge aus 6.8.
- Was ungeprüft geblieben ist.
- Keine abschließende Designzustimmung unterstellen. Julian bewertet die Gestaltung selbst.
