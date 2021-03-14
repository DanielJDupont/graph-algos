import Head from 'next/head';
import { Matrix } from '../components/matrix';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';
import { Footer } from '../components/footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Graph Algos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {/* Span the entire height of the screen minus the height of the navbar. */}
      <div
        // Subtract the height of the navbar and the height of the footer.
        style={{ position: 'relative', height: 'calc(100vh - 60px - 60px)' }}
      >
        <Sidebar />
        <Matrix />
      </div>

      <Footer />
    </>
  );
}
