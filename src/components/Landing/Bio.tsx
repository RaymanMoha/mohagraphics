import Image from 'next/image';
import Link from 'next/link';
import {
  FiArrowUpRight,
  FiCode,
  FiSmartphone,
  FiDatabase,
  FiCloud,
  FiLayout,
  FiBarChart2,
  FiPenTool,
  FiCpu,
} from 'react-icons/fi';
import { coreSkills, creativeSkills } from '@/content/skills';
import styles from './Bio.module.css';

type Props = {
  bio: {
    title: string;
    features: { body: string; header: string }[];
    image: string;
  };
};

const groupIcons = [
  FiCode,
  FiSmartphone,
  FiDatabase,
  FiCloud,
  FiLayout,
  FiBarChart2,
  FiPenTool,
  FiCpu,
];
const SkillGroup = ({
  title,
  tools,
  index,
}: {
  title: string;
  tools: string[];
  index: number;
}) => {
  const Icon = groupIcons[index];
  return (
    <div className={styles.skillGroup}>
      <div className={styles.groupHeading}>
        <span className={styles.groupIcon}>
          <Icon aria-hidden="true" />
        </span>
        <h3>{title}</h3>
      </div>
      <ul>
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </div>
  );
};

export const BioSection = ({ bio }: Props) => (
  <section id="bio" className={styles.section} aria-labelledby="skills-title">
    <header className={styles.heading}>
      <div>
        <span className={styles.eyebrow}>Engineering & creative practice</span>
        <h2 id="skills-title">
          {bio.title.replaceAll('**', '')}
          <span>.</span>
        </h2>
        <p className={styles.intro}>
          Engineering the product. Shaping the experience. Telling the story.
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
          {coreSkills.map((group, index) => (
            <SkillGroup key={group.title} {...group} index={index} />
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
      <header>
        <span className={styles.eyebrow}>Beyond the stack</span>
        <h3>Design, insight & storytelling.</h3>
      </header>
      <div className={styles.creativeGrid}>
        {creativeSkills.map((group, index) => (
          <SkillGroup key={group.title} {...group} index={index + 4} />
        ))}
      </div>
    </div>
    <footer className={styles.footer}>
      <p>Clear interfaces. Thoughtful details. Work that connects.</p>
      <Link href="/about" className={styles.aboutLink}>
        More about me <FiArrowUpRight aria-hidden="true" />
      </Link>
    </footer>
  </section>
);
