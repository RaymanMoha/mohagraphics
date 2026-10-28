import { useState } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { FiArrowLeft, FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { campaigns, Campaign } from '@/components/Campaigns/data';
import { CampaignLightbox } from '@/components/Campaigns/Lightbox';
import { SEO } from '@/components/SEO';
import styles from '@/components/Campaigns/styles.module.css';

export default function CampaignPage({ campaign }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <SEO title={`${campaign.title} | Mohammed Abdirahman`} description={campaign.description} lang="en"
        thumb={`/campaigns/${campaign.cover}.webp`} keywords={['Budj', 'brand design', 'campaign design', 'Mohammed Abdirahman']}
        canonical={`https://www.mohagraphics.tech/campaigns/${campaign.slug}`} />
      <main className={styles.galleryPage}>
        <Link href="/#campaigns" className={styles.back}><FiArrowLeft /> Brand &amp; Campaigns</Link>
        <header className={styles.galleryHeading}>
          <span>{campaign.category}</span>
          <h1>{campaign.title}</h1>
          <p>{campaign.description}</p>
        </header>
        <div className={styles.gallery}>
          {campaign.images.map((image, index) => (
            <figure key={image.file} className={image.width / image.height > 1.4 ? styles.wide : undefined}>
              <button type="button" className={styles.galleryImage} aria-label={`View ${image.title}`} onClick={() => setActive(index)}>
                <img src={`/campaigns/${image.file}.webp`} alt={image.title} width={image.width} height={image.height} loading={index === 0 ? 'eager' : 'lazy'} />
                <span aria-hidden="true"><FiMaximize2 /></span>
              </button>
              <figcaption><h2>{image.title}</h2><p>{image.caption}</p></figcaption>
            </figure>
          ))}
        </div>
        <nav className={styles.more} aria-label="Other design collections">
          <h2>Explore more.</h2>
          {campaigns.filter((item) => item.slug !== campaign.slug).map((item) => (
            <Link key={item.slug} href={`/campaigns/${item.slug}`}><span>{item.title}</span><FiArrowUpRight /></Link>
          ))}
        </nav>
      </main>
      {active !== null ? <CampaignLightbox key={campaign.slug} images={campaign.images} initial={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => ({ paths: campaigns.map((item) => ({ params: { slug: item.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<{ campaign: Campaign }> = async ({ params }) => {
  const campaign = campaigns.find((item) => item.slug === params?.slug);
  return campaign ? { props: { campaign } } : { notFound: true };
};
