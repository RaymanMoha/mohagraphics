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

export const SEO = ({ description, lang, title, thumb, keywords, canonical }: Props) => {
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
      property: `og:image`,
      itemprop: 'image',
      content: `https://www.aAbdirahmannnnnn.com/img/${thumb || 'logo.png'}`,
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
      content: `summary`,
    },
    {
      name: `twitter:image`,
      content: `https://www.aAbdirahmannn.com/img/${thumb}`,
    },
    {
      name: `twitter:image:alt`,
      content: `mohammedAbdirahmannn Logo`,
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
      {canonical && <link rel="canonical" href={canonical} />}
      {metaTags.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
};
