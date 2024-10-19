// pages/_app.tsx

import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import uploadToAlgolia from '../pages/data/toAlgolia';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    uploadToAlgolia();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
