import { SEO } from '@/components/SEO';
import { Content, content } from '@/content/projects';
import { colors } from '@/styles/components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
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

  const hasMedia = Boolean(heroImageSrc);
  const stackItems = stack.split(' ').filter(Boolean);
  const visibleStackItems = showMore ? stackItems : stackItems.slice(0, 8);
  const remainingStackCount = Math.max(
    0,
    stackItems.length - visibleStackItems.length,
  );
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

      <Hero>
        <HeroInner>
          <HeroTop>
            <BackLink href="/#projects">← Projects</BackLink>
          </HeroTop>

          <HeroGrid data-has-media={hasMedia ? 'true' : 'false'}>
            <HeroContent>
              <HeroKicker>{role}</HeroKicker>
              <HeroTitle>{title}</HeroTitle>
              <HeroDescription
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <HeroMeta>
                <MetaPill>{readTimeMinutes} min read</MetaPill>
                <MetaPill data-variant="muted">{type}</MetaPill>
              </HeroMeta>

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

            {heroImageSrc ? (
              <HeroMedia>
                <img src={heroImageSrc} alt={`${title} preview`} />
              </HeroMedia>
            ) : null}
          </HeroGrid>
        </HeroInner>
      </Hero>

      <Main>
        <Details>
          <Detail>
            <span className="label">Role</span>
            <span className="value">{role}</span>
          </Detail>

          <Detail>
            <span className="label">Type</span>
            <span className="value">{type}</span>
          </Detail>

          <Detail data-span="full">
            <span className="label">Stack</span>
            <div className="value">
              <div className="chips">
                {visibleStackItems.map((tech) => (
                  <span className="chip" key={tech}>
                    {tech.replaceAll('_', ' ')}
                  </span>
                ))}
                {remainingStackCount > 0 ? (
                  <button
                    type="button"
                    className="more"
                    onClick={() => setShowMore(true)}
                  >
                    +{remainingStackCount} more
                  </button>
                ) : stackItems.length > 8 ? (
                  <button
                    type="button"
                    className="more"
                    onClick={() => setShowMore(false)}
                  >
                    Show less
                  </button>
                ) : null}
              </div>
            </div>
          </Detail>
        </Details>

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
      </Main>
    </Page>
  );
};

export default ProjectPage;

const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(
      1200px circle at 10% 0%,
      rgba(255, 113, 91, 0.08) 0%,
      rgba(255, 113, 91, 0) 55%
    ),
    radial-gradient(
      900px circle at 90% 10%,
      rgba(13, 171, 118, 0.06) 0%,
      rgba(13, 171, 118, 0) 55%
    ),
    #f6f7fb;
  color: ${colors.background};
`;

const Hero = styled.header`
  background:
    radial-gradient(
      1100px circle at 20% -10%,
      rgba(255, 113, 91, 0.35) 0%,
      rgba(255, 113, 91, 0) 60%
    ),
    radial-gradient(
      900px circle at 80% 20%,
      rgba(13, 171, 118, 0.18) 0%,
      rgba(13, 171, 118, 0) 55%
    ),
    linear-gradient(180deg, #0c1520 0%, ${colors.background} 100%);
  color: ${colors.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(2.25rem, 6vw, 4rem) 1rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 2rem);
`;

const HeroTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const BackLink = styled(Link)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.88);
    text-decoration: none;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.01em;
  }

  &&:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.26);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  gap: clamp(1.4rem, 3.5vw, 2.6rem);
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);

    &[data-has-media='false'] {
      grid-template-columns: 1fr;
    }
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HeroKicker = styled.div`
  width: fit-content;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  && {
    margin: 0;
    font-size: clamp(2.25rem, 4.8vw, 3.4rem);
    line-height: 1.03;
    letter-spacing: -0.035em;
    font-weight: 900;
  }
`;

const HeroDescription = styled.div`
  max-width: 62ch;
  font-size: clamp(1.02rem, 1.6vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;

  p {
    margin: 0;
  }
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

const MetaPill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.01em;

  &[data-variant='muted'] {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.78);
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

const HeroButton = styled.a`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.05rem;
    border-radius: 999px;
    background: ${colors.accent};
    border: 1px solid rgba(0, 0, 0, 0.08);
    color: ${colors.white};
    text-decoration: none;
    font-weight: 800;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease,
      border-color 180ms ease;
  }
  letter-spacing: 0.01em;

  &&:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 34px rgba(255, 113, 91, 0.28);
  }

  &&[data-variant='secondary'] {
    background: transparent;
    color: ${colors.white};
    border-color: rgba(255, 255, 255, 0.2);
  }

  &&[data-variant='secondary']:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: none;
  }
`;

const HeroPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.05rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.85);
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const HeroMedia = styled.div`
  width: 100%;
  border-radius: clamp(18px, 2vw, 26px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 2.5vw, 1.5rem);

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    padding: 0;
    max-height: 520px;
    filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.18));
  }
`;

const Main = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(1.25rem, 3vw, 2.5rem) 1rem 4.5rem;
  display: grid;
  gap: 1rem;
  margin-top: -1.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 640px) {
    margin-top: -1.1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 320px minmax(0, 1fr);
    align-items: start;
    gap: 1.5rem;
  }
