import { SEO } from '@/components/SEO';
import { Content, content } from '@/content/projects';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import styled from 'styled-components';
import * as gtag from '../../lib/gtag';

type PageProps = {
  mdxSource: string;
  content?: Content;
  heroImageSrc?: string | null;
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const getStaticProps = (async ({ params }) => {
  if (
    typeof params?.id === 'string' &&
    Object.keys(content).includes(params?.id)
  ) {
    const { id } = params;
    const pageContent = content[id as keyof typeof content] as Content;

    const filePath = path.join(process.cwd(), `public/projects/${id}/overview.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const mdxSource = processedContent.toString();

    const heroImageSrc = (() => {
      const raw = pageContent.featuredImage;
      if (!raw) return null;

      if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;

      if (raw.startsWith('/')) {
        const publicPath = path.join(
          process.cwd(),
          'public',
          raw.replace(/^\//, ''),
        );
        return fs.existsSync(publicPath) ? raw : null;
      }

      const fromImg = path.join(process.cwd(), 'public', 'img', raw);
      if (fs.existsSync(fromImg)) return `/img/${raw}`;

      const fromProject = path.join(process.cwd(), 'public', 'projects', id, raw);
      if (fs.existsSync(fromProject)) return `/projects/${id}/${raw}`;

      return null;
    })();

    return { props: { mdxSource, content: pageContent, heroImageSrc } };
  }

  return {
    props: {
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
    fallback: false,
  };
}) satisfies GetStaticPaths;

const ProjectPage = ({ mdxSource, content, heroImageSrc }: PageProps) => {
  const [showMore, setShowMore] = useState(false);
  const [showFullCaseStudy, setShowFullCaseStudy] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && content) {
      gtag.pageview(router.asPath);
    }
  }, [router.isReady, router.asPath, content]);

  if (!content) return null;

  const {
    title,
    description,
    role,
    details: { type, stack, code, live },
    keywords,
    seo,
  } = content;

  const stackItems = stack.split(' ').filter(Boolean);
  const visibleStackItems = showMore ? stackItems : stackItems.slice(0, 8);
  const remainingStackCount = Math.max(
    0,
    stackItems.length - visibleStackItems.length,
  );
  const descriptionText = stripHtml(description);
  const paragraphs = mdxSource.match(/<p>[\s\S]*?<\/p>/g) ?? [];
  const briefText =
    paragraphs.length > 0 ? stripHtml(paragraphs[0]) : descriptionText;
  const stackPreview = stackItems
    .slice(0, 3)
    .map((tech) => tech.replaceAll('_', ' '))
    .join(', ');
  const solutionFallback = stackPreview
    ? `Built as ${type} using ${stackPreview}.`
    : `Built as ${type}.`;
  const solutionText =
    paragraphs.length > 1 ? stripHtml(paragraphs[1]) : solutionFallback;
  const wordCount = mdxSource
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 240));
  const shouldCollapseBody = readTimeMinutes >= 7;
  const isBodyCollapsed = shouldCollapseBody && !showFullCaseStudy;

  return (
    <Page>
      <SEO
        title={title}
        thumb={heroImageSrc || '/img/logo.png'}
        description={seo || description}
        keywords={keywords}
        lang="english"
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Red+Hat+Display:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Hero $image={heroImageSrc}>
        <HeroInner>
          <HeroTop>
            <BackLink href="/#projects">Back to projects</BackLink>
            <HeroMeta>
              <HeroMetaItem>{readTimeMinutes} min read</HeroMetaItem>
              <HeroMetaItem>{type}</HeroMetaItem>
            </HeroMeta>
          </HeroTop>

          <HeroContent>
            <HeroKicker>{role}</HeroKicker>
            <HeroTitle>{title}</HeroTitle>
            <HeroDescription dangerouslySetInnerHTML={{ __html: description }} />
            <HeroActions>
              <HeroButton href={live} target="_blank" rel="noopener noreferrer">
                View live
              </HeroButton>
              {code ? (
                code === 'Private' ? (
                  <HeroPill>Private repo</HeroPill>
                ) : (
                  <HeroButton
                    data-variant="secondary"
                    href={code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source
                  </HeroButton>
                )
              ) : null}
            </HeroActions>
          </HeroContent>
        </HeroInner>
      </Hero>

      <Opening>
        <OpeningInner>
          <OpeningGrid>
            <OpeningColumn>
              <h4>Role</h4>
              <OpeningList>
                <li>{role}</li>
              </OpeningList>
            </OpeningColumn>
            <OpeningColumn>
              <h4>Type</h4>
              <OpeningList>
                <li>{type}</li>
              </OpeningList>
            </OpeningColumn>
            <OpeningColumn>
              <h4>Stack</h4>
              <OpeningList>
                {visibleStackItems.map((tech) => (
                  <li key={tech}>{tech.replaceAll('_', ' ')}</li>
                ))}
              </OpeningList>
              {remainingStackCount > 0 ? (
                <MoreButton type="button" onClick={() => setShowMore(true)}>
                  +{remainingStackCount} more
                </MoreButton>
              ) : stackItems.length > 8 ? (
                <MoreButton type="button" onClick={() => setShowMore(false)}>
                  Show less
                </MoreButton>
              ) : null}
            </OpeningColumn>
            <OpeningLead>
              <p>{descriptionText}</p>
              <OpeningTags>
                {keywords.map((keyword) => (
                  <span key={keyword}>{keyword.replaceAll('_', ' ')}</span>
                ))}
              </OpeningTags>
            </OpeningLead>
          </OpeningGrid>
        </OpeningInner>
      </Opening>

      <Bullets>
        <BulletsInner>
          <BulletsGrid>
            <BulletCard>
              <h4>Brief</h4>
              <p>{briefText}</p>
            </BulletCard>
            <BulletCard>
              <h4>Solution</h4>
              <p>{solutionText}</p>
            </BulletCard>
          </BulletsGrid>
        </BulletsInner>
      </Bullets>

      <TitleSpacer>
        <h2>{title}</h2>
      </TitleSpacer>

      <CaseStudy>
        <CaseStudyInner>
          <CaseStudyHeader>
            <span>Case Study</span>
            <CaseStudyMeta>{readTimeMinutes} min read</CaseStudyMeta>
          </CaseStudyHeader>
          <BodyCard data-collapsed={isBodyCollapsed ? 'true' : 'false'}>
            <Body
              className="post-body"
              dangerouslySetInnerHTML={{ __html: mdxSource }}
            />
            {isBodyCollapsed ? (
              <BodyExpand>
                <BodyExpandButton
                  type="button"
                  onClick={() => setShowFullCaseStudy(true)}
                >
                  Read full case study
                </BodyExpandButton>
                <BodyExpandMeta>{readTimeMinutes} min read</BodyExpandMeta>
              </BodyExpand>
            ) : null}
          </BodyCard>
        </CaseStudyInner>
      </CaseStudy>
    </Page>
  );
};

export default ProjectPage;

const Page = styled.main`
  --lab-black: #212122;
  --lab-cream: #efede6;
  --lab-orange: #ff5923;
  --lab-border: rgba(33, 33, 34, 0.12);

  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(
      1200px circle at 10% 0%,
      rgba(255, 89, 35, 0.1) 0%,
      rgba(255, 89, 35, 0) 55%
    ),
    radial-gradient(
      900px circle at 90% 10%,
      rgba(33, 33, 34, 0.08) 0%,
      rgba(33, 33, 34, 0) 60%
    ),
    var(--lab-cream);
  color: var(--lab-black);
  font-family: 'Red Hat Display', sans-serif;
  overflow-x: hidden;
`;

const Hero = styled.header<{ $image?: string | null }>`
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: flex-end;
  padding: clamp(5rem, 14vh, 9rem) 0 clamp(4rem, 8vh, 6rem);
  background-color: var(--lab-black);
  background-image: ${({ $image }) =>
    $image
      ? `linear-gradient(180deg, rgba(33, 33, 34, 0.25) 0%, rgba(33, 33, 34, 0.88) 70%), url(${$image})`
      : 'linear-gradient(180deg, #2b2b2c 0%, #111 100%)'};
  background-size: cover;
  background-position: center;
  color: var(--lab-cream);
  isolation: isolate;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
    opacity: 0.16;
    mix-blend-mode: soft-light;
    pointer-events: none;
    z-index: 0;
  }

  @media (min-width: 1024px) {
    background-attachment: fixed;
  }

  @media (max-width: 640px) {
    min-height: 80vh;
  }
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  z-index: 1;
`;

const HeroTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BackLink = styled(Link)`
  && {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: rgba(33, 33, 34, 0.55);
    border: 1px solid rgba(239, 237, 230, 0.24);
    color: rgba(239, 237, 230, 0.9);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  &&:hover {
    background: rgba(33, 33, 34, 0.75);
    border-color: rgba(239, 237, 230, 0.4);
  }
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(239, 237, 230, 0.72);
`;

const HeroMetaItem = styled.span`
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(239, 237, 230, 0.22);
  background: rgba(33, 33, 34, 0.4);
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  animation: fadeUp 0.8s ease-out;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const HeroKicker = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--lab-orange);
  font-weight: 600;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: 'DM Serif Display', serif;
  font-size: clamp(2.6rem, 7vw, 5.2rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-wrap: balance;
`;

const HeroDescription = styled.div`
  max-width: 56ch;
  font-size: clamp(1rem, 2vw, 1.3rem);
  line-height: 1.7;
  color: rgba(239, 237, 230, 0.85);

  p {
    margin: 0;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const HeroButton = styled.a`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.35rem;
    border-radius: 999px;
    background: var(--lab-orange);
    border: 1px solid transparent;
    color: var(--lab-cream);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;
  }

  &&:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 40px rgba(255, 89, 35, 0.32);
  }

  &&[data-variant='secondary'] {
    background: transparent;
    border-color: rgba(239, 237, 230, 0.5);
    color: var(--lab-cream);
  }

  &&[data-variant='secondary']:hover {
    background: rgba(239, 237, 230, 0.1);
    box-shadow: none;
  }
`;

const HeroPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  background: rgba(239, 237, 230, 0.12);
  border: 1px solid rgba(239, 237, 230, 0.35);
  color: rgba(239, 237, 230, 0.8);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Opening = styled.section`
  background: var(--lab-black);
  color: var(--lab-cream);
  padding: clamp(2.5rem, 6vw, 4.5rem) 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
    opacity: 0.1;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
`;

const OpeningInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
`;

const OpeningGrid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  animation: fadeUp 0.8s ease-out;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.5fr);
    align-items: start;
  }
`;

const OpeningColumn = styled.div`
  display: grid;
  gap: 0.6rem;

  h4 {
    margin: 0;
    font-size: 0.85rem;
    text-transform: lowercase;
    letter-spacing: 0.14em;
    color: rgba(239, 237, 230, 0.6);
  }
`;

const OpeningList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;

  li {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.75;
  }
`;

const MoreButton = styled.button`
  appearance: none;
  border: 1px solid rgba(239, 237, 230, 0.25);
  background: transparent;
  color: var(--lab-orange);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  width: fit-content;

  &:hover {
    background: rgba(255, 89, 35, 0.12);
    border-color: rgba(255, 89, 35, 0.4);
  }
`;

const OpeningLead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    margin: 0;
    font-size: clamp(0.98rem, 1.8vw, 1.15rem);
    line-height: 1.6;
    color: rgba(239, 237, 230, 0.82);
  }
`;

const OpeningTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 89, 35, 0.4);
    color: var(--lab-orange);
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const Bullets = styled.section`
  padding: clamp(2.75rem, 6vw, 4.5rem) 0;
  background: var(--lab-cream);
`;

const BulletsInner = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const BulletsGrid = styled.div`
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  animation: fadeUp 0.8s ease-out;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const BulletCard = styled.div`
  position: relative;
  padding-left: 2.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid var(--lab-black);
  }

  h4 {
    margin: 0 0 0.75rem;
    font-family: 'DM Serif Display', serif;
    font-size: clamp(1.3rem, 2vw, 1.6rem);
    text-transform: lowercase;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.65;
    color: rgba(33, 33, 34, 0.8);
  }
`;

const TitleSpacer = styled.section`
  padding: clamp(1.75rem, 5vw, 3rem) 1.5rem;
  background: var(--lab-cream);
  text-align: center;

  h2 {
    margin: 0;
    font-size: clamp(1.6rem, 6vw, 3.2rem);
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`;

const CaseStudy = styled.section`
  padding: 0 0 clamp(2.5rem, 7vw, 4.5rem);
  background: linear-gradient(180deg, var(--lab-cream) 0%, #ffffff 60%);
`;

const CaseStudyInner = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CaseStudyHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 clamp(1.5rem, 4vw, 3.5rem);

  span {
    font-size: 0.8rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--lab-orange);
    font-weight: 600;
  }
`;

const CaseStudyMeta = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(33, 33, 34, 0.6);
`;

const BodyCard = styled.section`
  position: relative;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;

  &[data-collapsed='true'] {
    max-height: 980px;
    overflow: hidden;
  }

  &[data-collapsed='true']::after {
    content: '';
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    background: linear-gradient(
      to bottom,
      rgba(239, 237, 230, 0),
      rgba(239, 237, 230, 0.85) 70%,
      #ffffff 100%
    );
  }
`;

const Body = styled.div`
  max-width: none;
  margin: 0;
  padding: 0 clamp(1.5rem, 4vw, 3.5rem);
  color: rgba(33, 33, 34, 0.9);
  font-size: 1.02rem;
  line-height: 1.7;
  font-family: 'Red Hat Display', sans-serif;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0.75rem 0;
  }

  && h1,
  && h2,
  && h3,
  && h4 {
    margin: 1.8rem 0 0.7rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--lab-black);
    font-family: 'DM Serif Display', serif;
    font-weight: 400;
  }

  && h1 {
    font-size: 2rem;
  }

  && h2 {
    font-size: 1.6rem;
  }

  && h3 {
    font-size: 1.3rem;
  }

  && h4 {
    font-size: 1.1rem;
  }

  && a {
    color: var(--lab-orange);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 2px solid rgba(255, 89, 35, 0.4);
  }

  && a:hover {
    border-bottom-color: var(--lab-orange);
  }

  && ul,
  && ol {
    display: block;
    margin: 1rem 0;
    padding-left: 1.25rem;
    list-style: disc;
  }

  && ol {
    list-style: decimal;
  }

  && li {
    display: list-item;
    list-style: inherit;
    margin: 0.45rem 0;
  }

  blockquote {
    margin: 1.2rem 0;
    padding: 0.9rem 1rem;
    border-left: 3px solid rgba(255, 89, 35, 0.6);
    background: rgba(255, 89, 35, 0.08);
    border-radius: 12px;
    color: rgba(33, 33, 34, 0.85);
  }

  pre {
    margin: 1rem 0;
    padding: 0.9rem 1rem;
    border-radius: 14px;
    background: rgba(33, 33, 34, 0.05);
    border: 1px solid rgba(33, 33, 34, 0.1);
    overflow-x: auto;
  }

  code {
    background: rgba(33, 33, 34, 0.05);
    border: 1px solid rgba(33, 33, 34, 0.1);
    border-radius: 8px;
    padding: 0.1rem 0.35rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    font-size: 0.92em;
  }

  pre code {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 0.9em;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 16px;
    border: 1px solid rgba(33, 33, 34, 0.12);
    margin: 1.2rem 0;
    box-shadow: 0 18px 40px rgba(33, 33, 34, 0.12);
  }
`;

const BodyExpand = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem clamp(1.5rem, 4vw, 3.5rem) 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  z-index: 3;
`;

const BodyExpandButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: var(--lab-black);
  color: var(--lab-cream);
  box-shadow: 0 18px 40px rgba(33, 33, 34, 0.2);
  transition:
    transform 160ms ease,
    filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
`;

const BodyExpandMeta = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(33, 33, 34, 0.6);
`;
