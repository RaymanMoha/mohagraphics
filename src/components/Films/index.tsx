import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { films, featuredFilms, Film } from './films';
import { FilmPlayer } from './FilmPlayer';
import { FilmCard } from './FilmCard';
import styles from './styles.module.css';

export function FilmsSection() {
  const [selected, setSelected] = useState<Film | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = () => {
    const element = strip.current;
    if (element) setEdges({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
  };
  useEffect(() => {
    const observer = new ResizeObserver(updateEdges);
    if (strip.current) observer.observe(strip.current);
    return () => observer.disconnect();
  }, []);
  const browse = (direction: number) => {
    const element = strip.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (element) element.scrollBy({ left: direction * element.clientWidth * .75, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  return (
    <section id="films" className={styles.section} aria-labelledby="films-title">
      <header className={styles.heading}>
        <h2 id="films-title">Films &amp; <span>Motion.</span></h2>
        <div className={styles.headingSide}>
          <div><p className={styles.intro}>Stories with a local voice. Brand films, visual experiments, and motion work.</p><Link href="/films" className={styles.libraryLink}>Explore all {films.length} films <FiArrowRight /></Link></div>
          <div className={styles.browse}>
            <button type="button" aria-label="Previous films" aria-controls="film-strip" disabled={edges.start} onClick={() => browse(-1)}><FiArrowLeft /></button>
            <button type="button" aria-label="Next films" aria-controls="film-strip" disabled={edges.end} onClick={() => browse(1)}><FiArrowRight /></button>
          </div>
        </div>
      </header>
      <div id="film-strip" ref={strip} onScroll={updateEdges} className={styles.grid} role="region" aria-label={`Browse ${featuredFilms.length} selected films`} tabIndex={0}>
        {featuredFilms.map((film, index) => (
          <FilmCard key={film.slug} film={film} index={index} onSelect={setSelected} />
        ))}
        <Link href="/films" className={`${styles.card} ${styles.viewAll}`}>
          <span className={styles.viewAllIcon} aria-hidden="true"><FiArrowRight /></span>
          <span className={styles.viewAllEyebrow}>Keep watching</span>
          <span className={styles.viewAllTitle}>View all<br />films.</span>
          <span className={styles.viewAllCount}>{films.length} films &amp; motion pieces</span>
        </Link>
      </div>
      {selected ? <FilmPlayer key={selected.slug} film={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}
