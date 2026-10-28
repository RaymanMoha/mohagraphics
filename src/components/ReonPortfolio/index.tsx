import Link from 'next/link';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { reonApps } from '@/content/reonApps';
import styles from './styles.module.css';

export function ReonPortfolio() {
  return (
    <main className={styles.page}>
      <Link href="/#projects" className={styles.back}><FiArrowLeft /> All projects</Link>
      <header className={styles.heading}>
        <div><p className={styles.category}>Mobile & web product portfolio</p><h1>Reon Capital.</h1></div>
        <p>Football, everyday utilities, shopping, and fuel commerce. Mobile applications and developer-facing web work under Reon Capital.</p>
      </header>
      <nav className={styles.index} aria-label="Reon Capital apps">
        {reonApps.map((app) => <a href={`#${app.id}`} key={app.id}>{app.name}<FiArrowUpRight /></a>)}
        <a href="#Sava">Sava<FiArrowUpRight /></a>
        <a href="#ReonDevHub">Developer Hub<FiArrowUpRight /></a>
      </nav>
      {reonApps.map((app) => (
        <section key={app.id} id={app.id} className={styles.app} aria-labelledby={`${app.id}-title`}>
          <div className={styles.copy}>
            <img className={styles.icon} src={app.icon} alt={`${app.name} app icon`} width="80" height="80" loading="lazy" />
            <p className={styles.category}>{app.category}</p>
            <h2 id={`${app.id}-title`}>{app.name}</h2>
            <p>{app.description}</p>
            <ul>{app.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <a className={styles.store} href={app.url} target="_blank" rel="noreferrer">View on Google Play <FiArrowUpRight /></a>
            <Link className={styles.caseStudy} href={`/projects/${app.id}/`}>View project details <FiArrowUpRight /></Link>
            <small>Published by REON Capital. Description and images from the Google Play listing.</small>
          </div>
          <div className={styles.media}>
            <div className={styles.strip} role="region" aria-label={`${app.name} screenshots`} tabIndex={0}>
              {app.screenshots.map((image, index) => <a key={image.src} href={image.src} target="_blank" rel="noreferrer" aria-label={`Open ${app.name} screenshot ${index + 1}`}>
                <img src={image.src} alt={`${app.name} Google Play screenshot ${index + 1}`} width={image.width} height={image.height} loading="lazy" />
              </a>)}
            </div>
            <p className={styles.mediaNote}>{app.screenshots.length} Google Play screenshots · scroll to explore</p>
          </div>
        </section>
      ))}
      <section id="Sava" className={styles.app} aria-labelledby="Sava-title">
        <div className={styles.copy}>
          <p className={styles.category}>Fuel wallet &amp; delivery</p><h2 id="Sava-title">Sava</h2>
          <p>A Reon Capital mobile project connecting fuel wallets, station discovery, ordering, and owner operations.</p>
          <ul><li>Wallet balance and prepaid fuel flows</li><li>Station search and delivery details</li><li>Owner dashboard and transaction history</li></ul>
          <Link className={styles.store} href="/projects/Sava/">View Sava project <FiArrowUpRight /></Link>
          <small>Project interface images from this portfolio.</small>
        </div>
        <div className={styles.media}>
          <div className={styles.strip} role="region" aria-label="Sava project screens" tabIndex={0}>
            {['wallet', 'preload', 'locations', 'owner-dashboard', 'truck'].map((screen) => <a key={screen} href={`/img/sava-${screen}.png`} target="_blank" rel="noreferrer" aria-label={`Open Sava ${screen} screen`}>
              <img src={`/img/sava-${screen}.png`} alt={`Sava ${screen.replaceAll('-', ' ')} interface`} width="400" height="800" loading="lazy" />
            </a>)}
          </div><p className={styles.mediaNote}>Wallet, payments, locations, and operations · project screens</p>
        </div>
      </section>
      <section id="ReonDevHub" className={styles.app} aria-labelledby="ReonDevHub-title">
        <div className={styles.copy}>
          <p className={styles.category}>Developer portal · Web</p><h2 id="ReonDevHub-title">Developer Hub</h2>
          <p>A branded entry point for the Reon Capital developer portal, with focused sign-in and account creation flows.</p>
          <ul><li>Separate sign-in and account creation experiences</li><li>Clear form hierarchy and branded presentation</li><li>Responsive desktop and mobile layouts</li></ul>
          <Link className={styles.store} href="/projects/ReonDevHub/">View Developer Hub project <FiArrowUpRight /></Link>
          <a className={styles.caseStudy} href="https://dev-2cbg.vercel.app/" target="_blank" rel="noreferrer">Visit Developer Hub <FiArrowUpRight /></a>
          <small>Next.js and Tailwind CSS · project interface image.</small>
        </div>
        <Link href="/projects/ReonDevHub/" className={styles.hubPreview} aria-label="View Developer Hub case study">
          <img src="/img/reon-dev-hub-overview.png" alt="Reon Capital Developer Hub sign-in and account creation interface" width="1600" height="900" loading="lazy" />
        </Link>
      </section>
    </main>
  );
}
