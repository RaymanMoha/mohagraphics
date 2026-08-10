import Link from 'next/link';
import styled from 'styled-components';

export const Page = styled.main`
  --sand: #f8eee6;
  --ink: #13202a;
  --coral: #f26652;
  --blue: #155eef;
  --line: #d9cbc0;
  width: 100%;
  overflow: hidden;
  background: var(--sand);
  color: var(--ink);
  svg {
    width: 1em;
    height: 1em;
    flex: 0 0 auto;
  }
`;

export const Intro = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(5.5rem, 8vw, 7rem) clamp(1.25rem, 4vw, 2.5rem)
    clamp(2.5rem, 5vw, 4rem);
`;

export const BackLink = styled(Link)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    min-height: 44px;
    margin-bottom: clamp(1.25rem, 3vw, 2.25rem);
    color: var(--ink);
    font-size: 0.76rem;
    font-weight: 800;
  }
  &:hover {
    color: var(--coral);
  }
`;

export const IntroGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  @media (min-width: 840px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.78fr);
    align-items: start;
    gap: clamp(3.5rem, 7vw, 6rem);
  }
`;

export const Summary = styled.div``;

export const Title = styled.h1`
  max-width: 12ch;
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.75rem, 5vw, 4.6rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.05em;
`;

export const CoralRule = styled.div`
  width: 38px;
  height: 2px;
  margin: 1.15rem 0 0.9rem;
  background: var(--coral);
`;

export const Role = styled.p`
  && {
    margin: 0 0 0.25rem;
    font-size: 0.78rem;
    font-weight: 900;
    line-height: 1.5;
  }
`;

export const Type = styled.p`
  && {
    margin: 0;
    color: rgba(19, 32, 42, 0.62);
    font-size: 0.76rem;
    font-weight: 600;
  }
`;

export const Description = styled.p`
  && {
    max-width: 54ch;
    margin: 1.2rem 0 1.5rem;
    color: rgba(19, 32, 42, 0.72);
    font-size: 0.96rem;
    font-weight: 400;
    line-height: 1.65;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.6rem;
`;

export const PrimaryAction = styled.a`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    min-height: 50px;
    padding: 0 1.2rem;
    background: var(--coral);
    color: white;
    font-size: 0.74rem;
    font-weight: 900;
  }
  &:hover {
    background: #dd5744;
  }
`;

export const TextAction = styled.a`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 44px;
    color: var(--blue);
    font-size: 0.75rem;
    font-weight: 900;
  }
`;

export const PrivateLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(19, 32, 42, 0.68);
  font-size: 0.75rem;
  font-weight: 800;
`;

export const Facts = styled.dl`
  position: relative;
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding-left: 2rem;
  border-left: 1px solid var(--coral);
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--coral);
  }
`;

export const FactsLabel = styled.div`
  margin-bottom: 0.15rem;
  color: var(--coral);
  font-size: 0.63rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const Fact = styled.div`
  display: grid;
  grid-template-columns: minmax(75px, 0.48fr) minmax(0, 1.3fr);
  gap: 0.85rem;
  font-size: 0.72rem;
  line-height: 1.55;
  dt {
    font-weight: 900;
  }
  dd {
    margin: 0;
    color: rgba(19, 32, 42, 0.68);
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--blue);
    font-weight: 900;
  }
  span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

export const HeroMedia = styled.figure`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 8.6;
    object-fit: cover;
    object-position: top;
    border: 1px solid rgba(19, 32, 42, 0.32);
    background: white;
  }
`;

export const Story = styled.section`
  display: grid;
  gap: 2.75rem;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 2.5rem);
  @media (min-width: 840px) {
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.68fr);
    gap: clamp(3.5rem, 7vw, 6rem);
  }
`;

export const StoryColumn = styled.div``;

export const StoryBlock = styled.article`
  position: relative;
  padding: 0 0 1.75rem 2.35rem;
  border-left: 1px solid var(--coral);
  border-bottom: 1px solid var(--line);
  & + & {
    padding-top: 1.5rem;
  }
`;

