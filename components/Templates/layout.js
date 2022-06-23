import * as React from 'react';
import Container from '@mui/material/Container';
import Head from 'next/head'
import Header from '../Organisms/header'
import styles from './layout.module.css';


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });`,
          }}
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>Portfolio | hiraitec</title>
      </Head>
      <Header></Header>
      <Container  maxWidth="lg">
        {children}
      </Container>
      <div className={styles.footer}>
        © 2022 hiraitec
      </div>
    </>
  )
}