import { Content } from '@/content/projects';

export const content: Content = {
  title: 'Reon Capital Developer Hub',
  featuredImage: '/projects/ReonDevHub/signin-desktop.png',
  description:
    'Branded developer portal entry with sign-in and account creation flows that keep the user focused on authentication.',
  seo: 'Reon Capital Developer Hub provides a branded sign-in and account creation experience for developers.',
  details: {
    type: 'Developer Portal',
    stack: 'Next.js Tailwind_CSS Authentication_Flow Responsive_Layout',
    live: 'https://dev-2cbg.vercel.app/',
    code: 'Private',
  },
  keywords: [
    'developer portal',
    'authentication',
    'sign in',
    'account creation',
    'onboarding',
  ],
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'Developer onboarding across screens.',
  gallery: [
    {
      src: '/projects/ReonDevHub/signup-desktop.png',
      alt: 'Reon Capital Developer Hub account creation page with name, email, password confirmation, and terms agreement',
      caption:
        'Account creation — a focused form alongside the Reon Capital brand panel.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/projects/ReonDevHub/signin-mobile.png',
      alt: 'Reon Capital Developer Hub sign-in page on a mobile screen',
      caption:
        'Mobile sign-in — the same entry flow adapted to a narrow screen.',
      width: 390,
      height: 844,
    },
  ],
  role: 'Frontend Developer · Reon Capital',
};