export const Marker = styled.i`
  position: absolute;
  top: 0;
  left: -5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--coral);
`;

export const BlockLabel = styled.div`
  margin-bottom: 0.8rem;
  color: var(--coral);
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.17em;
  text-transform: uppercase;
`;

export const Markdown = styled.div`
  color: rgba(19, 32, 42, 0.78);
  font-size: 0.88rem;
  line-height: 1.7;
  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }
  p {
    margin: 0 0 0.9rem;
    font-size: inherit;
    font-weight: 400;
  }
  ul,
  ol {
    display: grid;
    gap: 0.42rem;
    margin: 0;
    padding-left: 1.1rem;
  }
  li {
    display: list-item;
    list-style: disc;
  }
  a {
    color: var(--blue);
    font-weight: 800;
  }
`;

export const SideFacts = styled(Facts)`
  align-self: start;
  @media (min-width: 840px) {
    position: sticky;
    top: 6rem;
  }
`;

export const Gallery = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem);
`;

export const GalleryHeading = styled.header`
  display: grid;
  gap: 0.7rem;
  margin-bottom: 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--ink);
  h2 {
    max-width: 13ch;
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.04em;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  gap: 0.8rem;
  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const GalleryItem = styled.figure`
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  background: white;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  figcaption {
    padding: 0.85rem 1rem;
    color: rgba(19, 32, 42, 0.68);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.5;
  }
  @media (min-width: 700px) {
    &:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }
`;

export const NextSection = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 5vw, 4rem);
`;

export const NextLabel = styled.div`
  padding: 0.9rem 0;
  border-top: 1px solid var(--ink);
  color: var(--coral);
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

export const NextProject = styled(Link)`
  && {
    display: grid;
    gap: 1.3rem;
    align-items: center;
    padding: 1rem 0;
    border-top: 1px solid var(--line);
    color: var(--ink);
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 6.7;
    object-fit: cover;
    border: 1px solid var(--line);
  }
  &:hover h2 {
    color: var(--coral);
  }
  @media (min-width: 700px) {
    && {
      grid-template-columns: minmax(0, 1.6fr) minmax(240px, 0.68fr);
    }
  }
`;

export const NextCopy = styled.div`
  small {
    color: var(--coral);
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  h2 {
    margin: 0.25rem 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 3.7vw, 3.3rem);
    font-weight: 400;
    line-height: 1;
  }
  p {
    margin: 0 0 0.55rem;
    color: rgba(19, 32, 42, 0.62);
    font-size: 0.7rem;
    font-weight: 700;
  }
  span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--blue);
    font-size: 0.66rem;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

export const ContactBand = styled.section`
  position: relative;
  display: grid;
  gap: 1.75rem;
  align-items: center;
  min-height: 220px;
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 10vw, 8.5rem);
  overflow: hidden;
  background: var(--ink);
  color: white;
  h2 {
    position: relative;
    z-index: 2;
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.35rem, 4.5vw, 4rem);
    font-weight: 400;
    line-height: 1.02;
  }
  p {
    position: relative;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    align-items: center;
    margin: 0.85rem 0 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.72rem;
    font-weight: 700;
  }
  p i {
    width: 1px;
    height: 16px;
    background: rgba(255, 255, 255, 0.28);
  }
  @media (min-width: 740px) {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`;

export const ContactMarker = styled.i`
  position: absolute;
  top: 1.75rem;
  bottom: 1.75rem;
  left: clamp(1rem, 6vw, 4.8rem);
  width: 1px;
  background: var(--coral);
`;

export const ContactAction = styled.a`
  && {
    position: relative;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    min-height: 52px;
    padding: 0 1.25rem;
    background: var(--coral);
    color: white;
    font-size: 0.74rem;
    font-weight: 900;
  }
`;

export const ContactGif = styled.img`
  position: absolute;
  right: -2%;
  bottom: -52%;
  width: min(500px, 52vw);
  opacity: 0.15;
  pointer-events: none;
`;
