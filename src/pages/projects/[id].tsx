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
        <ReadTime text={mdxSource} />
        <ProjectDescription dangerouslySetInnerHTML={{ __html: description }} />
        <Icon speed={'4s'} />
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
            {stack.split(' ').slice(0, showMore ? undefined : 6).map((tech, i) => (
              <div key={`stack-${i}`}>{tech.replaceAll('_', ' ')}</div>
            ))}
            {!showMore && stack.split(' ').length > 6 && (
              <div 
                onClick={() => setShowMore(true)}
                style={{ cursor: 'pointer', color: '#ff715b', fontWeight: '600' }}
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
                  borderRadius: '20px'
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
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 0;
    margin-top: 70px; /* Account for fixed navbar */
    max-width: 100vw;
  }
  
  @media (max-width: 480px) {
    margin-top: 60px;
  }
`;

const ProjectHeader = styled.div`
  background: linear-gradient(135deg, #ff715b 0%, #e55a42 100%);
  padding: 3rem 2rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/img/pattern.svg') no-repeat center;
    opacity: 0.1;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 2.5rem 1rem 2rem;
    text-align: left;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1rem 1.5rem;
  }
  
  @media (max-width: 320px) {
    padding: 1.5rem 0.75rem 1.25rem;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: white;
  line-height: 1.2;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  word-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.1;
    margin: 0 0 1rem 0;
    text-align: left;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin: 0 0 0.75rem 0;
    line-height: 1.2;
  }
  
  @media (max-width: 320px) {
    font-size: 1.4rem;
    line-height: 1.1;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.95);
  margin: 1rem auto 1.5rem;
  max-width: 700px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0.8rem 0 1.2rem 0;
    max-width: 100%;
    text-align: left;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0.5rem 0 1rem 0;
  }
  
  @media (max-width: 320px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const Body = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 3rem 2rem;
  background: white;
  
  * {
    max-width: 100%;
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2.5rem 0 1.5rem 0;
    line-height: 1.3;
    color: #121e27;
    word-wrap: break-word;
    hyphens: auto;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h1 {
    font-size: 2.2rem;
    color: #ff715b;
    border-bottom: 3px solid #ff715b;
    padding-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #ff715b;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #121e27;
  }
  
  h4 {
    font-size: 1.3rem;
    color: #121e27;
  }
  
  p {
    margin: 1.5rem 0;
    line-height: 1.8;
    color: #121e27;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem auto;
    display: block;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  ul, ol {
    margin: 2.5rem 0;
    padding: 0;
    list-style: none;
    
    li {
      margin-bottom: 2.5rem;
      padding: 1.25rem 0 1.25rem 2.5rem;
      line-height: 1.8;
      color: #121e27;
      position: relative;
      border-left: 3px solid #ff715b30;
      background: linear-gradient(90deg, #ff715b05 0%, transparent 100%);
      border-radius: 0 8px 8px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &::before {
        content: '▸';
        position: absolute;
        left: -12px;
        top: 1.25rem;
        color: #ff715b;
        font-size: 1.2rem;
        font-weight: bold;
        background: white;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0 0 3px white, 0 0 0 6px #ff715b30;
      }
      
      strong {
        color: #ff715b;
        font-weight: 600;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        word-wrap: break-word;
      }
    }
  }
  
  strong {
    color: #ff715b;
    font-weight: 600;
  }
  
  blockquote {
    border-left: 4px solid #ff715b;
    padding: 1.5rem;
    margin: 2rem 0;
    background: #f9efe7;
    font-style: italic;
    border-radius: 0 8px 8px 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  code {
    background: #f9efe7;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #e55a42;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  pre {
    overflow-x: auto;
    background: #f9efe7;
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
  
  .gif {
    float: left;
    margin: 0 2rem 2rem 0;
    padding: 0;
    border-radius: 8px;
    max-width: 300px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem 1rem;
    line-height: 1.7;
    
    h1 {
      font-size: 1.8rem;
      margin: 2rem 0 1rem 0;
    }
    
    h2 {
      font-size: 1.5rem;
      margin: 1.75rem 0 1rem 0;
    }
    
    h3 {
      font-size: 1.3rem;
      margin: 1.5rem 0 0.75rem 0;
    }
    
    h4 {
      font-size: 1.1rem;
      margin: 1.25rem 0 0.5rem 0;
    }
    
    p {
      margin: 1rem 0;
      font-size: 0.95rem;
    }
    
    ul, ol {
      margin: 2rem 0;
      
      li {
        margin-bottom: 2rem;
        padding: 1rem 0 1rem 2rem;
        
        &::before {
          left: -10px;
          top: 1rem;
          width: 18px;
          height: 18px;
          font-size: 1.1rem;
        }
        
        strong {
          font-size: 1rem;
        }
      }
    }
    
    blockquote {
      padding: 1rem;
      margin: 1.5rem 0;
      font-size: 0.95rem;
    }
    
    .gif {
      float: none;
      margin: 1rem auto;
      display: block;
      max-width: 100%;
    }
    
    pre {
      font-size: 0.85rem;
      padding: 0.75rem;
      overflow-x: auto;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 1.5rem 0.75rem;
    
    h1 {
      font-size: 1.6rem;
      padding-bottom: 0.3rem;
    }
    
    h2 {
      font-size: 1.4rem;
    }
    
    h3 {
      font-size: 1.2rem;
    }
    
    h4 {
      font-size: 1.05rem;
    }
    
    p {
      font-size: 0.9rem;
    }
    
    ul, ol {
      li {
        padding: 0.75rem 0 0.75rem 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        
        &::before {
          left: -8px;
          top: 0.75rem;
          width: 16px;
          height: 16px;
          font-size: 1rem;
        }
        
        strong {
          font-size: 0.95rem;
        }
      }
    }
    
    blockquote {
      padding: 0.75rem;
      font-size: 0.9rem;
    }
    
    pre {
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }
  
  @media (max-width: 320px) {
    padding: 1rem 0.5rem;
    font-size: 0.9rem;
    
    h1 {
      font-size: 1.4rem;
    }
    
    h2 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 0.85rem;
    }
    
    ul, ol {
      li {
        font-size: 0.85rem;
        padding: 0.6rem 0 0.6rem 1.25rem;
      }
    }
    
    blockquote {
      font-size: 0.85rem;
      padding: 0.6rem;
    }
  }
`;

const ProjectDetails = styled.div`
  padding: 2rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  box-sizing: border-box;
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  
  > div {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 12px;
    border-left: 4px solid #ff715b;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-width: 0; /* Prevent overflow */
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }
  
  h3 {
    margin: 0;
    font-family: Montserrat;
    color: #ff715b;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 60px;
    flex-shrink: 0;
    line-height: 1.3;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.4;
    min-width: 0;
    width: 100%;
    
    div {
      background: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      font-weight: 500;
      transition: background 0.2s ease;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
      
      &:hover {
        background: #f0f0f0;
      }
    }
  }
  
  a {
    color: #ff715b;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.4rem 1rem;
    background: white;
    border: 2px solid #ff715b;
    border-radius: 25px;
    transition: all 0.3s ease;
    display: inline-block;
    word-wrap: break-word;
    
    &:hover {
      background: #ff715b;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(255, 113, 91, 0.3);
    }
  }
  
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1rem;
    gap: 1rem;
    
    > div {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.75rem;
    }
    
    h3 {
      min-width: auto;
      font-size: 0.75rem;
    }
    
    .content {
      width: 100%;
      
      div {
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
      }
    }
    
    a {
      font-size: 0.85rem;
      padding: 0.35rem 0.8rem;
      align-self: flex-start;
    }
  }
  
  @media only screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 1rem 0.75rem;
    gap: 0.75rem;
    
    > div {
      padding: 0.6rem;
      border-radius: 8px;
    }
    
    h3 {
      font-size: 0.7rem;
    }
    
    .content div {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }
    
    a {
      font-size: 0.8rem;
      padding: 0.3rem 0.7rem;
    }
  }
  
  @media only screen and (max-width: 320px) {
    padding: 0.75rem 0.5rem;
    
    > div {
      padding: 0.5rem;
    }
    
    .content div {
      font-size: 0.75rem;
      padding: 0.15rem 0.3rem;
    }
  }
`;
