// Central entity data for Dhairya Shah.
// SOURCE OF TRUTH: Dhairya Resume.pdf + existing portfolio content.
// Every value here is fact-checked. No fabricated AI/ML/research/IEEE/USC claims.

export const SITE_URL = 'https://www.aboutdhairya.me';

export const person = {
  name: 'Dhairya Shah',
  alternateName: 'Dhairya Pinal Shah', // Resume header: "DHAIRYA PINAL SHAH" — same person as the site brand name.
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/dhairya-shah.jpg`,
  jobTitle: 'Full-Stack Developer & DevOps Engineer',
  description:
    'Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat, India. He ships web products end-to-end — MERN and Django/Flask applications, Docker containerization, CI/CD pipelines, and cloud deployment — and has led engineering teams taking software from concept to production use.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  // Verified first-party profiles only. No directories, aggregators, or unverified links.
  sameAs: ['https://github.com/dhairya-shah13', 'https://www.linkedin.com/in/dhairya-shah13'],
  // Concise demonstrated professional areas only — NOT a dump of every language/tool,
  // and never an individual-language expertise claim.
  knowsAbout: [
    'Full-stack web development',
    'REST API design',
    'Database design (SQL & MongoDB)',
    'Cloud deployment',
    'CI/CD and DevOps',
    'Containerization (Docker)',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Charotar University of Science and Technology (CHARUSAT)',
      sameAs: 'https://www.charusat.ac.in/',
    },
    {
      '@type': 'School',
      name: 'Seventh Day Adventist Higher Secondary School',
    },
    {
      '@type': 'School',
      name: 'Divine Gurukulam',
    },
  ],
};

export const contact = {
  email: 'shah.dhairya.p13@gmail.com',
  phoneDisplay: '+91 99243 43003',
  phoneHref: 'tel:9924343003',
  github: 'https://github.com/dhairya-shah13',
  linkedin: 'https://www.linkedin.com/in/dhairya-shah13',
  location: 'Ahmedabad, Gujarat, India',
};

export const resumeUrl = '/resume/dhairya-shah-resume.pdf';
