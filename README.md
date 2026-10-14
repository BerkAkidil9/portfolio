# Berk Akidil Portfolio

A personal software engineering portfolio built with React, JavaScript, Vite
and Three.js. It presents featured projects, skills, background, experience,
contact links and a space-themed visual experience.

Live site: [berkakidil.vercel.app](https://berkakidil.vercel.app/)

## Features

- Single-page sections for Home, Projects, Skills, About, Experience and Contact.
- Responsive navigation with a mobile menu and Escape-key dismissal.
- Data-driven project cards with screenshot previews, repository links and live demos.
- Three.js space visuals, Framer Motion animations and video backgrounds.
- Reduced-motion support and a visual fallback when WebGL is unavailable.
- Dismissible launch intro that remembers dismissal within the browser session in production builds.
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
| CI | GitHub Actions with native self-hosted Mac ARM64 runners |
| Hosting | Vercel |

## Getting Started

Use Node.js 24 and npm to match the GitHub Actions environment. Install the
versions recorded in `package-lock.json`:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

To run behavior tests, install Playwright's Chromium browser once after
installing dependencies, and again when the Playwright browser version changes:

```bash
npm exec -- playwright install chromium
```

No `.env` file, backend service or database setup is required for this static site.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Serve an existing production build locally. |
| `npm run lint` | Check JavaScript and JSX, including the test configuration. |
| `npm run dependency:audit` | Audit all dependencies, including development dependencies; fail for low severity or higher. |
| `npm run ci:quality` | Run audit, lint and build in sequence. |
| `npm run test:e2e` | Build the site and run the Playwright behavior tests. |
| `npm run ci:local` | Run audit, lint, build and behavior tests together. |

## Continuous Integration

Run the security audit, lint, production build and browser behavior tests
together without Docker:

```bash
npm ci --no-audit --no-fund
npm exec -- playwright install chromium
npm run ci:local
```

[`CI (native)`](.github/workflows/ci.yml) runs on two self-hosted Mac ARM64 runners
labeled `portfolio-ci`, using Node.js 24 without Docker:

1. One runner installs locked dependencies and runs audit, lint and build.
2. If those checks pass, two browser jobs split the test suite into two shards.
3. Each runner processes one shard with **two Playwright test workers**, for
   **up to four concurrent test workers** across the two runners.

Runner count controls the number of simultaneous CI jobs. Test-worker count
controls parallel tests inside each browser job. A manual `npm run ci:local`
uses two test workers in one process; it does not dispatch work to both runners.

| Runner | Label | Preview port |
| --- | --- | --- |
| `portfolio-ci-1` | `portfolio-ci` | 4281 |
| `portfolio-ci-2` | `portfolio-ci` | 4282 |

Ports are assigned by runner name to prevent collisions when jobs share the Mac.
Each runner has a separate checkout and npm cache. Both quality and browser jobs
have a 15-minute timeout. Failure reports stay in each runner's job checkout
until the next checkout cleans it; the workflow does not upload test artifacts.

The workflow starts for pushes to `main`, pull requests targeting `main`, and manual
runs. Only events triggered by the repository owner are eligible, and pull
requests from forks are skipped. Checkout credentials are not retained, the
GitHub token has read-only repository permissions, and actions are pinned to
commit hashes. [`actionlint.yaml`](.github/actionlint.yaml) declares the custom
runner label for workflow validation.

The runners are installed in `~/.github-runners/portfolio-ci-1` and
`~/.github-runners/portfolio-ci-2` on the owner's Mac and run as macOS LaunchAgents.
The Mac must be awake, online and running both services to use all four test
workers. GitHub displays the run status and logs; checks and tests execute
locally on the Mac. Vercel handles deployment separately.

To check each runner service:

```bash
cd ~/.github-runners/portfolio-ci-1
./svc.sh status
cd ~/.github-runners/portfolio-ci-2
./svc.sh status
```

Commit and push workflow changes to apply them on GitHub.

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

Every browser test also checks for uncaught JavaScript errors. External project
and repository destinations are intercepted to validate outgoing navigation
without depending on third-party uptime. The suite focuses on browser behavior;
unit tests, screenshot comparison baselines, and Firefox/WebKit runs are not configured.

Run only the browser tests (including a fresh production build):

```bash
npm run test:e2e
```

Local runs use **two test workers** and preview port **4280**. Playwright starts
and stops its preview server automatically and requires that port to be free.
Most tests use reduced motion for consistent interactions; intro tests use normal
motion. Tests have no automatic retries, so failures remain visible.

Failure screenshots and traces are saved in `test-results/`, with an HTML report
in `playwright-report/`. Both directories are ignored by Git. On the runners
these files remain in the job checkout until the next checkout cleans it.

```bash
npm exec -- playwright show-report
```

## Environment Variables

Application content and links are defined in source files, so an `.env` file is
not needed. The launch intro reads Vite's built-in `import.meta.env.DEV` flag.
Test and CI settings are supplied by the process or workflow:

| Variable | Purpose | Default or source |
| --- | --- | --- |
| `CI` | Reject focused Playwright tests (`test.only`) in CI. | Set to `true` by the workflow. |
| `CI_PREVIEW_PORT` | Port for the Playwright preview server. | 4280 locally; 4281 or 4282 in CI. |
| `npm_config_cache` | Location of the runner's npm cache. | `$RUNNER_TEMP/portfolio-npm-cache` in CI. |
| `RUNNER_NAME`, `RUNNER_TEMP`, `GITHUB_ENV` | Runner identity and workflow configuration paths. | Supplied by GitHub Actions. |

The workflow needs no project-specific API keys or repository secrets.

## Dependency Maintenance

Use `npm run dependency:audit` to identify known vulnerabilities before changing
dependencies. Prefer targeted security updates within compatible version ranges,
review the `package.json` and `package-lock.json` changes, and run
`npm run ci:local` after updating. Commit the lockfile with dependency changes
so local and CI installations use the same versions.

Audit results depend on the current advisory database. Review non-security fixes
and major upgrades separately when the project needs them.

## Project Structure and Content

| Path | Responsibility |
| --- | --- |
| `src/data/portfolio.js` | Profile copy, section links, contact details and resume URL. |
| `src/data/projects.js` | Featured project descriptions, screenshots, skills and outgoing links. |
| `src/data/skills.js`, `src/data/journey.js`, `src/data/socialLinks.js` | Skills, experience and social links. |
| `src/components/` | Navigation, layout, page sections and reusable UI. |
| `src/experience/` | Three.js scene and reduced-motion/WebGL fallback. |
| `src/styles/` | Shared tokens, resets and global styles. |
| `public/` | Project images, videos, icons, Open Graph image and PDF resume. |
| `e2e/`, `playwright.config.js` | Browser behavior tests and execution settings. |
| `.github/workflows/ci.yml` | Quality checks and two browser test shards. |
| `index.html` | Page title, description, canonical URL and social metadata. |

Edit portfolio copy and project entries in `src/data/`. Keep screenshot and resume
URLs aligned with the corresponding files in `public/`. Public asset URLs start
at `/`, without the `public/` directory name. SEO metadata is declared in
`index.html`; keep the matching SEO values in `src/data/portfolio.js` synchronized
when changing the site URL or descriptions.

## Deployment

This is a static Vite application hosted on Vercel from `main`. Vercel's Git
integration handles deployment independently of the CI workflow.

Production URL:

```text
https://berkakidil.vercel.app/
```

Build command: `npm run build`. Output directory: `dist/`. No application
environment variables are required for the current build.

The generated files can also be served by another static host. The current
configuration and public asset URLs assume hosting at the domain root. Deployment
under a subpath requires updating the Vite base configuration and reviewing asset
URLs and site metadata.

## License

This project is open source under the MIT License. See [LICENSE](LICENSE).
