import styled from 'styled-components';

export const colors = {
  background: '#121e27',
  accent: '#ff715b',
  accentHover: '#e55a42', // Darker version of accent for hover states
  green: '#0dab76',
  faded: '#b7b4b9',
  white: '#ffff',
  grey: '#c7c7c7',
  contrast: '#f9efe7',
};

export const sizing = {
  paddingExterior: {
    base: '1.2rem 2rem 1.2rem',
    tablet: '3.2rem 3rem 3.2rem',
    desktop: '3.2rem 0 3.2rem',
  },
};

export const ThumbnailImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  object-fit: cover;
  margin-right: 1rem;
`;
export const ImageFull = styled.div`
  /* max-width: 30rem;
  margin: auto; */
  margin: 0 3rem 2rem;
  img {
    border-radius: 20px;
    grid-area: image;
  }
  @media only screen and (min-width: 768px) {
    margin: 0;
  }
`;

export const Header = styled.h1``;

export const Paragraph = styled.p``;

export const SectionTag = styled.div`
  font-family: Muli;
  margin: 0 0 1rem;
  padding: 0;
  letter-spacing: 0.1rem;
`;

export const Tags = styled.ul`
  display: flex;
  justify-content: flex-start;
  grid-area: tags;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  white-space: nowrap;

  li {
    list-style: none;
    background: ${colors.background};
    color: ${colors.white};
    padding: 0.4rem 0.8rem;
    margin: 0 0.5rem 0.8rem 0;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    
    @media only screen and (min-width: 768px) {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
    }
  }
  
  @media only screen and (max-width: 480px) {
    li {
      font-size: 0.7rem;
      padding: 0.3rem 0.6rem;
      margin: 0 0.3rem 0.6rem 0;
    }
  }
  
  @media only screen and (min-width: 768px) {
    padding-right: 2rem;
  }
  
  @media only screen and (min-width: 1024px) {
    max-width: 80%;
    display: flex;
  }
`;
export const Space = styled.div`
  padding: ${sizing.paddingExterior.base};
`;

export const Wrapper = styled.div``;

export const WrapperUnused = styled.div`
  .line-numbers .line-numbers-rows {
    top: 1rem;
    left: 1rem !important;
  }
  .gatsby-highlight pre[class*='language-'] {
    padding: 1rem 3.8rem 1rem;
    width: clamp(200px, 80vw, 900px);
  }
  .gatsby-highlight {
    margin: 1rem auto;
    width: 100%;
    overflow: auto;
  }

  .anchorLink {
    color: ${colors.accent};

    transition: 0.3s ease-in-out filter;
    :hover {
      filter: brightness(0.7);
    }
  }
  > *:nth-child(2) {
    min-height: 75vh;
  }
  .leaflet-popup-content {
    div {
      color: green !important;
    }
  }
  position: relative;
  padding-top: 3rem;
  display: grid;
  grid-template-rows: auto 1fr auto;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topButton,
  .anchorLink {
    font-weight: bold;
  }

  margin: 0rem;
  a {
    color: ${colors.accent};
    font-weight: bold;
    transition: filter 0.4s ease-in-out;
    :hover {
      filter: brightness(0.9);
    }
  }

  ul {
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0;
  }
  li {
    list-style: none;
  }

  h1 {
    font-weight: 400;
    font-size: 2.5rem;
  }

  .inh {
    color: inherit;
  }
  .highlight {
    position: relative;
    z-index: 100;
    > div:nth-child(2) {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40%;
      transition: width 0.4s ease-in-out;
      transform: translateX(0.25rem);
      background: ${colors.accent};
      z-index: -100;
    }
    @keyframes sw {
      from {
        width: 100%;
      }
      50% {
        width: 33%;
      }
      to {
        width: 100%;
      }
    }
    :hover > div:nth-child(2) {
      animation: sw 0.4s ease-in-out;
    }
  }
