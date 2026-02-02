import React from 'react';
import Head from 'next/head';
import BlogList from '../components/BlogList';

export default function Home() {
  return (
    <>
      <Head>
        <title>0dev.io - Research Notes & Hacker Blog</title>
        <meta name="description" content="Personal research notes and technical documentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <BlogList />
      </main>
    </>
  );
}
