import { storeGallery } from '@/content/reonApps';
import { Content } from '@/content/projects';

export const content: Content = {
  title: 'Zuba: Botswana Premier League Platform',
  featuredImage: '/img/zuba-playstore-overview.jpg',
  description:
    'Two mobile apps for the Botswana Premier League: fan ticketing and gate-entry verification under Reon Capital.',
  seo: 'Zuba Botswana Premier League apps for fan engagement and steward management with real-time match data.',
  details: {
    type: 'Sports Mobile Platform',
    stack: 'Flutter Firebase Node.js MongoDB Real_time_APIs',
    live: 'https://play.google.com/store/apps/details?id=com.zuba.app&hl=en',
    code: 'Private',
  },
  keywords: [
    'botswana premier league',
    'sports app',
    'fan engagement',
    'steward management',
    'match data',
    'flutter',
  ],
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'Google Play screenshots.',
  gallery: storeGallery('Zuba'),
  role: 'Mobile Developer · Reon Capital',
};
