import { SEO } from '@/components/SEO';
import Social from '@/components/Social';
import { Hero, Section, sizing } from '@/styles/components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

type Content = {
  title: string;
  draft: string;
  // date: string;
  description: string;
  keywords: string;
  internal: boolean;
  featured: boolean;
  thumb: string;
};

const BlogPage = ({
  mdxSource,
  description,
  draft,
  featured,
  internal,
  thumb,
  keywords,
  title,
  notFound,
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!!notFound) {
    return null;
  }
  return (
    <>
      <SEO
        title={`${title} | Mohammed Abdirahman Blog`}
        description={description || 'Read this insightful blog post by Mohammed Abdirahman about frontend development, React, and modern web technologies.'}
        thumb={thumb || 'blog-default.jpg'}
        keywords={keywords ? keywords.split(',').map(k => k.trim()) : [
          'frontend development',
          'react',
          'javascript',
          'web development',
          'programming',
          'tutorial'
        ]}
        lang="en"
        canonical={`https://www.mohammedabdirahman.com/blog/${id}`}
        ogType="article"
        article={{
          author: 'Mohammed Abdirahman',
          section: 'Technology',
          tags: keywords ? keywords.split(',').map(k => k.trim()) : ['Frontend Development', 'Programming'],
        }}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "description": description || 'Blog post by Mohammed Abdirahman',
          "image": `https://www.mohammedabdirahman.com/img/${thumb || 'blog-default.jpg'}`,
          "author": {
            "@type": "Person",
            "name": "Mohammed Abdirahman",
            "url": "https://www.mohammedabdirahman.com"
          },
          "publisher": {
            "@type": "Person",
            "name": "Mohammed Abdirahman",
            "url": "https://www.mohammedabdirahman.com"
          },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.mohammedabdirahman.com/blog/${id}`
          },
          "keywords": keywords || 'frontend development, react, javascript'
        }}
      />

      <Section>
        <header>
          <Hero
            invert={false}
            id="title"
            style={{
              marginTop: sizing.paddingExterior.base,
              marginBottom: 0,
            }}
          >
            {title}
          </Hero>
          {/* <Note>{post.timeToRead} minute read</Note> */}
          {/* <HeroP
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: sizing.paddingExterior.base,
            }}
          >
            {date}
          </HeroP> */}
        </header>
        <div dangerouslySetInnerHTML={{ __html: mdxSource }} />
        {/* <MDXRenderer>{post.body}</MDXRenderer> */}
        <hr
          style={{
            marginBottom: sizing.paddingExterior.base,
          }}
        />
        {/* <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <>
                  <div>Previous</div>
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                </>
              )}
            </li>
            <li>
              {next && (
                <>
                  <div>Next</div>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav> */}
        <Social />
      </Section>
    </>
  );
};

export const getStaticProps = (async ({ params }) => {
  const filePath = path.join(process.cwd(), `public/blog`);
  const fileContents = fs.readdirSync(filePath, 'utf8');

  if (typeof params?.id === 'string' && fileContents.includes(params?.id)) {
    const { id } = params;
    // const pageContent = content[id as keyof typeof content] as Content;

    const filePath = path.join(process.cwd(), `public/blog/${id}/index.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const mdxSource = processedContent.toString();

    console.log(matterResult.data);
    const { description, draft, featured, internal, thumb, keywords, title } =
      matterResult.data as Content;

    return {
      props: {
        mdxSource,
        description,
        draft,
        featured,
        internal,
        thumb,
        keywords,
        title,
        id,
      },
    };
  }
  return {
    props: {
      // redirect to 404
      notFound: true,
      mdxSource: '',
    },
    notFound: true,
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const filePath = path.join(process.cwd(), `public/blog`);
  const fileContents = fs.readdirSync(filePath, 'utf8');
  console.log(fileContents);
  return {
    paths: Object.keys(fileContents.filter((k) => k != 'drafts')).map(
      (contentkey) => ({
        params: { id: contentkey },
      }),
    ),
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export default BlogPage;
