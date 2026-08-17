// Structured data builders — minimal, truthful Schema.org only.
// No empty/speculative fields; no types added for checklist purposes.
import { person, SITE_URL } from './person.js';

const personCore = {
  '@type': 'Person',
  name: person.name,
  alternateName: person.alternateName,
  url: person.url,
  image: person.image,
  jobTitle: person.jobTitle,
  description: person.description,
};

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    ...personCore,
    address: person.address,
    sameAs: person.sameAs,
    knowsAbout: person.knowsAbout,
    alumniOf: person.alumniOf,
  };
}

export function buildProfilePageSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_URL}${path}`,
    mainEntity: personCore,
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dhairya Shah — Portfolio',
    url: `${SITE_URL}/`,
    description: person.description,
  };
}

export function buildBreadcrumbSchema(items) {
  // items: [{ name, path }] — path is the page path ('' for current page)
  const itemListElement = items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function buildFaqSchema(questions) {
  // questions: [{ question, answer }]
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function buildProjectSchema(project) {
  // Only used when a truthful URL exists (live site or repository).
  const url = project.live || project.github;
  if (!url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url,
    author: personCore,
    keywords: project.tags.join(', '),
  };
}
