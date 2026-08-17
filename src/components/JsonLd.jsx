export default function JsonLd({ data }) {
  if (!data) return null;
  // Escape "</script" so a crafted value can never break out of the script block.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
