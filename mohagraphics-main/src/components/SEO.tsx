import Head from 'next/head';
import React from 'react';

type MetaTag = {
  charset?: string;
  name?: string;
  content?: string;
  'http-equiv'?: string;
  property?: string;
};

// Export the Props type as an interface for better type checking
export interface SEOProps {
  /** The page title */
  title: string;
  /** Meta description */
  description: string;
  /** Language code */
  lang: string;
  /** Thumbnail image name */
  thumb: string;
  /** SEO keywords */
  keywords: string[];
  /** Canonical URL */
  canonical?: string;
};

export const SEO = ({ 
  description, 
  lang, 
  title, 
  thumb, 
  keywords,
  canonical = ''
}: SEOProps): JSX.Element => {
  const defaultLocation = 'Nairobi, Kenya';
  const pageType = 'website';
  const siteName = 'Mohammed Abdirahman - Frontend & Mobile App Developer';
  const defaultDescription = 'Expert Frontend & Mobile App Developer specializing in Flutter, React, and modern web technologies. Building cross-platform mobile apps and responsive web applications for global clients. Offering innovative solutions from Africa to the world. Available for international projects and remote collaboration.';
  const defaultKeywords = [
    // Global Role Keywords
    'mobile app developer', 'Flutter developer', 'frontend developer', 'cross-platform developer',
    'UI/UX designer', 'remote developer', 'freelance developer', 'software engineer',
    // Technical Skills
    'Flutter expert', 'React Native developer', 'iOS developer', 'Android developer',
    'React expert', 'Next.js specialist', 'TypeScript professional', 'mobile app architect',
    // Geographic Keywords
    'international developer', 'African developer', 'global remote developer',
    'offshore developer', 'Kenya developer', 'East Africa developer',
    // Industry-specific
    'ecommerce developer', 'SaaS developer', 'startup developer',
    'enterprise software developer', 'fintech developer',
    // Service-specific
    'frontend consultant', 'UI/UX consultant', 'web development services',
    'cross-platform development', 'responsive design expert',
    // Expertise Areas
    'performance optimization', 'web accessibility expert', 'PWA developer',
    'mobile-first design', 'cross-browser compatibility',
    // Platforms & Tools
    'React Native developer', 'Vue.js developer', 'Angular developer',
    'WordPress developer', 'Shopify developer',
    // Soft Skills
    'agile development', 'remote collaboration', 'team leadership',
    // Regions
    'USA developer', 'UK developer', 'EU developer', 'global developer',
    // Project Types
    'B2B developer', 'B2C developer', 'enterprise solutions',
    'startup development', 'MVP development'
  ];
  
  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: 'Mohammed Abdirahman',
    url: canonical || 'https://www.mohammedabdirahman.com',
    sameAs: [
      'https://github.com/RaymanMoha',
      'https://www.linkedin.com/in/mohammed-abdirahman-1a6b651bb/',
      'https://twitter.com/yourtwitter'
    ],
    jobTitle: 'Global Frontend & Mobile App Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'International Software Development Consultant',
      description: 'Delivering expert mobile app development, frontend development, and UI/UX design services to clients worldwide'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya',
      addressRegion: 'East Africa'
    },
    description: description || defaultDescription,
    image: `https://www.mohammedabdirahman.com/img/${thumb || 'logo.png'}`,
    email: 'mohammedraymanh@gmail.com',
    knowsLanguage: ['en', 'sw'],
    availableLanguage: ['en', 'sw'],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Frontend Developer',
      occupationalCategory: 'Software Developer',
      skills: [
        'Flutter Development', 'Mobile App Development', 'iOS Development', 'Android Development',
        'React Native', 'React.js', 'Next.js', 'TypeScript', 'JavaScript',
        'UI/UX Design', 'Web Development', 'Frontend Architecture',
        'Cross-platform Development', 'Mobile-first Design', 'App Store Optimization',
        'Performance Optimization', 'State Management', 'API Integration'
      ],
      responsibilities: [
        'Mobile App Development',
        'Cross-platform Development',
        'Frontend Development',
        'UI/UX Design',
        'Web Application Development',
        'Technical Consultation',
        'Project Management',
        'App Store Deployment',
        'Performance Optimization'
      ]
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Mobile App Development & Frontend Development Services',
        description: 'Professional Flutter mobile app development, frontend development, and UI/UX design services for global clients. Specializing in cross-platform solutions that work seamlessly on iOS, Android, and web platforms.',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -1.292066,
            longitude: 36.821945
          },
          geoRadius: '20000 km'
        }
      }
    }
  };

  const metaTags: MetaTag[] = [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'description', content: description || defaultDescription },
    { name: 'keywords', content: [...defaultKeywords, ...keywords].join(', ') },
    { name: 'author', content: 'Mohammed Abdirahman' },
    { name: 'geo.region', content: 'KE-30' },
    { name: 'geo.placename', content: defaultLocation },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: pageType },
    { property: 'og:title', content: `${title} | ${siteName}` },
    { property: 'og:description', content: description || defaultDescription },
    { property: 'og:image', content: `https://www.mohammedabdirahman.com/img/${thumb || 'logo.png'}` },
    { property: 'og:site_name', content: siteName },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@yourtwitter' }, // Update with your Twitter
    { name: 'twitter:creator', content: '@yourtwitter' }, // Update with your Twitter
    { name: 'twitter:title', content: `${title} | ${siteName}` },
    { name: 'twitter:description', content: description || defaultDescription },
    { name: 'twitter:image', content: `https://www.mohammedabdirahman.com/img/${thumb || 'logo.png'}` },
    { name: 'google-site-verification', content: 'We7BOl_CZVyDeFTxQEtsewDNNE2nwsw5rJi7Kf1s4JA' }
  ];

  const renderMetaTag = (meta: MetaTag, index: number) => {
    if ('charset' in meta) {
      return <meta key={index} charSet={meta.charset} />;
    }
    return <meta key={index} {...meta} />;
  };

  return (
    <Head>
      <title>{`${title} | ${siteName}`}</title>
      {canonical && <link rel="canonical" href={canonical} />}
      {metaTags.map((meta, i) => renderMetaTag(meta, i))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgWebPage) }}
      />
    </Head>
  );
};
