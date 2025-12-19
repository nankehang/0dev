import React from 'react';
import { Metadata } from 'next';
import PostPageClient from './PostPageClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // In a real app, you'd fetch the post data here
  // For now, we'll use placeholder data that matches the URL
  const postTitle = "Welcome to 0dev.io Blog";
  const postDescription = "Research notes on WinAPI, malware development, and digital forensics.";
  const postSlug = slug;

  const ogImageUrl = "https://www.0dev.io/og-image.png";

  return {
    title: `${postTitle} - 0dev.io`,
    description: postDescription,
    alternates: {
      canonical: `https://www.0dev.io/post/${postSlug}`,
    },
    openGraph: {
      title: `${postTitle} - 0dev.io`,
      description: postDescription,
      url: `https://www.0dev.io/post/${postSlug}`,
      siteName: '0dev.io',
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${postTitle} - 0dev.io`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${postTitle} - 0dev.io`,
      description: postDescription,
      images: [ogImageUrl],
      site: '@0dev_io',
      creator: '@0dev_io',
    },
    other: {
      'article:author': '0dev.io',
      'article:published_time': new Date().toISOString(),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  return <PostPageClient params={{ slug }} />;
}