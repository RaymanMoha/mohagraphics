import { colors } from '@/styles/components';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  buttonText: string;
  link: string;
};

export const SlidingButton = ({ buttonText, link }: Props) => {
  return (
    <StyledButton href={link} invert={false}>
      <button className="sliding-button-first">{buttonText}</button>
      <div tabIndex={-1} className="sliding-button-second">
        {buttonText}
      </div>
    </StyledButton>
  );
};

const StyledButton = styled(Link)<{ invert: boolean }>`
  position: relative;
  display: inline-block;
  width: auto;
  min-width: 150px;
  height: auto;
  margin: 1rem 0;

  * {
    position: absolute;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
    top: 0;
    left: 0;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
    
    @media only screen and (min-width: 480px) {
      font-size: 1rem;
      padding: 1rem 2rem;
    }
    
    @media only screen and (min-width: 768px) {
      font-size: 1.1rem;
      padding: 1rem 2.5rem;
    }
    
    @media only screen and (min-width: 1024px) {
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  }

  .sliding-button-first {
    background: ${(props) => (props.invert ? colors.green : colors.accent)};
    color: ${colors.white};
    z-index: 100;
    transform: translate3d(-6px, -6px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transition: transform 0.2s ease-in-out;
    
    @media only screen and (min-width: 768px) {
      transform: translate3d(-8px, -8px, 0px) scale3d(1, 1, 1) rotateX(0deg)
        rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    }
  }

  .sliding-button-second {
    z-index: 0;
    border: 2px ${(props) => (props.invert ? colors.white : colors.background)}
      solid;
    position: absolute;
    color: transparent;
    border-radius: 4px;
  }

  .sliding-button-first:hover,
  :focus {
    transform: translate3d(1px, 1px, 1px);
    cursor: pointer;
    
    @media only screen and (min-width: 768px) {
      transform: translate3d(2px, 2px, 2px);
    }
  }

  :focus {
    outline: none;
  }
`;

