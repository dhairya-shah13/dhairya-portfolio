// Shared content data for the homepage sections and the /about page.
// SOURCE OF TRUTH: Dhairya Resume.pdf + existing portfolio content.

export const skillsData = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'Kotlin', 'JavaScript', 'C', 'C++'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'RESTful APIs'],
  },
  {
    category: 'Frontend Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CSS Modules'],
  },
  {
    category: 'Databases',
    items: ['SQL', 'MongoDB', 'Schema Design', 'Query Optimization'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Docker', 'CI/CD (GitHub Actions)', 'Linux/Shell Scripting', 'Git / GitHub', 'Hostinger VPS'],
  },
];

export const experienceData = {
  role: 'Software Development Engineer & Project Lead',
  company: 'Vassu Infotech',
  period: 'May 2026 – Jul 2026',
  orgSize: '~30 Employees',
  summary:
    'A hardware manufacturer expanding operations into custom software and IT services. Led cross-functional teams to design, build, and deploy production software.',
  bullets: [
    'Led two concurrent development teams, taking both software products from concept to production use company-wide.',
    'Led development & deployment of VassuERP, a full-scale enterprise resource planning system (Django, Flask, SQL, MongoDB).',
    'Led development & deployment of StockFlow, an inventory management system with dedicated stock inflow/outflow modules.',
    'Containerized application services using Docker, set up automated CI/CD pipelines, and wrote Linux shell scripts for VPS provisioning (Hostinger).',
    'Managed source control and collaborative team workflows via Git/GitHub across both engineering teams.',
  ],
};

export const educationData = [
  {
    period: 'Ongoing',
    detail: 'B.Tech, Information Technology',
    institution: 'Charotar University of Science and Technology (CHARUSAT)',
    note: '5th Semester · CGPA 7.5/10',
  },
  {
    period: '—',
    detail: 'Higher Secondary Certificate (Class XII)',
    institution: 'Seventh Day Adventist Higher Secondary School',
    note: '94%',
  },
  {
    period: '—',
    detail: 'Secondary School Certificate (Class X)',
    institution: 'Divine Gurukulam',
    note: '92%',
  },
];

export const certificationsData = [
  {
    name: 'Microsoft Azure AI Fundamentals (AI-900) Exam Prep',
    link: 'https://drive.google.com/file/d/1Gie3IFLzNG0VFVr5YIQ-7u_HkH3bo7uO/view?usp=drive_link',
  },
  {
    name: 'Core Java Certificate',
    link: 'https://drive.google.com/file/d/1dNBnz-2SglwnQynxwL-NpWjcND2GEGt1/view?usp=drive_link',
  },
  {
    name: 'Advanced SQLite Queries with Belkasoft',
    link: 'https://drive.google.com/file/d/18x-Om5JWlMEEG1x_fNP3Vrcd_nFHdSfK/view?usp=drive_link',
  },
];

export const achievementsData = [
  {
    title: "Winner — Coder's Arcade",
    description:
      'First place in the competitive coding event testing algorithms, data structures, and problem-solving speed.',
    link: 'https://drive.google.com/file/d/1RKbojVUY9XMGcVzAysu-Oxscl_6k_2Ag/view?usp=drive_link',
  },
  {
    title: 'Equal Opportunity Cell — Poster Making Event',
    description:
      'Awarded recognition for creative graphic design and messaging promoting equality and accessibility.',
    link: 'https://drive.google.com/file/d/1ZQU-2qtGBc-KI9nF12QQkcs7xpLcL6h6/view?usp=drive_link',
  },
];

export const focusAreasData = [
  {
    id: '01',
    title: 'Full-Stack Development',
    description:
      'MERN & Django/Flask, coordinating API contracts between React/Node front ends and Python back ends.',
  },
  {
    id: '02',
    title: 'Cloud & DevOps',
    description:
      'Docker containerization, GitHub Actions CI/CD, Linux shell scripting, Hostinger VPS provisioning.',
  },
  {
    id: '03',
    title: 'Team & Project Leadership',
    description:
      'Led two concurrent engineering teams at Vassu Infotech, taking both products to company-wide production use.',
  },
  {
    id: '04',
    title: 'Database Design',
    description: 'SQL and MongoDB schema design across ERP, inventory, and finance-tracking systems.',
  },
];

export const statsData = [
  {
    value: '6',
    label: 'Live products shipped end-to-end',
  },
  {
    value: '2',
    label: 'Engineering teams led simultaneously',
  },
  {
    value: '30',
    label: 'Person organization served company-wide',
  },
  {
    value: '6+',
    label: 'Languages across the stack',
  },
];
