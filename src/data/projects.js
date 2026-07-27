export const projects = [
  {
    id: 'darkenyas-crm',
    slug: 'darkenyas-crm',
    name: 'Multi-Tenant CRM Platform',
    shortDescription:
      'A multi-tenant Django CRM platform for managing leads, agents, products, stock, orders, finance, tasks, notifications and activity logs.',
    detailedDescription:
      'Darkenyas CRM is a full-stack CRM platform built with Python, Django and PostgreSQL. It uses role-based access control and organization-level workflows for administrators, organisors and agents.',
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
      'Swim Center digitizes swimming facility operations across Admin, Member, Doctor, Staff and Coach roles using React, Node.js, Express and PostgreSQL.',
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
    id: 'excel-xml-data-integration-tool',
    slug: 'excel-xml-data-integration-tool',
    name: 'Excel/XML Data Integration Tool',
    shortDescription:
      'A Java desktop application for bidirectional Excel and XML conversion with invoice, customer and bank information management.',
    detailedDescription:
      'Developed during CPF Türkiye internship work, this desktop tool supports structured data exchange by converting Excel files to XML and XML files back to Excel.',
    screenshot: null,
    screenshotAlt: 'Project screenshot coming soon',
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
    developerRole: 'Full-stack developer',
    keyFeatures: [
      'Excel-to-XML and XML-to-Excel conversion workflows',
      'Spreadsheet reading, writing and processing with Apache POI',
      'XML marshaling and unmarshaling with JAXB',
      'Desktop GUI for invoice, customer and bank information management',
      'Maven-based dependency management and project structure',
    ],
  },
];
