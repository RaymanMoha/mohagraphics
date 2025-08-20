import Head from 'next/head';

export type Props = {
  description: string;
  lang?: string;
  title: string;
  thumb?: string;
  keywords?: string[];
  /** Optional canonical URL to render as a <link rel="canonical"/> */
  canonical?: string;
  /** Optional article-specific properties */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  /** Optional schema.org structured data */
  structuredData?: any;
  /** Optional page type for Open Graph */
  ogType?: 'website' | 'article' | 'profile';
};

export const SEO = ({
  description,
  title,
  thumb,
  keywords = [],
  canonical,
  article,
  structuredData,
  ogType = 'website',
  lang = 'en',
}: Props) => {
  const siteUrl = 'https://www.mohammedabdirahman.com';
  const imageUrl = thumb 
    ? `${siteUrl}/img/${thumb}` 
    : `${siteUrl}/img/logo.png`;
  
  const metaTags = [
    {
      name: `description`,
      content: description,
    },
    {
      name: `keywords`,
      content: keywords.length > 0 ? keywords.join(', ') : 'mohammed abdirahman, frontend developer, software engineer, web development, react, nextjs',
    },
    {
      name: `author`,
      content: 'Mohammed Abdirahman',
    },
    {
      name: `robots`,
      content: 'index, follow',
    },
    // Open Graph tags
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: ogType,
    },
    {
      property: `og:url`,
      content: canonical || siteUrl,
    },
    {
      property: `og:image`,
      content: imageUrl,
    },
    {
      property: `og:image:alt`,
      content: `${title} - Mohammed Abdirahman`,
    },
    {
      property: `og:site_name`,
      content: 'Mohammed Abdirahman Portfolio',
    },
    {
      property: `og:locale`,
      content: lang === 'en' ? 'en_US' : lang,
    },
    // Twitter Card tags
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:creator`,
      content: '@mohamedabdi__',
    },
    {
      name: `twitter:site`,
      content: '@mohamedabdi__',
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
    {
      name: `twitter:image`,
      content: imageUrl,
    },
    {
      name: `twitter:image:alt`,
      content: `${title} - Mohammed Abdirahman`,
    },
    // Additional SEO tags
    {
      name: 'theme-color',
      content: '#6366f1',
    },
    {
      name: 'msapplication-TileColor',
      content: '#6366f1',
    },
    // Google Site Verification
    {
      name: 'google-site-verification',
      content: 'We7BOl_CZVyDeFTxQEtsewDNNE2nwsw5rJi7Kf1s4JA',
    },
  ];

  // Add article-specific meta tags
  if (article && ogType === 'article') {
    if (article.publishedTime) {
      metaTags.push({
        property: 'article:published_time',
        content: article.publishedTime,
      });
    }
    if (article.modifiedTime) {
      metaTags.push({
        property: 'article:modified_time',
        content: article.modifiedTime,
      });
    }
    if (article.author) {
      metaTags.push({
        property: 'article:author',
        content: article.author,
      });
    }
    if (article.section) {
      metaTags.push({
        property: 'article:section',
        content: article.section,
      });
    }
    if (article.tags) {
      article.tags.forEach(tag => {
        metaTags.push({
          property: 'article:tag',
          content: tag,
        });
      });
    }
  }

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      {canonical && <link rel="canonical" href={canonical} />}
      {metaTags.map((tag, i) => {
        const key = tag.name || tag.property || `meta-${i}`;
        if (tag.name) {
          return (
            <meta
              key={key}
              name={tag.name}
              content={tag.content}
            />
          );
        }
        return (
          <meta
            key={key}
            property={tag.property}
            content={tag.content}
          />
        );
      })}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
};

