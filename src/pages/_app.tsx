import Typography from 'typography';
//@ts-ignore
import Wordpress2016 from 'typography-theme-wordpress-2016';

import Layout from '@/components/Layout';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/styles.css';
import styles from '@/styles/style.module.scss';
import { ChakraBaseProvider } from '@chakra-ui/react';
import * as gtag from '../lib/gtag';


Wordpress2016.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
  };
};

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Output CSS as string.
typography.toString();

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles();

export default function MyApp({
  Component,
  pageProps,
}: AppProps) {
  const router = useRouter();

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);


  return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const trackContact = (click: MouseEvent) => {
      const target = click.target;
      const anchor = target instanceof Element ? target.closest('a') : null;
      const href = anchor?.getAttribute('href') || '';
      const kind = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : /^https:\/\/calendly\.com\//.test(href) ? 'booking' : null;
      if (kind) gtag.event({ action: 'generate_lead', category: 'contact', label: kind });
    };
    document.addEventListener('click', trackContact, true);
    return () => document.removeEventListener('click', trackContact, true);
  }, []);


  return (
    <div className={styles.wrapper}>
      <ChakraBaseProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraBaseProvider>
    </div>
  );
}
