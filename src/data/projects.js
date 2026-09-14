export const projects = [
  {
    id: 'darkenyas-crm',
    slug: 'darkenyas-crm',
    name: 'Multi-Tenant CRM Platform',
    shortDescription:
      'A multi-tenant Django CRM platform for managing leads, agents, products, stock, orders, finance, tasks, notifications and activity logs.',
    detailedDescription:
      'Darkenyas CRM uses Django and PostgreSQL with separate access for Administrators, Organization Owners and Agents.',
    screenshot: '/images/projects/crm-products-stock-dashboard.png',
    screenshotAlt: 'CRM products and stock management dashboard',
    skills: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS', 'Chart.js', 'Gmail API', 'Cloudflare R2', 'Render'],
    githubUrl: 'https://github.com/BerkAkidil9/Crm-Example',
    liveDemoUrl: 'https://darkenyas-crm.onrender.com/',
    status: 'Live demo available',
    featured: true,
    visualTheme: 'observatory',
    mainChallenge:
      'Operational CRM data needed to stay separated across organizations while supporting different permissions for administrators, organisors and agents.',
    mainSolution:
      'Implemented role-based access for administrators, organisors and agents, with organization-scoped data access and filters across leads, orders, finance, tasks, notifications and activity logs.',
    developerRole: 'Full-stack developer',
    keyFeatures: [
      'Leads, agents and organisors: CRUD and organization-scoped access; Leads: agent assignment and activity tracking; Agents/Organisors: profile workflows',
      'Products & Stock: product catalog and stock tracking; Orders: lead-linked sales; Finance: earnings, cost and profit reports',
      'Tasks: assigned follow-ups; Notifications: deadline and stock alerts; Activity Log: CRM audit trail',
      'Scheduled reminders and maintenance workflows using Django management commands',
      'Production configuration using PostgreSQL, Cloudflare R2, Gmail API and Render',
    ],
  },
  {
    id: 'swim-center',
    slug: 'swim-center',
    name: 'Swim Center',
    shortDescription:
      'A full-stack swimming facility management platform for reservations, health verification, QR check-ins, payments and multi-role dashboards.',
    detailedDescription:
      'React dashboards and an Express API coordinate Admin, Member, Doctor, Staff and Coach workflows in PostgreSQL.',
    screenshot: '/images/projects/swim-center-member-dashboard.png',
    screenshotAlt: 'Swim Center member dashboard with pools and available sessions',
    skills: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Bootstrap', 'Stripe', 'Google OAuth 2.0', 'Playwright'],
    githubUrl: 'https://github.com/BerkAkidil9/SwimmingPoolManagementSystem',
    liveDemoUrl: 'https://swimcenter.onrender.com/',
    status: 'Live demo available',
    featured: true,
    visualTheme: 'terminal',
    mainChallenge:
      'Facility operations needed separate workflows for members, administrators, doctors, staff and coaches while keeping reservations, payments and health checks connected.',
    mainSolution:
      'Built role-specific dashboards backed by shared workflows that keep reservations, payments, health reviews, QR check-ins and feedback connected across user roles.',
    developerRole: 'Full-stack developer',
    keyFeatures: [
      'Role-based dashboards for Admin, Member, Doctor, Staff and Coach users',
      'Member workflows for package purchasing, session reservations, QR check-in, transaction history and feedback',
      'Admin workflows for pool, session, user verification, feedback and email notification management',
      'Doctor workflows for health reviews, report approvals, resubmission requests and reminder emails',
      'Staff workflows for QR verification and one-time check-in codes; Coach workflows for member lists and swimming ability tracking',
      'Testing coverage using Jest, Supertest, frontend tests and Playwright E2E tests',
    ],
  },
  {
    id: 'lineupnest',
    slug: 'lineupnest',
    name: 'LineupNest — Football Squad Builder',
    shortDescription:
      'A React and TypeScript football squad builder for creating 5–11-player lineups with preset formations, free player positioning, visual customization and high-resolution PNG export.',
    detailedDescription:
      'LineupNest combines a visual pitch editor, Zustand state and undo history with English and Turkish interfaces.',
    screenshot: '/images/projects/lineupnest-football-squad-builder.png',
    screenshotFit: 'contain',
    screenshotAlt: 'LineupNest editor showing a sample Riverside XI squad in a 4-3-3 formation with substitutes',
    skills: ['React', 'TypeScript', 'Zustand', 'Vite', 'dnd-kit', 'Vitest', 'Playwright', 'Cloudflare Pages'],
    githubUrl: null,
    liveDemoUrl: 'https://lineupnest.com/',
    status: 'Live site available',
    featured: true,
    visualTheme: 'terminal',
    mainChallenge:
      'Football lineups needed to support different squad sizes, preset formations and custom player positions while keeping player management, visual settings and image export connected.',
    mainSolution:
      'Built a modular React and TypeScript interface with dnd-kit for player positioning, Zustand for shared state and undo history, and PNG export for customized squads.',
    developerRole: 'Frontend developer',
    keyFeatures: [
      'Formation workflows for 5–11-player squads with preset formations and free player positioning',
      'Player and substitute management with names, shirt numbers, captain and player-of-the-match assignment',
      'Visual customization for team details, pitches, benches, shirts, colors and user-provided images',
      'English/Turkish localization, undo history and high-resolution PNG downloads',
      'Unit, component and E2E testing with Vitest, React Testing Library and Playwright; deployment on Cloudflare Pages',
    ],
  },
  {
    id: 'excel-xml-data-integration-tool',
    slug: 'excel-xml-data-integration-tool',
    name: 'Excel/XML Data Integration Tool',
    shortDescription:
      'A Java desktop and command-line application for bidirectional invoice conversion between a predefined Excel workbook format and a versioned XML format, with validation and structured error reporting.',
    detailedDescription:
      'Originally developed during a CPF Türkiye internship, the tool now separates domain logic, file handling, validation and user interfaces.',
    screenshot: '/images/projects/excel-xml-data-integration-tool.png',
    screenshotAlt: 'Excel XML Data Integration Tool desktop application interface',
    skills: ['Java', 'Java Swing', 'Apache POI', 'JAXB', 'Maven', 'JUnit'],
    githubUrl: 'https://github.com/BerkAkidil9/excel-xml-data-integration-tool',
    liveDemoUrl: null,
    status: 'Internship project',
    featured: true,
    visualTheme: 'orbit',
    mainChallenge:
      'Invoice data needed to move consistently between fixed Excel and XML formats while detecting invalid records, missing references and inconsistent monetary totals before writing output.',
    mainSolution:
      'Built a layered Java application separating domain logic from Apache POI and JAXB file handling, with shared validation, BigDecimal calculations and conversion services used by Swing and CLI interfaces.',
    developerRole: 'Java developer',
    keyFeatures: [
      'Excel-to-XML and XML-to-Excel workflows through Swing and CLI, using Apache POI for spreadsheets and JAXB for XML',
      'XSD and business-rule validation for required fields, references, dates and currencies, with secure XML parsing',
      'Central monetary calculations using BigDecimal with defined rounding rules and invoice-total consistency checks',
      'Structured conversion errors with source details, CSV error reports and blank Excel template generation',
      'JUnit tests for calculation, validation, conversion, CLI and Swing helpers; Maven runnable-JAR packaging and GitHub Actions CI',
    ],
  },
  {
    id: 'portfolio',
    slug: 'portfolio',
    name: 'Interactive Portfolio Website',
    shortDescription:
      'A React portfolio website with animated project sections, responsive navigation, 3D space visuals and production deployment.',
    detailedDescription:
      'Reusable React sections present project data alongside Three.js visuals and Framer Motion animations.',
    screenshot: '/images/projects/interactive-portfolio-website.png',
    screenshotAlt: 'Interactive portfolio website hero section with space-themed visual design',
    skills: ['React', 'Vite', 'Three.js', 'Framer Motion', 'CSS Modules', 'Vercel'],
    githubUrl: 'https://github.com/BerkAkidil9/portfolio',
    liveDemoUrl: 'https://berkakidil.vercel.app/',
    status: 'Live site available',
    featured: true,
    visualTheme: 'observatory',
    mainChallenge:
      'The portfolio needed to communicate technical project depth while still feeling polished, responsive and easy to scan.',
    mainSolution:
      'Built a single-page React experience with reusable data-driven sections, animated project cards, 3D visual elements and accessible navigation patterns.',
    developerRole: 'Frontend developer',
    keyFeatures: [
      'Responsive single-page portfolio structure with section-based navigation',
      'Project cards driven by reusable structured data',
      '3D space scene and animated interface details using Three.js and Framer Motion',
      'Reduced-motion support and accessible navigation behavior',
      'Production deployment with Vercel analytics and speed insights',
    ],
  },
];
