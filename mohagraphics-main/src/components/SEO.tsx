import Head from 'next/head';

type MetaTag = {
  charset?: string;
  name?: string;
  content?: string;
  'http-equiv'?: string;
  property?: string;
};

export type Props = {
  description: string;
  lang: string;
  title: string;
  thumb: string;
  keywords: string[];
  location?: string;
  type?: string;
  canonical?: string;
};

export const SEO = ({ 
  description, 
  lang, 
  title, 
  thumb, 
  keywords,
  location = 'Nairobi, Kenya',
  type = 'website',
  canonical
}: Props) => {
  const siteName = 'Mohammed Abdirahman - Frontend Developer & UI/UX Designer';
  const defaultDescription = 'Expert Frontend Developer and UI/UX Designer specializing in React, Next.js, TypeScript, and modern web development. Creating beautiful, performant, and accessible web applications.';
  const defaultKeywords = ['frontend developer', 'UI/UX designer', 'React developer', 'Next.js developer', 'TypeScript expert', 'web developer', 'freelance developer', 'Kenya developer', 'Nairobi developer', 'remote developer'];
  
  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    name: 'Mohammed Abdirahman',
    url: canonical || 'https://www.mohammedabdirahman.com',
    sameAs: [
      'https://github.com/RaymanMoha',
      'https://www.linkedin.com/in/mohammed-abdirahman-1a6b651bb/', // Update with your LinkedIn
      'https://twitter.com/yourtwitter' // Update with your Twitter
    ],
    jobTitle: 'Frontend Developer & UI/UX Designer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya'
    },
    description: description || defaultDescription,
    image: `https://www.mohammedabdirahman.com/img/${thumb || 'logo.png'}`,
    email: 'mohammedraymanh@gmail.com' // Update with your email
  };

  const metaTags: MetaTag[] = [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'description', content: description || defaultDescription },
    { name: 'keywords', content: [...defaultKeywords, ...keywords].join(', ') },
    { name: 'author', content: 'Mohammed Abdirahman' },
    { name: 'geo.region', content: 'KE-30' },
    { name: 'geo.placename', content: location },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: type },
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
