import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { films, Film } from '@/components/Films/films';
import { FilmCard } from '@/components/Films/FilmCard';
import { FilmPlayer } from '@/components/Films/FilmPlayer';
import { SEO } from '@/components/SEO';
import styles from '@/components/Films/styles.module.css';

const brands = Array.from(new Set(films.map((film) => film.brand)));
const categories = Array.from(new Set(films.map((film) => film.category)));
export default function FilmLibrary() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Film | null>(null);
  const visible = films.filter((film) => (brand === 'All' || film.brand === brand)
    && (category === 'All' || film.category === category)
    && `${film.title} ${film.brand} ${film.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  const reset = () => { setQuery(''); setBrand('All'); setCategory('All'); };
  return (
    <>
      <SEO title="Films & Motion | Mohammed Abdirahman" description="Brand films, animation, and motion graphics for Budj and ShambaBoy." lang="en" thumb="/films/budj-clay-city.jpg" keywords={['brand films', 'motion graphics', 'animation', 'Budj', 'ShambaBoy']} canonical="https://www.mohagraphics.tech/films" />
      <main className={`${styles.section} ${styles.library}`}>
        <Link className={styles.libraryBack} href="/#films"><FiArrowLeft /> Back to portfolio</Link>
        <header className={styles.heading}>
          <h1>Films &amp; <span>Motion.</span></h1>
          <p className={styles.intro}>Brand stories, animation, and visual experiments. Explore the full collection.</p>
        </header>
        <div className={styles.filters}>
          <label>Search films<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or theme" /></label>
          <label>Brand<select aria-label="Brand" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="All">All brands</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Style<select aria-label="Style" value={category} onChange={(event) => setCategory(event.target.value)}><option value="All">All styles</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <p className={styles.resultCount} role="status">{visible.length} of {films.length} films</p>
        {visible.length ? <div className={styles.libraryGrid}>{visible.map((film, index) => <FilmCard key={film.slug} film={film} index={index} onSelect={setSelected} />)}</div>
          : <div className={styles.empty}><p>No films match these filters.</p><button type="button" onClick={reset}>Clear filters</button></div>}
      </main>
      {selected ? <FilmPlayer key={selected.slug} film={selected} onClose={() => setSelected(null)} /> : null}
    </>
  );
}
