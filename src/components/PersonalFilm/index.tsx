import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiPlay } from 'react-icons/fi';
import styles from './PersonalFilm.module.css';

const poster = '/about/the-last-frontend-engineer-poster.jpg';
const video = '/about/the-last-frontend-engineer.mp4';

export function PersonalFilm({ preview = false }: { preview?: boolean }) {
  if (preview) {
    return (
      <section
        className={styles.preview}
        aria-labelledby="personal-film-preview-title"
      >
        <Link
          href="/about#personal-film"
          className={styles.previewImage}
          aria-label="Watch The Last Frontend Engineer on the About page"
        >
          <Image
            src={poster}
            alt="Animated portrait of a frontend engineer working at his laptop"
            width={1280}
            height={720}
            sizes="(max-width: 760px) 90vw, 55vw"
          />
        </Link>
        <div className={styles.previewCopy}>
          <span className={styles.eyebrow}>A little more about me</span>
          <h2 id="personal-film-preview-title">
            The Last <br />
            Frontend Engineer.
          </h2>
          <p>
            A playful animated take on life as a frontend engineer in Nairobi.
          </p>
          <Link href="/about#personal-film" className={styles.watch}>
            <FiPlay aria-hidden="true" /> Watch my story <span>1:49</span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }
  return (
    <>
      <section
        id="personal-film"
        className={styles.film}
        aria-labelledby="personal-film-title"
      >
        <span className={styles.eyebrow}>My story, in motion</span>
        <h2 id="personal-film-title">The Last Frontend Engineer.</h2>
        <figure>
          <video
            controls
            playsInline
            preload="none"
            poster={poster}
            width={1280}
            height={720}
            aria-label="The Last Frontend Engineer — a short film about Mohammed"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href={video}>Download the film</a>.
          </video>
          <figcaption>
            <span>Animated short · 1:49 · Subtitles included in the video</span>
            <a href={video} download>
              Download film <FiArrowUpRight aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </section>
      <section
        id="version-five"
        className={styles.film}
        aria-labelledby="version-five-title"
      >
        <span className={styles.eyebrow}>The journey so far</span>
        <h2 id="version-five-title">Mohammed. Version Five.</h2>
        <figure>
          <video
            controls
            playsInline
            preload="none"
            poster="/about/mohammed-version-five-poster.jpg"
            width={1280}
            height={720}
            aria-label="Mohammed. Version Five. — my development journey"
          >
            <source src="/about/mohammed-version-five.mp4" type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href="/about/mohammed-version-five.mp4">Download the film</a>.
          </video>
          <figcaption>
            <span>Animated short · 1:00 · Subtitles included in the video</span>
            <a href="/about/mohammed-version-five.mp4" download>
              Download film <FiArrowUpRight aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </section>
      <section
        id="friday-5pm"
        className={styles.film}
        aria-labelledby="friday-film-title"
      >
        <span className={styles.eyebrow}>Another side of the story</span>
        <h2 id="friday-film-title">Friday, 5 PM.</h2>
        <figure>
          <video
            controls
            playsInline
            preload="none"
            poster="/about/friday-5pm-poster.jpg"
            width={1280}
            height={720}
            aria-label="Friday, 5 PM — Moha vs. production"
          >
            <source src="/about/friday-5pm.mp4" type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href="/about/friday-5pm.mp4">Download the film</a>.
          </video>
          <figcaption>
            <span>Animated short · 1:02 · Subtitles included in the video</span>
            <a href="/about/friday-5pm.mp4" download>
              Download film <FiArrowUpRight aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
