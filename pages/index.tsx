import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Tools from '@/components/Tools';
import Features from '@/components/Features';
import DomainValue from '@/components/DomainValue';
import Stats from '@/components/Stats';
import NewsBar from '@/components/NewsBar';
import CTA from '@/components/CTA';
import AdSection from '@/components/AdSection';
import Footer from '@/components/Footer';
import { siteConfig, structuredData, organizationStructuredData, productStructuredData } from '@/lib/seo-config';

/**
 * Home Page for 0dev.io
 * Main landing page with SEO optimization, structured data, and monetization
 */
export default function Home() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteConfig.title}</title>
        <meta name="title" content={siteConfig.title} />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords.join(', ')} />
        <meta name="author" content="0dev.io" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteConfig.url} />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        
        {/* Additional Meta Tags for SEO */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteConfig.url} />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        
        {/* Structured Data - Product (Domain for Sale) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
      </Head>

      <main className="min-h-screen bg-dark-900 text-white">
        {/* Navigation */}
        <Navbar />
        
        {/* News Ticker for engagement */}
        <NewsBar />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Domain Value Highlights */}
        <DomainValue />
        
        {/* Developer Tools Showcase */}
        <Tools />
        
        {/* Features Section */}
        <Features />
        
        {/* Stats & Analytics */}
        <Stats />
        
        {/* Ad Section - Monetization */}
        <AdSection />
        
        {/* Call to Action */}
        <CTA />
        
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
