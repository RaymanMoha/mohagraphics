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
        title="About Mohammed Abdirahman - Frontend & Mobile App Developer"
        description="Experienced Frontend & Mobile App Developer with expertise in Flutter, React, Next.js, and TypeScript. Creating innovative mobile and web solutions from Nairobi, Kenya. Available for global projects and remote opportunities."
        lang="en"
        thumb="mohammed.jpeg"
        type="website"
        location="Nairobi, Kenya"
        canonical="https://www.mohagraphics.tech/about"
        keywords={[
          'Flutter Developer',
          'Mobile App Developer',
          'Frontend Developer',
          'UI/UX Designer',
          'React Developer',
          'Next.js Expert',
          'TypeScript Developer',
          'Cross-platform Developer',
          'iOS Developer',
          'Android Developer',
          'Web Developer Nairobi',
          'Global Developer',
          'Remote Developer',
          'Frontend Engineer',
          'JavaScript Expert',
          'Responsive Design',
          'Mobile App Architecture',
          'State Management',
          'API Integration',
          'App Store Optimization'
        ]}
      />
      <Section>
        <Hero invert={false}>{'I have always loved tech'}</Hero>
        <div dangerouslySetInnerHTML={{ __html: mdxSource }} />
      </Section>
    </>
  );
};

export default AboutPage;
