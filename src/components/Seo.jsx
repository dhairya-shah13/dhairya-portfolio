import { Head } from 'vite-react-ssg';
import { SITE_URL } from '../data/person.js';

const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page head: unique title/description/canonical/OG/Twitter.
 * `path` is the route path (e.g. '/about'); the canonical host is always
 * https://www.aboutdhairya.me (the single canonical destination).
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE, type = 'website' }) {
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Dhairya Shah" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
