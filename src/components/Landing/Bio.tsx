import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { coreSkills, creativeSkills } from '@/content/skills';
import styles from './Bio.module.css';

type Props = {
  bio: {
    title: string;
    features: { body: string; header: string }[];
    image: string;
  };
};

const SkillGroup = ({ title, tools }: { title: string; tools: string[] }) => (
  <div className={styles.skillGroup}>
    <h3>{title}</h3>
    <ul>
      {tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  </div>
);

export const BioSection = ({ bio }: Props) => (
  <section id="bio" className={styles.section} aria-labelledby="skills-title">
    <header className={styles.heading}>
      <div>
        <h2 id="skills-title">
          {bio.title.replaceAll('**', '')}
          <span>.</span>
        </h2>
        <p className={styles.intro}>
          Web and mobile engineering, product design, and visual storytelling.
        </p>
      </div>
      <Link
        href="/about"
        className={styles.profile}
        aria-label="About Mohammed Abdirahman"
      >
        <Image
          src="/img/mohammed.jpeg"
          alt=""
          width={56}
          height={56}
          className={styles.portrait}
        />
        <span>
          Mohammed Abdirahman<small>Developer & designer</small>
        </span>
        <FiArrowUpRight aria-hidden="true" />
      </Link>
    </header>
    <div className={styles.layout}>
      <div className={styles.skills}>
        <div className={styles.skillGroups}>
          {coreSkills.map((group) => (
            <SkillGroup key={group.title} {...group} />
          ))}
        </div>
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
          <source
            src="/about/the-last-frontend-engineer.mp4"
            type="video/mp4"
          />
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
    <div className={styles.creative}>
      <div className={styles.creativeGrid}>
        {creativeSkills.map((group) => (
          <SkillGroup key={group.title} {...group} />
        ))}
      </div>
    </div>
    <footer className={styles.footer}>
      <Link href="/about" className={styles.aboutLink}>
        More about me <FiArrowUpRight aria-hidden="true" />
      </Link>
    </footer>
  </section>
);
