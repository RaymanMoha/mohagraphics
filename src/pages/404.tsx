import { SEO } from '@/components/SEO';
import { Hero, HeroP, colors } from '@/styles/components';
import Link from 'next/link';
import styled from 'styled-components';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 | Page not found"
        description="This page could not be found."
        lang="en"
        thumb="logo.png"
        keywords={['404', 'page not found']}
      />

      <Page>
        <Inner>
          <Animation
            src="/img/urban-line-305.gif"
            alt="Page not found illustration"
          />
          <Hero invert={true}>Page not found</Hero>
          <HeroP>
            The link you followed may be broken, or the page may have been
            moved.
          </HeroP>
          <Actions>
            <HomeLink href="/">Go home</HomeLink>
          </Actions>
        </Inner>
      </Page>
    </>
  );
}

const Page = styled.main`
  width: 100%;
  min-height: 75vh;
  background: ${colors.background};
  color: ${colors.white};
  padding: 4rem 1rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const Animation = styled.img`
  width: min(520px, 92vw);
  height: min(520px, 55vh);
  margin-bottom: 0.5rem;
  object-fit: contain;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: ${colors.accent};
  && {
    color: ${colors.white};
  }
  font-weight: 700;
  text-decoration: none;
  transition: filter 0.2s ease-in-out;

  :hover {
    filter: brightness(0.95);
  }
`;
