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
      {/* Span the entire height of the screen minus the height of the navbar. */}
      <div style={{ position: 'relative', height: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <Matrix />
      </div>
    </>
  );
}
