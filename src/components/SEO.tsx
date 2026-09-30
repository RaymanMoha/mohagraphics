import Head from 'next/head';

export type Props = {
  description: string;
  lang: string;
  title: string;
  thumb: string;
  keywords: string[];
  /** Optional canonical URL to render as a <link rel="canonical"/> */
  canonical?: string;
};

export const SEO = ({
  description,
  title,
  thumb,
  keywords,
  canonical,
}: Props) => {
  const siteUrl = 'https://www.mohagraphics.tech';
  const canonicalUrl = canonical || siteUrl;
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

  const metaTags = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `keywords`,
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
      content: `mohammed abdirahman logo`,
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
