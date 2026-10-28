import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiX, FiExternalLink } from 'react-icons/fi';
import { CampaignImage } from './data';
import styles from './styles.module.css';

export function CampaignLightbox({ images, initial, onClose }: {
  images: CampaignImage[]; initial: number; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initial);
  const image = images[index];
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={dialog} className={styles.lightbox} aria-labelledby="artwork-title" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex((value) => Math.max(0, value - 1)); }
        if (event.key === 'ArrowRight') { event.preventDefault(); setIndex((value) => Math.min(images.length - 1, value + 1)); }
      }}>
      <div className={styles.lightboxBar}>
        <span aria-live="polite">{index + 1} / {images.length}</span>
        <button type="button" autoFocus aria-label="Close image viewer" onClick={() => dialog.current?.close()}><FiX /></button>
      </div>
      <img key={image.file} className={styles.fullImage} src={`/campaigns/${image.file}.webp`} alt={image.title} width={image.width} height={image.height} />
      <div className={styles.lightboxCaption}>
        <div><h2 id="artwork-title">{image.title}</h2><p>{image.caption}</p></div>
        <a href={`/campaigns/${image.file}.webp`} target="_blank" rel="noreferrer" aria-label="Open full-size image"><FiExternalLink /></a>
      </div>
      <div className={styles.lightboxNavigation}>
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}><FiArrowLeft /> Previous image</button>
        <button type="button" disabled={index === images.length - 1} onClick={() => setIndex(index + 1)}>Next image <FiArrowRight /></button>
      </div>
    </dialog>
  );
}
