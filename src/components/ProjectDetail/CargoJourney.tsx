import { useState } from 'react';
import Image from 'next/image';
import { Content } from '@/content/projects';
import styles from './CargoJourney.module.css';

const stages = ['Dispatch desk', 'Warehouse network', 'Business records'];

export function CargoJourney({
  gallery,
}: {
  gallery: NonNullable<Content['gallery']>;
}) {
  const [active, setActive] = useState(0);
  const item = gallery[active];
  return (
    <section className={styles.journey} aria-labelledby="cargo-journey-title">
      <header>
        <span className={styles.eyebrow}>Inside the operations console</span>
        <h2 id="cargo-journey-title">
          Follow the cargo.
          <br />
          See the whole operation.
        </h2>
        <p>Three connected views, from the waybill to the records behind it.</p>
      </header>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Cargo workflow screenshots"
      >
        {gallery.map((shot, index) => (
          <button
            key={shot.src}
            id={`cargo-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`cargo-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % gallery.length
                  : event.key === 'ArrowLeft'
                    ? (index + gallery.length - 1) % gallery.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? gallery.length - 1
                        : null;
              if (next !== null) {
                event.preventDefault();
                setActive(next);
                document.getElementById(`cargo-tab-${next}`)?.focus();
              }
            }}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {stages[index]}
          </button>
        ))}
      </div>
      {gallery.map((shot, index) => (
        <div
          key={shot.src}
          role="tabpanel"
          id={`cargo-panel-${index}`}
          aria-labelledby={`cargo-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
        >
          {active === index && (
            <figure className={styles.screen}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="90vw"
              />
              <figcaption>
                <p>{item.caption}</p>
                <a href={shot.src} target="_blank" rel="noreferrer">
                  Open full screenshot ↗
                </a>
              </figcaption>
            </figure>
          )}
        </div>
      ))}
      <p className={styles.note}>
        Captured from the working development application. Customer identifiers
        and account details are masked.
      </p>
      <section
        className={styles.walkthrough}
        aria-labelledby="cargo-mobile-title"
      >
        <div className={styles.walkthroughIntro}>
          <span className={styles.eyebrow}>The mobile workflow</span>
          <h2 id="cargo-mobile-title">
            Cargo operations,
            <br />
            on the move.
          </h2>
          <p id="cargo-video-description">
            A 2-minute, 10-second walkthrough of the Safariline mobile
            experience, using sample records. Follow arrival confirmation, cargo
            selection, dispatch, receiving, and shipment lookup.
          </p>
        </div>
        <figure className={styles.videoFigure}>
          <video
            controls
            playsInline
            preload="none"
            poster="/projects/SafarilineCargo/mobile-walkthrough-poster.jpg"
            width={1920}
            height={1080}
            aria-label="Safariline Cargo mobile workflow walkthrough"
            aria-describedby="cargo-video-description"
          >
            <source
              src="/projects/SafarilineCargo/mobile-walkthrough.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.{' '}
            <a href="/projects/SafarilineCargo/mobile-walkthrough.mp4">
              Download the walkthrough
            </a>
            .
          </video>
          <figcaption>
            <span>Safariline mobile workflow · 2:10</span>
            <a href="/projects/SafarilineCargo/mobile-walkthrough.mp4" download>
              Download video
            </a>
          </figcaption>
        </figure>
      </section>
      <section
        className={styles.walkthrough}
        aria-labelledby="cargo-platform-title"
      >
        <div className={styles.walkthroughIntro}>
          <span className={styles.eyebrow}>The web workflow</span>
          <h2 id="cargo-platform-title">
            From first waybill
            <br />
            to final delivery.
          </h2>
          <p id="cargo-platform-description">
            Watch the operations workflow across shipment creation, cargo and
            pricing, departure confirmation, warehouse dispatch, payment, and
            the shipment history. A 4-minute, 32-second product recording.
          </p>
        </div>
        <figure className={styles.videoFigure}>
          <video
            controls
            playsInline
            preload="none"
            poster="/projects/SafarilineCargo/platform-walkthrough-poster.jpg"
            width={1280}
            height={720}
            aria-label="Safariline Cargo web operations walkthrough"
            aria-describedby="cargo-platform-description"
          >
            <source
              src="/projects/SafarilineCargo/platform-walkthrough.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.{' '}
            <a href="/projects/SafarilineCargo/platform-walkthrough.mp4">
              Download the web walkthrough
            </a>
            .
          </video>
          <figcaption>
            <span>Safariline web workflow · 4:32</span>
            <a
              href="/projects/SafarilineCargo/platform-walkthrough.mp4"
              download
            >
              Download video
            </a>
          </figcaption>
        </figure>
      </section>
    </section>
  );
}
