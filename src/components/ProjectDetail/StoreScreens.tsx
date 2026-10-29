import { useRef } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { Content } from '@/content/projects';
import styles from './StoreScreens.module.css';

type Store = NonNullable<Content['store']>;

export function StoreScreens({ store }: { store: Store }) {
  const strip = useRef<HTMLDivElement>(null);
  const browse = (direction: number) => {
    const element = strip.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * .75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <section className={styles.section} aria-labelledby="mobile-app-title">
    <header className={styles.heading}>
      <div><span className={styles.label}>Published Android app</span>
        <h2 id="mobile-app-title">{store.name} on mobile<span>.</span></h2>
        <p>Official screenshots from the Google Play listing by {store.publisher}.</p>
      </div>
      <a href={store.url} target="_blank" rel="noopener noreferrer">View on Google Play <FiArrowUpRight aria-hidden="true" /></a>
    </header>
    <div className={styles.controls}>
      <p>Scroll through {store.screenshots.length} app screens</p>
      <div><button type="button" onClick={() => browse(-1)} aria-label={`Previous ${store.name} screenshots`} aria-controls="mobile-app-screens"><FiArrowLeft /></button>
        <button type="button" onClick={() => browse(1)} aria-label={`Next ${store.name} screenshots`} aria-controls="mobile-app-screens"><FiArrowRight /></button></div>
    </div>
    <div id="mobile-app-screens" ref={strip} className={styles.strip} role="region" aria-label={`${store.name} app screenshots`} tabIndex={0}>
      {store.screenshots.map((shot, index) => <figure key={shot.src} className={styles.screen}>
        <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${store.name} screenshot ${index + 1} at full size`}>
          <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 700px) 75vw, 330px" />
        </a>
        <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{shot.caption}</figcaption>
      </figure>)}
    </div>
  </section>;
}
