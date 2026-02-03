import { SEO } from '@/components/SEO';
import Social from '@/components/Social';
import { Hero, Section } from '@/styles/components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import styled from 'styled-components';

export const getStaticProps = (async () => {
  const filePath = path.join(process.cwd(), `public/about.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const mdxSource = processedContent.toString();

  return { props: { mdxSource } };
}) satisfies GetStaticProps;

const AboutPage = ({
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO
        title="About Mohammed Abdirahman | Frontend & Mobile Engineer"
        description="Frontend and mobile engineer with 5+ years of experience building React, React Native, and Flutter products. Based in Nairobi and available for remote or Kenya-based roles, focused on performance, accessibility, and clean UX."
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
          'web application developer',
          'mobile app developer',
          'remote frontend developer',
          'remote mobile developer',
          'nairobi developer',
          'kenya developer',
          'user interface developer',
          'user experience designer',
          'performance optimization',
          'accessibility'
        ]}
      />
      <ResponsiveAboutSection>
        <Hero invert={false}>{'I have always loved tech'}</Hero>
        <ResponsiveContent dangerouslySetInnerHTML={{ __html: mdxSource }} />
      </ResponsiveAboutSection>
    </>
  );
};

export default AboutPage;

const ResponsiveAboutSection = styled(Section)`
  padding: 0 clamp(1rem, 5vw, 200px);
  
  @media only screen and (max-width: 768px) {
    padding: 0 1rem;
    
    h1 {
      font-size: 2rem !important;
      line-height: 1.2;
      margin-bottom: 2rem;
    }
  }
  
  @media only screen and (max-width: 480px) {
    h1 {
      font-size: 1.5rem !important;
    }
  }
`;

const ResponsiveContent = styled.div`
  max-width: 800px;
  line-height: 1.6;
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: #666;
  }
  
  h2, h3 {
    margin: 2rem 0 1rem 0;
    color: #333;
  }
  
  @media only screen and (max-width: 768px) {
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    h2, h3 {
      font-size: 1.2rem;
      margin: 1.5rem 0 0.5rem 0;
    }
  }
  
  @media only screen and (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
    
    h2, h3 {
      font-size: 1.1rem;
    }
  }
`;
