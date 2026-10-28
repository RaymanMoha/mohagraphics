import Link from 'next/link';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import Social from '../Social';
import styles from './HeroContent.module.css';

export function HomeHeroContent({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className={styles.content}>
    <h1>{title.split('\n').map((line) => <span key={line}>{line.split(/(\*\*.*?\*\*)/).map((part, index) => part.startsWith('**') ? <em key={index}>{part.slice(2, -2)}</em> : part)}</span>)}</h1>
    <p className={styles.intro}>{subtitle}</p>
    <div className={styles.actions}>
      <Link className={styles.primary} href="/services#start-project">Start a project <FiArrowUpRight aria-hidden="true" /></Link>
      <a className={styles.secondary} href="#projects">Explore the work <FiArrowDown aria-hidden="true" /></a>
    </div>
    <div className={styles.social}><Social /></div>
  </div>;
}
