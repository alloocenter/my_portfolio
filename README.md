# Portfolio — Tiemoko Sissoko

Portfolio bilingue (FR / EN) conçu dans une direction éditoriale **« Grand Livre / Swiss Ledger »** avec **Astro 5**, CSS modulaire sans framework, **GSAP 3 + ScrollTrigger** et **Lenis**.

## Démarrage local

```bash
npm install
npm run dev       # http://localhost:4321  (EN : /en/)
```

> **Note Node.js :** le projet utilise Astro 5.18.2 pour rester compatible avec Node 20. Ne lance pas `npx @astrojs/upgrade` vers Astro 7 tant que Node n'est pas en v22+.

## Scripts disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run check` | Vérifie les types TypeScript et les templates Astro |
| `npm run build` | Génère le site statique optimisé dans `dist/` |
| `npm run preview` | Prévisualise le build de production en local |
| `npm run og` | Régénère les favicons PNG et les images Open Graph (`og-fr.png`, `og-en.png`) |

## Structure du projet

```text
├── public/
│   ├── cv/                     # CV public nettoyé (2 pages, sans lettre ni numéros de référents)
│   ├── favicon.svg / *.png     # Favicons & cartes Open Graph éditoriales
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   └── generate-og.mjs         # Génération des visuels OG & favicons PNG
├── src/
│   ├── assets/images/          # Portrait optimisé automatiquement en AVIF/WebP au build
│   ├── components/             # Header, Hero, About, Work, ProjectVisual, Skills, Career, Contact, Footer
│   ├── data/                   # Contenu typé FR/EN (profile, about, projects, skills, experience, education)
│   ├── i18n/ui.ts              # Libellés FR/EN
│   ├── layouts/Base.astro      # SEO, hreflang, OG, JSON-LD Person, polices, anti-FOUC thème
│   ├── pages/                  # / (FR), /en/ (EN), /404
│   ├── scripts/                # theme.ts, cursor.ts, motion.ts, nav.ts, interactions.ts, main.ts
│   └── styles/                 # tokens.css, reset.css, base.css
├── astro.config.mjs            # Configuration Astro, i18n & sitemap
├── vercel.json / netlify.toml  # En-têtes sécurité & cache long terme
└── .github/workflows/deploy.yml
```

## Mettre à jour le contenu

Tout le contenu vit dans `src/data/` :
- **Identité, déclaration, liens, CV** : `src/data/profile.ts`
- **Citation, récit & repères** : `src/data/about.ts`
- **Planche phare & index projets** : `src/data/projects.ts`
- **Atelier technique** : `src/data/skills.ts`
- **Expériences** : `src/data/experience.ts`
- **Diplômes, certifications & langues** : `src/data/education.ts`

## Déploiement

- **Vercel (recommandé)** : importe le dépôt sur [vercel.com/new](https://vercel.com/new) (`vercel.json` est déjà configuré).
- **Netlify** : importe le dépôt sur [app.netlify.com](https://app.netlify.com) (`netlify.toml` configure le build et les en-têtes).
- **GitHub Pages** : active **Settings → Pages → GitHub Actions** ; `.github/workflows/deploy.yml` vérifie, compile et déploie sur push `main`.

> Avant la mise en ligne définitive, remplace `SITE_URL` dans `astro.config.mjs` et l'URL du sitemap dans `public/robots.txt` par ton domaine final, puis supprime `_legacy/`.
