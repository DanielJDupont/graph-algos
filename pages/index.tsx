import Head from 'next/head';
import { Matrix } from '../components/matrix';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar/Sidebar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Graph Algos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div style={{ position: 'relative' }}>
        <Sidebar />
        <Matrix />
      </div>
    </>
  );
}
