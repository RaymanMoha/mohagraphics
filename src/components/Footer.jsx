import React from 'react';
import { colors as c } from '../styles/components';
import Sc from '../components/Social';
import styled from 'styled-components';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

const Foot = styled.footer`
  padding: 2rem clamp(1rem, 7vw, 200px);
  background-color: ${({ $invert }) => ($invert ? c.white : c.background)};
  z-index: 2;

  #footWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    #footWrap {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;

const Social = styled(Sc)`
  /* Additional social icon styling (if needed) */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem 1rem;
`;

const Heading = styled.h4`
  font-weight: bold;
  color: ${({ $invert }) => ($invert ? c.background : c.grey)};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const To = styled(Link)`
  color: ${({ $invert }) => ($invert ? c.background : c.faded)};
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${c.accent};
  }
`;

const Logo = styled(Link)`
  color: ${({ $invert }) => ($invert ? c.background : c.white)};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${c.accent};
  }
`;

const Div = styled(Box)``;

export default function Footer({ invert = false }) {
  return (
    <Foot $invert={invert}>
      <div id="footWrap">
        <Div maxW="200px">
          <Logo href="/" $invert={invert}>
            moha
          </Logo>
          <p
            style={{
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              color: invert ? c.background : c.faded,
            }}
          >
            © {new Date().getFullYear()}, Built and designed by Mohammed
            Abdirahman
          </p>
        </Div>

        <Div w="200px">
          <Heading $invert={invert}>Links</Heading>
          <Grid>
            <To href="/about" $invert={invert}>
              About
            </To>
            {/* <To href="/blog">Blog</To> */}
            <To href="/#projects" $invert={invert}>
              Projects
            </To>
            <To href="/#contact" $invert={invert}>
              Contact
            </To>
          </Grid>
        </Div>

        <Div w="200px">
          <Heading $invert={invert}>Get in touch</Heading>
          <Div display="flex" flexDirection="column" alignItems="flex-start">
            <Social
              c={invert ? c.background : 'white'}
              h={invert ? c.background : 'white'}
              p="0 1rem 2rem 0"
            />
          </Div>
        </Div>
      </div>
    </Foot>
  );
}
