import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import styled from 'styled-components';

import { landingPage } from '../../content/landing';
import { PersonalProjects } from './PersonalProjects';

type Props = { projects: typeof landingPage.projects };
type Project = Props['projects'][number];

const featuredOrder = ['Budj', 'ShambaBoy', 'Sava - Fuel Wallet & Delivery'];
const indexOrder = [
  'Reon Capital Dev Hub',
  'ENEVA -Utility Manager',
  'OnSpace: No-Code Operations Platform',
];
const personalOrder = [
  'AppBase: WhatsApp Commerce',
  'Groundbase: AI Field Intelligence',
];

const selectProjects = (projects: Project[], titles: string[]) =>
  titles
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is Project => Boolean(project));

const shortTitle = (title: string) => title.split(' - ')[0].split(':')[0];

export const ProjectsSection = ({ projects }: Props) => {
  const featured = selectProjects(projects, featuredOrder);
  const shipped = selectProjects(projects, indexOrder);
  const personal = selectProjects(projects, personalOrder);

  return (
    <Portfolio>
      <Masthead>
        <MastheadVisual>
          <SectionLabel>
            <span />
            Selected products
          </SectionLabel>
          <PreviewStrip aria-label="Featured product previews">
            {featured.map((project) => (
              <PreviewLink key={project.link} href={project.link}>
                <img
                  src={`/img/${project.image}`}
                  alt={`${project.title} preview`}
                />
              </PreviewLink>
            ))}
          </PreviewStrip>
        </MastheadVisual>

        <MastheadCopy>
          <h2>Products built for real people and real work.</h2>
          <p>
            Selected mobile and web products across fintech, agriculture, and
            daily operations.
          </p>
          <JumpLink href="/projects/Budj/">
            Start with Budj <FiArrowRight />
          </JumpLink>
        </MastheadCopy>
      </Masthead>

      <FeaturedList>
        {featured.map((project) => (
          <ProjectRow key={project.link}>
            <MediaLink
              href={project.link}
              aria-label={`View ${project.title} case study`}
            >
              <img
                src={`/img/${project.image}`}
                alt={`${project.title} product interface`}
              />
            </MediaLink>
            <ProjectCopy>
              <Role>{project.role}</Role>
              <ProjectTitle>{shortTitle(project.title)}</ProjectTitle>
              <ProjectType>{project.details.type}</ProjectType>
              <Description>{project.body}</Description>
              <CaseStudyLink href={project.link}>
                View case study <FiArrowRight />
              </CaseStudyLink>
            </ProjectCopy>
          </ProjectRow>
        ))}
      </FeaturedList>

      <PersonalProjects projects={personal} />

      <Shipped>
        <SectionLabel>
          <span />
          Also shipped
        </SectionLabel>
        <ShippedGrid>
          {shipped.map((project) => (
            <ShippedLink key={project.link} href={project.link}>
              <small>{project.details.type}</small>
              <strong>
                {shortTitle(project.title.replace(' -Utility Manager', ''))}
              </strong>
              <FiArrowUpRight aria-hidden="true" />
            </ShippedLink>
          ))}
        </ShippedGrid>
      </Shipped>
    </Portfolio>
  );
};

const Portfolio = styled.div`
  --sand: #f8eee6;
  --ink: #13202a;
  --coral: #f26652;
  --blue: #155eef;
  --line: #d9cbc0;
  margin: -2.5rem -1rem;
  padding: clamp(2.75rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4.5rem);
  background: var(--sand);
  color: var(--ink);
  svg {
    width: 1em;
    height: 1em;
    flex: 0 0 auto;
  }
  @media (min-width: 768px) {
    margin: -3rem -2rem;
  }
  @media (min-width: 1024px) {
    margin: -3.5rem -3rem;
  }
`;

const Masthead = styled.header`
  display: grid;
  gap: 2.5rem;
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
  border-bottom: 1px solid var(--line);
  @media (min-width: 820px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.62fr);
    align-items: center;
    gap: clamp(3rem, 6vw, 5.5rem);
  }
`;

