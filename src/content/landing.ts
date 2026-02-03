import { content as projectData } from './projects';

export const landingPage = {
  title: 'Landing page title from local markdown',
  internal: true,
  mainpitch: {
    title: 'Hi, I\'m Mohammed | **Frontend** & **Mobile** Engineer',
    subtitle:
      'I build fast, accessible web and mobile products with React, React Native, and Flutter. I have 5+ years of experience shipping for startups and growing teams in Nairobi and remotely, with a focus on performance, clean UX, and reliable delivery.',
    buttonText: 'Book a call',
  },
  bio: {
    title: 'My **Skills**',
    image: 'landingImage.jpg',
    features: [
      {
        header: 'Frontend + mobile focus',
        body: 'I specialize in React, React Native, and Flutter, turning Figma designs into responsive interfaces that are fast, accessible, and easy to maintain. I care about clean code, clear communication, and shipping features that move the product forward.',
      },
    ],
  },
  projects: [
    {
      body: 'Guided three-step merchant onboarding flow with business info and category selection.',
      image: 'budj-overview.png',
      buttonText: 'View project',
      link: '/projects/Budj/',
      ...projectData.Budj,
      title: 'Budj',
    },
    {
      body: 'Developer portal entry experience with focused sign-in and account creation flows.',
      image: 'reon-dev-hub-overview.png',
      buttonText: 'View project',
      link: '/projects/ReonDevHub/',
      ...projectData.ReonDevHub,
      title: 'Reon Capital Dev Hub',
    },
    {
      body: 'Responsive brand site that presents the story, offerings, and contact paths.',
      image: 'shambaboy-overview.png',
      buttonText: 'View project',
      link: '/projects/Shambaboy/',
      ...projectData.Shambaboy,
      title: 'Shambaboy',
    },
    {
      body: 'Flutter utility bills manager with OCR meter reading and analytics on GCP.',
      image: 'eneva-overview.png',
      buttonText: 'View project',
      link: '/projects/ENEVA/',
      ...projectData.ENEVA,
      title: 'ENEVA -Utility Manager',
    },
    {
      body: 'Two mobile apps for Botswana Premier League: fan engagement and steward management with real-time match data.',
      image: 'zuba-overview.png',
      buttonText: 'View project',
      link: '/projects/Zuba/',
      ...projectData.Zuba,
      title: 'Zuba - BPL Platform',
    },
    {
      body: 'Figma-to-product build with dynamic forms, team chat, and dashboards for distributed teams.',
      image: 'onspace-overview.png',
      buttonText: 'View project',
      link: '/projects/onspace/',
      ...projectData.onspace,
    },
    {
      body: 'Next.js + Tailwind marketing site with Sanity CMS and Vercel deployment.',
      image: 'convolab-overview.png',
      buttonText: 'View project',
      link: '/projects/convolab',
      ...projectData.convolab,
      title: 'Conversation Lab',
    },
    {
      body: 'WordPress marketing site aligned to the Flutter app UI; supported SEO and Google Ads.',
      image: 'yala-overview.png',
      buttonText: 'View project',
      link: '/projects/Yala',
      ...projectData.Yala,
      title: 'Yala Pay',
    },
    {
      body: 'Corporate training website with clear program pages and lead capture.',
      image: 'amc-overview.png',
      buttonText: 'View project',
      link: '/projects/Amc/',
      ...projectData.Amc,
      title: 'Amc Group Africa',
    },

    {
      body: 'Hosting provider redesign that clarifies domains, hosting, and cloud services with clear CTAs.',
      image: 'quick-host-overview.png',
      buttonText: 'View project',
      link: '/projects/QuickHost/',
      ...projectData.QuickHost,
      title: 'Quick Host',
    },
    {
      body: 'Insurance site that explains plans and streamlines quote and consultation requests.',
      image: 'blossom-overview.png',
      buttonText: 'View project',
      link: '/projects/blossom/',
      ...projectData.blossom,
      title: 'Blossom Insurance',
    },
    {
      body: 'Full-stack AirBnB clone with Flask REST API and jQuery-driven dynamic UI.',
      image: 'hbnb-overview.png',
      buttonText: 'View project',
      link: '/projects/Hbnb/',
      ...projectData.Hbnb,
      title: 'Hbnb',
    },
    {
      body: 'Redesigned ISP website highlighting fiber packages and coverage across Kenya.',
      image: 'yala-super-fiber-overview.png',
      buttonText: 'View Site',
      link: 'https://yalasuperfiber.co.ke/',
      title: 'Yala Super Fiber',
    },
  ],

  contact: {
    title: "Let's have a **chat**",
    buttonText: 'Get in touch',
  },
};
