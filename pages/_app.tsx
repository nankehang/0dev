import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import HackerNavbar from '@/components/HackerNavbar';
import HackerFooter from '@/components/HackerFooter';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Custom App Component
 * Wraps all pages and handles global state, analytics tracking
 */
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Easter egg in console
    console.log('%c> SYSTEM_ACCESS_GRANTED', 'color: #FF0000; font-size: 20px; font-family: monospace;');
    console.log('%c> Welcome to 0dev.io research notes', 'color: #00FF41; font-size: 14px; font-family: monospace;');
    console.log('%c> Contact: khusanakihang@gmail.com', 'color: #00FF41; font-size: 12px; font-family: monospace;');
  }, []);

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-hacker-black text-matrix-green">
        {router.pathname !== '/login' && router.pathname !== '/my-vision' && <HackerNavbar />}
        <Component {...pageProps} />
        {router.pathname !== '/login' && router.pathname !== '/my-vision' && <HackerFooter />}
      </div>
    </SessionProvider>
  );
}
