import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

import { landingPage } from '../../content/landing';

type Project = (typeof landingPage.projects)[number];
type Props = { projects: Project[] };

const projectImage = (image: string) =>
  image.startsWith('http') ? image : `/img/${image}`;

export const PersonalProjects = ({ projects }: Props) => (
  <Section aria-labelledby="personal-products-title">
    <Heading>
      <Eyebrow>
        <span /> Personal products
      </Eyebrow>
      <div>
        <h2 id="personal-products-title">Ideas I took from zero to product.</h2>
        <p>
          Self-directed work spanning product strategy, interface design, and
          hands-on engineering.
        </p>
      </div>
    </Heading>

    <Grid>
      {projects.map((project, index) => (
        <Card key={project.link} href={project.link}>
          <Media>
            <Number>{String(index + 1).padStart(2, '0')}</Number>
            <Image
              src={projectImage(project.image)}
              alt={`${project.title} product interface`}
              width={1280}
              height={720}
              sizes="(min-width: 760px) 44vw, 88vw"
            />
          </Media>
          <Copy>
            <Meta>{project.details.type}</Meta>
            <h3>{project.title.split(':')[0]}</h3>
            <p>{project.body}</p>
            <span data-personal-cta>
              Explore the case study <FiArrowRight />
            </span>
          </Copy>
        </Card>
      ))}
    </Grid>
  </Section>
);

const Section = styled.section`
  padding: clamp(3rem, 6vw, 5rem) 0;
  border-bottom: 1px solid var(--line);
`;

const Heading = styled.header`
  display: grid;
  gap: 1.2rem;
  margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
  h2 {
    max-width: 13ch;
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.25rem, 4.5vw, 3.8rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.045em;
  }
  p {
    max-width: 46ch;
    margin: 0.8rem 0 0;
    color: rgba(19, 32, 42, 0.66);
    font-size: 0.9rem;
    line-height: 1.65;
  }
  @media (min-width: 760px) {
    grid-template-columns: minmax(180px, 0.48fr) minmax(0, 1.4fr);
    align-items: start;
  }
`;

const Eyebrow = styled.div`
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

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  @media (min-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled(Link)`
  && {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100%;
    overflow: hidden;
    border: 1px solid rgba(19, 32, 42, 0.2);
    background: rgba(255, 255, 255, 0.52);
    color: var(--ink);
  }
  &:hover img {
    transform: scale(1.02);
  }
  &:hover h3,
  &:hover [data-personal-cta] {
    color: var(--coral);
  }
  &:focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 4px;
  }
`;

const Media = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(19, 32, 42, 0.16);
  background: #edf0e8;
  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: top;
    transition: transform 320ms ease;
  }
`;

const Number = styled.small`
  position: absolute;
  z-index: 1;
  top: 0.8rem;
  left: 0.8rem;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--ink);
  color: white;
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.08em;
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1.35rem, 3vw, 2rem);
  h3 {
    margin: 0.4rem 0 0.75rem;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.4vw, 3rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.04em;
    transition: color 200ms ease;
  }
  p {
    margin: 0 0 1.25rem;
    color: rgba(19, 32, 42, 0.7);
    font-size: 0.88rem;
    line-height: 1.65;
  }
  > span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    color: var(--blue);
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    transition: color 200ms ease;
  }
  svg {
    width: 1em;
    height: 1em;
  }
`;

const Meta = styled.small`
  color: var(--coral);
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
