import { Content } from '@/content/projects';
import storeMedia from '@/content/product-store-media.json';

export const content: Content = {
  title: 'ShambaBoy: Field Work Verification App',
  featuredImage: '/img/shambaboy-product-overview.jpg',
  description:
    'Mobile app and product website for farm and field operations, task management, GPS/photo evidence, worker records, and offline capture.',
  seo: 'ShambaBoy mobile app and Next.js product website development by Mohammed Abdirahman. Explore published Android screenshots for field tasks, work verification, worker records, and offline capture.',
  details: {
    type: 'Mobile App & Product Website',
    stack:
      'Mobile_App Next.js React TypeScript Responsive_Design Product_UI Field_Operations Work_Verification',
    live: 'https://www.shambaboy.com/',
    code: 'Private',
  },
  store: storeMedia.Shambaboy,
  keywords: [
    'farm operations app',
    'farm management software',
    'GPS farm tracking',
    'photo verification',
    'field operations dashboard',
    'proof-first agriculture',
    'worker accountability',
    'offline farm app',
    'agri-business platform',
    'field work verification',
    'kenya agriculture software',
  ],
  role: 'App & Website Developer',
};
