import { Content } from '@/content/projects';

export const content: Content = {
  title: 'Safariline Cargo',
  featuredImage: '/projects/SafarilineCargo/overview.png',
  description:
    'Movement made visible. A cargo operations platform bringing air and sea shipments, warehouse facilities, customer accounts, and reporting into one branch-aware workspace.',
  seo: 'Explore Safariline Cargo: a web platform for cargo operations, air and sea waybills, warehouse visibility, shipment tracking, and customer and supplier reporting.',
  role: 'Web Application Development',
  details: {
    type: 'Logistics · Cargo Operations Platform',
    stack: 'Next.js React',
    code: 'Private',
    live: 'https://dev.safarilinecargo.co.ke/',
  },
  keywords: [
    'Safariline Cargo',
    'cargo operations',
    'logistics platform',
    'shipment tracking',
    'warehouse management',
    'Next.js',
    'React',
    'Kenya',
  ],
  mediaTitle: 'One shipment. A connected operation.',
  gallery: [
    {
      src: '/projects/SafarilineCargo/shipments.png',
      alt: 'Safariline shipment register with route, freight mode, volume, and status filters; identifying details masked',
      caption:
        'Dispatch desk — air and sea waybills in a filterable register, with route, volume, and status in view.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/projects/SafarilineCargo/warehouse.png',
      alt: 'Safariline warehouse facilities with origin, destination, and transit locations; costs masked',
      caption:
        'Across the network — origin staging, transit locations, and destination warehouses in one facilities view.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/projects/SafarilineCargo/reports.png',
      alt: 'Safariline reporting workspace with customer, supplier, finance, shipment, and warehouse reports',
      caption:
        'From movement to records — a reporting workspace spanning customer statements, finance, shipments, and warehouse activity.',
      width: 1600,
      height: 1000,
    },
  ],
};
