import Head from 'next/head';
import { personSchema, websiteSchema, websiteId, personId } from '@/content/identity';
import { useRouter } from 'next/router';

export type Props = {
  description: string;
  lang: string;
  title: string;
  thumb: string;
  keywords: string[];
  /** Optional canonical URL to render as a <link rel="canonical"/> */
  canonical?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
};

export const SEO = ({
  description,
  title,
  thumb,
  keywords,
  canonical,
  structuredData,
  noindex = false,
}: Props) => {
  const siteUrl = 'https://www.mohagraphics.tech';
  const { asPath } = useRouter();
  const pathname = asPath.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  const canonicalUrl = canonical || `${siteUrl}${pathname === '/' ? '' : pathname}`;
  const resolvedThumb = (thumb || 'logo.png').trim();
  const imageUrl = (() => {
    if (!resolvedThumb) return `${siteUrl}/img/logo.png`;
    if (
      resolvedThumb.startsWith('http://') ||
      resolvedThumb.startsWith('https://')
    ) {
      return resolvedThumb;
    }
    if (resolvedThumb.startsWith('/')) return `${siteUrl}${resolvedThumb}`;
    return `${siteUrl}/img/${resolvedThumb}`;
  })();

  const pageSchema = {
    '@type': 'WebPage', '@id': `${canonicalUrl}#webpage`, url: canonicalUrl,
    name: title, description, inLanguage: 'en',
    isPartOf: { '@id': websiteId }, about: { '@id': personId },
  };
  const extraNodes = structuredData
    ? (Array.isArray(structuredData['@graph']) ? structuredData['@graph'] : [structuredData])
    : [];
  const graph = { '@context': 'https://schema.org', '@graph': [personSchema, websiteSchema, pageSchema, ...extraNodes] };

  const metaTags = [
    {
      name: `description`,
      content: description,
    },
    {
      name: `keywords`,
      content: keywords.join(', '),
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:url`,
      content: canonicalUrl,
    },
    {
      property: `og:site_name`,
      content: `Moha Graphics`,
    },
    {
      property: `og:image`,
      itemprop: 'image',
      content: imageUrl,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:image`,
      content: imageUrl,
    },
    {
      name: `twitter:image:alt`,
      content: title,
    },
    //     {
    //       name: `twitter:creator`,
    //       content: site.siteMetadata.social.twitter,
    //     },
    //     {
    //       name: `twitter:site`,
    //       content: site.siteMetadata.social.twitter,
    //     },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
    {
      name: 'google-site-verification',
      content: 'We7BOl_CZVyDeFTxQEtsewDNNE2nwsw5rJi7Kf1s4JA',
    },
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      {!noindex && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
        />
      )}
      {metaTags.map((tag, i) => {
        const key = tag.name || tag.property || `meta-${i}`;
        if (tag.name)
          return (
            <meta
              key={key}
              name={tag.name}
              content={tag.content}
            />
          );
        return (
          <meta
            key={key}
            property={tag.property}
            content={tag.content}
          />
        );
      })}
    </Head>
  );
};
