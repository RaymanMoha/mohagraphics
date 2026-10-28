import type { Content } from '@/content/projects';
import { storeGallery } from '@/content/reonApps';
export const content: Content = {
  title: 'ANSU: Mobile Shopping', featuredImage: '/img/ansu-playstore-overview.jpg',
  description: 'A Reon Capital shopping app for discovering brands, electronics, fashion accessories, health, beauty, and exclusive offers.',
  details: { type: 'Mobile Shopping App', stack: '', code: 'Private', live: 'https://play.google.com/store/apps/details?id=com.nucorp.numart&hl=en' },
  keywords: ['ANSU', 'Reon Capital', 'mobile shopping', 'ecommerce', 'product discovery'],
  role: 'Reon Capital · Mobile Commerce',
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'Google Play screenshots.', gallery: storeGallery('ANSU'),
};
