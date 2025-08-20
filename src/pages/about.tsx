import { SEO } from '@/components/SEO';
import Social from '@/components/Social';
import { Hero, Section } from '@/styles/components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

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
        title="About Mohammed Abdirahman | Frontend Developer Journey"
        description="Learn about Mohammed Abdirahman's journey as a frontend developer, from early WordPress experiments to building modern React applications. Discover my skills, experience, and passion for creating exceptional user interfaces."
        lang="en"
        thumb="landingImage.jpg"
        keywords={[
          'about mohammed abdirahman',
          'frontend developer story',
          'web developer experience',
          'react developer portfolio',
          'software engineering journey',
          'alx graduate',
          'wordpress developer',
          'full stack developer'
        ]}
        canonical="https://www.mohammedabdirahman.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Person",
            "name": "Mohammed Abdirahman",
            "jobTitle": "Frontend Developer",
            "description": "Passionate frontend developer with expertise in React, Next.js, and modern web technologies. Alumni of ALX Software Engineering Program.",
            "url": "https://www.mohammedabdirahman.com",
            "image": "https://www.mohammedabdirahman.com/img/landingImage.jpg",
            "knowsAbout": [
              "React Development",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Frontend Architecture",
              "Responsive Design",
              "WordPress Development",
              "Full Stack Development"
            ],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "name": "ALX Software Engineering Program",
              "educationalLevel": "Professional Certification"
            }
          }
        }}
      />
      <Section>
        <Hero invert={false}>{'I have always loved tech'}</Hero>
        <div dangerouslySetInnerHTML={{ __html: mdxSource }} />
      </Section>
    </>
  );
};

export default AboutPage;

