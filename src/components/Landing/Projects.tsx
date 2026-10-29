import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { landingPage } from '../../content/landing';
import { PersonalProjects } from './PersonalProjects';
import styles from './Projects.module.css';

type Props = { projects: typeof landingPage.projects };
type Project = Props['projects'][number];
const select = (projects: Project[], titles: string[]) => titles
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is Project => Boolean(project));
const titleOf = (title: string) => title.split(' - ')[0].split(':')[0];

export const ProjectsSection = ({ projects }: Props) => {
  const featured = select(projects, ['Budj', 'ShambaBoy', 'Reon Capital']);
  const personal = select(projects, ['AppBase: WhatsApp Commerce', 'Groundbase: AI Field Intelligence']);
  const shipped = select(projects, ['Reon Capital Dev Hub', 'OnSpace: No-Code Operations Platform']);

  return (
    <section id="projects" className={styles.portfolio} aria-labelledby="products-title">
      <header className={styles.heading}>
        <div className={styles.headingMain}>
          <span className={styles.eyebrow}>Web &amp; mobile development</span>
          <h2 id="products-title">Selected <em>work.</em></h2>
        </div>
        <p>Mobile apps, web platforms, and the thinking behind them. Explore what I built and how it came together.</p>
      </header>
      <div className={styles.featured}>
        {featured.map((project, index) => (
          <article key={project.link} className={styles.project}>
            <Link href={project.link} className={styles.media} aria-label={`View ${project.title} case study`}>
              <img src={`/img/${project.image}`} alt={`${project.title} product interface`}
                width="1600" height="900" loading="lazy" />
              <span className={styles.imageLink} aria-hidden="true"><FiArrowUpRight /></span>
            </Link>
            <div className={styles.copy}>
              <span className={styles.index}>0{index + 1} / Selected product</span>
              <h3>{titleOf(project.title)}</h3>
              <p className={styles.type}>{project.details.type}</p>
              <p className={styles.description}>{project.body}</p>
              <p className={styles.role}>{project.role}</p>
              <Link href={project.link} className={styles.caseStudy}>View case study <FiArrowUpRight /></Link>
            </div>
          </article>
        ))}
      </div>
      <PersonalProjects projects={personal} />
      <section className={styles.shipped} aria-labelledby="also-shipped-title">
        <h3 id="also-shipped-title">Also shipped.</h3>
        <div className={styles.indexList}>
          {shipped.map((project) => (
            <Link key={project.link} href={project.link}>
              <span><small>{project.details.type}</small><strong>{titleOf(project.title.replace(' -Utility Manager', ''))}</strong></span>
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};
