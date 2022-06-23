import * as React from 'react';
import Container from '@mui/material/Container';
import Head from 'next/head'
import Header from '../Organisms/header'
import styles from './layout.module.css';


export default function Layout({ children }) {
  return (
    <>
      <Head>
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