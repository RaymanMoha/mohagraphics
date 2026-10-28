import { GetServerSideProps } from 'next';
import { content } from '@/content/projects';
import { campaigns } from '@/components/Campaigns/data';
import { servicePages } from '@/content/services';

export default function Sitemap() { return null; }
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const routes = [
    '', '/about', '/blog', '/services', '/films',
    ...Object.keys(content).map((id) => `/projects/${id}`),
    ...campaigns.map((campaign) => `/campaigns/${campaign.slug}`),
    ...servicePages.map((service) => `/services/${service.slug}`),
    ...['cloud-resume', 'javascript-cheatsheet', 'react-cheatsheet', 'prof-g-map',
      'ai-chat-website-integration', 'hire-frontend-developer-2025', 'react-native-vs-flutter-2025'].map((slug) => `/blog/${slug}`),
  ];
  // Do not invent lastmod dates: a request time is not the content's update time.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>https://www.mohagraphics.tech${route}</loc></url>`).join('')}</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(xml);
  return { props: {} };
};
