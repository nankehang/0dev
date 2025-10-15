import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@/lib/gtag';

/**
 * Custom App Component
 * Wraps all pages and handles global state, analytics tracking
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  // Console easter egg for developers
  useEffect(() => {
    console.log('%c🚀 0dev.io', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cInterested in acquiring this premium domain?', 'font-size: 14px; color: #a1a1aa;');
    console.log('%cContact us at: contact@0dev.io', 'font-size: 14px; color: #10b981;');
    console.log('%c\nShort, memorable, and perfect for tech startups! 💎', 'font-size: 12px; color: #8b5cf6;');
  }, []);
  
  return <Component {...pageProps} />;
}
