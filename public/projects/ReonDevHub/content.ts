import { Content } from '@/content/projects';

export const content: Content = {
  title: 'Reon Capital Developer Hub',
  featuredImage: '/projects/ReonDevHub/dashboard.png',
  description:
    'A developer documentation hub for Reon Capital platforms, bringing project overviews, architecture guides, API onboarding, code examples, and developer resources into one workspace.',
  seo: 'Explore Reon Capital Developer Hub: a Next.js documentation portal with project dashboards, architecture guides, API quick starts, and responsive onboarding.',
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
    'developer documentation',
    'API documentation',
    'architecture guides',
  ],
  organisation: { name: 'Reon Capital', href: '/projects/ReonCapital/' },
  mediaTitle: 'From onboarding to implementation.',
  gallery: [
    {
      src: '/projects/ReonDevHub/eneva-project.png',
      alt: 'Developer Hub ENEVA onboarding guide showing customer and internal mobile apps, web dashboard, and system architecture',
      caption:
        'Project documentation — understand the applications and how the system connects.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/projects/ReonDevHub/quick-start.png',
      alt: 'Developer Hub quick start guide with API key examples, SDK installation, and an example request',
      caption:
        'API onboarding — a guided path from setup to a first integration request.',
      width: 1600,
      height: 1000,
    },
    {
      src: '/projects/ReonDevHub/signin-desktop.png',
      alt: 'Reon Capital Developer Hub branded sign-in page',
      caption:
        'The entry experience — focused sign-in before accessing the documentation workspace.',
      width: 1600,
      height: 1000,
    },
  ],
  role: 'Frontend Developer · Reon Capital',
};
