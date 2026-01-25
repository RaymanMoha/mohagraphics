import React, { useEffect, useState } from 'react';
import StyledComponentsRegistry from '../../lib/registry';
import Footer from './Footer';
import Navbar from './Navbar';
import AIAssistant from './AIAssistant';
import { ChatProvider } from '../contexts/ChatContext';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter();
  const invertFooter = router.pathname === '/404';

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return <></>;

  return (
    <StyledComponentsRegistry>
      <ChatProvider>
        <Navbar invert={true} />
        {children}
        <Footer invert={invertFooter} />
        <AIAssistant />
      </ChatProvider>
    </StyledComponentsRegistry>
  );
}
