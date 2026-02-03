import {
  Hero as H,
  HeroP as HP,
  Section as S,
} from '../../../../styles/components';

import styled from 'styled-components';

export const Section = styled(S)`
  max-width: 675px;
  h2 {
    font-weight: bold;
    font-family: Montserrat;
  }
  ul {
    margin: 1.5rem 0;
    padding-left: 1rem;
    line-height: 1.6;
    
    li {
      list-style: disc;
      margin: 0.8rem 0;
      padding-left: 0.5rem;
      line-height: 1.5;
    }
    
    @media only screen and (min-width: 768px) {
      padding-left: 1.5rem;
      
      li {
        margin: 1rem 0;
        padding-left: 0.75rem;
        line-height: 1.6;
      }
    }
  }
`;
export const Hero = styled(H)`
  font-size: 2.3rem !important;
`;
export const Sub = styled(Hero)`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Email = styled.a`
  font-size: 1.3rem;
  margin: 2rem 0;
  :hover {
    filter: brightness(1.2);
  }
  cursor: pointer;
`;
export const Note = styled(HP)`
  padding: 0;
  margin: 1rem 0;
`;
export const HeroP = styled(HP)``;

