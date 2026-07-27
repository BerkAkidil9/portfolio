# Berk Akidil Portfolio

A personal web developer portfolio built with React, Vite and Three.js. The site presents Berk Akidil's featured projects, technology stack, background, contact links and a cinematic space-inspired visual experience.

## Tech Stack

- React
- JavaScript
- Vite
- Three.js
- React Three Fiber
- Drei
- CSS Modules
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

- `src/data/` contains editable portfolio content such as projects, skills, social links and profile copy.
- `src/components/` contains the React UI components and section layouts.
- `src/experience/` contains the Three.js / React Three Fiber scene.
- `src/styles/` contains reset, global styles and design tokens.
- `public/` contains static assets used by the deployed site.

## Deployment

This is a static Vite application. It can be deployed to GitHub Pages, Vercel, Netlify, Render Static Sites or any static hosting provider.

For most providers, use:

```bash
npm run build
```

and deploy the generated `dist/` directory.

If the site is deployed under a subpath, update the Vite base configuration before building.

## Content Notes

Portfolio content is centralized in `src/data/` so profile text, links, project entries and technology lists can be updated without rewriting presentation components.

The contact form backend is not configured in this frontend-only version.

## License

This project is open source under the MIT License. See `LICENSE` for details.