`;

const Details = styled.section`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(18, 30, 39, 0.08);
  border-radius: 20px;
  padding: 0.85rem;
  box-shadow: 0 18px 40px rgba(18, 30, 39, 0.06);
  backdrop-filter: blur(12px);
  display: grid;
  gap: 0.8rem;

  @media (min-width: 1024px) {
    position: sticky;
    top: 5.75rem;
    align-self: start;
  }
`;

const Detail = styled.div`
  padding: 0.8rem 0.85rem;
  border-radius: 16px;
  background: rgba(18, 30, 39, 0.03);
  border: 1px solid rgba(18, 30, 39, 0.06);
  display: grid;
  gap: 0.4rem;

  &[data-span='full'] {
    grid-column: 1 / -1;
  }

  .label {
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(18, 30, 39, 0.62);
    font-weight: 800;
  }

  .value {
    color: rgba(18, 30, 39, 0.88);
    font-weight: 700;
    line-height: 1.35;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    background: rgba(18, 30, 39, 0.04);
    border: 1px solid rgba(18, 30, 39, 0.08);
    color: rgba(18, 30, 39, 0.82);
    font-weight: 700;
    font-size: 0.82rem;
    line-height: 1;
    white-space: nowrap;
  }

  .more {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    background: transparent;
    border: 1px solid rgba(18, 30, 39, 0.12);
    color: ${colors.accent};
    font-weight: 800;
    font-size: 0.82rem;
    line-height: 1;
    cursor: pointer;
    font-family: inherit;
  }

  .more:hover {
    background: rgba(255, 113, 91, 0.08);
    border-color: rgba(255, 113, 91, 0.24);
  }
`;

const BodyCard = styled.section`
  position: relative;
  background: ${colors.white};
  border: 1px solid rgba(18, 30, 39, 0.08);
  border-radius: 20px;
  padding: clamp(1rem, 2.2vw, 1.85rem);
  box-shadow: 0 18px 40px rgba(18, 30, 39, 0.06);

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
      rgba(255, 255, 255, 0),
      ${colors.white} 70%
    );
  }
`;

const Body = styled.div`
  max-width: 92ch;
  margin: 0 auto;
  color: rgba(18, 30, 39, 0.9);
  font-size: 1.02rem;
  line-height: 1.68;

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
    margin: 1.6rem 0 0.6rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${colors.background};
    font-weight: 900;
  }

  && h1 {
    font-size: 1.55rem;
  }

  && h2 {
    font-size: 1.25rem;
  }

  && h3 {
    font-size: 1.1rem;
  }

  && h4 {
    font-size: 1rem;
  }

  && a {
    color: ${colors.accent};
    font-weight: 650;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }

  && a:hover {
    text-decoration-thickness: 2px;
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
    margin: 1rem 0;
    padding: 0.8rem 0.95rem;
    border-left: 3px solid rgba(255, 113, 91, 0.55);
    background: rgba(255, 113, 91, 0.06);
    border-radius: 10px;
    color: rgba(18, 30, 39, 0.85);
  }

  pre {
    margin: 1rem 0;
    padding: 0.85rem 0.95rem;
    border-radius: 14px;
    background: rgba(18, 30, 39, 0.04);
    border: 1px solid rgba(18, 30, 39, 0.06);
    overflow-x: auto;
  }

  code {
    background: rgba(18, 30, 39, 0.04);
    border: 1px solid rgba(18, 30, 39, 0.06);
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
    border-radius: 14px;
    border: 1px solid rgba(18, 30, 39, 0.08);
    margin: 1rem 0;
  }
`;

const BodyExpand = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.25rem 1.25rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  z-index: 3;
`;

const BodyExpandButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 900;
  letter-spacing: 0.01em;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: ${colors.background};
  color: ${colors.white};
  box-shadow: 0 16px 38px rgba(18, 30, 39, 0.18);
  transition:
    transform 160ms ease,
    filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
`;

const BodyExpandMeta = styled.div`
  font-weight: 700;
  font-size: 0.9rem;
  color: rgba(18, 30, 39, 0.68);
`;
