import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { HighlightedWords } from '../HighlightedWords';
import SkillIcons from '../SkillIcons';
import { Features } from './Features';
import styles from './Bio.module.css';

type Props = {
  bio: {
    title: string;
    features: { body: string; header: string }[];
    image: string;
  };
};

export const BioSection = ({ bio }: Props) => (
  <div className={styles.layout}>
    <div className={styles.skills}>
      <header className={styles.heading}>
        <Image
          src="/img/mohammed.jpeg"
          alt="Mohammed Abdirahman"
          width={72}
          height={72}
          className={styles.portrait}
        />
        <h2>
          <HighlightedWords title={bio.title} />
        </h2>
      </header>
      <SkillIcons />
      <div className={styles.features}>
        <Features features={bio.features} />
      </div>
      <Link href="/about" className={styles.aboutLink}>
        More about me <FiArrowUpRight aria-hidden="true" />
      </Link>
    </div>
    <section className={styles.film} aria-labelledby="skills-film-title">
      <div className={styles.filmHeading}>
        <span>My story, in motion</span>
        <h3 id="skills-film-title">The Last Frontend Engineer.</h3>
      </div>
      <video
        controls
        playsInline
        preload="none"
        poster="/about/the-last-frontend-engineer-poster.jpg"
        width={1280}
        height={720}
        aria-label="Watch The Last Frontend Engineer"
      >
        <source src="/about/the-last-frontend-engineer.mp4" type="video/mp4" />
        Your browser does not support embedded video.{' '}
        <Link href="/about#personal-film">Watch on my About page</Link>.
      </video>
      <div className={styles.filmFooter}>
        <span>
          Animated short <span aria-hidden="true">/</span> 1:49
        </span>
        <Link href="/about#personal-film">
          Explore my films <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  </div>
);
