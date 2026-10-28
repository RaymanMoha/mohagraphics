import { FiArrowUpRight } from 'react-icons/fi';
import { offers } from './content';
import styles from './styles.module.css';

export function ProjectContact({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  const subject = `Project brief — ${selected}`;
  const body = `Hi Mohammed,\n\nI’d like to discuss ${selected.toLowerCase()}.\n\nThe idea / goal:\n\nCurrent website or app (if any):\n\nTimeline:\n\nThanks,`;
  const emailHref = `mailto:abdulmoharayman@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return (
    <section id="start-project" className={styles.contact} aria-labelledby="contact-title">
      <h2 id="contact-title">What are you<br />working on<span>?</span></h2>
      <div>
        <p className={styles.contactIntro}>Share the idea, the current link if there is one, and your timeline.</p>
        <div className={styles.interests} role="group" aria-label="Choose a project type">
          {offers.map((offer) => <button key={offer.id} type="button" aria-pressed={selected === offer.interest} onClick={() => onSelect(offer.interest)}>{offer.interest}</button>)}
        </div>
        <div className={styles.contactActions}>
          <a className={styles.inkButton} href={emailHref}>Email a project brief <FiArrowUpRight /></a>
          <a className={styles.textLink} href="https://calendly.com/abdulmoharayman/30min" target="_blank" rel="noreferrer">Book a project call <FiArrowUpRight /></a>
        </div>
        <a className={styles.email} href="mailto:abdulmoharayman@gmail.com">abdulmoharayman@gmail.com</a>
      </div>
    </section>
  );
}
