import Icon from '@/components/Icon';
import ReadTime from '@/components/ReadTime';
import { SEO } from '@/components/SEO';
import { Content, content } from '@/content/projects';
import { Section } from '@/styles/components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import styled from 'styled-components';
import * as gtag from '../../lib/gtag';
import { useRouter } from 'next/router';

type PageProps = {
  mdxSource: string;
  content?: Content;
};

export const getStaticProps = (async ({ params }) => {
  if (
    typeof params?.id === 'string' &&
    Object.keys(content).includes(params?.id)
  ) {
    const { id } = params;
    const pageContent = content[id as keyof typeof content] as Content;

    const filePath = path.join(
      process.cwd(),
      `public/projects/${id}/overview.md`,
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const mdxSource = processedContent.toString();

    return { props: { mdxSource, content: pageContent } };
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
  return {
    paths: Object.keys(content).map((contentkey) => ({
      params: { id: contentkey },
    })),
    fallback: false, // Change to false to pre-generate all pages
  };
}) satisfies GetStaticPaths;

const ProjectPage = ({ mdxSource, content }: PageProps) => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  // Track page view for dynamic project pages
  useEffect(() => {
    if (router.isReady && content) {
      gtag.pageview(router.asPath);
    }
  }, [router.isReady, router.asPath, content]);

  if (!content) return null;
  const {
    title,
    description,
    featuredImage,
    details: { type, stack, code, live },
    keywords,
    seo,
  } = content;
  return (
    <ProjectContainer>
      <SEO
        title={title}
        thumb={featuredImage}
        description={seo || description}
        keywords={keywords}
        lang={'english'}
      />
      <ProjectHeader>
        <ProjectTitle>{title}</ProjectTitle>
        <ReadTimeWrapper>
          <ReadTime text={mdxSource} />
        </ReadTimeWrapper>
        <ProjectDescription dangerouslySetInnerHTML={{ __html: description }} />
        <IconWrapper>
          <Icon speed={'4s'} />
        </IconWrapper>
      </ProjectHeader>

      <ProjectDetails>
        <div>
          <h3>Type</h3>
          <div className="content">
            <div>{type}</div>
          </div>
        </div>
        <div>
          <h3>Stack</h3>
          <div className="content">
            {stack
              .split(' ')
              .slice(0, showMore ? undefined : 6)
              .map((tech, i) => (
                <div key={`stack-${i}`}>{tech.replaceAll('_', ' ')}</div>
              ))}
            {!showMore && stack.split(' ').length > 6 && (
              <div
                onClick={() => setShowMore(true)}
                style={{
                  cursor: 'pointer',
                  color: '#ff715b',
                  fontWeight: '600',
                }}
              >
                +{stack.split(' ').length - 6} more
              </div>
            )}
          </div>
        </div>
        {code && (
          <div>
            <h3>Code</h3>
            {code === 'Private' ? (
              <span
                style={{
                  color: '#666',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  padding: '0.3rem 0.8rem',
                  background: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                }}
              >
                Private
              </span>
            ) : (
              <a href={code} target="_blank" rel="noopener noreferrer">
                Github
              </a>
            )}
          </div>
        )}
        <div>
          <h3>Live</h3>
          <a href={live} target="_blank" rel="noopener noreferrer">
            View Site
          </a>
        </div>
      </ProjectDetails>

      <Body
        className="post-body"
        dangerouslySetInnerHTML={{ __html: mdxSource }}
      />
    </ProjectContainer>
  );
};

export default ProjectPage;

const ProjectContainer = styled(Section)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 !important;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 !important;
    margin: 0;
    max-width: 100%;
    overflow-x: hidden;
    width: 100vw;
    padding-top: 0 !important;
    margin-top: 0;
  }

  @media (max-width: 375px) {
    width: 100%;
    min-width: 320px;
    padding: 0 !important;
  }
