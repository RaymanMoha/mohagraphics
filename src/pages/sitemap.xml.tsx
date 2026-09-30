import { GetServerSideProps } from 'next';

const Sitemap = () => {
  // This component will not render anything
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://www.mohagraphics.tech';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/blog',
    '/services',
  ];

  // Project pages
  const projectPages = [
    '/projects/Amc',
    '/projects/onspace',
    '/projects/QuickHost',
    '/projects/Hbnb',
    '/projects/Yala',
    '/projects/blossom',
    '/projects/convolab',
    '/projects/Zuba',
    '/projects/Budj',
    '/projects/Sava',
    '/projects/Shambaboy',
    '/projects/AppBase',
    '/projects/Groundbase',
    '/projects/ReonDevHub',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
  ${projectPages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.9</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
