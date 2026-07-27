export const journeyIntro = {
  eyebrow: 'Experience',
  title: 'Professional Experience and Education',
  description:
    'Verified experience includes two Software Developer Intern periods at CPF Türkiye and a Computer Science education background from Özyeğin University.',
};

export const journeyGroups = [
  {
    id: 'professional-experience',
    title: 'Professional Experience',
    description:
      'Internship experience focused on full-stack CRM development, data integration and business workflow tooling.',
    items: [
      {
        id: 'cpf-turkiye-software-developer-intern-crm',
        period: 'Jul 2024 - Aug 2024',
        title: 'Software Developer Intern',
        organization: 'CPF Türkiye · Istanbul, Turkey · On-site',
        description:
          'Developed a CRM application with Django and PostgreSQL, covering lead and agent management, role-based access control, sales dashboards, product and stock operations, order workflows, task management, notifications, scheduled reminders and Django tests.',
        type: 'Professional Experience',
      },
      {
        id: 'cpf-turkiye-software-developer-intern-data-integration',
        period: 'Mar 2024 - Apr 2024',
        title: 'Software Developer Intern',
        organization: 'CPF Türkiye · Istanbul, Turkey · On-site',
        description:
          'Developed a Java desktop application for Excel-to-XML and XML-to-Excel conversion using Maven, Apache POI, JAXB and Java Swing for invoice, customer and bank information workflows.',
        type: 'Professional Experience',
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    description: '',
    items: [
      {
        id: 'ozyegin-university-computer-science',
        title: 'Computer Science Graduate',
        organization: 'Özyeğin University',
        description:
          'Computer Science graduate background supporting full-stack software development, backend architecture, relational databases and secure application design.',
        type: 'Education',
      },
    ],
  },
];
