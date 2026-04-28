# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**MonPortfolio** — static personal portfolio site. Pure HTML, CSS, and vanilla JavaScript. No framework, no build step, no bundler, no package manager.

## Development

Open directly in a browser:
```
open index.html
```

Or serve locally (npx and python are allowed for local dev only — no client-side dependencies):
```
npx serve .
python3 -m http.server 8000
```

## Architecture

```
mon-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── data/projects.json
├── assets/images/
└── .mcp.json
```

Single `index.html` linking external CSS, JS, and fetching `data/projects.json` at runtime.

## Design principles

- **Minimal aesthetic** — no decorative animations, no gradients, no shadows unless functionally justified (e.g. a subtle box-shadow on `.project-card:hover` is allowed — purely decorative drop-shadows on static elements are not)
- Maximum 2 accent colors at any time — accent colors are `--color-accent` and one optional `--color-highlight-*`; `--color-muted` and `--color-faint` are neutral tones, not accent colors
- Dark background by default (`--color-bg: #0a0a0a`) with light mode via `[data-theme="light"]` on `<html>`
- Desktop-first layout: base styles target large screens, single breakpoint for mobile via `max-width: 600px` — do not add intermediate breakpoints
- All colors and fonts go through CSS variables defined at `:root` — never hardcode values

## Theme system

- Mode clair/sombre géré par `data-theme="light"` sur `<html>` (`document.documentElement.dataset.theme`)
- Préférence persistée dans `localStorage` avec la clé `theme`
- Icône ☀ (sombre) / ☽ (clair) dans la navigation

## Code conventions

- Code language: **English** — all variable names, function names, CSS class names, HTML `id`s, and comments must be in English
- Visible content language: **French** — all text displayed to the user (headings, paragraphs, labels, alt text) must be in French
- Use semantic HTML elements (`<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<nav>`) — no `<div>` where a semantic tag fits
- `<main>` is required and must wrap all page content between `<header>` and `<footer>`
- Always add `aria-label` to interactive elements without visible text
- Images must include a non-empty `alt` attribute; accepted formats: `webp`, `png`, `jpg`
- JavaScript: use `const`/`let` (no `var`), no ES modules (`type="module"`) — plain `<script src="...">` only

## Données projets

Les projets affichés dans la section #projects sont chargés dynamiquement depuis `data/projects.json`.
Pour ajouter ou modifier un projet, éditer uniquement ce fichier — aucune modification de `index.html` ou `js/main.js` n'est nécessaire.

## Maintenance

Après chaque ajout ou correction, exécuter automatiquement un diagnostic : relire le fichier (ambiguïtés, redondances, manques) — ne rien modifier sans instructions explicites.

## Interdictions

- PAS de frameworks CSS (Tailwind, Bootstrap) — CSS natif uniquement
- PAS de bibliothèques JavaScript externes — vanilla uniquement (jQuery, Alpine.js, GSAP, Lodash, etc. sont interdits)
- PAS de dépendances npm côté client — `npx` est toléré uniquement pour servir le projet en local
- PAS d'autres polices que Inter
- Le seul CDN externe autorisé est Google Fonts (déjà en place) — aucun autre CDN (UI libs, icon sets, etc.)
