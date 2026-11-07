import styles from './CargoJourney.module.css';

export function CargoJourney() {
  return (
    <div className={styles.journey}>
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
    </div>
  );
}
