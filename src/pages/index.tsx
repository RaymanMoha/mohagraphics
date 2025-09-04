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
        title="Mohammed Abdirahman | Frontend Developer | Software Engineer | AI Developer | UI/UX Designer for Hire"
        description="Professional Frontend Developer, Software Engineer, AI Developer & UI/UX Designer with 5+ years experience. Expert in React, Next.js, Flutter, AI integration, and modern web development. Available for freelance projects, custom software development, and consulting. Hire experienced developer for your startup or business."
        lang="en"
        thumb="/img/mohammed.jpeg"
        keywords={[
          'frontend developer for hire',
          'software engineer freelance',
          'AI developer specialist',
          'UI/UX designer developer',
          'hire frontend developer',
          'freelance software engineer',
          'custom web development',
          'react developer for hire',
          'next.js developer',
          'flutter developer',
          'typescript developer',
          'javascript developer',
          'full stack developer',
          'web application developer',
          'mobile app developer',
          'ecommerce developer',
          'startup developer',
          'remote developer',
          'web developer Kenya',
          'software engineer Kenya',
          'frontend engineer',
          'backend developer',
          'API developer',
          'database developer',
          'responsive web design',
          'user interface developer',
          'user experience designer',
          'web design and development',
          'custom software solutions',
          'AI integration services',
          'machine learning developer',
          'chatbot developer',
          'automation developer',
          'SaaS developer',
          'progressive web app developer',
          'single page application developer',
          'e-commerce platform developer',
          'CMS developer',
          'WordPress developer',
          'React Native developer',
          'Node.js developer',
          'Python developer',
          'GraphQL developer',
          'REST API developer',
          'cloud developer',
          'serverless developer',
          'DevOps engineer',
          'technical consultant',
          'startup CTO',
          'freelance developer',
          'contract developer',
          'remote work developer',
          'agile developer',
          'scrum developer'
        ]}
      />
      <ResponsiveMainContainer>
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
        <ResponsiveFlameGif
          src="img\flame.gif"
          alt="Animated GIF"
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
  padding: 0 clamp(1rem, 7vw, 200px);
  background: ${colors.background};
  position: relative;
  overflow-x: hidden;
  
  @media only screen and (max-width: 768px) {
    padding: 0 1rem;
  }
  
  .marquee {
    @media only screen and (max-width: 768px) {
      min-height: 50vh;
      
      h1 {
        margin-top: 15vh;
        font-size: 2rem !important;
        line-height: 1.2;
      }
    }
    
    @media only screen and (max-width: 480px) {
      min-height: 40vh;
      
      h1 {
        margin-top: 10vh;
        font-size: 1.5rem !important;
      }
    }
  }
`;

const ResponsiveFlameGif = styled.img`
  position: absolute;
  top: 400px;
  right: 150px;
  width: 500px;
  height: 500px;
  z-index: 1;
  
  @media only screen and (max-width: 1024px) {
    width: 350px;
    height: 350px;
    right: 50px;
    top: 350px;
  }
  
  @media only screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
    right: 20px;
    top: 300px;
  }
  
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

