import { Hero, HeroP, colors } from '../styles/components';

import Social from '../components/Social';

import { HighlightedWords } from '@/components/HighlightedWords';
import { HeroSection, Section } from '@/components/Landing';
import { BioSection } from '@/components/Landing/Bio';
import { MakeClouds } from '@/components/Landing/Clouds';
import { ContactSection } from '@/components/Landing/Contact';
import { ProjectsSection } from '@/components/Landing/Projects';
import { useLogger } from '@/hooks/useLogger';
import { landingPage } from '@/content/landing';
import { SEO } from '@/components/SEO';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const Index = ({
  mainpitch,
  bio,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useLogger();

  const { title, subtitle } = mainpitch;

  return (
    <>
      <SEO
        title="Mohammed Abdirahman | Frontend Developer & Software Engineer"
        description="Passionate frontend developer specializing in React, Next.js, and modern web technologies. Creating intuitive user interfaces and high-performance web applications."
        lang="en"
        thumb="landingImage.jpg"
        keywords={[
          'frontend developer',
          'software engineer',
          'react developer',
          'nextjs developer',
          'web developer',
          'javascript developer',
          'ui/ux developer',
          'responsive design',
          'web applications',
          'mohammed abdirahman',
          'portfolio'
        ]}
        canonical="https://www.mohammedabdirahman.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mohammed Abdirahman",
          "jobTitle": "Frontend Developer",
          "description": "Passionate frontend developer specializing in React, Next.js, and modern web technologies",
          "url": "https://www.mohammedabdirahman.com",
          "image": "https://www.mohammedabdirahman.com/img/landingImage.jpg",
          "sameAs": [
            "https://github.com/RaymanMoha",
            "https://linkedin.com/in/mohammed-abdirahman",
            "https://twitter.com/mohamedabdi__"
          ],
          "knowsAbout": [
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "Frontend Development",
            "Web Development",
            "UI/UX Design"
          ],
          "alumniOf": {
            "@type": "Organization",
            "name": "ALX Software Engineering Program"
          }
        }}
      />
      <div
        style={{
          padding: '0 clamp(1rem, 7vw, 200px)',
          background: colors.background,
        }}
      >
        <HeroSection invert={true}>
          <div>
            <MakeClouds cloudCount={30} mult={1} />
            <div className="marquee">
              <Hero invert={true}>
                <HighlightedWords title={title} />
              </Hero>
              <Social />
              <HeroP>{subtitle}</HeroP>
            </div>
          </div>
        </HeroSection>
        <img
          src="img/flame.gif"
          alt="Animated flame decoration representing passion for development"
          style={{
            position: 'absolute',
            top: '400px',
            right: '150px',
            width: '500px', // Adjust as needed
            height: '500px',
          }}
        />
      </div>

      <Section id="bio">
        <BioSection bio={bio} />
      </Section>

      {/* Hiding featured section during refactor */}
      {/* <Section id="featured">
        <h1>
          <HighlightedWords title={'**Featured'} />
        </h1>
        <Featured />
      </Section> */}

      <Section id="projects">
        <ProjectsSection projects={projects} />
      </Section>

      <Section id="contact">
        <ContactSection />
      </Section>
    </>
  );
};

export const getStaticProps = (async () => {
  return {
    props: { ...landingPage },
  };
}) satisfies GetStaticProps;

export default Index;

