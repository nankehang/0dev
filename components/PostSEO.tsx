import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface PostSEOProps {
  title: string;
  description: string;
  tags: string[];
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
}

export default function PostSEO({
  title,
  description,
  tags,
  publishedTime,
  modifiedTime,
  image
}: PostSEOProps) {
  const router = useRouter();
  const url = `https://www.0dev.io${router.asPath}`;

  // Create a cool description with tags
  const fullDescription = description.length > 160
    ? `${description.substring(0, 157)}...`
    : description;

  // Use static OG image for now (we can make it dynamic later)
  const ogImageUrl = image || 'https://www.0dev.io/og-image.png';

  const seoConfig = {
    title: `${title} | 0dev.io`,
    description: fullDescription,
    canonical: url,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url,
      title: `${title} | 0dev.io - Hacker Research Blog`,
      description: fullDescription,
      siteName: '0dev.io',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - 0dev.io`,
          type: 'image/png',
        },
      ],
      article: {
        publishedTime,
        modifiedTime,
        authors: ['0dev.io'],
        tags,
      },
    },
    twitter: {
      handle: '@0dev_io',
      site: '@0dev_io',
      cardType: 'summary_large_image',
      title: `${title} | 0dev.io`,
      description: fullDescription,
      images: [ogImageUrl],
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: '0dev.io'
      },
      {
        name: 'keywords',
        content: tags.join(', ')
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'theme-color',
        content: '#0a0a0f'
      },
    ],
  };

  return <NextSeo {...seoConfig} />;
}