import { FiPlay } from 'react-icons/fi';
import { Film } from './films';
import styles from './styles.module.css';

export function FilmCard({ film, index, onSelect }: { film: Film; index: number; onSelect: (film: Film) => void }) {
  return (
    <article className={styles.card}>
      <button type="button" className={styles.cover} aria-label={`Play ${film.title}`} onClick={() => onSelect(film)}>
        <img src={`/films/${film.slug}.jpg`} alt="" loading="lazy" width={film.width || 600} height={film.height || 1067} />
        <span className={styles.play} aria-hidden="true"><FiPlay /></span>
        <span className={styles.coverFooter}><span>{film.brand}</span><span>{film.duration}</span></span>
      </button>
      <div className={styles.caption}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{film.title}</h3><p>{film.description}</p></div></div>
    </article>
  );
}
