import Typography from 'typography';
//@ts-ignore
import Wordpress2016 from 'typography-theme-wordpress-2016';

import Layout from '@/components/Layout';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/styles.css';
import styles from '@/styles/style.module.scss';
import { ChakraBaseProvider } from '@chakra-ui/react';

// Google Analytics helper functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-E7GVNYS50S';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

type AppOwnProps = { example: string };

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
}: AppProps & AppOwnProps) {
  const router = useRouter();

  // Track page views on route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, example: 'data' };
};

