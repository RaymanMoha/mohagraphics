import { storeGallery } from '@/content/reonApps';
import { Content } from '@/content/projects';

export const content: Content = {
  title: 'ENEVA: Utility Bills Manager',
  description:
    'Flutter mobile app for electricity and water bill management with OCR meter reading and analytics on Google Cloud.',
  keywords: [
    'flutter',
    'dart',
    'gcp',
    'firebase',
    'bigquery',
    'ocr',
    'utility bills',
    'mobile app',
  ],
  details: {
    type: 'Utility Management Mobile App',
    stack: 'Flutter Dart GCP Firebase BigQuery Cloud_Functions OCR Firestore',
    code: 'Private',
    live: 'https://play.google.com/store/apps/details?id=com.eneva.app&hl=en',
  },
  featuredImage: '/img/eneva-playstore-overview.jpg',
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'Google Play screenshots.',
  gallery: storeGallery('ENEVA'),
  role: 'Flutter Mobile Developer · Reon Capital',
  seo: 'ENEVA utility bills manager with OCR meter reading and analytics built on Flutter and Google Cloud.',
};
