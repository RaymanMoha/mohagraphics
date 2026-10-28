import { useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Film } from './films';
import styles from './styles.module.css';

export function FilmPlayer({ film, onClose }: { film: Film; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    // Browsers that restrict autoplay still expose native playback controls.
    video.current?.play().catch(() => {});
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialog} className={styles.dialog} onClose={onClose}
      aria-labelledby="film-player-title" onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}>
      <div className={styles.playerHeader}>
        <div><span>{film.brand}</span><h3 id="film-player-title">{film.title}</h3></div>
        <button type="button" autoFocus aria-label="Close film" onClick={() => dialog.current?.close()}><FiX aria-hidden="true" /></button>
      </div>
      <video ref={video} className={styles.video} src={`/films/${film.slug}.mp4`}
        poster={`/films/${film.slug}.jpg`} controls playsInline preload="metadata"
        aria-label={film.title} onError={() => setFailed(true)} />
      {failed ? <p className={styles.error}>The film could not load. <a href={`/films/${film.slug}.mp4`}>Open the video directly</a>.</p> : null}
      <p className={styles.playerDescription}>{film.description}</p>
    </dialog>
  );
}
