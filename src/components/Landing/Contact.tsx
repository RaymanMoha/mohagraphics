import { CupContainer, Hero } from '@/styles/components';
import { Email } from '.';
import { HighlightedWords } from '../HighlightedWords';
import { SlidingButton } from './Buttons';
import Cup from './cup.svg';
import Steam from './steam_1.svg';

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

      <Email href={'mailto:contact@abdulmoharayman@gmail.com'}>
        abdulmoharayman@gmail.com
      </Email>

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
