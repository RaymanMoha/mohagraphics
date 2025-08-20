// SEO utility functions and constants

export const SEO_CONSTANTS = {
  SITE_URL: 'https://www.mohammedabdirahman.com',
  SITE_NAME: 'Mohammed Abdirahman Portfolio',
  AUTHOR_NAME: 'Mohammed Abdirahman',
  TWITTER_HANDLE: '@mohamedabdi__',
  DEFAULT_DESCRIPTION: 'Passionate frontend developer specializing in React, Next.js, and modern web technologies. Creating intuitive user interfaces and high-performance web applications.',
  DEFAULT_KEYWORDS: [
    'frontend developer',
    'software engineer',
    'react developer',
    'nextjs developer',
    'web developer',
    'javascript developer',
    'mohammed abdirahman'
  ],
  DEFAULT_IMAGE: '/img/logo.png',
} as const;

export interface SEOPage {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateStructuredData(type: 'Person' | 'Article' | 'CreativeWork', data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case 'Person':
      return {
        ...baseData,
        name: SEO_CONSTANTS.AUTHOR_NAME,
        jobTitle: "Frontend Developer",
        url: SEO_CONSTANTS.SITE_URL,
        image: `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`,
        sameAs: [
          "https://github.com/RaymanMoha",
          "https://linkedin.com/in/mohammed-abdirahman",
          `https://twitter.com/${SEO_CONSTANTS.TWITTER_HANDLE.slice(1)}`
        ],
        ...data
      };

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Person",
          name: SEO_CONSTANTS.AUTHOR_NAME,
          url: SEO_CONSTANTS.SITE_URL
        },
        publisher: {
          "@type": "Person",
          name: SEO_CONSTANTS.AUTHOR_NAME,
          url: SEO_CONSTANTS.SITE_URL
        },
        datePublished: data.publishedTime || new Date().toISOString(),
        dateModified: data.modifiedTime || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SEO_CONSTANTS.SITE_URL}${data.path || ''}`
        },
        ...data
      };

    case 'CreativeWork':
      return {
        ...baseData,
        name: data.title,
        description: data.description,
        author: {
          "@type": "Person",
          name: SEO_CONSTANTS.AUTHOR_NAME,
          url: SEO_CONSTANTS.SITE_URL
        },
        creator: {
          "@type": "Person", 
          name: SEO_CONSTANTS.AUTHOR_NAME
        },
        dateCreated: data.dateCreated || new Date().toISOString(),
        inLanguage: "en",
        isAccessibleForFree: true,
        ...data
      };

    default:
      return baseData;
  }
}

export function generatePageTitle(pageTitle: string, includeAuthor = true): string {
  if (includeAuthor) {
    return `${pageTitle} | ${SEO_CONSTANTS.AUTHOR_NAME}`;
  }
  return pageTitle;
}

export function generateCanonicalUrl(path: string): string {
  return `${SEO_CONSTANTS.SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function optimizeImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${SEO_CONSTANTS.SITE_URL}/img/${imagePath}`;
}

export function sanitizeKeywords(keywords: string[]): string[] {
  return Array.from(new Set(keywords)).filter(Boolean).slice(0, 10); // Limit to 10 unique keywords
}