import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import AIAssistant from './AIAssistant';
import { ChatProvider } from '../contexts/ChatContext';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <ChatProvider>
      <Navbar invert={true} />
      {children}
      <Footer invert={router.pathname === '/404'} />
      <AIAssistant />
    </ChatProvider>
  );
}
