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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!!notFound) {
    return null;
  }
  return (
    <>
      {/* <SEO
        title={title}
        thumb={thumb}
        keywords={tags}
        description={description || post.excerpt}
      /> */}

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

export const getStaticProps = (async (context) => {
  const { id } = context.params!;
  try {
    // Try .mdx first, then .md
    let filePath = path.join(process.cwd(), `public/blog/${id}/index.mdx`);
    let fileContents;
    
    try {
      fileContents = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      // If .mdx doesn't exist, try .md
      filePath = path.join(process.cwd(), `public/blog/${id}/index.md`);
      fileContents = fs.readFileSync(filePath, 'utf8');
    }

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
      },
    };
  } catch (error) {
    return {
      props: {
        // redirect to 404
        notFound: true,
        mdxSource: '',
      },
      notFound: true,
    };
  }
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const filePath = path.join(process.cwd(), `public/blog`);
  const fileContents = fs.readdirSync(filePath, 'utf8');
  console.log(fileContents);
  
  // Filter out components directory and only include directories with index files
  const validPosts = fileContents.filter((dir) => {
    if (dir === 'components' || dir === 'drafts') return false;
    
    const dirPath = path.join(filePath, dir);
    if (!fs.statSync(dirPath).isDirectory()) return false;
    
    // Check if directory has index.mdx or index.md
    const mdxPath = path.join(dirPath, 'index.mdx');
    const mdPath = path.join(dirPath, 'index.md');
    
    return fs.existsSync(mdxPath) || fs.existsSync(mdPath);
  });
  
  return {
    paths: validPosts.map((contentkey) => ({
      params: { id: contentkey },
    })),
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export default BlogPage;