`;

export const Section = styled.section<{ invert?: boolean; top?: boolean }>`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: ${(props) => (props.invert ? colors.background : colors.white)};
  color: ${(props) => (props.invert ? colors.white : colors.background)};
  padding: ${(props) => (props.top ? '8vh 1rem 12vh' : '2.5rem 1rem')};

  @media only screen and (min-width: 768px) {
    padding: ${(props) => (props.top ? '8vh 2rem 12vh' : '3rem 2rem')};
  }

  @media only screen and (min-width: 1024px) {
    padding: ${(props) => (props.top ? '9vh 3rem 13vh' : '3.5rem 3rem')};
  }

  #contactBox {
    position: relative;
    max-width: 700px;
    margin: auto;
    padding: 1.5rem 1rem;
    overflow: visible;
    
    @media only screen and (min-width: 768px) {
      padding: 2.5rem 2rem;
    }
    
    @media only screen and (min-width: 1024px) {
      padding: 3rem 2rem;
    }
  }
`;
export const CupContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  top: 7rem;
  left: 100%;
  z-index: 800;
  transform: translate(-100%, 0);

  @media only screen and (max-width: 400px) {
    position: relative;
    height: 12rem;
    margin: 1rem 0 3rem;
    top: 2rem;
  }
`;

export const Bio = styled.div`
  #bioContainer {
    grid-template-areas:
      'header'
      'image'
      'text';
    display: grid;
    gap: 1rem;
    
    h1 {
      grid-area: header;
      font-size: 2rem;
      margin-bottom: 1rem;
      
      @media only screen and (min-width: 768px) {
        font-size: 2.5rem;
      }
    }
  }
  
  #bioText {
    grid-area: text;
    margin: auto;
    font-size: 1rem;
    line-height: 1.6;
    
    @media only screen and (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
  
  #bioImage {
    padding: 0;
    display: flex;
    justify-content: center;
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 15px;
      
      @media only screen and (min-width: 768px) {
        border-radius: 20px;
      }
    }
  }
  
  @media only screen and (min-width: 768px) {
    #bioContainer {
      align-items: center;
      grid-template-areas:
        'header header'
        'image text';
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
    }
    
    #bioImage {
      padding: 0rem 2rem 0rem 0;
    }
  }
  
  @media only screen and (min-width: 1024px) {
    #bioImage {
      padding: 2rem 2rem 2rem 0;
    }
  }
`;

export const Projects = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  margin-bottom: clamp(24px, 8vh, 80px);
  padding: 0 1rem;

  p {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    
    @media only screen and (min-width: 768px) {
      max-width: 80%;
      font-size: 1.3rem;
    }
  }
  
  h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    
    @media only screen and (min-width: 768px) {
      font-size: 4rem;
    }
  }

  .projectImage {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    padding: 0;
    border-radius: 20px;
    grid-area: image;
    max-width: 100%;
    
    img {
      width: 100%;
      max-width: 400px;
      height: auto;
      border-radius: 20px;
      object-fit: cover;
    }
  }

  @media only screen and (max-width: 480px) {
    padding: 0 0.5rem;
    
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
  
  @media only screen and (min-width: 768px) {
    padding: 0 2rem;
    
    .projectImage {
      max-width: 500px;
      margin: auto;
      
      img {
        max-width: 500px;
      }
    }
  }
  
  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-areas:
      'top top'
      'title image'
      'tags image'
      'text image'
      'button image';
    gap: 1rem;
    padding: 0;
    
    .projectImage {
      margin: auto;
      background: transparent;
      max-width: 600px;
      
      img {
        max-width: 600px;
      }
    }

    p {
      max-width: 100%;
    }
    
    /* Ensure button appears after text */
    & > div:last-child {
      grid-area: button;
      margin-top: 1rem;
    }
  }
`;

export const Hero = styled.h1<{ invert: boolean }>`
  color: ${(props) => (props.invert ? colors.white : colors.background)};
  font-size: 1.8rem;
  font-weight: normal;
  max-width: 90%;
  line-height: 1.3;
  margin: 0;

  @media only screen and (min-width: 480px) {
    font-size: 2.2rem;
  }

  @media only screen and (min-width: 768px) {
    font-size: 3rem;
    max-width: 60rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 4rem;
  }
`;

export const HeroP = styled.p`
  color: ${colors.grey};
  font-size: 1rem;
  max-width: 90%;
  line-height: 1.5;
  margin: 1rem 0;

  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
    max-width: 30rem;
  }
`;
