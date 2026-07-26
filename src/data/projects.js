export const projects = [
  {
    id: 'darkenyas-crm',
    slug: 'darkenyas-crm',
    name: 'Darkenyas CRM',
    shortDescription:
      'A multi-tenant Django CRM platform for managing leads, agents, products, stock, orders, finance, tasks, notifications and activity logs.',
    detailedDescription:
      'Darkenyas CRM is a full-stack CRM platform built with Python, Django and PostgreSQL. It uses role-based access control and organization-level workflows for administrators, organisors and agents.',
    screenshot: null,
    screenshotAlt: '[PLACEHOLDER: Darkenyas CRM project screenshot]',
    skills: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS', 'Chart.js', 'Gmail API', 'Cloudflare R2', 'Render'],
    githubUrl: 'https://github.com/BerkAkidil9/Crm-Example',
    liveDemoUrl: 'https://darkenyas-crm.onrender.com/',
    status: 'Live demo available',
    featured: true,
    visualTheme: 'observatory',
    mainChallenge:
      'Operational CRM data needed to stay separated across organizations while supporting different permissions for administrators, organisors and agents.',
    mainSolution:
      'Implemented multi-tenant workflows with role-based access control, organization and agent filtering, automated stock operations and reporting dashboards.',
    developerRole: 'Full-stack developer',
    keyFeatures: [
      'Lead, agent and organisor management with source and value categorization',
      'Product, stock, order and finance modules with stock alerts and price history',
      'Task, notification and activity-log workflows for CRM operations',
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
      'Swim Center digitizes swimming facility operations across Admin, Member, Doctor, Staff and Coach roles using React, Node.js, Express and PostgreSQL.',
    screenshot: null,
    screenshotAlt: '[PLACEHOLDER: Swim Center project screenshot]',
    skills: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Bootstrap', 'Stripe', 'Google OAuth 2.0', 'Playwright'],
    githubUrl: 'https://github.com/BerkAkidil9/SwimmingPoolManagementSystem',
    liveDemoUrl: 'https://swimcenter.onrender.com/',
    status: 'Live demo available',
    featured: true,
    visualTheme: 'terminal',
    mainChallenge:
      'Facility operations needed separate workflows for members, administrators, doctors, staff and coaches while keeping reservations, payments and health checks connected.',
    mainSolution:
      'Built role-specific dashboards, medical eligibility review flows, package purchases, session reservations, QR check-ins and notification workflows.',
    developerRole: 'Full-stack developer',
    keyFeatures: [
      'Role-based dashboards for Admin, Member, Doctor, Staff and Coach users',
      'Package purchasing, session reservations, feedback and transaction history',
      'Medical report submission and doctor approval workflows',
      'Stripe payments, Google OAuth, email verification and password reset flows',
      'Testing coverage using Jest, Supertest, frontend tests and Playwright E2E tests',
    ],
  },
  {
    id: 'excel-xml-data-integration-tool',
    slug: 'excel-xml-data-integration-tool',
    name: 'Excel/XML Data Integration Tool',
    shortDescription:
      'A Java desktop application for bidirectional Excel and XML conversion with invoice, customer and bank information management.',
    detailedDescription:
      'Developed during CPF Türkiye internship work, this desktop tool supports structured data exchange by converting Excel files to XML and XML files back to Excel.',
    screenshot: null,
    screenshotAlt: '[PLACEHOLDER: Excel/XML Data Integration Tool screenshot]',
    skills: ['Java', 'Java Swing', 'Apache POI', 'JAXB', 'Maven'],
    githubUrl: null,
    liveDemoUrl: null,
    status: 'Internship project',
    featured: true,
    visualTheme: 'orbit',
    mainChallenge:
      'Structured Excel and XML data needed to be converted consistently for internal data exchange.',
    mainSolution:
      'Built a Java Swing desktop interface with Apache POI for spreadsheet handling and JAXB for XML serialization and deserialization.',
    developerRole: 'Software Developer Intern',
    keyFeatures: [
      'Excel-to-XML and XML-to-Excel conversion workflows',
      'Spreadsheet reading, writing and processing with Apache POI',
      'XML marshaling and unmarshaling with JAXB',
      'Desktop GUI for invoice, customer and bank information management',
      'Maven-based dependency management and project structure',
    ],
  },
];