`;

const ProjectHeader = styled.div`
  background: linear-gradient(135deg, #ff715b 0%, #e55a42 100%);
  padding: 1.5rem 0.8rem 1.5rem;
  text-align: center;
  height: auto;
  max-height: 400px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
  overflow-x: hidden !important;
  overflow-y: hidden !important;

  /* Disable all scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 0.8rem 1.2rem;
    height: auto;
    max-height: 300px;
    justify-content: flex-start;
    padding-top: 1.5rem;
    overflow: hidden !important;
  }

  @media (min-width: 480px) {
    padding: 2rem 1rem 2rem;
    max-height: 350px;
  }

  @media (min-width: 769px) {
    padding: 3rem 2rem 3rem;
    max-height: 400px;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
  color: white;
  line-height: 1.2;
  font-weight: 700;
  word-wrap: break-word;
  max-width: 100%;
  padding: 0 0.5rem;
  box-sizing: border-box;
  text-align: center;
  display: block;
  visibility: visible;
  opacity: 1;
  z-index: 10;
  position: relative;
  overflow: hidden;

  @media (max-width: 320px) {
    font-size: 1.2rem;
    line-height: 1.1;
  }

  @media (min-width: 375px) {
    font-size: 1.5rem;
    margin: 0 0 0.6rem 0;
  }

  @media (min-width: 480px) {
    font-size: 1.6rem;
    padding: 0;
    margin: 0 0 0.7rem 0;
  }

  @media (min-width: 769px) {
    font-size: 2.2rem;
    margin: 0 0 1rem 0;
    line-height: 1.1;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.75rem;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.95);
  margin: 0.5rem auto 0.8rem;
  max-width: 100%;
  max-height: 100px;
  word-wrap: break-word;
  padding: 0 0.5rem;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden !important;
  text-overflow: ellipsis;

  /* Disable all scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Prevent HTML content from causing scroll */
  * {
    overflow: hidden !important;
    max-width: 100% !important;
  }

  @media (min-width: 375px) {
    font-size: 0.8rem;
    line-height: 1.4;
    margin: 0.6rem auto 1rem;
    max-height: 120px;
  }

  @media (min-width: 480px) {
    font-size: 0.85rem;
    padding: 0;
    margin: 0.7rem auto 1.2rem;
    max-height: 140px;
  }

  @media (min-width: 769px) {
    font-size: 1rem;
    line-height: 1.5;
    margin: 1.2rem auto 2rem;
    max-width: 600px;
    max-height: 200px;
  }
`;

const Body = styled.div`
  /* Mobile-first optimized design */
  max-width: 100%;
  padding: 1rem 0.8rem;
  background: white;
  overflow-x: hidden;

  /* Base typography - mobile optimized */
  font-size: 0.9rem;
  line-height: 1.5;
  color: #121e27;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  /* Paragraphs - mobile first */
  p {
    margin: 0.8rem 0;
    line-height: 1.5;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  /* Headings - mobile optimized */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.2rem 0 0.8rem 0;
    line-height: 1.2;
    word-wrap: break-word;
    max-width: 100%;

    &:first-child {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 1.4rem;
    color: #ff715b;
    border-bottom: 2px solid #ff715b;
    padding-bottom: 0.3rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    color: #ff715b;
    margin: 1.5rem 0 0.8rem 0;
  }

  h3 {
    font-size: 1.1rem;
    color: #121e27;
    margin: 1.2rem 0 0.6rem 0;
  }

  h4 {
    font-size: 1rem;
    color: #121e27;
    margin: 1rem 0 0.5rem 0;
  }

  /* Desktop enhancements */
  @media (min-width: 769px) {
    padding: 2.5rem 2rem;
    font-size: 1.1rem;
    line-height: 1.7;

    p {
      margin: 1.5rem 0;
      line-height: 1.7;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 2rem 0 1.2rem 0;
    }

    h1 {
      font-size: 2rem;
      border-bottom: 3px solid #ff715b;
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.7rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    h4 {
      font-size: 1.2rem;
    }
  }

  /* Mobile-first lists - card style for better readability */
  ul,
  ol {
    margin: 1rem 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 0.8rem;
      padding: 0.7rem;
      line-height: 1.4;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 3px solid #ff715b;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 100%;
      box-sizing: border-box;

      &:last-child {
        margin-bottom: 0;
      }

      /* Mobile bullet indicator */
      &::before {
        content: '•';
        color: #ff715b;
        font-weight: bold;
        margin-right: 0.5rem;
        font-size: 0.9rem;
      }

      strong {
        color: #ff715b;
        font-weight: 600;
        display: block;
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
        line-height: 1.3;
      }

      /* Ensure text content fits well */
      * {
        max-width: 100%;
        word-wrap: break-word;
      }
    }

    /* Desktop enhancements */
    @media (min-width: 769px) {
      margin: 2rem 0;

      li {
        margin-bottom: 1.5rem;
        padding: 1rem 0 1rem 2rem;
        background: transparent;
        border-left: 2px solid #ff715b20;
        border-radius: 0;
        position: relative;

        &::before {
          content: '▸';
          position: absolute;
          left: -8px;
          top: 1rem;
          font-size: 1.1rem;
          background: white;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow:
            0 0 0 3px white,
            0 0 0 5px #ff715b20;
        }

        strong {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  /* Code and blockquotes - mobile optimized */
  blockquote {
    border-left: 3px solid #ff715b;
    padding: 0.8rem;
    margin: 1rem 0;
    background: #f9efe7;
    font-style: italic;
    border-radius: 0 6px 6px 0;
    word-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;

    @media (min-width: 769px) {
      padding: 1.5rem;
      margin: 2rem 0;
    }
  }

  code {
    background: #f9efe7;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    color: #e55a42;
    word-wrap: break-word;
    overflow-wrap: break-word;

    @media (min-width: 769px) {
      font-size: 0.9rem;
      padding: 0.3rem 0.6rem;
    }
  }

  pre {
    overflow-x: auto;
    background: #f9efe7;
    padding: 0.7rem;
    border-radius: 6px;
    margin: 1rem 0;
    max-width: 100%;
    box-sizing: border-box;

    @media (min-width: 769px) {
      padding: 1rem;
      margin: 1.5rem 0;
    }

    code {
      background: none;
      padding: 0;
      font-size: 0.75rem;

      @media (min-width: 769px) {
        font-size: 0.85rem;
      }
    }
  }

  /* Image handling */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 1rem 0;
  }

  .gif {
    max-width: 100%;
    margin: 1rem 0;
    float: none;

    @media (min-width: 769px) {
      float: left;
      margin: 0 2rem 2rem 0;
      max-width: 300px;
    }
  }

  /* Links */
  a {
    color: #ff715b;
    word-wrap: break-word;
  }

  strong {
    color: #ff715b;
    font-weight: 600;
  }
`;

const ProjectDetails = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;

  @media (min-width: 769px) {
    padding: 1.5rem 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  > div {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 3px solid #ff715b;

    @media (min-width: 769px) {
      align-items: center;
      padding: 0.8rem 1rem;
    }
  }

  h3 {
    margin: 0;
    font-family: Montserrat;
    color: #ff715b;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 45px;
    flex-shrink: 0;

    @media (min-width: 769px) {
      font-size: 0.75rem;
      min-width: 50px;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #444;

    @media (min-width: 769px) {
      font-size: 0.85rem;
    }

    div {
      background: #fff;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      font-weight: 500;
      word-wrap: break-word;

      @media (min-width: 769px) {
        padding: 0.2rem 0.5rem;
      }
    }
  }

  a {
    color: #ff715b;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
    background: white;
    border: 1px solid #ff715b;
    border-radius: 20px;
    transition: all 0.3s ease;
    word-wrap: break-word;

    @media (min-width: 769px) {
      font-size: 0.85rem;
      padding: 0.3rem 0.8rem;
    }

    &:hover {
      background: #ff715b;
      color: white;
    }
  }
`;

const ReadTimeWrapper = styled.div`
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.3rem 0 0.5rem 0;
  text-align: center;
  overflow: hidden;
  max-height: 30px;

  /* Disable scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 480px) {
    font-size: 0.7rem;
    margin: 0.4rem 0 0.6rem 0;
  }

  @media (min-width: 769px) {
    font-size: 0.8rem;
    margin: 0.5rem 0 0.8rem 0;
  }
`;

const IconWrapper = styled.div`
  margin: 0.5rem 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-height: 50px;

  /* Disable scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 480px) {
    margin: 0.6rem 0 0 0;
  }

  @media (min-width: 769px) {
    margin: 0.8rem 0 0 0;
    max-height: 60px;
  }
`;