const MastheadVisual = styled.div`
  position: relative;
  padding-left: 1.4rem;
  border-left: 2px solid var(--coral);
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--coral);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--coral);
  }
`;

const PreviewStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 1.2rem;
`;

const PreviewLink = styled(Link)`
  display: block;
  min-height: 44px;
  overflow: hidden;
  border: 1px solid rgba(19, 32, 42, 0.16);
  background: white;
  img {
    width: 100%;
    height: clamp(190px, 29vw, 350px);
    display: block;
    object-fit: cover;
  }
  &:nth-child(1) img {
    object-position: 45% top;
  }
  &:nth-child(2) img {
    object-position: center;
  }
  &:nth-child(3) img {
    object-position: left top;
  }
  &:hover img {
    transform: scale(1.015);
  }
  img {
    transition: transform 300ms ease;
  }
`;

const MastheadCopy = styled.div`
  h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.35rem, 4.4vw, 4.15rem);
    font-weight: 400;
    line-height: 1.02;
    letter-spacing: -0.045em;
  }
  p {
    margin: 1.2rem 0 1.5rem;
    max-width: 30ch;
    color: rgba(19, 32, 42, 0.68);
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.65;
  }
`;

const JumpLink = styled(Link)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    min-height: 48px;
    padding: 0 1.1rem;
    background: var(--coral);
    color: white;
    font-size: 0.76rem;
    font-weight: 900;
  }
`;

const FeaturedList = styled.div``;

const ProjectRow = styled.article`
  display: grid;
  gap: 1.75rem;
  padding: clamp(2.5rem, 5.5vw, 4.25rem) 0;
  border-bottom: 1px solid var(--line);
  @media (min-width: 800px) {
    grid-template-columns: minmax(0, 1.52fr) minmax(270px, 0.72fr);
    align-items: center;
    gap: clamp(2.75rem, 6vw, 5rem);
  }
`;

const MediaLink = styled(Link)`
  display: block;
  min-height: 44px;
  overflow: hidden;
  border: 1px solid rgba(19, 32, 42, 0.22);
  background: white;
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: block;
    object-fit: cover;
    object-position: top;
    transition: transform 320ms ease;
  }
  &:hover img {
    transform: scale(1.012);
  }
  &:focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 4px;
  }
`;

const ProjectCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Role = styled.p`
  && {
    margin: 0 0 0.65rem;
    color: var(--coral);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    line-height: 1.45;
    text-transform: uppercase;
  }
`;

const ProjectTitle = styled.h2`
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.65rem, 4.8vw, 4.4rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.045em;
`;

const ProjectType = styled.p`
  && {
    margin: 0.65rem 0 1rem;
    color: rgba(19, 32, 42, 0.62);
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

const Description = styled.p`
  && {
    margin: 0 0 1.25rem;
    max-width: 34ch;
    color: rgba(19, 32, 42, 0.72);
    font-size: 0.93rem;
    font-weight: 400;
    line-height: 1.65;
  }
`;

const CaseStudyLink = styled(Link)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 44px;
    color: var(--blue);
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }
  &:hover {
    color: var(--coral);
  }
`;

const Shipped = styled.section`
  padding-top: clamp(2.75rem, 5vw, 4rem);
`;

const ShippedGrid = styled.div`
  display: grid;
  margin-top: 1rem;
  border-top: 1px solid var(--ink);
  @media (min-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ShippedLink = styled(Link)`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 118px;
    padding: 1.3rem 2.4rem 1.3rem 0;
    border-bottom: 1px solid var(--line);
    color: var(--ink);
  }
  small {
    color: rgba(19, 32, 42, 0.58);
    font-size: 0.64rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  strong {
    margin-top: 0.3rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.45rem;
    font-weight: 400;
  }
  svg {
    position: absolute;
    right: 0.75rem;
    color: var(--coral);
  }
  &:hover strong {
    color: var(--coral);
  }
  @media (min-width: 720px) {
    && {
      padding-left: 1.35rem;
      border-right: 1px solid var(--line);
    }
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      border-right: 0;
    }
  }
`;
