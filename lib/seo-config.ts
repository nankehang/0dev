/**
 * SEO Configuration for 0dev.io
 * Centralized SEO metadata, Open Graph, and structured data
 */

export const siteConfig = {
  name: '0dev.io',
  title: '0dev.io - Premium Developer Domain | Tools & Resources for Developers',
  description: 'Acquire 0dev.io - A short, memorable, and powerful domain perfect for tech startups, developer tools, AI platforms, and SaaS products. Premium .io domain with 3,000+ monthly searches.',
  url: 'https://0dev.io',
  ogImage: 'https://0dev.io/og-image.png',
  keywords: [
    'developer domain',
    'tech startup domain',
    'premium .io domain',
    'developer tools',
    'AI tools',
    'SaaS domain',
    '0dev',
    'dev resources',
    'coding platform',
    'tech community',
    'startup domain for sale',
    'short domain name',
    'memorable domain',
  ],
  links: {
    contact: 'mailto:khusanakihang@gmail.com',
  },
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  about: {
    '@type': 'Thing',
    name: 'Developer Tools and Resources',
    description: 'Premium domain for developer communities, tech startups, and SaaS platforms',
  },
};

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '0dev.io',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'khusanakihang@gmail.com',
    contactType: 'Sales',
  },
};

export const productStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '0dev.io Domain',
  description: 'Premium .io domain name - short, memorable, perfect for tech startups',
  brand: {
    '@type': 'Brand',
    name: '0dev.io',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    url: siteConfig.url,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    ratingCount: '50',
  },
};
