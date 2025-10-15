/**
 * Google Analytics 4 (GA4) Integration
 * Tracking ID: G-NVCRDB7ECY
 * 
 * This utility provides functions for tracking page views and custom events
 */

// Check if window is available (client-side only)
export const GA_TRACKING_ID = 'G-NVCRDB7ECY';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom tracking events for 0dev.io
export const trackCTAClick = (location: string) => {
  event({
    action: 'click',
    category: 'CTA',
    label: `Acquire Domain - ${location}`,
  });
};

export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Email Contact',
  });
};

export const trackToolCardClick = (toolName: string) => {
  event({
    action: 'click',
    category: 'Tools',
    label: toolName,
  });
};

export const trackSectionView = (sectionName: string) => {
  event({
    action: 'view',
    category: 'Section',
    label: sectionName,
  });
};
