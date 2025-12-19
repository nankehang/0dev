import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import HackerNavbar from '@/components/HackerNavbar';
import HackerFooter from '@/components/HackerFooter';
import { Providers } from '@/components/providers';
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '0dev.io - Hacker Research Notes',
  description: 'Research notes on WinAPI, malware development, and digital forensics',
  keywords: ['hacker', 'security', 'malware', 'WinAPI', 'digital forensics', 'research'],
  authors: [{ name: '0dev.io' }],
  creator: '0dev.io',
  publisher: '0dev.io',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.0dev.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '0dev.io - Hacker Research Notes',
    description: 'Research notes on WinAPI, malware development, and digital forensics',
    url: 'https://www.0dev.io',
    siteName: '0dev.io',
    type: 'website',
    images: [
      {
        url: 'https://www.0dev.io/og-image.png',
        width: 1200,
        height: 630,
        alt: '0dev.io - Hacker Research Notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '0dev.io - Hacker Research Notes',
    description: 'Research notes on WinAPI, malware development, and digital forensics',
    images: ['https://www.0dev.io/og-image.png'],
    site: '@0dev_io',
    creator: '@0dev_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Easter egg in console
  console.log('%c> SYSTEM_ACCESS_GRANTED', 'color: #FF0000; font-size: 20px; font-family: monospace;');
  console.log('%c> Welcome to 0dev.io research notes', 'color: #00FF41; font-size: 14px; font-family: monospace;');
  console.log('%c> Contact: khusanakihang@gmail.com', 'color: #00FF41; font-size: 12px; font-family: monospace;');

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-hacker-black text-matrix-green font-sans">
        <Providers>
          <div className="min-h-screen bg-hacker-black text-matrix-green">
            <HackerNavbar />
            {children}
            <HackerFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}