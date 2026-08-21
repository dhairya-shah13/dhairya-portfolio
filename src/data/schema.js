// Structured data builders — fact-checked Schema.org graphs for SEO, AEO, and GEO.
// Adheres strictly to SEO.md §10. No fabricated or speculative fields.
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
    name: `Dhairya Shah — Profile`,
    description: person.description,
    mainEntity: {
      ...personCore,
      address: person.address,
      sameAs: person.sameAs,
      knowsAbout: person.knowsAbout,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dhairya Shah — Portfolio & Case Studies',
    url: `${SITE_URL}/`,
    description: person.description,
    publisher: personCore,
  };
}

export function buildBreadcrumbSchema(items) {
  // items: [{ name, path }] — path is relative to root
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
  // Generates SoftwareApplication schema when a truthful link exists
  const url = project.live || project.github;
  if (!url) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url,
    author: personCore,
    applicationCategory: project.category,
    operatingSystem: 'Cross-Platform, Web',
    keywords: project.tags.join(', '),
  };

  if (project.tldr && project.tldr.length > 0) {
    schema.featureList = project.tldr.join('; ');
  }

  return schema;
}

export function buildBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Person',
      name: person.name,
      url: person.url,
      jobTitle: person.jobTitle,
      sameAs: person.sameAs,
    },
    publisher: {
      '@type': 'Person',
      name: person.name,
      url: person.url,
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };
}

