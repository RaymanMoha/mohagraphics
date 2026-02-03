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
        title="Mohammed Abdirahman | Frontend & Mobile Engineer | React, React Native, Flutter"
        description="Frontend and mobile engineer with 5+ years building React, React Native, and Flutter products. Based in Nairobi and available for remote or Kenya-based roles, focused on performance, accessibility, and clean UX."
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
          <div>
            <MakeClouds cloudCount={30} mult={1} />
            <HeroContent>
              <Hero invert={true}>
                <HighlightedWords title={title} />
              </Hero>
              <Social />
              <HeroP>{subtitle}</HeroP>
            </HeroContent>
          </div>
        </HeroSection>
        <ResponsiveFlameGif
          src="/img/flame.gif"
          alt="Animated flame"
        />
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

const ResponsiveMainContainer = styled.div`
  padding: 0;
  background: ${colors.background};
  position: relative;
  overflow-x: hidden;
`;

const HeroContent = styled.div`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  h1 {
    margin: 0;
    font-size: 1.8rem;
    line-height: 1.2;
  }

  @media only screen and (min-width: 480px) {
    h1 {
      font-size: 2.2rem;
    }
  }

  @media only screen and (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    h1 {
      font-size: 4rem;
    }
  }
`;

const ResponsiveFlameGif = styled.img`
  position: absolute;
  right: 10px;
  width: 200px;
  height: 200px;
  z-index: 1;
  opacity: 0.8;

  /* Mobile: Move to bottom of hero section */
  top: auto;
  bottom: 40px;
  
  @media only screen and (min-width: 480px) {
    width: 250px;
    height: 250px;
    right: 20px;
    bottom: 60px;
  }
  
  @media only screen and (min-width: 768px) {
    width: 350px;
    height: 350px;
    right: 50px;
    top: 160px;
    bottom: auto;
    opacity: 1;
  }
  
  @media only screen and (min-width: 1024px) {
    width: 450px;
    height: 450px;
    right: 100px;
    top: 200px;
  }
  
  @media only screen and (min-width: 1200px) {
    width: 500px;
    height: 500px;
    right: 150px;
    top: 220px;
  }
  
  @media only screen and (max-width: 320px) {
    width: 150px;
    height: 150px;
    bottom: 20px;
    opacity: 0.6;
  }
`;
