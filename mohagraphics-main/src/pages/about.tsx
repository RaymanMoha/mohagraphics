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
        title="About Mohammed Abdirahman - Frontend Developer & UI/UX Designer"
        description="Experienced Frontend Developer and UI/UX Designer with expertise in React, Next.js, and TypeScript. Creating innovative web solutions from Nairobi, Kenya. Available for freelance projects and full-time opportunities."
        lang="en"
        thumb="mohammed.jpeg"
        keywords={[
          'Frontend Developer',
          'UI/UX Designer',
          'React Developer',
          'Next.js Expert',
          'TypeScript Developer',
          'Web Developer Nairobi',
          'Kenyan Developer',
          'Frontend Engineer',
          'JavaScript Expert',
          'Responsive Design',
          'Web Performance',
          'User Experience',
          'User Interface Design',
          'Frontend Architecture',
          'Component Development',
          'State Management',
          'API Integration',
          'Modern Web Development',
          'Progressive Web Apps',
          'Mobile-First Design'
        ]}
        canonical="https://www.mohagraphics.tech/about"
      />
      <Section>
        <Hero invert={false}>{'I have always loved tech'}</Hero>
        <div dangerouslySetInnerHTML={{ __html: mdxSource }} />
      </Section>
    </>
  );
};

export default AboutPage;
