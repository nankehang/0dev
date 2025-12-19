'use client';

import React from 'react';
import Head from 'next/head';
import NoteEditor from '../components/NoteEditor';

export default function EditorPage() {
  return (
    <>
      <Head>
        <title>New Note - 0dev.io</title>
      </Head>

      <main>
        <NoteEditor />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  return { props: {} };
};
