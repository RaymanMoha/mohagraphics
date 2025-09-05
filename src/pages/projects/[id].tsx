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
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ProjectHeader = styled.div`
  background: linear-gradient(135deg, #ff715b 0%, #e55a42 100%);
  padding: 2.5rem 2rem 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 1.5rem;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0;
  color: white;
  line-height: 1.1;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.95);
  margin: 1rem auto 1.5rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin: 0.8rem auto 1.2rem;
  }
`;

const Body = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: 100%;
  word-wrap: break-word;
  padding: 3rem 2rem;
  background: white;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 2.5rem 0 1.5rem 0;
    line-height: 1.3;
    color: #121e27;
    
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
  }
  
  ul, ol {
    margin: 2.5rem 0;
    padding: 0;
    list-style: none;
    
    li {
      margin-bottom: 2.5rem;
      padding: 1rem 0 1rem 2rem;
      line-height: 1.8;
      color: #121e27;
      position: relative;
      border-left: 2px solid #ff715b20;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &::before {
        content: '▸';
        position: absolute;
        left: -8px;
        top: 1rem;
        color: #ff715b;
        font-size: 1.2rem;
        font-weight: bold;
        background: white;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0 0 3px white, 0 0 0 5px #ff715b20;
      }
      
      strong {
        color: #ff715b;
        font-weight: 600;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
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
  }
  
  code {
    background: #f9efe7;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #e55a42;
  }
  
  .gif {
    float: left;
    margin: 0 2rem 2rem 0;
    padding: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem 1rem;
    
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.3rem;
    }
  }
`;

const ProjectDetails = styled.div`
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 3px solid #ff715b;
  }
  
  h3 {
    margin: 0;
    font-family: Montserrat;
    color: #ff715b;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 50px;
    flex-shrink: 0;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: #444;
    
    div {
      background: #fff;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      font-weight: 500;
    }
  }
  
  a {
    color: #ff715b;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
    background: white;
    border: 1px solid #ff715b;
    border-radius: 20px;
    transition: all 0.3s ease;
    
    &:hover {
      background: #ff715b;
      color: white;
    }
  }
  
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 0.8rem;
    
    > div {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    h3 {
      min-width: auto;
    }
  }
`;
