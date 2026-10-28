import type { Content } from '@/content/projects';
import { storeGallery } from '@/content/reonApps';
export const content: Content = {
  title: 'Zuba Steward: Matchday Ticket Verification', featuredImage: '/img/zuba-steward-playstore-overview.jpg',
  description: 'The Reon Capital companion app for Botswana Premier League gate staff, with QR ticket checks, season-pass verification, and entry tracking.',
  details: { type: 'Matchday Operations App', stack: 'Flutter Mobile_UI QR_Scanning Ticket_Verification', code: 'Private', live: 'https://play.google.com/store/apps/details?id=com.zubastew.app&hl=en' },
  keywords: ['Zuba Steward', 'Reon Capital', 'Botswana Premier League', 'ticket verification', 'QR scanning'],
  role: 'Mobile Developer · Reon Capital',
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'Google Play screenshots.', gallery: storeGallery('ZubaSteward'),
};
