import { useState } from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { Content } from '@/content/projects';
import styles from './ProjectSlides.module.css';

type Props = { images: NonNullable<Content['gallery']>; title: string };
export function ProjectSlides({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const image = images[index];
  const move = (offset: number) =>
    setIndex((current) => (current + offset + images.length) % images.length);
  return (
    <section
      className={styles.slides}
      aria-labelledby="project-slides-title"
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.target instanceof HTMLSelectElement) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <header>
        <span className={styles.label}>Explore the Developer Hub</span>
        <h2 id="project-slides-title">{title}</h2>
      </header>
      <div className={styles.toolbar}>
        <label>
          Jump to a page
          <select
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
          >
            {images.map((item, i) => (
              <option key={item.src} value={i}>
                {item.caption}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.controls}>
          <span aria-live="polite" aria-atomic="true">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous page"
          >
            <FiArrowLeft />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next page">
            <FiArrowRight />
          </button>
        </div>
      </div>
      <figure
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${images.length}: ${image.caption}`}
      >
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="90vw"
        />
        <figcaption>
          <p>{image.caption}</p>
          <a href={image.src} target="_blank" rel="noreferrer">
            Open full screenshot <FiArrowUpRight />
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
