# Berk Akidil Portfolio

A personal software engineering portfolio built with React, JavaScript, Vite
and Three.js. It presents featured projects, skills, background, experience,
contact links and a space-themed visual experience.

Live site: [berkakidil.vercel.app](https://berkakidil.vercel.app/)

![Portfolio launch intro preview](public/images/projects/interactive-portfolio-website.png)

This repository contains the portfolio frontend. Reusable React sections and
separate content files make it possible to update project information and profile
copy while keeping the presentation consistent.

## Features

- Single-page sections for Home, Projects, Skills, About, Experience and Contact.
- Responsive navigation with a mobile menu and Escape-key dismissal.
- Data-driven project cards with screenshot previews, repository links and live demos.
- Three.js space visuals, Framer Motion animations and video backgrounds.
- Reduced-motion support and a visual fallback when WebGL is unavailable.
- Launch intro with button and Escape-key dismissal, remembered for the browser session in production.
- Email, GitHub, LinkedIn and PDF resume links.
- Vercel Analytics and Speed Insights integration.

## Tech Stack

| Area | Tools |
| --- | --- |
| Application | React 18, JavaScript, Vite |
| Visuals | Three.js, React Three Fiber, Drei, Framer Motion |
| Styles | CSS Modules and shared CSS tokens |
| Quality checks | ESLint and npm audit |
| Behavior tests | Playwright with desktop and mobile Chromium |
| Hosting | Vercel |

## Getting Started

Prerequisites: Git, Node.js and npm. Node.js 24 is recommended.

```bash
git clone https://github.com/BerkAkidil9/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm ci` installs the versions recorded in
`package-lock.json`.

The current application requires no `.env` file, backend service or database.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Serve `dist/` locally after running `npm run build`. |
| `npm run lint` | Check JavaScript and JSX, including the test configuration. |
| `npm run dependency:audit` | Audit all dependencies, including development dependencies; fail for low severity or higher. |
| `npm run test:e2e` | Build the site and run the Playwright behavior tests. |

## Behavior Tests

The tests in [`e2e/`](e2e/) run against the production build in desktop Chromium
and mobile Chromium with Pixel 7 emulation. They cover:

- Navigation to each section, hero action links and returning home.
- Opening the mobile menu, selecting links, closing with Escape and restoring scrolling.
- Loading project screenshots and opening and closing screenshot previews.
- Opening project and source-code links in a separate tab.
- Serving the linked resume as an actual PDF.
- Using the site with reduced motion enabled.
- Dismissing the launch intro with its button or Escape, and remembering dismissal on reload.

Every browser test also checks for uncaught JavaScript errors. External links
under test are intercepted to validate outgoing navigation without depending on
third-party uptime.

Install Chromium before the first test run and after updating Playwright:

```bash
npm exec -- playwright install chromium
```

Run the behavior tests, including a fresh production build:

```bash
npm run test:e2e
```

Playwright starts and stops its preview server automatically on port **4280**.
Keep that port free when running the tests.

Failure screenshots and traces are saved in `test-results/`, with an HTML report
in `playwright-report/`. Both directories are ignored by Git.

```bash
npm exec -- playwright show-report
```

## Dependency Maintenance

Use `npm run dependency:audit` to identify known vulnerabilities before changing
dependencies. Prefer targeted security updates within compatible version ranges,
review the `package.json` and `package-lock.json` changes, and run
`npm run lint` and `npm run test:e2e` after updating. Commit the lockfile with
dependency changes to keep installations reproducible.

Review non-security fixes and major upgrades separately when the project needs them.

## Project Structure and Content

| Path | Responsibility |
| --- | --- |
| `src/data/portfolio.js` | Profile copy, section links, contact details, resume URL and SEO values. |
| `src/data/projects.js` | Featured project descriptions, screenshots, skills and outgoing links. |
| `src/data/skills.js`, `src/data/journey.js`, `src/data/socialLinks.js` | Skills, experience and social links. |
| `src/components/` | Navigation, layout, page sections and reusable UI. |
| `src/experience/` | Three.js scene and reduced-motion/WebGL fallback. |
| `src/styles/` | Shared tokens, resets and global styles. |
| `public/` | Project images, videos, icons, Open Graph image and PDF resume. |
| `e2e/`, `playwright.config.js` | Browser behavior tests and execution settings. |
| `index.html` | Initial page title, description, canonical URL and social metadata. |

Edit portfolio copy and project entries in `src/data/`. Keep screenshot and resume
URLs aligned with the corresponding files in `public/`. Public asset URLs start
at `/`, without the `public/` directory name.

`src/main.jsx` applies the `seo` values from `src/data/portfolio.js` when the app
loads. Keep the corresponding tags in `index.html` aligned so the initial HTML
also contains the correct metadata.

## Deployment

This is a static Vite application hosted on Vercel from `main` through Vercel's
Git integration.

Build and inspect the production site locally:

```bash
npm run build
npm run preview
```

For static hosting, use `npm run build` as the build command and `dist/` as the
output directory.

The generated files can also be served by another static host. The current
configuration and public asset URLs assume hosting at the domain root. Deployment
under a subpath requires updating the Vite base configuration and reviewing asset
URLs and site metadata.

## Help and Contributions

Maintained by [Berk Akidil](https://github.com/BerkAkidil9).

For bugs or suggestions, [open an issue](https://github.com/BerkAkidil9/portfolio/issues)
with reproduction steps and the browser/device used. Code and documentation fixes
can be submitted through pull requests. Run `npm run lint` and `npm run test:e2e`
before submitting code changes.

## License

This project is open source under the MIT License. See [LICENSE](LICENSE).
