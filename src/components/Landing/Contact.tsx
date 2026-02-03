import { CupContainer, Hero, colors } from '@/styles/components';
import { Email } from '.';
import { HighlightedWords } from '../HighlightedWords';
import { SlidingButton } from './Buttons';
import Cup from './cup.svg';
import Steam from './steam_1.svg';
import styled from 'styled-components';

export const ContactSection = () => {
  return (
    <div id="contactBox">
      <Hero invert={false}>
        {<HighlightedWords title={"Let's have a **chat**"} />}
      </Hero>
      <img
        src="img/herogifo2.gif"
        alt="Animated GIF"
        style={{
          position: 'absolute',
          top: '10px',
          right: '-200px',
          width: '1000px',
          height: '400px',
        }}
      />

      <Email href="mailto:abdulmoharayman@gmail.com">
        abdulmoharayman@gmail.com
      </Email>
      <ContactMeta>
        <a href="tel:+254799722501">+254 799 722 501</a>
        <span>Nairobi, Kenya | Remote-friendly</span>
      </ContactMeta>

      <div
        style={{
          gridArea: 'button',
          marginTop: '1rem',
          marginBottom: '3rem',
        }}
      >
        <SlidingButton
          buttonText={'Get in touch'}
          link="https://calendly.com/abdulmoharayman/30min"
        />
      </div>
    </div>
  );
};

const ContactMeta = styled.div`
  display: grid;
  gap: 0.35rem;
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: #4b4b4b;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    color: ${colors.accent};
  }
`;
