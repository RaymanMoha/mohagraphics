import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiPlus } from 'react-icons/fi';
import { SEO } from '@/components/SEO';
import { servicePages } from '@/content/services';
import { offers, steps, faqs } from '@/components/Services/content';
import { ProjectContact } from '@/components/Services/ProjectContact';
import styles from '@/components/Services/styles.module.css';

const structuredData = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': 'https://www.mohagraphics.tech/#studio',
  name: 'Moha Graphics', url: 'https://www.mohagraphics.tech/services',
  description: 'Web and mobile development, website and product UX, brand campaigns, and films and motion by Mohammed Abdirahman.',
  areaServed: ['Kenya', 'Africa', 'Remote'],
  founder: { '@id': 'https://www.mohagraphics.tech/#person' },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Development and creative services',
    itemListElement: servicePages.map((service) => ({ '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title,
        url: `https://www.mohagraphics.tech/services/${service.slug}`,
        provider: { '@id': 'https://www.mohagraphics.tech/#person' } } })) },
  email: 'abdulmoharayman@gmail.com', telephone: '+254799722501',
};

export default function Services() {
  const [selected, setSelected] = useState('Product build');
  return (
    <>
      <SEO title="Development, Design & Creative Services | Mohammed Abdirahman"
        description="Web and mobile products, product UX, brand campaigns, and films. Work with Mohammed Abdirahman in Nairobi and remotely."
        lang="en" thumb="/img/reon-capital-overview.jpg" canonical="https://www.mohagraphics.tech/services"
        structuredData={structuredData} keywords={['frontend developer Kenya', 'mobile app development', 'website design', 'product UX', 'brand campaign design', 'films and motion', 'Nairobi']} />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="services-hero-title">
          <div className={styles.heroCopy}>
            <h1 id="services-hero-title">Built to work.<br />Designed to<br /><em>matter.</em></h1>
            <p className={styles.lead}>Web and mobile products, thoughtful interfaces, brand campaigns, and films. I connect the product with the way people experience it.</p>
            <div className={styles.actions}>
              <a className={styles.coralButton} href="#start-project">Start a project <FiArrowRight /></a>
              <a className={styles.textLink} href="#service-offerings">Explore services</a>
            </div>
            <p className={styles.location}>Nairobi, Kenya / Working locally and remotely</p>
          </div>
          <div className={styles.visual} aria-label="Selected product, campaign, and film work">
            <Link href="/campaigns/budj-merchandise" className={styles.merchVisual} aria-label="Explore Budj merchandise design mockups">
              <img src="/campaigns/merch-black-and-blue.webp" alt="Budj T-shirt and hoodie design mockups" width="989" height="989" />
            </Link>
            <Link href="/projects/Budj/" className={styles.productVisual} aria-label="Explore the Budj product project">
              <img src="/img/budj-overview.png" alt="Budj customer loyalty website design" width="1600" height="900" fetchPriority="high" />
            </Link>
            <Link href="/films" className={styles.filmVisual} aria-label="Explore brand films and motion">
              <img src="/films/bag-ya-makaratasi.jpg" alt="ShambaBoy farm story film still" width="600" height="1067" />
            </Link>
            <p className={styles.visualCaption}>Products. Campaigns. Stories.</p>
          </div>
        </section>

        <section id="service-offerings" className={styles.offerings} aria-labelledby="offers-title">
          <header className={styles.sectionHeading}>
            <h2 id="offers-title">Four ways to<br />work together<span>.</span></h2>
            <p>Bring a new idea, an existing product, or a campaign that needs a clearer direction.</p>
          </header>
          {offers.map((offer, index) => (
            <article key={offer.id} className={styles.serviceRow} aria-labelledby={`${offer.id}-title`}>
              <span className={styles.number}>0{index + 1}</span>
              <h3 id={`${offer.id}-title`}>{offer.title}</h3>
              <div className={styles.serviceCopy}>
                <p>{offer.description}</p>
                <ul>{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link className={styles.textLink} href={`/services/${servicePages.find((service) => service.offerId === offer.id)!.slug}`}>Explore this service <FiArrowRight /></Link><br />
                <a className={styles.textLink} href="#start-project" aria-label={`Discuss ${offer.title}`} onClick={() => setSelected(offer.interest)}>Discuss this service <FiArrowRight /></a>
              </div>
              <div className={styles.proof}>
                <Link href={offer.href} aria-label={`See related work for ${offer.title}`}>
                  <img src={offer.image} alt={offer.alt} width="640" height="480" loading="lazy" />
                </Link>
                <Link href={offer.href} className={styles.textLink}>See related work <FiArrowRight /></Link>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <h2 id="process-title">A clear process.<br />Room for <em>good ideas.</em></h2>
          <ol>{steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
        </section>

        <section className={styles.faq} aria-labelledby="faq-title">
          <h2 id="faq-title">Before we start<span>.</span></h2>
          <div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<FiPlus aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </section>
        <ProjectContact selected={selected} onSelect={setSelected} />
      </main>
    </>
  );
}
