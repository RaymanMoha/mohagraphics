import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { colors } from '../styles/components';
import { useChatContext } from '../contexts/ChatContext';

interface NavContainerProps {
  showShadow: boolean;
  invert: boolean;
}

interface MenuProps {
  open: boolean;
  invert: boolean;
}

interface BurgerProps {
  invert: boolean;
}

interface NavHeadingProps {
  invert: boolean;
}

interface NavLinkProps {
  invert: boolean;
}

const NavbarContainer = styled.nav<NavContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem 2rem; /* Reduced padding for less height */
  background-color: ${({ invert }) =>
    invert ? colors.white : colors.background};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: ${({ showShadow }) =>
    showShadow ? '0 2px 10px rgba(0, 0, 0, 0.15)' : 'none'};

  .logo {
    font-size: 1.5rem; /* Reduced font size */
    font-weight: 700;
    color: ${({ invert }) => (invert ? colors.background : colors.white)};
    cursor: pointer;
    text-transform: uppercase;
  }
`;

const Menu = styled.ul<MenuProps>`
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 0;

  li {
    position: relative;
    font-size: 1rem;
    color: ${({ invert }) => (invert ? colors.background : colors.white)};
    cursor: pointer;
    transition: color 0.3s ease;
    text-transform: capitalize;

    &:hover {
      color: ${colors.accent};
    }

    &:after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      background: ${colors.accent};
      left: 0;
      bottom: -4px;
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? '0' : '-100%')};
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    transition: left 0.3s ease;
  }
`;

const Burger = styled.div<BurgerProps>`
  display: none;
  font-size: 1.75rem; /* Reduced size */
  color: ${({ invert }) => (invert ? colors.background : colors.white)};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.div`
  display: none;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  font-size: 1.75rem; /* Reduced size */
  color: ${colors.white};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row; /* Changed to row for horizontal layout */
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavHeading = styled.h3<NavHeadingProps>`
  color: ${({ invert }) => (invert ? colors.background : colors.white)};
  margin: 0;
  margin-right: 1rem;
  font-size: 1rem;
  display: none; /* Hide by default */

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1rem;
    color: ${colors.white};
  }
`;

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ invert }) => (invert ? colors.background : colors.white)};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
  position: relative;

  &:hover {
    color: ${colors.accent};
  }

  &:after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    background: ${colors.accent};
    left: 0;
    bottom: -4px;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

export default function Navbar({ invert = false }: { invert?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const router = useRouter();
  const { openChat } = useChatContext();

  // Add a subtle shadow when scrolling for a more refined feel
  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <NavbarContainer showShadow={showShadow} invert={invert}>
      <Link href="/">
        <span className="logo">Moha</span>
      </Link>
      <Burger invert={invert} onClick={() => setMenuOpen(true)}>
        <GiHamburgerMenu />
      </Burger>
      <Menu open={menuOpen} invert={invert}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <IoClose />
        </CloseButton>
        <NavHeading invert={invert}>Links</NavHeading>
        <NavLinks>
          <NavLink href="/about" invert={invert}>
            About
          </NavLink>
          {/* <NavLink href="/blog" invert={invert}>Blog</NavLink> */}
          <NavLink href="/#projects" invert={invert}>
            Projects
          </NavLink>
          <NavLink href="/#contact" invert={invert}>
            Contact
          </NavLink>
          <NavLink href="#" invert={invert} onClick={(e) => { e.preventDefault(); openChat(); setMenuOpen(false); }}>
            AI Chat
          </NavLink>
        </NavLinks>
      </Menu>
    </NavbarContainer>
  );
}

