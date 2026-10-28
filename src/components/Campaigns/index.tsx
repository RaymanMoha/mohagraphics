import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { campaigns } from './data';
import styles from './styles.module.css';

export function CampaignsSection() {
  const [outdoor, digital, merchandise] = campaigns;
  return (
    <section id="campaigns" className={styles.section} aria-labelledby="campaigns-title">
      <header className={styles.heading}>
        <h2 id="campaigns-title">Brand &amp; Campaigns.</h2>
        <p>From the first impression to the everyday encounter. Campaigns, outdoor design, and merchandise for Budj.</p>
      </header>
      <article className={styles.lead}>
        <Link className={styles.leadMedia} href={`/campaigns/${outdoor.slug}`} aria-label="Explore outdoor collection">
          <img src={`/campaigns/${outdoor.cover}.webp`} alt="Budj Wateja Warudi billboard installed outdoors" width="978" height="1071" loading="lazy" />
        </Link>
        <div className={styles.leadCopy}>
          <h3>Budj,<br />out in the world.</h3>
          <p>Billboards, merchant signage, and partnership artwork.</p>
          <Link className={styles.explore} href={`/campaigns/${outdoor.slug}`}>Explore collection <FiArrowRight /></Link>
        </div>
      </article>
      <div className={styles.collections}>
        <article>
          <Link href={`/campaigns/${digital.slug}`} className={`${styles.preview} ${styles.posterPair}`} aria-label="Explore digital campaigns">
            <img src="/campaigns/the-second-sale.webp" alt="The first sale gets attention, the second builds your business campaign artwork" width="596" height="800" loading="lazy" />
            <img src="/campaigns/marketing-you-can-see.webp" alt="Marketing You Can Actually See campaign artwork" width="598" height="803" loading="lazy" />
          </Link>
          <h3>{digital.title}</h3>
          <Link className={styles.explore} href={`/campaigns/${digital.slug}`}>Explore collection <FiArrowRight /></Link>
        </article>
        <article>
          <Link href={`/campaigns/${merchandise.slug}`} className={styles.preview} aria-label="Explore merchandise mockups">
            <img src="/campaigns/merch-collection.webp" alt="Budj T-shirt and hoodie front and back design mockups" width="1229" height="819" loading="lazy" />
          </Link>
          <div className={styles.collectionCaption}><h3>{merchandise.title}</h3><span>Design mockups</span></div>
          <Link className={styles.explore} href={`/campaigns/${merchandise.slug}`}>Explore collection <FiArrowRight /></Link>
        </article>
      </div>
    </section>
  );
}
