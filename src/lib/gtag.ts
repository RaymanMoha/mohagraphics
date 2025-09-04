export const GA_TRACKING_ID = 'G-E7GVNYS50S';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      send_page_view: false, // We'll handle page views manually
    });
  }
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
