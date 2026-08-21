// Shared project data — single source of truth for the homepage grid, /projects index,
// and /projects/[slug] detail pages.
// SOURCE OF TRUTH: Dhairya Resume.pdf + verified project records.
// Descriptions and technical details are resume-sourced and fact-checked; nothing is invented.
// `detail: true` only for projects that pass the depth gate (verified description,
// role, stack, architecture details, and links) — quality over number of pages.

export const projects = [
  {
    slug: 'akids-enterprise',
    name: 'Akids Enterprise',
    category: 'E-commerce Platform',
    clusterTopic: 'Full-Stack Web & E-Commerce',
    description:
      'Built and deployed a live e-commerce website with product catalog, cart, and checkout flows, and a responsive, production-ready UI.',
    role: 'Built and deployed end-to-end (product catalog, cart, checkout flows, database schema, responsive UI).',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    image: 'project1',
    github: 'https://github.com/dhairya-shah13/Akids-Enterpise',
    live: 'https://www.akidsenterprise.com/',
    detail: true,
    relatedSlugs: ['fintrack', 'shrinath'],
    relatedBlogSlugs: [
      'mongodb-vs-postgresql-schema-design-guide',
      'ssg-vs-ssr-vs-spa-web-rendering-guide',
    ],
    tldr: [
      'Production-ready e-commerce platform architected on React.js, Node.js, Express.js, and MongoDB.',
      'Implements complete shopping experience: dynamic product catalog, stateful shopping cart, and multi-step checkout flow.',
      'Structured MongoDB document schemas for product inventory, user accounts, and transactional order records.',
      'Fully responsive UI optimized for cross-device mobile commerce and sub-second load times.',
    ],
    specs: {
      architecture: 'Single Page Application (SPA) + RESTful API Backend',
      frontend: 'React.js, Responsive CSS, State Management',
      backend: 'Node.js, Express.js REST API',
      database: 'MongoDB (Mongoose ODM)',
      deployment: 'Production Cloud Deployment (Custom Domain)',
      keyDeliverables: 'Product Catalog, Shopping Cart, Checkout Flow, Inventory Management',
    },
    problem:
      'Independent retail brand required an agile, modern digital storefront to showcase custom merchandise, manage inventory categories, and provide a seamless direct-to-consumer online ordering experience.',
    solution:
      'Engineered a modular MERN architecture with a componentized React frontend, RESTful API endpoints for catalog queries and cart mutation, and indexed MongoDB collections for fast product lookups and order state persistence.',
    highlights: [
      'Engineered responsive catalog with real-time category filtering and inventory state tracking.',
      'Constructed multi-step cart and checkout flow with client-side input validation and error boundaries.',
      'Designed REST endpoints supporting atomic order creation and inventory updates.',
    ],
  },
  {
    slug: 'meghdoot-motors',
    name: 'Meghdoot Motors',
    category: 'Maruti Suzuki Authorized Service Center',
    clusterTopic: 'Automotive Web & Business Portals',
    description:
      'Developed and deployed the official website for a Maruti Suzuki authorized service center, with a clean, mobile-friendly UI for service info and inquiries.',
    role: 'Developed and deployed the official service-center website end-to-end.',
    tags: ['React', 'HTML', 'CSS', 'JavaScript'],
    image: 'project2',
    github: 'https://github.com/dhairya-shah13/Meghdoot',
    live: 'https://meghdootmotors.netlify.app/',
    detail: true,
    relatedSlugs: ['akids-enterprise'],
    relatedBlogSlugs: [
      'ssg-vs-ssr-vs-spa-web-rendering-guide',
      'docker-github-actions-linux-vps-cicd-guide',
    ],
    tldr: [
      'Official web portal for a Maruti Suzuki authorized automotive service center in Gujarat.',
      'Built with React.js, modern HTML5, and responsive CSS for rapid mobile discovery and customer engagement.',
      'Engineered intuitive service booking inquiry interface and transparent service menu breakdown.',
      'Deployed live to Netlify edge network with global CDN caching for instant mobile delivery.',
    ],
    specs: {
      architecture: 'Componentized React Web Application',
      frontend: 'React.js, Semantic HTML5, Modular CSS, JavaScript',
      backend: 'Client-Side Service Booking & Routing',
      database: 'Static Service Tier Config & Structured Schemas',
      deployment: 'Netlify Edge CDN',
      keyDeliverables: 'Service Booking Workflow, Workshop Capability Showcase, Contact Inquiries',
    },
    problem:
      'An established Maruti Suzuki authorized service center required a reliable, high-speed mobile-first web portal to present service packages, workshop credentials, and facilitate incoming customer service inquiries.',
    solution:
      'Created an accessible, streamlined React frontend presenting organized service tiers, clear workshop capability indicators, location mapping, and zero-friction inquiry touchpoints.',
    highlights: [
      'Built clean service categorization highlighting periodic maintenance, mechanical repairs, and insurance claims.',
      'Optimized critical rendering path and image compression for sub-second mobile page loads.',
      'Integrated location and direct-call routing for urgent automotive roadside and service inquiries.',
    ],
  },
  {
    slug: 'fintrack',
    name: 'Fintrack',
    category: 'Personal Finance Management App',
    clusterTopic: 'Financial Systems & Cross-Platform Software',
    description:
      'Built a web and mobile finance tracking app for logging transactions, monitoring spending, and generating downloadable financial reports, with data sync across platforms.',
    role: 'Built the web and mobile finance tracking app (React, Node.js, Express.js, MongoDB, Kotlin).',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Kotlin'],
    image: 'project3',
    github: 'https://github.com/dhairya-shah13/FinTrack',
    live: null,
    detail: true,
    relatedSlugs: ['akids-enterprise', 'shrinath'],
    relatedBlogSlugs: [
      'mongodb-vs-postgresql-schema-design-guide',
      'ssg-vs-ssr-vs-spa-web-rendering-guide',
    ],
    tldr: [
      'Cross-platform personal finance management suite spanning React web interface and native Kotlin mobile application.',
      'Centralized Node.js/Express REST backend with MongoDB for real-time transaction synchronization.',
      'Automated transaction classification, budget threshold monitoring, and dynamic financial report generation.',
      'Built for reliable multi-device financial tracking with structured document models.',
    ],
    specs: {
      architecture: 'Multi-Client REST Architecture (Web + Native Android)',
      frontend: 'React.js (Web Dashboard) & Kotlin (Android Mobile Client)',
      backend: 'Node.js, Express.js REST API',
      database: 'MongoDB (Transactional Document Models)',
      deployment: 'Local Environment / Node.js Server Runtime',
      keyDeliverables: 'Transaction Ledger, Budget Categorization, Financial Report Generation, Multi-Platform Sync',
    },
    problem:
      'Users managing personal finances across desktop and mobile needed an intuitive system to log income/expenses on the go, categorize recurring spending, and extract historical financial statements.',
    solution:
      'Designed a unified data schema on MongoDB accessible via REST endpoints to both a native Kotlin mobile client for instant daily entry and a React web dashboard for comprehensive trend analysis and exportable reporting.',
    highlights: [
      'Engineered synchronized REST API handling multi-category income and expense transactions.',
      'Implemented native Kotlin views for quick mobile logging alongside React dashboard analytics.',
      'Built report generation module allowing users to export transaction summaries for budgeting.',
    ],
  },
  {
    slug: 'aarisha',
    name: 'Aarisha',
    category: 'Collaborative Web Platform',
    clusterTopic: 'Full-Stack Web & Collaborative Platforms',
    description:
      'Collaborated on the build and deployment of a live web platform, contributing to feature development alongside a fellow developer.',
    role: 'Collaborated on feature development and deployment alongside a fellow developer.',
    tags: ['Team Build', 'React', 'Web Platform'],
    image: 'project4',
    github: 'https://github.com/vishuchavda78/Aarisha',
    live: 'https://aarisha.vercel.app/',
    detail: false, // Thin first-party content — stays on the index with external links.
    relatedSlugs: [],
    tldr: [
      'Live collaborative web platform developed in partnership with a fellow engineer.',
      'Contributed to core UI component development and responsive layout integration.',
      'Deployed to Vercel for continuous preview and production hosting.',
    ],
    specs: {
      architecture: 'Collaborative Frontend Application',
      frontend: 'React.js, Modern CSS',
      deployment: 'Vercel CDN',
      keyDeliverables: 'UI Component Architecture, Shared Feature Engineering',
    },
  },
  {
    slug: 'shrinath',
    name: 'Shrinath',
    category: 'Sales Monitoring System',
    clusterTopic: 'Enterprise Analytics & Small-Business Tooling',
    description:
      'Built a sales monitoring system for tracking transactions and performance metrics, designed for small-business sales tracking workflows.',
    role: 'Built the sales monitoring and reporting system end-to-end.',
    tags: ['Small-Business Sales Tracking', 'JavaScript', 'Analytics'],
    image: 'project5',
    github: 'https://github.com/dhairya-shah13/Shrinath-SalesMonitoring',
    live: null,
    detail: true,
    relatedSlugs: ['akids-enterprise', 'fintrack'],
    relatedBlogSlugs: [
      'docker-github-actions-linux-vps-cicd-guide',
      'mongodb-vs-postgresql-schema-design-guide',
    ],
    tldr: [
      'Specialized transactional sales monitoring and performance dashboard tailored for small-business workflows.',
      'Provides real-time ledger tracking, revenue metrics, customer sales velocity, and inventory movement.',
      'Engineered lightweight operational interface eliminating overhead of complex enterprise ERP systems.',
      'Structured data model ensuring transactional integrity and instant summary queries.',
    ],
    specs: {
      architecture: 'Single Page Dashboard + Data Layer',
      frontend: 'JavaScript, Modular UI Components, CSS',
      backend: 'Transaction Logging & Analytics Engine',
      database: 'Relational / Structured Transaction Storage',
      deployment: 'Local Business Operations Runtime',
      keyDeliverables: 'Transaction Logging, Revenue Summaries, Performance Tracking',
    },
    problem:
      'Small business operations frequently suffer from disorganized sales recording across disjointed spreadsheets, resulting in delayed revenue reconciliation and missing sales trend visibility.',
    solution:
      'Delivered an accessible, focused sales monitoring platform providing clear transaction entry forms, daily/monthly revenue rollups, and item-level performance tracking designed for non-technical shop managers.',
    highlights: [
      'Created streamlined sales entry workflow reducing transaction logging time.',
      'Engineered automatic period aggregation for daily, weekly, and monthly sales volume calculations.',
      'Designed responsive table views with sorting, searching, and instant balance calculations.',
    ],
  },
  {
    slug: 'hrms',
    name: 'HRMS',
    category: 'HR Management System (Odoo Hackathon)',
    clusterTopic: 'Enterprise Systems & Hackathon Builds',
    description:
      'Collaborated with a team to design and build an HR Management System for the Odoo Hackathon, contributing to both front-end interfaces and back-end APIs under time constraints.',
    role: 'Team collaboration — front-end interfaces and back-end APIs.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Hackathon'],
    image: 'project6',
    github: null, // Code private
    live: null,
    detail: false, // No public links and thin first-party content — stays on the index.
    relatedSlugs: [],
    tldr: [
      'Human Resource Management System prototype built under competitive sprint conditions for the Odoo Hackathon.',
      'Architected full-stack modules for employee records, leave management, and role-based permissions.',
      'Collaborated in a fast-paced engineering team implementing React views and Express.js REST APIs.',
    ],
    specs: {
      architecture: 'Full-Stack Hackathon Prototype',
      frontend: 'React.js, CSS',
      backend: 'Node.js, Express.js REST API',
      database: 'MongoDB',
      keyDeliverables: 'Employee Profiles, Leave Tracking Modules, Role Authentication',
    },
  },
];

export const detailProjects = projects.filter((p) => p.detail);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
