# AGENTS.md — Komponia Website

## Aktueller Arbeitsstand

Dies ist das aktive Repository `komponia-website-v1-initial`, nicht die ältere statische Referenz `Komponia_Website_final`.
Next.js 16 App Router, TypeScript, Tailwind CSS 3, shadcn/ui. Englischsprachige Website; Kommunikation auf Deutsch.

- Vor Änderungen Git-Status und Remote-Stand prüfen; keine fremden Änderungen überschreiben. Keine automatischen Resets oder Force-Pushes.
- Nach abgeschlossener Arbeit gezielt Dateien stagen, committen und pushen; kein pauschales `git add -A`. Identität: `juliankomponia <325582059+juliankomponia@users.noreply.github.com>`.
- Kein Deployment ohne Auftrag. `noindex` und lokale Entwurfsvorbereitung des Kontaktformulars beibehalten.
- Aktive Startseite: `src/components/home/KomponiaHome.tsx` und `home-design.css`. Gemeinsamer Rahmen: `SiteHeader.tsx`, `SiteFooter.tsx`.
- Unterseiten: `src/views/`, Routing in `src/app/[...slug]/page.tsx` und `src/lib/routes.ts`. `src/views/Home.tsx` ist historisch.
- Unterseiten-CSS wird beim Start/Build nach `.legacy-pages` gekapselt. Änderungen an Quell-CSS vor visueller Prüfung durch `node scripts/build-legacy-styles.mjs` übernehmen.
- Bestehende Inhalte, Originalwortmarken, Bilder und Herkunftsnotizen erhalten. Keine erfundenen Referenzen, Kennzahlen oder Zertifizierungen. Illustrative Bilder nicht als tatsächliche Komponia-Produkte oder eigene Betriebsräume ausgeben.
- Marke: Sora lokal; Blau `#3E5AF5`, Hover `#2A44D8`, Ink `#1F1F1D`, Lavender `#D4B9F3`, Gelb `#F7D44B`. Originalmarken verwenden. WTS-Erfahrung seit 1997 nicht als Gründungsdatum von Komponia formulieren.
- Vor Designänderungen `.agents/skills/kill-ai-slop/SKILL.md` und den Entwurfsauftrag `project-notes/NEXT_HOMEPAGE_DESIGN_BRIEF_2026-10-17.txt` lesen. Scannerfunde sind Prüfkandidaten, keine automatisch bestätigten Fehler.
- Prüfungen: `npm run typecheck`, `npm run lint`, `npm run build`, `npm run verify:export`; relevante Interaktionen und responsive Darstellung im Browser prüfen.
- Lokal: `npm run dev -- --hostname 127.0.0.1 --port 3000`. Export-Vorschau: `npm run preview` (Port 3001).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
