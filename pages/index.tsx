import Head from 'next/head';
import { Matrix } from '../components/matrix';
import { Navbar } from '../components/navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Matrix />
    </>
  );
}
