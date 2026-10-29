import { useState } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { FiArrowLeft, FiArrowUpRight, FiPlus } from 'react-icons/fi';
import { SEO } from '@/components/SEO';
import { ProjectContact } from '@/components/Services/ProjectContact';
import { offers, steps } from '@/components/Services/content';
import { servicePages } from '@/content/services';
import styles from '@/components/Services/styles.module.css';

export default function ServicePage({ service }: InferGetStaticPropsType<typeof getStaticProps>) {
  const offer = offers.find((item) => item.id === service.offerId)!;
  const [selected, setSelected] = useState(offer.interest);
  return <>
    <SEO title={`${service.title} | Mohammed Abdirahman`} description={service.description} lang="en"
      thumb={offer.image} keywords={[offer.title, 'Nairobi', 'Kenya', 'Mohammed Abdirahman']}
      structuredData={{ '@graph': [
        { '@type': 'Service', '@id': `https://www.mohagraphics.tech/services/${service.slug}#service`,
          name: service.title, url: `https://www.mohagraphics.tech/services/${service.slug}`,
          description: service.description, provider: { '@id': 'https://www.mohagraphics.tech/#person' },
          areaServed: ['Kenya', 'Remote'] },
        { '@type': 'FAQPage', '@id': `https://www.mohagraphics.tech/services/${service.slug}#questions`,
          mainEntity: service.faqs.map((faq) => ({ '@type': 'Question', name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ] }} />
    <main className={styles.page}>
      <section className={styles.detailIntro}>
        <Link className={styles.textLink} href="/services"><FiArrowLeft /> All services</Link>
        <div className={styles.detailIntroGrid}>
          <div><p className={styles.location}>Nairobi, Kenya / Working locally and remotely</p>
            <h1>{service.title}<span>.</span></h1><p className={styles.lead}>{service.intro}</p>
            <a className={styles.coralButton} href="#start-project">Discuss your project <FiArrowUpRight /></a>
          </div>
          <img src={offer.image} alt={offer.alt} width="900" height="700" />
        </div>
      </section>
      <section className={styles.offerings}>
        <header className={styles.sectionHeading}><h2>Start with<br />what you need<span>.</span></h2><p>{service.audience}</p></header>
        <div className={styles.detailColumns}>
          <div><h3>What we can work on</h3><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>Scope, price, and delivery dates are agreed after reviewing your brief. Share your goals, audience, existing assets, and intended timeline.</p>
          </div>
          <div><h3>Explore related work</h3>{service.projects.map((project) => <div key={project.href} className={styles.detailProject}>
            <Link className={styles.textLink} href={project.href}>{project.title} <FiArrowUpRight /></Link><p>{project.note}</p>
          </div>)}</div>
        </div>
      </section>
      <section className={styles.process}><h2>A clear process.<br />Room for <em>good ideas.</em></h2>
        <ol>{steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
      </section>
      <section className={styles.faq} aria-labelledby="service-questions">
        <h2 id="service-questions">Before we<br />get started.</h2>
        <div>{service.faqs.map((faq) => <details key={faq.question}>
          <summary>{faq.question}<FiPlus aria-hidden="true" /></summary><p>{faq.answer}</p>
        </details>)}</div>
      </section>
      <ProjectContact selected={selected} onSelect={setSelected} />
      <nav className={styles.detailRelated} aria-label="Other services">{servicePages.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={`/services/${item.slug}`}>{item.title} <FiArrowUpRight /></Link>)}</nav>
    </main>
  </>;
}
export const getStaticPaths: GetStaticPaths = async () => ({ paths: servicePages.map((service) => ({ params: { slug: service.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<{ service: typeof servicePages[number] }> = async ({ params }) => {
  const service = servicePages.find((item) => item.slug === params?.slug);
  return service ? { props: { service } } : { notFound: true };
};
