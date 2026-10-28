import { colors } from '../styles/components';

import { HomeHeroContent } from '@/components/Landing/HeroContent';
import { FilmsSection } from '@/components/Films';
import { CampaignsSection } from '@/components/Campaigns';

import { HeroSection, Section } from '@/components/Landing';
import { BioSection } from '@/components/Landing/Bio';
import { MakeClouds } from '@/components/Landing/Clouds';
import { ContactSection } from '@/components/Landing/Contact';
import { ProjectsSection } from '@/components/Landing/Projects';
import { useLogger } from '@/hooks/useLogger';
import { landingPage } from '@/content/landing';
import { SEO } from '@/components/SEO';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import styled from 'styled-components';

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
        title="Web, Mobile, Brand & Motion | Mohammed Abdirahman, Nairobi"
        description="Websites and mobile apps, brand campaigns, and films by Mohammed Abdirahman. Explore real project work and discuss a brief in Nairobi or remotely."
        structuredData={{
          '@context': 'https://schema.org', '@type': 'Person',
          name: 'Mohammed Abdirahman', url: 'https://www.mohagraphics.tech',
          jobTitle: 'Frontend & Mobile Engineer',
          homeLocation: { '@type': 'Place', name: 'Nairobi, Kenya' },
          email: 'abdulmoharayman@gmail.com',
          sameAs: ['https://github.com/RaymanMoha', 'https://ke.linkedin.com/in/mohammed-abdirahman-1a6b651bb'],
          knowsAbout: ['React', 'Next.js', 'React Native', 'Flutter', 'Product UX', 'Brand campaigns', 'Motion graphics'],
        }}
        lang="en"
        thumb="/img/mohammed.jpeg"
        keywords={[
          'frontend engineer',
          'frontend developer',
          'mobile engineer',
          'react developer',
          'react native developer',
          'flutter developer',
          'next.js developer',
          'typescript developer',
          'javascript developer',
          'responsive web design',
          'ui engineer',
          'ui/ux developer',
          'web application developer',
          'mobile app developer',
          'remote frontend developer',
          'remote mobile developer',
          'nairobi developer',
          'kenya developer',
          'frontend engineer kenya',
          'react native kenya',
          'flutter kenya',
          'product engineer',
          'design systems',
          'web performance',
          'accessibility'
        ]}
      />
      <ResponsiveMainContainer>
        <HeroSection invert={true}>
          <HeroClouds aria-hidden="true"><MakeClouds cloudCount={30} mult={1} /></HeroClouds>
          <HeroLayout>
            <HomeHeroContent title={title} subtitle={subtitle} />
            <ResponsiveFlameGif src="/img/flame.gif" alt="Floating astronaut" />
          </HeroLayout>
        </HeroSection>
      </ResponsiveMainContainer>

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

      <ProjectsSection projects={projects} />

      <FilmsSection />

      <CampaignsSection />

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

const ResponsiveMainContainer = styled.div`
  padding: 0;
  background: ${colors.background};
  position: relative;
  overflow: clip;
`;

const HeroClouds = styled.div`
  position: absolute;
  inset: 0;
  opacity: .12;
  pointer-events: none;
`;

const HeroLayout = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 5rem);
  max-width: 1200px;
  min-height: clamp(620px, calc(100svh - 64px), 780px);
  margin: 0 auto;
  padding: 64px 40px;

  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    min-height: 0;
    padding: 96px 24px 28px;
  }
`;

const ResponsiveFlameGif = styled.img`
  display: block;
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1;
  object-fit: contain;
  justify-self: center;
  pointer-events: none;

  @media (max-width: 767px) {
    width: 180px;
    justify-self: end;
    margin-top: -20px;
  }
`;
