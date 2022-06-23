import * as React from 'react';
import '../styles/global.css';
import Layout from '../components/Templates/layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}