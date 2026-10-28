import media from './reon-store-media.json';

const storeMedia = (id: string) => media.find((app) => app.id === id)!;
export const reonApps = [
  {
    name: 'Zuba', category: 'Football & ticketing',
    description: 'A Botswana Premier League fan app for match tickets, season passes, club updates, and match alerts.',
    features: ['Digital tickets and season passes', 'Ticket sharing and transfers', 'Club news and match alerts'],
    ...storeMedia('Zuba'),
  },
  {
    name: 'Zuba Steward', category: 'Matchday operations',
    description: 'A companion app for gate staff to verify Botswana Premier League tickets and monitor entry activity.',
    features: ['QR ticket scanning', 'Single-ticket and season-pass checks', 'Live gate-entry tracking'],
    ...storeMedia('ZubaSteward'),
  },
  {
    name: 'Eneva', category: 'Utility management',
    description: 'Electricity and water accounts in one mobile dashboard, with meter capture, bill payments, and consumption history.',
    features: ['Photo-based meter readings', 'Electricity and water bill payments', 'Usage charts and WhatsApp reminders'],
    ...storeMedia('ENEVA'),
  },
  {
    name: 'ANSU', category: 'Mobile shopping',
    description: 'A shopping app bringing together brands, electronics, fashion accessories, health, beauty, and exclusive offers.',
    features: ['Product and brand discovery', 'Shopping across multiple categories', 'New arrivals and offers'],
    ...storeMedia('ANSU'),
  },
];
export const storeGallery = (id: string) => {
  const app = reonApps.find((item) => item.id === id)!;
  return app.screenshots.map((image, index) => ({
    src: image.src, width: image.width, height: image.height,
    alt: `${app.name} Google Play screenshot ${index + 1}`,
    caption: `${app.name} · Google Play screenshot ${index + 1}`,
  }));
};
