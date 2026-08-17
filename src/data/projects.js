// Shared project data — single source for the homepage grid, /projects index,
// and /projects/[slug] detail pages.
// SOURCE OF TRUTH: Dhairya Resume.pdf + existing portfolio content.
// Descriptions are resume-sourced one-liners; nothing is invented.
// `detail: true` only for projects that pass the depth gate (real description,
// role, stack, and at least one link) — quality over number of pages.

export const projects = [
  {
    slug: 'akids-enterprise',
    name: 'Akids Enterprise',
    category: 'E-commerce Platform',
    description:
      'Built and deployed a live e-commerce website with product catalog, cart, and checkout flows, and a responsive, production-ready UI.',
    role: 'Built and deployed end-to-end (product catalog, cart, checkout flows).',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'project1',
    github: 'https://github.com/dhairya-shah13/Akids-Enterpise',
    live: 'https://www.akidsenterprise.com/',
    detail: true,
    relatedSlugs: ['fintrack'],
  },
  {
    slug: 'meghdoot-motors',
    name: 'Meghdoot Motors',
    category: 'Maruti Suzuki Authorized Service Center',
    description:
      'Developed and deployed the official website for a Maruti Suzuki authorized service center, with a clean, mobile-friendly UI for service info and inquiries.',
    role: 'Developed and deployed the official service-center website.',
    tags: ['React', 'HTML', 'CSS', 'JavaScript'],
    image: 'project2',
    github: 'https://github.com/dhairya-shah13/Meghdoot',
    live: 'https://meghdootmotors.netlify.app/',
    detail: true,
    relatedSlugs: [],
  },
  {
    slug: 'fintrack',
    name: 'Fintrack',
    category: 'Personal Finance Management App',
    description:
      'Built a web and mobile finance tracking app for logging transactions, monitoring spending, and generating downloadable financial reports, with data sync across platforms.',
    role: 'Built the web and mobile finance tracking app.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Kotlin'],
    image: 'project3',
    github: 'https://github.com/dhairya-shah13/FinTrack',
    live: null,
    detail: true,
    relatedSlugs: ['akids-enterprise'],
  },
  {
    slug: 'aarisha',
    name: 'Aarisha',
    category: 'Collaborative Web Platform',
    description:
      'Collaborated on the build and deployment of a live web platform, contributing to feature development alongside a fellow developer.',
    role: 'Collaborated on feature development and deployment alongside a fellow developer.',
    tags: ['Team Build'],
    image: 'project4',
    github: 'https://github.com/vishuchavda78/Aarisha',
    live: 'https://aarisha.vercel.app/',
    detail: false, // Thin first-party content — stays on the index with external links.
    relatedSlugs: [],
  },
  {
    slug: 'shrinath',
    name: 'Shrinath',
    category: 'Sales Monitoring System',
    description:
      'Built a sales monitoring system for tracking transactions and performance metrics, designed for small-business sales tracking workflows.',
    role: 'Built the sales monitoring and reporting system.',
    tags: ['Small-Business Sales Tracking'],
    image: 'project5',
    github: 'https://github.com/dhairya-shah13/Shrinath-SalesMonitoring',
    live: null,
    detail: true,
    relatedSlugs: [],
  },
  {
    slug: 'hrms',
    name: 'HRMS',
    category: 'HR Management System (Odoo Hackathon)',
    description:
      'Collaborated with a team to design and build an HR Management System for the Odoo Hackathon, contributing to both front-end interfaces and back-end APIs under time constraints.',
    role: 'Team collaboration — front-end interfaces and back-end APIs.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'project6',
    github: null, // Code private
    live: null,
    detail: false, // No public links and thin first-party content — stays on the index.
    relatedSlugs: [],
  },
];

export const detailProjects = projects.filter((p) => p.detail);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
